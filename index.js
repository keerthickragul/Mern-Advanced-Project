const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const {Routers} = require("./routes/product")
const {userRouter} = require("./routes/userRouter")
const {cartRouter} = require("./routes/cartRouter")
const {orderRouter} = require("./routes/orderRouter")

const app = express();
app.use(express.json());

app.use(cors());

app.set("view engine" ,"ejs")

app.use("/",Routers)

app.use("/auth",userRouter)

app.use("/add",cartRouter)

app.use("/order",orderRouter)

const DBconnect =async()=>{
    try{
        await mongoose.connect("mongodb+srv://keerthickragulr2022cse:ragul418026@ragul.y3vchqn.mongodb.net/advanced-mern?retryWrites=true&w=majority&appName=Ragul");
        console.log("Db connected")
    }
    catch(err){
        console.log(err)
    }
}

DBconnect();

const port= 8000;
app.listen(port,()=>{
    console.log(`PORT RUNNING AT ${port}`)
})
