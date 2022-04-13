const createError = require("http-errors");
const { find } = require("../models/cartModel");
const Cart = require("../models/cartModel");
const productModel = require('../models/productModel.js');
 
module.exports = {
    //Add New Cart
    addCart: async (req, res) => {
        try {
             
            const { product_id, quantity } = req.body;
            const result = await productModel.findOne({ _id: product_id })
            if (!product_id || !quantity) {
                return res.json({ msg: "all fields are required" })
            } else {
                if (result.remaining === 0) {
                    return res.json({ msg: "Product is out of stock" })
                } else {
                    if (result.remaining < quantity) {
                        return res.json({ msg: "quantity should be in limit.." })
                    } else {

                        const cart = new Cart({
                            product_id: product_id,
                            quantity: quantity,
                        });
                        await cart.save();
                        const finalQuantity = result.remaining - quantity;

                        await productModel.updateOne({ _id: product_id }, { $set: { remaining: finalQuantity } })
                        if (finalQuantity == 0) {
                            await productModel.findOneAndUpdate({ _id: product_id }, { $set: { available: "No" } })

                        }
                        res.status(200).json({ msg: "product is successfully added to cart" });
                    }
                }
            }
        } catch (error) {
            res.json({ msg: "errors" })

        }
    },

    // Get All Cart
    get: async (req, res) => {
        try {
            const data = await Cart.find()
                .populate({ path: "product_id", select: { _id: 0, product_name: 1 } })
            if (!data) {
                return res.status(400).json({
                    succecc: false,
                    msg: "Cart not Found",
                })
            }
            res.status(200).json({
                status: true,
                data: data
            })


        } catch (error) {
            console.log(error);
            res.json({ success: false, message: error.message })
        }

    },

    // Get Cart By Id
    getById: async (req, res, next) => {
        try {
            const { id } = req.params
            if (!id) {
                res.json({ succecc: false, mes: `Cart Id Not Found` })
            }
            else {
                const data = await Cart.findOne({ _id: id })
                    .populate({ path: "product_id", select: { _id: 0, product_name: 1 } })

                res.status(200).send(data);
            }
        } catch (error) {
            res.json({ status: false, mes: error.message })
        }
    },

    // Update Cart
    update: async (req, res) => {
        try {
            const id = req.body.id
            console.log(id);
            if (!id) {
                res.json({ succecc: false, mes: `Cart Id Not Found` });
            } else {
                const result = await Cart.req.body
                const data = await Cart.findOneAndUpdate({ _id: id }, { $set: { result } }, { new: true });
                console.log(data);

                res.json({ succecc: true, mes: "id Data updateed", data: data });
            }

        } catch (error) {
            console.log(error);
            res.json({ status: false, mes: error.mes })
        }
    },


    // Delete Cart By Id
    delete: async (req, res) => {
        try {
            const id = req.params.id;

            if (!id) {
                return res.json({ msg: "Cart Id Not Found" })
            } else {

                const cartData = await Cart.findByIdAndUpdate({ _id: id }, { $set: { isDeleted: true, } });
                const productData = await productModel.findOne({ _id: cartData.product_id })
                let remaining = productData.remaining + cartData.quantity;
                await productModel.findOneAndUpdate({ _id: cartData.product_id }, { $set: { available: "yes", remaining:remaining } })
                res.status(200).json({ succecc: true, msg: "product is successfully cancle to cart", data: productModel });
            }
        } catch (error) {
            console.log(error);
            res.json({ msg: "errors" })

        }
    },

}