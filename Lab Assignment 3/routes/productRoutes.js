const express = require("express")
const {
    createProduct,
    getProducts,
    getProductById,
    updateProduct,
    updateStock,
    deleteProduct,
    getLowStock,
    getSummary
} = require("../controllers/productController")
const { validateId } = require("../middlewares/validateId")
const router = express.Router()

router.get("/low-stock", getLowStock)
router.get("/summary", getSummary)

router.post("/", createProduct)
router.get("/", getProducts)
router.get("/:id", validateId, getProductById)
router.put("/:id", validateId, updateProduct)
router.patch("/:id/stock", validateId, updateStock)
router.delete("/:id", validateId, deleteProduct)

module.exports = router
