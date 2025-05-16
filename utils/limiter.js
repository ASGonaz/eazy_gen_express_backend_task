
const rateLimit = require('express-rate-limit');
// Rate limiting middleware
 const limiter = rateLimit({
  windowMs: 1000, // 1 second
  max: 2, // Allow only 2 requests per second
  message:(req, res) => {
  return res.status(429).json({status:'fail',message:'Too many requests from this IP, please try again after 1 second.'});
} ,
});
module.exports = limiter;