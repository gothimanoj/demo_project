const mongoose = require('mongoose');
 
//creating schema
const brandSchema = new mongoose.Schema({
    brand_name:{type:String, required:true, trim:true},
    title:{type:String,require:true,trim:true},
    discription:{type:String,required:true},
    product:[{type:mongoose.Types.ObjectId,ref:'product',required:true}],
    user:[{type:mongoose.Types.ObjectId,ref:'register',required:true}]
})
 //creating model
const brandModel = mongoose.model("brand",brandSchema);

module.exports = brandModel;