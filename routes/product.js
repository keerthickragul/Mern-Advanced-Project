const express =require ("express")
const Router = express.Router()
const productController = require("../controllers/productController.js")
const {auth}= require("../middleware/auth.js")
// Router.get("/get",auth,productController.getAllProducts);
Router.get("/get",productController.getAllProducts);
Router.post("/add",productController.createProducts);
Router.patch("/update/:id", productController.updateProduct);
Router.delete("/delete/:id",productController.deleteProduct)
module.exports = {Router};
