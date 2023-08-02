const express = require("express");
const router = express.Router();
const passport = require("passport");
const multer = require("multer"); // multer for parsing multipart form data (files)
const fse = require("fs-extra");

//Import controllers
const {
    addMintProduct,
    getMintProducts,
    getMintProductById,
    updateMintProduct
  } = require("../controllers/mintProducts");

  router.post(
    "/",
    passport.authenticate("jwt-admin", { session: false }),
    addMintProduct
  );

  router.get("/", getMintProducts);

  router.get("/:itemNo", getMintProductById);

  router.put(
    "/:id",
    passport.authenticate("jwt-admin", { session: false }),
    updateMintProduct
  );

module.exports = router;

