const express = require("express");
const router = express.Router();
const passport = require("passport");

//Import controllers
const {
  createCustomer,
  loginCustomer,
  isCustomerLoggedIn,
  isAdminLoggedIn,
  logOutCustomer,
  getCustomer,
  editCustomerInfo,
  updatePassword,
  getCustomers,
  updateCustomer,
  getCustomerById
} = require("../controllers/customers");
const auth = require("../middleware/auth");
const authAdmin = require("../middleware/authAdmin");

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

// @route   GET /customers/loggedInAdmin
// @desc    Check is Admin logged in
// @access  Public
router.get ("/loggedinadmin", isAdminLoggedIn)

// @route   GET /
// @desc    Return current customer
// @access  Private
router.get(
  "/customer",auth,
  // passport.authenticate("jwt", { session: false }),
  getCustomer
);

// @route   GET /
// @desc    Return all customers
// @access  Private (Admin-Only)
router.get(
  "/all", authAdmin,
  // passport.authenticate("jwt", { session: false }),
  getCustomers
);

// @route   PUT /customers
// @desc    Return customers id
// @access  Private (Admin-Only)
router.put(
  "/:id", 
  authAdmin,
  // passport.authenticate("jwt-admin", { session: false }),
  updateCustomer
);

// @route   GET /customers/:id
// @desc    GET existing customer by id
// @access  Private (Admin-Only)
router.get(
  "/:customerNo", 
  authAdmin,
  getCustomerById
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
