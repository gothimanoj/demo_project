const express = require('express');
const router = express.Router();
const brandCtr = require('../controller/brandController.js');

router.get('/show',brandCtr.show_brand);
router.post('/insert',brandCtr.insert_brand);

module.exports = router;