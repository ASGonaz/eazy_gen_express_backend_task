const asyncHandler = require('express-async-handler');
const factory = require('./handlersFactory');
const User = require('../models/userModel');

// @desc    Get Logged user data
// @route   GET /api/v1/users/getMe
// @access  Private/Protect
exports.getLoggedUserData = asyncHandler(async (req, res, next) => {
  req.params.id = req.user._id;
  next();
});

exports.getUser = factory.getOne(User);





