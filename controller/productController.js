const productModel = require('../models/productModel.js');

module.exports = {
    insert_product: async (req, res) => {
        try {
            const { product_name, price, stock, remaining, available } = req.body;
            if (product_name && price && stock && remaining && available) {
                const productdoc = new productModel({
                    product_name: product_name, price: price, stock: stock, remaining: remaining, available: available
                })
                console.log(productdoc);
                await productdoc.save();
                return res.json({ success: true, msg: "product inserted successfully.." })
            } else {
                return res.json({ success: false, msg: "All fields are required.." })
            }
        } catch (err) {
            return res.json({ success: false, msg: err.message })
        }
    },


    getProducts: async (req, res) => {
        try {
            const products = await productModel.find()
            res.status(200).json({
                status: true,
                data: products,
            })
        } catch (err) {
            console.log(err)
            res.status(500).json({
                error: err,
                status: false,
            })
        }
    },
    getProductById: async (req, res) => {

        try {
            const id = req.params.id

            const productDetails = await productModel.findById(id);

            res.status(200).json({
                status: true,
                data: productDetails,
            })
        } catch (err) {
            res.status(500).json({
                status: false,
                error: err
            })
        }
    },
}
