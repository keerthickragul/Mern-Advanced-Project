const express = require("express");
const { cartModel } = require("../models/cartModel");
const productModel = require("../models/productModel");
const addCart = async (req, res) => {
    try {
        const userId = req.user.userId;
        const productId = req.body.productId;
        const quantity = req.body.quantity;

        let cart = await cartModel.findOne({ userId });

        if (!cart) {
            cart = new cartModel({
                userId,
                product: [{ productId, quantity }]
            });
            await cart.save();
            return res.status(201).json("cart item added Successfully");
        } else {
            const productIndex = cart.product.findIndex(p => p.productId === productId);

            if (productIndex > -1) {
                // If product already exists, update its quantity
                cart.product[productIndex].quantity = quantity;
            } else {
                // If product does not exist, add it to the cart
                cart.product.push({ productId, quantity });
            }

            await cart.save();
        }

        res.status(200).json({ message: "Cart updated successfully", cart });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Internal server error" });
    }
};

const getDetails = async(req,res) => {
   try{
    const Id = req.user.userId;
    const cartItem = await cartModel.find({userId:Id});
    res.send(cartItem);
    console.log(cartItem);
   }
   catch(err){
    res.json(err);
    console.log(err);
   }


}
// const getCartProductDetails = async(req,res) => {
//     let response;
//     const a = [];
//     try{
//         const Id = req.user.userId;
//         response= await cartModel.find({userId:Id});
//     }
//     catch(err){
//         res.send(err);
//         console.log(err);
//     }
//     console.log(response)
//     const product = response[0].product;
//     const arr = product.map((item) => {
//         return item.productId;
//     })
//     console.log(arr)
//     for(let i=0;i<arr.length;i++){
//         const value = await productModel.find({id:arr[i]})
//         console.log(value)
//         const obj = {}
//         obj.id = value[0].id
//         obj.price = value[0].price
//         obj.title = value[0].title
//         obj.image = value[0].image
//         obj.description = value[0].description
//         obj.quantity = response[i].quantity

//         a.push(obj)
//     }
//     res.send(a)
// }


const getCartProductDetails = async (req, res) => {
    let response;
    const a = [];
    try {
        const Id = req.user.userId;
        response = await cartModel.find({ userId: Id });

        if (!response || response.length === 0) {
            return res.status(404).send({ message: "Cart not found" });
        }

        // console.log(response);

        const products = response[0].product;
        const arr = products.map((item) => item.productId);
        // console.log(arr);

        for (let i = 0; i < arr.length; i++) {
            const value = await productModel.find({ id: arr[i] });
            // console.log(value);

            if (!value || value.length === 0) {
                console.log(`Product with id ${arr[i]} not found`);
                continue; // Skip to the next product if not found
            }

            const obj = {};
            obj.id = value[0].id;
            obj.price = value[0].prize; // Ensure this matches the schema
            obj.title = value[0].title;
            obj.image = value[0].image;
            obj.description = value[0].description;

            // Find the product in the cart to get the correct quantity
            const cartProduct = products.find(p => p.productId === arr[i]);
            obj.quantity = cartProduct ? cartProduct.quantity : "0";

            a.push(obj);
        }

        res.send(a);
    } catch (err) {
        console.log(err);
        res.status(500).send(err);
    }
};



const deleteProductFromCart = async(req,res) => {
    try{
        const userId = req.user.userId;
        const productId = req.body.productId;
        const cart = await cartModel.findOne({userId});
        if(!cart){
            return res.status(404).send({message: "Cart not found"})
        }

        const updatedCartProducts = cart.product.filter(item => item.productId != productId);

        if(updatedCartProducts.length === cart.product.length){
            res.status(404).send({message : "Product not found"})
        }
        cart.product = updatedCartProducts

        await cart.save();
        res.send({message : "product deleted successfully"});

    }
    catch(err){
        console.log(err)
        res.status(500).send(err)
    }
}


const deleteDetails = async (req, res) => {
    try {
        const Id = req.user.userId; 
        const result = await cartModel.findOneAndDelete({ userId: Id });

        if (!result) {
            return res.status(404).send("Cart not found");
        }

        res.send("Successfully deleted");
        console.log("Deleted successfully");
    } catch (err) {
        res.status(500).json(err); 
        console.log(err);
    }
}


const updateDetails = async (req, res) => {
    try {
        const Id = req.user.userId;

        // Build the update object based on the schema
        const updateData = {
            product: req.body.product // Expecting `req.body.product` to be an array of product objects
        };

        // Perform the update operation
        const result = await cartModel.findOneAndUpdate(
            { userId: Id },
            { $set: updateData },
            { new: true, runValidators: true } // Return the updated document and validate
        );

        if (!result) {
            return res.status(404).json("Cart not found");
        }

        res.status(200).json(result);
        console.log("Updated successfully");
    } catch (err) {
        res.status(500).json(err);
        console.log(err);
    }
};

module.exports = {addCart,getDetails,deleteDetails,updateDetails,getCartProductDetails,deleteProductFromCart};
