const express = require("express");
const router = express.Router();
// const passport = require("passport"); // multer for parsing multipart form data (files)
const authAdmin = require("../middleware/authAdmin");

//Import controllers
const {
  addPage,
  updatePage,
  deletePage,
  getPage
} = require("../controllers/pages");

// @route   POST /pages
// @desc    Create new links or page
// @access  Private
router.post(
  "/", authAdmin,
  // passport.authenticate("jwt-admin", { session: false }),
  addPage
);

// @route   PUT /pages/:id
// @desc    Update existing page
// @access  Private
router.put(
  "/:customId", authAdmin,
  // passport.authenticate("jwt-admin", { session: false }),
  updatePage
);

// @route   DELETE /pages/:id
// @desc    Delete existing page
// @access  Private
router.delete(
  "/:customId", authAdmin,
  // passport.authenticate("jwt-admin", { session: false }),
  deletePage
);

// @route   GET /pages
// @desc    GET existing page
// @access  Public
router.get("/:customId", getPage);

module.exports = router;
