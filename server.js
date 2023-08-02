const express = require("express");
const cookieParser = require('cookie-parser');

const cors = require("cors");
const corsOptions = {
  origin: "*",
  credentials: true, //access-control-allow-credentials:true
  optionSuccessStatus: 200,
};
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const passport = require("passport");
const path = require("path");
require("dotenv").config();

const globalConfigs = require("./routes/globalConfigs");
const customers = require("./routes/customers");
const catalog = require("./routes/catalog");
const products = require("./routes/products");
const colors = require("./routes/colors");
const sizes = require("./routes/sizes");
const filters = require("./routes/filters");
const subscribers = require("./routes/subscribers");
const cart = require("./routes/cart");
const orders = require("./routes/orders");
const links = require("./routes/links");
const pages = require("./routes/pages");
const slides = require("./routes/slides");
const wishlist = require("./routes/wishlist");
const comments = require("./routes/comments");
const shippingMethods = require("./routes/shippingMethods");
const paymentMethods = require("./routes/paymentMethods");
const partners = require("./routes/partners");
// const mainRoute = require('./routes/index');
const { getStaticFilesPath } = require("./utils");
const mintProducts = require("./routes/mintProducts");


const app = express();
app.use(cors());
// Body parser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
//cookie
app.use(cookieParser());

app.get('/set-cookie', (req, res) => {
  
  res.cookie('cookieName', 'cookieValue', {
    sameSite: 'none',
    secure: true
  });

  res.send('Cookie SameSite=None and Secure');
});

//cookies 
app.use(cookieParser());

app.get('/set-cookie', (req, res) => {
  
  res.cookie('cookieName', 'cookieValue', {
    sameSite: 'none',
    secure: true
  });

  res.send('Cookie SameSite=None and Secure');
});
// DB Config
const db = require("./config/keys").mongoURI;

// Connect to MongoDB
mongoose
  .connect(db, { useNewUrlParser: true, useFindAndModify: false })
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.log(err));

// Passport middleware
app.use(passport.initialize());

// Passport Config
require("./config/passport")(passport);

// Use Routes
app.use("/api/configs", globalConfigs);
app.use("/api/customers", customers);
app.use("/api/catalog", catalog);
app.use("/api/products", products);
app.use("/api/colors", colors);
app.use("/api/sizes", sizes);
app.use("/api/filters", filters);
app.use("/api/subscribers", subscribers);
app.use("/api/cart", cart);
app.use("/api/orders", orders);
app.use("/api/links", links);
app.use("/api/pages", pages);
app.use("/api/slides", slides);
app.use("/api/wishlist", wishlist);
app.use("/api/comments", comments);
app.use("/api/shipping-methods", shippingMethods);
app.use("/api/payment-methods", paymentMethods);
app.use("/api/partners", partners);
app.use("/api/mintProducts", mintProducts);

// app.use('/', mainRoute);

// Server static assets if in production
if (process.env.NODE_ENV === "production") {
  // Set static folder

  // app.use(express.static(path.join(__dirname, 'static')));

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
    // res.sendStatus(404)
  });
}
app.use(express.static(getStaticFilesPath()));
const port = process.env.PORT || 4000;

app.listen(port, () => console.log(`Server running on port ${port}`));
