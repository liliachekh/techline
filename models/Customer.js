const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const bcrypt = require("bcryptjs");

const CustomerSchema = new Schema(
  {
    customerNo: {
      type: String,
      required: true
    },
    firstName: {
      type: String,
      required: true
    },
    lastName: {
      type: String,
      required: true
    },
    login: {
      type: String,
      required: false
    },
    email: {
      type: String,
      required: true
    },
    password: {
      type: String,
      required: true
    },
    telephone: {
      type: String
    },
    birthdate: {
      type: String
    },
    gender: {
      type: String
    },
    avatarUrl: {
      type: String
    },
    contactPerson: {
      type: String
    },
    companyName: {
      type: String
    },
    vatNr: {
      type: String
    },
    tier: {
      type: String,
      default: 'beginner',
      required: true,
    },
    isAdmin: {
      type: Boolean,
      required: true,
      default: false
    },
    enabled: {
      type: Boolean,
      required: true,
      default: false
    },
    countryName: {
      type: String,
      required: true
    },
    city: {
      type: String,
      required: true
    },
    index: {
      type: String,
      required: true
    },
    street: {
      type: String,
      required: true
    },
    house: {
      type: String,
      required: true
    },
    apartment: {
      type: String,
      required: true
    },
    date: {
      type: Date,
      default: Date.now
    }
  },
  { strict: false }
);

CustomerSchema.methods.comparePassword = function(candidatePassword, cb) {
  bcrypt.compare(candidatePassword, this.password, function(err, isMatch) {
    if (err) return cb(err);
    cb(null, isMatch);
  });
};

module.exports = Customer = mongoose.model("customers", CustomerSchema);
