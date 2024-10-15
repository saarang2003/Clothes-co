const express = require("express");

const {
  handleImageUpload,
  addProduct,
  fetchAllProduct,
  editProduct,
  deleteProduct,
} = require("../../controllers/admin/product-controller");

const router = express.Router();

const { upload } = require("../../helpers/cloudinary");

router.post("/upload-image", upload.single("image"), handleImageUpload);

router.post("/add", addProduct);
router.get("/get", fetchAllProduct);
router.put("/edit/:id", editProduct);
router.delete("/delete/:id", deleteProduct);

module.exports = router;
