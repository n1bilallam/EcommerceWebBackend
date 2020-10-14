const express = require('express');
const router = express.Router();


const {addItemsToCart } = require('../controller/cart');
const { requireSignin, userMiddelware } = require('../c_middelware');

router.post('/user/add_to_cart',requireSignin,userMiddelware,addItemsToCart);
module.exports = router;