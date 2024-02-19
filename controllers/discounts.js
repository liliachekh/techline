const Discounts = require("../models/Discount")
const coupongenerator = require("../commonHelpers/coupongenerator")
const queryCreator = require("../commonHelpers/queryCreator");
const _ = require("lodash");

exports.createDiscount = (req, res, next) => {
  
let isExistDiscount = false
do {
let myDiscountCode = coupongenerator()
let newDiscountCode = new Discounts({
code: myDiscountCode,
isPercent: req.body.isPercent,
amount: req.body.amount,
expireDate: "",
isActive: true
})
newDiscountCode.save(function (err) {
if (err) {
if (err.name === "MongoError" && err.code === 11000) {
// Duplicate code detected
isExistDiscount = true;
}
}
res.send({newDiscountCode})
})
}
while (isExistDiscount);
}
 
  exports.getDiscount = (req, res) => {
    Discounts.findOne({ code: req.params.code })
    .then(code => {
       // Check if code exist
    if (!code || !code.isActive) {
      return res.status(404).json({message: "Discount not found"});
    } else {
      res.json(code)
    }
  })
  .catch(err =>
    res.status(400).json({
      message: `Error happened on server: "${err}" `
    })
  );
    } 
  exports.useDiscount = (req, res) => {
    Discounts.findOne({ code: req.params.code })
    .then(code => {
       // Check if code exist
    if (!code || !code.isActive) {
      return res.status(404).json({message: "Discount not found"});
    } else {
      code.isActive = false

      Discounts.findOneAndUpdate(
        { code: req.params.code},
        { $set: code },
        { new: true }
      )
        .then(discount => res.json(discount))
        .catch(err =>
          res.status(400).json({
            message: `Error happened on server: "${err}" `
          })
        );
    }
  })
  .catch(err =>
    res.status(400).json({
      message: `Error happened on server: "${err}" `
    })
  );
  }