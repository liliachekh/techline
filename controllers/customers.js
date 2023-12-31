const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const _ = require("lodash");
const keys = require("../config/keys");
const getConfigs = require("../config/getConfigs");
const passport = require("passport");
const uniqueRandom = require("unique-random");
const rand = uniqueRandom(10000000, 99999999);
const sendMail = require("../commonHelpers/mailSender");


// Load Customer model
const Customer = require("../models/Customer");

// Load validation helper to validate all received fields
const validateRegistrationForm = require("../validation/validationHelper");

// Load helper for creating correct query to save customer to DB
const queryCreator = require("../commonHelpers/queryCreator");
const router = require("../routes/globalConfigs");

// Controller for creating customer and saving to DB
exports.createCustomer = (req, res, next) => {
  // Clone query object, because validator module mutates req.body, adding other fields to object
  const initialQuery = _.cloneDeep(req.body);
  initialQuery.customerNo = rand();

  // Check Validation
  const { errors, isValid } = validateRegistrationForm(req.body);

  if (!isValid) {
    return res.status(400).json(errors);
  }

  Customer.findOne({
    $or: [{ email: req.body.email }, { login: req.body.login }]
  })
    .then(customer => {
      if (customer) {
        if (customer.email === req.body.email) {
          return res
            .status(400)
            .json({ message: `Email ${customer.email} already exists` });
        }
       }

      // Create query object for customer for saving him to DB
      const newCustomer = new Customer(queryCreator(initialQuery));

      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newCustomer.password, salt, (err, hash) => {
          if (err) {
            res
              .status(400)
              .json({ message: `Error happened on server: ${err}` });

            return;
          }

          newCustomer.password = hash;
          newCustomer
            .save()
            .then(async customer => {
              
              const subscriberMail = customer.email;
              const letterSubject = "Welcome to Techlines B2B Portal!";
              const letterHtml = `<h1>Thank you for registration!</h1> <h3>Dear,${customer.contactPerson || customer.firstName},</h3><p>It is with great pleasure that we extend a warm welcome to you as a valued member of Techlines B2B portal. We are delighted that you have chosen to join our community.</p><p>To ensure that your registration is completed and you can fully benefit from all the features our portal offers, we kindly request that you provide us with the necessary registration documents by replying to this email. Our team will promptly verify your information, and your account will be activated.</p><p>Should you have any inquiries or require assistance throughout the registration process, please feel free to reach out to our dedicated support team at atylnyi@techlines.es.</p><p>Thank you for entrusting us with your business needs. We anticipate a prosperous partnership ahead!</p><p>Warm regards,</p><p>Andrew Tylnyi</p><p>Techlines</p>`;
              const letterAttachment = null
              // Send mail
              const mailResult = await sendMail(
                subscriberMail,
                letterSubject,
                letterHtml,
                letterAttachment,
                res
              );
              //send mail to admin
              const adminMail = 'atylnyi@techlines.es'; 
              const adminSubject = 'New User Registered'; 
              const adminHtml = `A new user has registered with the following details:
              Company: ${customer.companyName}
              Name: ${customer.contactPerson || customer.firstName}
              Email: ${customer.email}`; 
              
              const adminMailResult = await sendMail(
                adminMail,
                adminSubject,
                adminHtml,
                letterAttachment,
                res
              );
              res.json({ customer, mailResult });
            })
            .catch(err =>
              res.status(400).json({
                message: `Error happened on server: "${err}" `
              })
            );
        });
      });
    })
    .catch(err =>
      res.status(400).json({
        message: `Error happened on server: "${err}" `
      })
    );
};

// Controller for customer login
exports.loginCustomer = async (req, res, next) => {
  const { errors, isValid } = validateRegistrationForm(req.body);

  // Check Validation
  if (!isValid) {
    return res.status(400).json(errors);
  }

  const loginOrEmail = req.body.loginOrEmail;
  const password = req.body.password;
  const configs = await getConfigs();

  // Find customer by email
  Customer.findOne({
    $or: [{ email: loginOrEmail }, { login: loginOrEmail }]
  })
    .then(customer => {
      // Check for customer
      if (!customer || !customer.enabled) {
        errors.loginOrEmail = "Customer not found";
        return res.status(404).json(errors);
      }

      // Check Password
      bcrypt.compare(password, customer.password).then(isMatch => {
        if (isMatch) {
          // Customer Matched
          const payload = {
            id: customer.id,
            firstName: customer.firstName,
            lastName: customer.lastName,
            isAdmin: customer.isAdmin
          }; // Create JWT Payload

          // Sign Token
          jwt.sign(
            payload,
            keys.secretOrKey,
            { expiresIn: 36000 },
            (err, token) => {
              // res.json({
              //   success: true,
              //   token: token
              // })
              res.cookie('token', token, {
                httpOnly: true
              })
              .send()
            }
          );
        } else {
          errors.password = "Password incorrect";
          return res.status(400).json(errors);
        }
      });
    })
    .catch(err =>
      res.status(400).json({
        message: `Error happened on server: "${err}" `
      })
    );
};

