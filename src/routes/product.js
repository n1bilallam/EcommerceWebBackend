const express = require("express");
const router = express.Router();
const multer = require("multer");
const shortid = require("shortid");
const path = require("path");

const { requireSignin, adminMiddelware } = require("../c_middelware");
const {
  addProduct,
  getProductsBySlug,
  getProductDetailsById,
  deleteProductById,
  getProducts,
} = require("../controller/product");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(path.dirname(__dirname), "uploads"));
  },
  filename: function (req, file, cb) {
    cb(null, shortid.generate() + "-" + file.originalname);
  },
});
const upload = multer({ storage });
router.post(
  "/product/create",
  requireSignin,
  adminMiddelware,
  upload.array("productPictures"),
  addProduct
);
router.get("/products/:slug", getProductsBySlug);
router.get("/product/:productId", getProductDetailsById);

router.delete(
  "/product/deleteProductById/:slug",
  requireSignin,
  adminMiddelware,
  deleteProductById
);

router.post(
  "/product/getProducts",
  requireSignin,
  adminMiddelware,
  getProducts
);
module.exports = router;
