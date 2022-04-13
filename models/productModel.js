const mongoose = require('mongoose');

//creating schema
const productSchema = new mongoose.Schema({
    product_name:{type:String, required:true, trim:true},
    price:{type:Number,required:true},
    stock:{type:Number,required:true},
    remaining:{type:Number},
    available:{type:String},
     
})
//creating model
const productModel = mongoose.model("product",productSchema);

module.exports = productModel;