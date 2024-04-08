const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ResetTokenSchema = new Schema({
	customerId: {
		type: Schema.Types.ObjectId,
		required: true,
		ref: "customers",
	},
	resetToken: { type: String, required: true },
	createdAt: { type: Date, default: Date.now },
});

module.exports = ResetToken = mongoose.model("reset-token", ResetTokenSchema);