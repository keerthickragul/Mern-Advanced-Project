
const productModel = require("../models/productModel");
const {cartModel} = require("../models/cartModel");
const {orderModel} = require("../models/orderModel");
const {v4 : uuid} = require("uuid");
const mongoose = require("mongoose");


const createOrder=async(req,res)=>{
    const OrderId=uuid()
    const userId=req.user.userId
    const email=req.user.email
    const Name=req.user.Name
    const address=req.body.address
    const PhoneNumber=req.body.PhoneNumber
    const orderDate=new Date()
    const products=await cartModel.find({userId}) 
    const productId=products[0].product
    const arr=productId.map((item)=>{
        return item.productId
    })
    let total=0
    const product=[]
       for(let i=0;i<arr.length;i++){
        const response=await productModel.find({id:arr[i]})
        const obj={}
        obj.title=response[0].title
        obj.description=response[0].description
        obj.prize=response[0].prize
        // obj.image=response[0].image
        obj.quantity=productId[i].quantity
        total+=(response[0].prize)*Number(productId[i].quantity)
        product.push(obj)
    }
    function addDate(date,days){
        const result=new Date(date)
        result.setDate(result.getDate()+days)
        return result
    }
   const est_Date=addDate(orderDate,10)
    const response=new orderModel({OrderId,userId,email,Name,products:product,orderDate,est_Date,Total:total,address,PhoneNumber})
    await response.save()
    res.send(response)
}
  
const getOrder = async(req,res) => {
    try{
        const userId = req.user.userId;
        const orderItem = await orderModel.find({userId});
        res.send(orderItem);
        console.log(orderItem);
    }
    catch(err){
        console.log(err);
        res.status(500).send({message : "order not found"});
    }
}

const updateOrder = async(req,res) => {
    try{
        const Id = req.res.userId;
        const updatedOrder = {
            address:req.body.address,
            orderStatus:req.body.orderStatus
        }
        const result = await orderModel.findOneAndUpdate(
            {useId: Id},
            {$set: updatedOrder},
            {new: true,runValidators: true}
        )
        if(!result) {
            res.status(404).send({message : "order not found"});

        }
        res.status(200).json(result);
        console.log("updated successfully");
    }
    catch(err){
        res.status(500).json(err);
        console.log(err);
    }
}

module.exports = {createOrder,getOrder,updateOrder}