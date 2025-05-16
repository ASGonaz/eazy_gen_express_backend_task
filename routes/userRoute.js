const express = require('express');
const { 
  getUser,
  getLoggedUserData,
} = require('../services/userService');

const authService = require('../services/authService');

const router = express.Router();

router.use(authService.protect);

router.get('/getMe', getLoggedUserData, getUser);


module.exports = router;
