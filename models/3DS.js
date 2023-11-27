const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ThreeDSSchema = new Schema(
  {
    threeDSServerTransID: {
      type: String,
      required: true
    },
    threeDSCompInd: {
      type: String
    },
    date: {
      type: Date,
      default: Date.now
    }
  },
  { strict: false }
);

module.exports = ThreeDS = mongoose.model("3DS", ThreeDSSchema);
