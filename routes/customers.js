const express = require("express");
const router = express.Router();
const passport = require("passport");

//Import controllers
const {
  createCustomer,
  loginCustomer,
  isCustomerLoggedIn,
  logOutCustomer,
  getCustomer,
  editCustomerInfo,
  updatePassword
} = require("../controllers/customers");
const auth = require("../middleware/auth");

// @route   POST /customers
// @desc    Register customer
// @access  Public
router.post("/", createCustomer);

// @route   POST /customers/login
// @desc    Login Customer / Returning JWT Token
// @access  Public
router.post("/login", loginCustomer);

// @route   GET /customers/logout
// @desc    Logout Customer / Delete cookie Token
// @access  Public
router.get("/logout", logOutCustomer);

// @route   GET /customers/loggedIn
// @desc    Check is customer logged in
// @access  Public
router.get ("/loggedIn", isCustomerLoggedIn)

// @route   GET /
// @desc    Return current customer
// @access  Private
router.get(
  "/customer",auth,
  // passport.authenticate("jwt", { session: false }),
  getCustomer
);

// @route   PUT /customers
// @desc    Return current customer
// @access  Private
router.put(
  "/",auth,
  // passport.authenticate("jwt", { session: false }),
  editCustomerInfo
);

// @route   POST /customers/profile/update-password
// @desc    Return current customer and success or error message
// @access  Private
router.put(
  "/password",auth,
  // passport.authenticate("jwt", { session: false }),
  updatePassword
);

module.exports = router;
