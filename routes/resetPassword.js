const express = require("express");
const router = express.Router();
const {
  resetPassword,
  resetPasswordWithToken
} = require("../controllers/resetPassword");

// @route   POST /password-reset
// @desc    Request password reset for a customer
// @access  Public
router.post("/", resetPassword);

// @route   POST /password-reset/:token
// @desc    Reset customer's password
// @access  Public
router.post("/:token", resetPasswordWithToken);

module.exports = router;