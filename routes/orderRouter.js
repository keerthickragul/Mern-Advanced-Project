const express = require("express");
const orderRouter = express.Router();
const {auth} = require("../middleware/auth")
const orderController = require("../controllers/orderController")
orderRouter.post("/createOrder",auth,orderController.createOrder);
orderRouter.get("/getOrder",auth,orderController.getOrder);
orderRouter.patch("/updateOrder",auth,orderController.updateOrder )
module.exports = {orderRouter}
