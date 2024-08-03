const express = require("express");
const cartRouter = express.Router();
const {auth} = require("../middleware/auth.js");
const cartController = require("../controllers/cartController.js")
cartRouter.post("/cart",auth,cartController.addCart)
cartRouter.get("/cartget",auth,cartController.getDetails)
cartRouter.delete("/cartdelete/:id",auth,cartController.deleteDetails)
cartRouter.delete("/cartitemdelete",auth,cartController.deleteProductFromCart)
cartRouter.patch("/cartupdate/:id",auth,cartController.updateDetails)
cartRouter.get("/cartgets",auth,cartController.getCartProductDetails)
module.exports = {cartRouter}