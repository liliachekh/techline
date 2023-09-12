const jwt = require('jsonwebtoken')

module.exports = function auth (req, res, next) {
  try{

const token = req.cookies.token;

if (!token) 
return res.status(401).json({errorMessage: "Unathorized"})

const verified = jwt.verify(token, process.env.SECRET_OR_KEY);
req.id = verified.id;

next()
  }
  catch (err) {
    console.error(err);
    req.status(401).json({errorMessage: "Unathorized"})

  }
}
 