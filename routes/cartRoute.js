const express = require("express");
const router = express.Router();
const cartController= require('../controller/cartController.js');
 
//Add New Cart

 
router.post("/addCart",cartController.addCart);

// Get All Cart
 
router.get("/get",cartController.get);

// Get Cart By Id

router.get("/getbyid/:id", cartController.getById);

// Update Cart
 
router.put("/update/:id", cartController.update);


// Delete Cart By Id
 
router.delete("/delete/:id", cartController.delete);

module.exports = router;