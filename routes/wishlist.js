const express = require("express");
const router = express.Router();
// const passport = require("passport");

//Import controllers
const {
  createWishlist,
  updateWishlist,
  addProductToWishlist,
  deleteWishlist,
  deleteProductFromWishlish,
  getWishlist
} = require("../controllers/wishlist");

const auth = require("../middleware/auth");

// @route   POST /wishlist
// @desc    Create wishlist
// @access  Private
router.post(
  "/",auth,
  // passport.authenticate("jwt", { session: false }),
  createWishlist
);

// @route   PUT /wishlist
// @desc    Update wishlist when adding / deleting products in wishlist
// @access  Private
router.put(
  "/",auth,
  // passport.authenticate("jwt", { session: false }),
  updateWishlist
);

// @route   PUT /wishlist/:productId
// @desc    Add one product to wishlist
// @access  Private
router.put(
  "/:productId",auth,
  // passport.authenticate("jwt", { session: false }),
  addProductToWishlist
);

// @route   DELETE /wishlist
// @desc    Delete wishlist
// @access  Private
router.delete(
  "/",auth,
  // passport.authenticate("jwt", { session: false }),
  deleteWishlist
);

// @route   DELETE /wishlist/:productId
// @desc    Delete one product from wishlist
// @access  Private
router.delete(
  "/:productId",auth,
  // passport.authenticate("jwt", { session: false }),
  deleteProductFromWishlish
);

// @route   GET /wishlist
// @desc    Get wishlist for customer
// @access  Private
router.get("/", auth,
// passport.authenticate("jwt", { session: false }),
getWishlist);

module.exports = router;
