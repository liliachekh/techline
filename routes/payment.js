const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");

//Import controllers
const {
  createPayment,
  receive3DSMethod
} = require("../controllers/payment");

// @route   POST /payment
// @desc    send payment info
// @access  Public
router.post("/", auth, createPayment);

router.post ("/3DS", receive3DSMethod)

module.exports = router;