const jwt = require("jsonwebtoken");
const keys = require("../config/keys");
const Customer = require("../models/Customer");
const bcrypt = require("bcryptjs");

// Controller for initiating password reset
exports.resetPassword = async (req, res) => {
  try {
    // Получите email из запроса
    const { email } = req.body.registeredEmail;

    // Проверьте, существует ли аккаунт с этим email
    const customer = await Customer.findOne({ email });

    if (!customer) {
      return res.status(404).json({ message: "Customer not found" });
    }

    // Создайте JWT-токен для сброса пароля
    const token = jwt.sign(
      { id: customer._id },
      keys.secretOrKey,
      { expiresIn: 36000 } // Устанавливает срок действия токена на 1 час
    );

    // Сохраните токен и срок его действия в базе данных
    // customer.resetToken = token;
    // customer.resetTokenExpiresAt = Date.now() + 3600 * 1000; // 1 час в миллисекундах
    // await customer.save();

    // Отправьте email с ссылкой на сброс пароля, включая токен
    // Здесь вы можете использовать библиотеку для отправки электронной почты (например, nodemailer)
    // и создать письмо с ссылкой, в которой будет указан этот токен

    // В этом примере, мы просто отправим токен в ответе на запрос
    res.json({ resetToken: token });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// Controller for resetting password using token
exports.resetPasswordWithToken = async (req, res) => {
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