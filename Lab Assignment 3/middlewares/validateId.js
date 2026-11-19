const { mongoose } = require("mongoose")

const validateId = (req, res, next) => {
    if (!mongoose.isValidObjectId(req.params.id)) {
        return res.status(400).json({ message: "Invalid product id" })
    }
    next()
}

module.exports = { validateId }
