const express = require("express");

const { requireSignin, userMiddelware } = require("../c_middelware");
const { addAddress, getAddress } = require("../controller/address");
const router = express.Router();

router.post("/user/address/create", requireSignin, userMiddelware, addAddress);
router.post("/user/getaddress", requireSignin, userMiddelware, getAddress);

module.exports = router;
