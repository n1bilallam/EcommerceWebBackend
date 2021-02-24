const express = require("express");
const {
  updateOrder,
  getCutumorsOrders,
} = require("../../controller/admin/order.admin");
const { requireSignin, adminMiddelware } = require("../../c_middelware");
const router = express.Router();

router.post(`/order/update`, requireSignin, adminMiddelware, updateOrder);
router.post(
  `/order/getcustomerOrders`,
  requireSignin,
  adminMiddelware,
  getCutumorsOrders
);
module.exports = router;
