const jwt = require('jsonwebtoken')
const mongoose = require("mongoose");
const Customer = mongoose.model("customers");

module.exports = async function authAdmin (req, res, next) {
  try {
    const token = req.cookies.token;

    if (!token) {
      return res.status(401).json({errorMessage: "Unathorized"})
    }

    const verified = jwt.verify(token, process.env.SECRET_OR_KEY);
    const customer = await Customer.findById(verified.id);

    // if (!customer) return res.status(401).json({ errorMessage: "Unauthorized" });
    if (!customer || !customer.isAdmin) return res.status(401).json({ errorMessage: "You have not enough permissions for this operation"});

    req.user = customer;
    req.id = verified.id;

    next()
  } catch (err) {
    console.error(err);
    req.status(401).json({errorMessage: "Unathorized"})
  }
}