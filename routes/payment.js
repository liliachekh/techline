const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");

//Import controllers
const {
  createPayment,
  receive3DSMethod,
  authorizationPayment,
  get3DSTransId
} = require("../controllers/payment");

// @route   POST /payment
// @desc    send payment info
// @access  Public
router.post("/", auth, createPayment);

// @route   POST /payment/3DS
// @desc    receive response from bank info
// @access  Public
router.post ("/3DS", receive3DSMethod)

// @route   GET /payment/3DS/threeDSServerTransID
// @desc    receive response from bank info
// @access  Public
router.get ("/3DS/:threeDSServerTransID", auth, get3DSTransId)

// @route   POST /payment/authorization
// @desc    receive response from bank info
// @access  Public
router.post ("/authorization", auth, authorizationPayment)

module.exports = router;