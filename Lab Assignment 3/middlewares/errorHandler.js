const notFound = (req, res, next) => {
    res.status(404).json({ message: "Route not found: " + req.originalUrl })
}

const errorHandler = (err, req, res, next) => {
    if (err.name === "ValidationError") {
        const errors = Object.values(err.errors).map((e) => e.message)
        return res.status(400).json({ message: "Validation failed", errors })
    }

    if (err.name === "CastError") {
        return res.status(400).json({ message: "Invalid value for " + err.path })
    }

    if (err.code === 11000) {
        return res.status(409).json({ message: "A product with this SKU already exists" })
    }

    if (err.type === "entity.parse.failed") {
        return res.status(400).json({ message: "Invalid JSON in request body" })
    }

    console.log(err)
    res.status(500).json({ message: "Server error" })
}

module.exports = { notFound, errorHandler }
