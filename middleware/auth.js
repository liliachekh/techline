const jwt = require('jsonwebtoken')
const mongoose = require("mongoose");
const Customer = mongoose.model("customers");

module.exports = async function auth (req, res, next) {
  try{

const token = req.cookies.token;

if (!token) 
return res.status(401).json({errorMessage: "Unathorized"})

const verified = jwt.verify(token, process.env.SECRET_OR_KEY);
const customer = await Customer.findById(verified.id);

if (!customer) return res.status(401).json({ errorMessage: "Unauthorized" });

req.user = customer;
req.id = verified.id;

next()
  }
  catch (err) {
    console.error(err);
    res.status(401).json({errorMessage: "Unathorized"})

  }
}
 