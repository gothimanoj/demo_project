const mongoose = require('mongoose');
const buyerSchema = new mongoose.Schema({
    user_id: { type: mongoose.Types.ObjectId, ref: "register", required: true },
    product_id: { type: mongoose.Types.ObjectId, ref: "product", required: true },
    brand_id: { type: mongoose.Types.ObjectId, ref: "brand", required: true },
    quantity: { type: Number, required: true },
    // isDeleted: { type: Boolean, default: false },

})
const buyerModel = mongoose.model("cart", buyerSchema);
module.exports = buyerModel;