const express = require('express');
require('dotenv').config();
const app = express();
 const createError = require('create-error');
const bodyParser = require('body-parser');
const connectDB = require('./db/connection');
const registeruser = require('./routes/registerRoutes.js');
const Brand = require('./routes/brandRoute.js');
const Product = require('./routes/productRoute.js');
 const cart = require('./routes/cartRoute.js');
    
connectDB();
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:true}));

app.use('/user',registeruser);
app.use('/brand',Brand);
app.use('/product',Product);
app.use('/cart',cart);
 
app.listen(process.env.PORT, ()=>{
    console.log(`Server listening at http://localhost:${process.env.PORT}`);
}) 