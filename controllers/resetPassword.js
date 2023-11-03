const jwt = require("jsonwebtoken");
const keys = require("../config/keys");
const Customer = require("../models/Customer");
const ResetToken = require("../models/ResetToken");
const bcrypt = require("bcryptjs");
const sendMail = require("../commonHelpers/mailSender");
// const baseUrl = 'https://storage.techlines.es/api';
const baseUrl = 'http://localhost:3000';


// Controller for initiating password reset
exports.requestPasswordReset = async (req, res) => {
  try {
    // Получите email из запроса
    const email = req.body.registeredEmail;

    // Проверьте, существует ли аккаунт с этим email
    const customer = await Customer.findOne({ email: email });

    if (!customer) {
      return res.status(400).json({ message: "Customer with this email not found" });
    }

    let resetToken = await ResetToken.findOne({ customerId: customer._id });
    if (!resetToken) {
      resetToken = await new ResetToken({
				customerId: customer._id,
				resetToken: jwt.sign(
          { id: customer._id },
          keys.secretOrKey,
          { expiresIn: 3600 },
        ),
			}).save();
    }

    const link = `${baseUrl}/password-reset/new-password/${resetToken.resetToken}/${customer._id}`;

    const subscriberMail = customer.email;
    const letterSubject = "Password reset link";
    const letterHtml = `<h1>Reset Password</h1> <h3>Dear,${customer.firstName},</h3><p>You requested to reset you password.</p><p>Please, click the link below to reset your password.</p><p>${link}</p><p>Techlines</p>`;
    const letterAttachment = null;
    // Send mail
    const mailResult = await sendMail(
      subscriberMail,
      letterSubject,
      letterHtml,
      letterAttachment,
      res
    );

    res.status(200).json({ message: "Password reset link sent to your email account" });

  } catch (err) {
    res.status(500).json({ message: "Internal Server Error" });
  }
};


// verify password reset link
exports.verifyResetPasswordLink = async (req, res) => {
  try {
		const customer = await Customer.findOne({ _id: req.params.id });
		if (!customer) return res.status(400).send({ message: "Invalid link" });
    console.log(customer);
		const token = await ResetToken.findOne({
			customerId: customer._id,
			resetToken: req.params.token,
		});
		if (!token) return res.status(400).send({ message: "Invalid link" });
		res.status(200).send({message: "Valid Url"});
	} catch (error) {
		res.status(500).send({ message: "Internal Server Error" });
	}
}


exports.resetPassword = async (req, res) => {
  try {
    const id = req.params.id;
    const newPassword = req.body.password;

    // Найти пользователя по id
    const customer = await Customer.findOne({ _id: id });
    if (!customer) {
      return res.status(400).json({ message: "Customer not found" });
    }

    const token = await ResetToken.findOne({
			customerId: customer._id,
			resetToken: req.params.token,
		});
		if (!token) return res.status(400).send({ message: "Invalid link" });

    // Обновить пароль пользователя
    const salt = await bcrypt.genSalt(10);
		const hashPassword = await bcrypt.hash(newPassword, salt);

		customer.password = hashPassword;
		await customer.save();
		await token.remove();

		res.status(200).send({ message: "Password reset successfully" });
  } catch (err) {
    res.status(500).json({ message: "Internal Server Error" });
  }
};

