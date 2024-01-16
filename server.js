const express = require("express");
// const http = require('http');
// const WebSocket = require('ws');
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
const discounts = require("./routes/discounts");
const payment = require("./routes/payment");
// const { error } = require("console");

const app = express();
// app.use(cors(corsOptions));

// Body parser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//cookie
app.use(cookieParser());

app.get('/set-cookie', (req, res) => {
  
  res.cookie('cookieName', 'cookieValue', {
    sameSite: 'none',
    secure: true,
    httpOnly: true
  });

  res.send('Cookie SameSite=None and Secure');
});

app.use(
  cors({
  origin:['http://localhost:3000','https://techlines.es', 'https://b2b.techlines.es'],
  credentials: true
}));
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

// const server = http.createServer(app);
// // Створюємо WebSocket.Server на тому ж сервері, що і Express
// const socketServer = new WebSocket.Server({ noServer: true });

// // Обробляємо оновлення сервера
// server.on('upgrade', (request, socket, head) => {
//   socketServer.handleUpgrade(request, socket, head, (ws) => {
//     socketServer.emit('connection', ws, request);
//   });
// });

// // Логіка WebSocket
// socketServer.on('connection', (socket) => {
//   console.log('WebSocket connection established.');

  // app.post('/api/payment/3DS', (req, res) => {
  //   const { threeDSMethodData } = req.body;

  //   const result = { threeDSServerTransID:threeDSMethodData.threeDSServerTransID, threeDSCompInd: 'Y' }; 

  //   socket.send(JSON.stringify(result));
  //   res.json({ message: 'Result sent to the frontend.' });
  // });
// });
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
app.use("/api/discounts", discounts);
app.use("/api/payment", payment)

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
