const mongoose=require("mongoose")

const schema=new mongoose.Schema({
    OrderId:{
        type:String
    },
    userId:{
        type:String
    },
    email:{
        type:String
    },
    Name:{
        type:String
    },
    Total:{
        type:Number
    },
    PhoneNumber:{
        type:Number
    },
    orderDate:{
        type:Date
    },
    est_Date:{
        type:Date
    },
    products:[],
    address:{
        type:String
    },
    userEmail:{
        type:String},
    orderStatus:{
        type:String,
        default:"InProgress"
    }
})

const orderModel=mongoose.model("Order",schema)

module.exports={orderModel}