require("dotenv").config()
const express = require("express")
const MongooseConnection = require("./config/db")
const productRoutes = require("./routes/productRoutes")
const { notFound, errorHandler } = require("./middlewares/errorHandler")

const app = express()

app.use(express.json())

app.use("/api/products", productRoutes)

app.use(notFound)
app.use(errorHandler)

const PORT = process.env.PORT || 5000

MongooseConnection()
    .then(() => {
        app.listen(PORT, () => {
            console.log("Server is running on PORT " + PORT)
        })
    })
    .catch((error) => {
        console.error("MongoDB connection failed:", error.message)
    })
