const express = require("express");
const router = express.Router();
const {
  requestPasswordReset,
  verifyResetPasswordLink,
  resetPassword
} = require("../controllers/resetPassword");

// @route   POST /password-reset
// @desc    Request password reset for a customer
// @access  Public
router.post("/", requestPasswordReset);

// @route   GET /password-reset/new-password/:token/:id
// @desc    Verify customer's reset password link
// @access  Public
router.get("/new-password/:token/:id", verifyResetPasswordLink);

// @route   POST /password-reset/new-password/:token/:id
// @desc    Reset customer's password
// @access  Public
router.post("/new-password/:token/:id", resetPassword);

module.exports = router;