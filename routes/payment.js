const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");

//Import controllers
const {
  createPayment
} = require("../controllers/payment");

// @route   POST /payment
// @desc    send payment info
// @access  Public
router.post("/", auth, createPayment);

module.exports = router;