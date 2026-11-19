const mongoose = require("mongoose")

const product = new mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, "Name is required"],
            trim: true,
            minlength: [2, "Name must be at least 2 characters"],
            maxlength: [100, "Name cannot be more than 100 characters"]
        },
        sku: {
            type: String,
            required: [true, "SKU is required"],
            unique: true,
            uppercase: true,
            trim: true
        },
        category: {
            type: String,
            required: [true, "Category is required"],
            trim: true
        },
        price: {
            type: Number,
            required: [true, "Price is required"],
            min: [0, "Price cannot be negative"]
        },
        quantity: {
            type: Number,
            required: [true, "Quantity is required"],
            min: [0, "Quantity cannot be negative"]
        },
        reorderLevel: {
            type: Number,
            default: 10,
            min: [0, "Reorder level cannot be negative"]
        },
        supplier: {
            type: String,
            default: "Unknown",
            trim: true
        }
    },
    {
        timestamps: true,
        toJSON: { virtuals: true }
    }
)

product.virtual("stockValue").get(function () {
    return this.price * this.quantity
})

const productSchema = mongoose.model("product", product)

module.exports = productSchema
