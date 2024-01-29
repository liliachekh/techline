const express = require("express");
const router = express.Router();
// const passport = require("passport"); // multer for parsing multipart form data (files)
const auth = require("../middleware/auth");

//Import controllers
const {
  addFilter,
  updateFilter,
  deleteFilters,
  getFilters,
  getFiltersByType
} = require("../controllers/filters");

const authAdmin = require("../middleware/authAdmin");

// @route   POST /filters
// @desc    Create new filter
// @access  Private
router.post(
  "/", authAdmin ,
  // passport.authenticate("jwt-admin", { session: false }),
  addFilter
);

// @route   PUT /filters/:id
// @desc    Update existing filter
// @access  Private
router.put(
  "/:id", authAdmin ,
  // passport.authenticate("jwt-admin", { session: false }),
  updateFilter
);

// @route   DELETE /filters
// @desc    DELETE existing filter
// @access  Private
router.delete(
  "/", authAdmin ,
  // passport.authenticate("jwt-admin", { session: false }),
  deleteFilters
);

// @route   GET /filters
// @desc    GET existing filters
// @access  Public
router.get("/", getFilters);

// @route   GET /filters/:type
// @desc    GET existing filters by "type" field
// @access  Public
router.get("/:type", getFiltersByType);

module.exports = router;
