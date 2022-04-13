const express = require('express');
const router = express.Router();
const productCtr = require('../controller/productController.js');

router.post('/insert', productCtr.insert_product);
router.get('/getproduct', productCtr.getProducts);
router.get('/getproduct/:id', productCtr.getProductById);

module.exports = router;