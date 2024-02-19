const express = require("express");
const router = express.Router();
const authAdmin = require("../middleware/authAdmin");
const auth = require("../middleware/auth");

//Import controllers
const {
  createDiscount,
  getDiscount,
  useDiscount
} = require("../controllers/discounts");


// @route   POST /discounts
// @desc    Create new discountCode
// @access  Private
router.post(
  "/", authAdmin,
  createDiscount
);

// @route   GET /discounts/:code
// @desc    Check is discountCode valid
// @access  Public
router.get(
  "/:code", auth,
  getDiscount
);

// @route   PUT /discounts/:code
// @desc    Update discountCode as not active
// @access  Public
router.put(
  "/:code", auth,
  useDiscount
);
module.exports = router;