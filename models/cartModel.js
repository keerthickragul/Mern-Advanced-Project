const express = require("express")
const mongoose = require("mongoose")
const Schema = mongoose.Schema;



const cartSchema = new Schema({
    userId:{
        type:String,
        required:true
    },
    product:[{
        productId:{
            type:String,
            required:true
        },
        quantity:{
            type:String,
            required:true
        }
}]
})
const cartModel = mongoose.model("cart",cartSchema)
module.exports = {cartModel}    