const brandModel = require('../models/brandModel.js');

module.exports = {
    insert_brand: async (req, res) => {
        try {
            const { brand_name, product, user, title, discription } = req.body;
            if (brand_name && product && user && title && discription) {
                const branddoc = new brandModel({
                    brand_name: brand_name, product: product, user: user, title: title, discription: discription
                })
                await branddoc.save();
                return res.json({ success: true, msg: "Brand Data inserted successfully.." })
            } else {
                return res.json({ success: false, msg: "All fields are required.." })
            }
        } catch (err) {
            return res.json({ success: false, msg: err.message })
        }
    },
    show_brand: async (req, res) => {
        try {

            const result = await brandModel.aggregate(
                [
                    { $match: { brand_name: 'TATA' } },


                    {
                        $lookup: {
                            from: 'products',
                            localField: 'product',
                            foreignField: '_id',
                            as: 'product'
                        }
                    },
                    { $unwind: { path: '$product' } },
                    {
                        $lookup: {
                            from: 'registers',
                            localField: 'user',
                            foreignField: '_id',
                            as: 'user'
                        }
                    },
                    {
                        $project: {
                            brand_name: 1,
                            'product.product_name': 1,
                            'product.price': 1,
                            'user.Name': 1,
                            'user.location': 1

                        }
                    },

                ])

            return res.json({
                success: true,
                data: result
            });
        } catch (err) {
            return res.json({ status: "failed", msg: err.message })
        }
    }
}
