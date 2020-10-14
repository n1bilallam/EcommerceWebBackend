const express = require("express");
const router = express.Router();
const multer = require("multer");
const shortid = require("shortid");
const path = require("path");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(path.dirname(__dirname), "uploads"));
  },
  filename: function (req, file, cb) {
    cb(null, shortid.generate() + "-" + file.originalname);
  },
});
const upload = multer({ storage });

const {
  addCategory,
  getCategories,
  updateCategories,
  deleteCategories,
} = require("../controller/category");
const { requireSignin, adminMiddelware } = require("../c_middelware");

router.post(
  "/category/create",
  requireSignin,
  adminMiddelware,
  upload.single("categoryImage"),
  addCategory
);
router.get("/category/getcategories", getCategories);
router.post(
  "/category/update",
  upload.array("categoryImage"),
  updateCategories
);
router.post("/category/delete", deleteCategories);

module.exports = router;
