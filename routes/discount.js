const express = require("express");
const router = express.Router();
const authAdmin = require("../middleware/authAdmin");

//Import controllers
const {
  createDiscount
} = require("../controllers/discounts");


// @route   POST /discount
// @desc    Create new discountCode
// @access  Private
router.post(
  "/", authAdmin,
  createDiscount
);

module.exports = router;