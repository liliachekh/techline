const jwt = require("jsonwebtoken");
const keys = require("../config/keys");
const Customer = require("../models/Customer");
const bcrypt = require("bcryptjs");
const sendMail = require("../commonHelpers/mailSender");
// const baseUrl = 'https://storage.techlines.es/api/';
const baseUrl = 'http://localhost:4000/api/';


// Controller for initiating password reset
exports.requestPasswordReset = async (req, res) => {
  try {
    // Получите email из запроса
    const email = req.body.registeredEmail;

    // Проверьте, существует ли аккаунт с этим email
    const customer = await Customer.findOne({ email: email });

    if (!customer) {
      return res.status(404).json({ message: "Customer not found" });
    }

    // Создайте JWT-токен для сброса пароля
    const resetToken = jwt.sign(
      { id: customer._id },
      keys.secretOrKey,
      { expiresIn: 36000 },
      // (err, resetToken) => {
      //   res.cookie('resetToken', resetToken, {
      //     httpOnly: true
      //   })
      //   .send()
      // }
    );

    // Установите куки
    res.cookie('resetToken', resetToken, {
      httpOnly: true
    });

    // Отправьте email с ссылкой на сброс пароля, включая токен
    // Здесь вы можете использовать библиотеку для отправки электронной почты (например, nodemailer)
    // и создать письмо с ссылкой, в которой будет указан этот токен
    const link = `${baseUrl}/password-reset?token=${resetToken}&id=${customer._id}`;

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

    res.json({ customer, mailResult });

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// Controller for resetting password using token
exports.resetPassword = async (req, res) => {
    try {
      // Получите токен сброса пароля из параметра маршрута
      const resetToken = req.params.token;
  
      // Проверьте, существует ли аккаунт с этим токеном
      const customer = await Customer.findOne({ resetToken });
  
      if (!customer) {
        return res.status(404).json({ message: "Invalid or expired token" });
      }
  
      // Проверьте, не истек ли срок действия токена (например, 1 час)
      const currentTime = Date.now();
      if (customer.resetTokenExpiresAt < currentTime) {
        return res.status(401).json({ message: "Token has expired" });
      }
  
      // Хешируйте новый пароль и обновите его в базе данных
      const newPassword = req.body.newPassword;
      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newPassword, salt, (err, hash) => {
          if (err) {
            return res.status(500).json({ message: "Internal Server Error" });
          }
          customer.password = hash;
          customer.resetToken = null;
          customer.resetTokenExpiresAt = null;
          customer.save()
            .then(() => res.json({ message: "Password reset successfully" }))
            .catch(() => res.status(500).json({ message: "Internal Server Error" }));
        });
      });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Internal Server Error" });
    }
  };