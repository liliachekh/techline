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

    // res.status(200).json({ customer, mailResult, resetToken });
    res.status(200).json({ message: "Password reset link sent to your email account" });

  } catch (err) {
    console.error(err);
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
    console.log(token)
		res.status(200).send("Valid Url");
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
    console.log(customer);

    const token = await ResetToken.findOne({
			customerId: customer._id,
			resetToken: req.params.token,
		});
		if (!token) return res.status(400).send({ message: "Invalid link" });
    console.log(token)

    // Обновить пароль пользователя
    const salt = await bcrypt.genSalt(10);
		const hashPassword = await bcrypt.hash(newPassword, salt);

		customer.password = hashPassword;
		await customer.save();
		await token.remove();
    console.log(customer);
    console.log(token);

		res.status(200).send({ message: "Password reset successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal Server Error" });
  }
};




// Controller for resetting password using token
// exports.resetPassword = async (req, res) => {
//   try {
//     const resetToken = req.params.token;
//     const id = req.params.id;
//     const newPassword = req.body.password;

//     // Проверка, совпадают ли токены
//     if (resetToken !== req.cookies.resetToken) {
//       return res.status(400).json({ message: "Invalid token" });
//     }

//     // Найти пользователя по id
//     const customer = await Customer.findOne({ _id: id });

//     if (!customer) {
//       return res.status(404).json({ message: "Customer not found" });
//     }

//     // Обновить пароль пользователя
//     bcrypt.genSalt(10, (err, salt) => {
//       bcrypt.hash(newPassword, salt, (err, hash) => {
//         if (err) {
//           return res.status(500).json({ message: "Internal Server Error" });
//         }
//         customer.password = hash;
//         customer.save()
//           .then(() => res.json({ message: "Password reset successfully" }))
//           .catch(() => res.status(500).json({ message: "Internal Server Error" }));
//       });
//     });
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ message: "Internal Server Error" });
//   }
// };



// exports.resetPassword = async (req, res) => {
//     try {
//       // Получите токен сброса пароля из параметра маршрута
//       const resetToken = req.params.token;
  
//       // Проверьте, существует ли аккаунт с этим токеном
//       const customer = await Customer.findOne({ resetToken });
  
//       if (!customer) {
//         return res.status(404).json({ message: "Invalid or expired token" });
//       }
  
//       // Проверьте, не истек ли срок действия токена (например, 1 час)
//       const currentTime = Date.now();
//       if (customer.resetTokenExpiresAt < currentTime) {
//         return res.status(401).json({ message: "Token has expired" });
//       }
  
//       // Хешируйте новый пароль и обновите его в базе данных
//       const newPassword = req.body.newPassword;
//       bcrypt.genSalt(10, (err, salt) => {
//         bcrypt.hash(newPassword, salt, (err, hash) => {
//           if (err) {
//             return res.status(500).json({ message: "Internal Server Error" });
//           }
//           customer.password = hash;
//           customer.resetToken = null;
//           customer.resetTokenExpiresAt = null;
//           customer.save()
//             .then(() => res.json({ message: "Password reset successfully" }))
//             .catch(() => res.status(500).json({ message: "Internal Server Error" }));
//         });
//       });
//     } catch (err) {
//       console.error(err);
//       res.status(500).json({ message: "Internal Server Error" });
//     }
//   };