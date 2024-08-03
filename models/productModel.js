const mongoose = require("mongoose")

const productSchema = new mongoose.Schema({
    id: {
        type: String,
        unique: true,
      },
    title : {
        type:String,required:[true , "Title is required"]
    },
    description : {
        type:String,required:true
    },
    category : {
        type:String
    },
    prize : {
        type:String,required:true
    },
    image : {
        type:String
    },
    rating : {
             rate:{type:String},
             count:{type:Number}
    }

})

const productModel = mongoose.model("products",productSchema)
module.exports= productModel;