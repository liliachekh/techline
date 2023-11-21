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

// @route   GET /discounts/discount
// @desc    Check is discountCode valid
// @access  Public
router.get(
  "/discount", auth,
  getDiscount
);

// @route   PUT /discounts/discount
// @desc    Update discountCode as not active
// @access  Public
router.put(
  "/discount", auth,
  useDiscount
);
module.exports = router;