const express = require("express");
const router = express.Router();

//Import controllers
const {
  placeOrder,
  updateOrder,
  cancelOrder,
  deleteOrder,
  getOrders,
  getOrder,
  getAllOrders
} = require("../controllers/orders");

const auth = require("../middleware/auth");
const authAdmin = require("../middleware/authAdmin");

// @route   POST /orders
// @desc    Place Order
// @access  Private
router.post("/", placeOrder);

// @route   PUT /orders/:id
// @desc    Update order
// @access  Private
router.put(
  "/:id",auth, updateOrder);

// @route   PUT /orders/cancel/:id
// @desc    Cancel order
// @access  Private
router.put(
  "/cancel/:id",auth, cancelOrder);

// @route   DELETE /orders/:id
// @desc    Delete order
// @access  Private
router.delete(
  "/:id",auth, deleteOrder);

// @route   GET /orders/all
// @desc    Get all orders of all clients
// @access  Private
router.get("/all", authAdmin, getAllOrders);

// @route   GET /orders
// @desc    Get all client's orders
// @access  Private
router.get("/", auth, getOrders);

// @route   GET /orders/:orderNo
// @desc    Get one order by orderNo
// @access  Private
router.get(
  "/:orderNo",auth, getOrder);

module.exports = router;