//Controller for customer logOut
exports.logOutCustomer = (req, res) => {
  res.cookie('token', "",{
    httpOnly: true,
    expires: new Date(0)
  })
  .send()
};

//Controller for check is customer logged in 
exports.isCustomerLoggedIn = (req, res) => {
  
    try{
  
  const token = req.cookies.token;
  
  if (!token) 
  return res.status.json(false)
  
  jwt.verify(token, process.env.SECRET_OR_KEY);
  
  res.send(true)
    }
    catch (err) {
      res.json(false)
    }
}
//Controller for check is Admin logged in 
exports.isAdminLoggedIn = async (req, res) => {
  
  try{

const token = req.cookies.token;

if (!token) 
return res.status.json(false)

const verified = jwt.verify(token, process.env.SECRET_OR_KEY);
const customer = await Customer.findById(verified.id);
if (!customer || !customer.isAdmin) return res.status.json(false)

jwt.verify(token, process.env.SECRET_OR_KEY);

res.send(true)
  }
  catch (err) {
    res.json(false)
  }
}
// Controller for getting current customer
exports.getCustomer = (req, res) => {
  res.json(req.user);
};

// Controller for editing customer personal info
exports.editCustomerInfo = (req, res) => {
  // Clone query object, because validator module mutates req.body, adding other fields to object
  const initialQuery = _.cloneDeep(req.body);

  // Check Validation
  const { errors, isValid } = validateRegistrationForm(req.body);

  if (!isValid) {
    return res.status(400).json(errors);
  }

  Customer.findOne({ _id: req.user.id })
    .then(customer => {
      if (!customer) {
        errors.id = "Customer not found";
        return res.status(404).json(errors);
      }

      const currentEmail = customer.email;
      // const currentLogin = customer.login;
      let newEmail;
      // let newLogin;

      if (req.body.email) {
        newEmail = req.body.email;

        if (currentEmail !== newEmail) {
          Customer.findOne({ email: newEmail }).then(customer => {
            if (customer) {
              errors.email = `Email ${newEmail} is already exists`;
              res.status(400).json(errors);
              return;
            }
          });
        }
      }

      // Create query object for qustomer for saving him to DB
      const updatedCustomer = queryCreator(initialQuery);

      Customer.findOneAndUpdate(
        { _id: req.user.id },
        { $set: updatedCustomer },
        { new: true }
      )
        .then(customer => res.json(customer))
        .catch(err =>
          res.status(400).json({
            message: `Error happened on server: "${err}" `
          })
        );
    })
    .catch(err =>
      res.status(400).json({
        message: `Error happened on server:"${err}" `
      })
    );
};

// Controller for editing customer password
exports.updatePassword = (req, res) => {
  // Check Validation
  const { errors, isValid } = validateRegistrationForm(req.body);

  if (!isValid) {
    return res.status(400).json(errors);
  }

  // find our user by ID
  Customer.findOne({ _id: req.user.id }, (err, customer) => {
    let oldPassword = req.body.password;

    customer.comparePassword(oldPassword, function(err, isMatch) {
      if (!isMatch) {
        errors.password = "Password does not match";
        res.json(errors);
      } else {
        let newPassword = req.body.newPassword;

        bcrypt.genSalt(10, (err, salt) => {
          bcrypt.hash(newPassword, salt, (err, hash) => {
            if (err) throw err;
            newPassword = hash;
            Customer.findOneAndUpdate(
              { _id: req.user.id },
              {
                $set: {
                  password: newPassword
                }
              },
              { new: true }
            )
              .then(customer => {
                res.json({
                  message: "Password successfully changed",
                  customer: customer
                });
              })
              .catch(err =>
                res.status(400).json({
                  message: `Error happened on server: "${err}" `
                })
              );
          });
        });
      }
    });
  });
};
