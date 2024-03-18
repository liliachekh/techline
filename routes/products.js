const express = require("express");
const router = express.Router();
const passport = require("passport");
const multer = require("multer"); // multer for parsing multipart form data (files)
const fse = require("fs-extra");
const { getUploadedImagesPath } = require("../utils");

//Import controllers
const {
  addImages,
  addProduct,
  updateProduct,
  getProducts,
  getProductById,
  getProductsFilterParams,
  searchProducts,
  deleteProduct,
} = require("../controllers/products");
const authAdmin = require("../middleware/authAdmin");

// Configurations for multer
const storage = multer.diskStorage({
  // Destination, where files should be stored (image url)
  destination: function (req, file, cb) {
    var newDestination = req.headers.path; // We sen image url in header ("path"), when making axios request
    fse.mkdirsSync(newDestination); // We creating folder in destination, specified in headers "path"
    cb(null, newDestination)
    // cb((error) => {
    //   console.log(error);
    // }, getUploadedImagesPath()); // Saving file
  },

  filename: function (req, file, cb) {
    // cb((error) => {
    //   console.log(error);
    // }, file.originalname); 
    cb(null, file.originalname);// We accept original file-name
  },
});

const fileFilter = (req, file, cb) => {
  // Accept file (only jpeg/jpg/png/webp)
  if (
    file.mimetype === "image/jpeg" ||
    file.mimetype === "image/png" ||
    file.mimetype === "image/jpg"||
    file.mimetype === "image/webp"
  ) {
    cb(null, true);
  } else {
    // reject file (if not jpeg/jpg/png/webp)
    cb(null, false);
  }
};

const upload = multer({
  storage: storage,
  limits: {
    fileSize: 1024 * 1024 * 3, // Max size 5MB
  },
  fileFilter: fileFilter,
});

// @route   POST /products/images
// @desc    Add images
// @access  Private
router.post(
  "/images", authAdmin,
  // passport.authenticate("jwt-admin", { session: false }),
  upload.array("photos"),
  addImages
);

// @route   POST /products
// @desc    Create new product
// @access  Private
router.post(
  "/", authAdmin,
  // passport.authenticate("jwt-admin", { session: false }),
  addProduct
);

// @route   PUT /products/:id
// @desc    Update existing product
// @access  Private
router.put(
  "/:id", authAdmin ,
  // passport.authenticate("jwt-admin", { session: false }),
  updateProduct
);

// @route   GET /products
// @desc    GET existing products
// @access  Public
router.get("/", getProducts);

// @route   GET /products/filter
// @desc    GET appropriate filtered products
// @access  Public
router.get("/filter", getProductsFilterParams);

// @route   POST /products/search
// @desc    POST appropriate to search query products
// @access  Public
router.post("/search", searchProducts);

// @route   GET /products/:id
// @desc    GET existing product by id
// @access  Public
router.get("/:productUrl", getProductById);

// @route   DELETE /products/:itemNo
// @desc    Delete existing product
// @access  Private
router.delete(
  "/:itemNo", authAdmin,
  // passport.authenticate("jwt-admin", { session: false }),
  deleteProduct
);

module.exports = router;
