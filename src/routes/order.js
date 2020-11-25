const { addOrder, getOrders } = require("../controller/order");
const { requireSignin, userMiddelware } = require("../c_middelware");
const express = require("express");
const router = express.Router();

router.post("/addorder", requireSignin, userMiddelware, addOrder);
router.get("/getorders", requireSignin, userMiddelware, getOrders);

module.exports = router;
