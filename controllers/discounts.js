const Discounts = require("../models/Discount")
const coupongenerator = require("../commonHelpers/coupongenerator")

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
res.send({newDiscountCode
//success message render
})
})
}
while (isExistDiscount);
}