const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const cartSchema = new Schema({
  product_id: { type: Schema.Types.ObjectId,ref:'product', required: true},
  quantity:{type:Number},
  isDeleted:{type:Boolean,default:false},
   
},{timestamps:true})


const Cart = mongoose.model('cart',cartSchema);
module.exports = Cart;