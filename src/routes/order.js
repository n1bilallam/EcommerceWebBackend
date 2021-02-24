const { addOrder, getOrders, getOrder } = require("../controller/order");
const { requireSignin, userMiddelware } = require("../c_middelware");
const express = require("express");
const router = express.Router();

router.post("/addorder", requireSignin, userMiddelware, addOrder);
router.get("/getorders", requireSignin, userMiddelware, getOrders);
router.post("/getorder", requireSignin, userMiddelware, getOrder);
module.exports = router;
