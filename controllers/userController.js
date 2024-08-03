const express = require("express");
const bcrypt = require("bcryptjs");
const {userModel}= require("../models/userMOdel")
const jwt = require("jsonwebtoken");

const register = async(req,res)=>{
    try{
        const {name,email,password} = req.body;
        const user = new userModel({name,email,password})
        await user.save()
        res.status(201).json("Successful")
        console.log("user Created Successfully")
    }
    catch(err){
        res.status(500).json({message:err})
        console.log(err)
    }
}

const login = async(req,res)=>{
    const {email,password} = req.body;
    const user = await userModel.findOne({email})
    try{
        if(!user){
            return res.status(404).json({message: "User not found"});
        }
        const isValidPassword = await bcrypt.compare(password,user.password);
        if(!isValidPassword){
            return res.status(401).json({message: "Invalid Password"});
        }
       const token = jwt.sign({userId: user._id,email:user._email,password:user._password}, "secret_key",{
        expiresIn: "1h",
       });
       res.json({token});
    }
    catch(err){
        console.log(err);
    }

}

module.exports = {register,login}