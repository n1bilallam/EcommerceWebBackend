const express = require("express");
const { addItemsToCart, getCartItems } = require("../controller/cart");
const { requireSignin, userMiddelware } = require("../c_middelware");
const router = express.Router();

router.post(
  "/user/cart/addtocart",
  requireSignin,
  userMiddelware,
  addItemsToCart
);
router.post("/user/getCartItems", requireSignin, userMiddelware, getCartItems);
module.exports = router;
