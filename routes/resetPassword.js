const express = require("express");
const router = express.Router();
const {
  requestPasswordReset,
  resetPassword
} = require("../controllers/resetPassword");

// @route   POST /password-reset
// @desc    Request password reset for a customer
// @access  Public
router.post("/", requestPasswordReset);

// @route   POST /password-reset/:token
// @desc    Reset customer's password
// @access  Public
router.post("/:token", resetPassword);

module.exports = router;