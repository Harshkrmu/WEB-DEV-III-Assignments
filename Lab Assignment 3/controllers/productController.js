const productSchema = require("../models/product")

const createProduct = async (req, res) => {
    let { name, sku, category, price, quantity, reorderLevel, supplier } = req.body

    let product = await productSchema.create({ name, sku, category, price, quantity, reorderLevel, supplier })

    res.status(201).json(product)
}

const getProducts = async (req, res) => {
    let { category, search, minPrice, maxPrice, sort } = req.query

    let filter = {}

    if (category) {
        filter.category = category
    }

    if (search) {
        filter.name = { $regex: search, $options: "i" }
    }

    if (minPrice || maxPrice) {
        filter.price = {}
        if (minPrice) filter.price.$gte = Number(minPrice)
        if (maxPrice) filter.price.$lte = Number(maxPrice)
    }

    let sortBy = sort ? sort.split(",").join(" ") : "-createdAt"
    let page = Number(req.query.page) || 1
    let limit = Number(req.query.limit) || 10
    let skip = (page - 1) * limit

    let total = await productSchema.countDocuments(filter)
    let products = await productSchema.find(filter).sort(sortBy).skip(skip).limit(limit)

    res.status(200).json({
        total,
        page,
        totalPages: Math.ceil(total / limit),
        count: products.length,
        products
    })
}

const getProductById = async (req, res) => {
    let { id } = req.params

    let product = await productSchema.findById(id)

    if (!product) {
        return res.status(404).json({ message: "Product not found" })
    }

    res.status(200).json(product)
}

const updateProduct = async (req, res) => {
    let { id } = req.params

    let product = await productSchema.findByIdAndUpdate(id, req.body, {
        new: true,
        runValidators: true
    })

    if (!product) {
        return res.status(404).json({ message: "Product not found" })
    }

    res.status(200).json(product)
}

const updateStock = async (req, res) => {
    let { id } = req.params
    let { change } = req.body || {}

    if (!Number.isInteger(change) || change === 0) {
        return res.status(400).json({ message: "change must be a non-zero whole number" })
    }

    let filter = { _id: id }

    if (change < 0) {
        filter.quantity = { $gte: -change }
    }

    let product = await productSchema.findOneAndUpdate(
        filter,
        { $inc: { quantity: change } },
        { new: true }
    )

    if (!product) {
        let exists = await productSchema.exists({ _id: id })

        if (!exists) {
            return res.status(404).json({ message: "Product not found" })
        }

        return res.status(400).json({ message: "Not enough stock" })
    }

    res.status(200).json({ message: "Stock updated", product })
}

const deleteProduct = async (req, res) => {
    let { id } = req.params

    let product = await productSchema.findByIdAndDelete(id)

    if (!product) {
        return res.status(404).json({ message: "Product not found" })
    }

    res.status(200).json({ message: "Product deleted", id: product._id })
}

const getLowStock = async (req, res) => {
    let lowStockItems = await productSchema.aggregate([
        { $match: { $expr: { $lte: ["$quantity", "$reorderLevel"] } } },
        {
            $addFields: {
                stockValue: { $multiply: ["$price", "$quantity"] },
                id: { $toString: "$_id" }
            }
        },
        { $sort: { quantity: 1 } }
    ])

    res.status(200).json({ count: lowStockItems.length, lowStockItems })
}

const getSummary = async (req, res) => {
    let summary = await productSchema.aggregate([
        {
            $group: {
                _id: "$category",
                totalItems: { $sum: 1 },
                totalQuantity: { $sum: "$quantity" },
                totalStockValue: { $sum: { $multiply: ["$price", "$quantity"] } },
                avgPrice: { $avg: "$price" }
            }
        },
        { $addFields: { avgPrice: { $round: ["$avgPrice", 2] } } },
        { $sort: { totalStockValue: -1 } }
    ])

    res.status(200).json({ categories: summary.length, summary })
}

module.exports = {
    createProduct,
    getProducts,
    getProductById,
    updateProduct,
    updateStock,
    deleteProduct,
    getLowStock,
    getSummary
}
