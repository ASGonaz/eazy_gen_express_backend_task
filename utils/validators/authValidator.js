const { check } = require('express-validator');
const validatorMiddleware = require('../../middlewares/validatorMiddleware');
const User = require('../../models/userModel');

//name validation
const name = check('name')
  .notEmpty()
  .withMessage('User required')
  .isLength({ min: 3})
  .withMessage('Too short User name')
  .isLength({ max: 110})
  .withMessage('name limit execed');
//email validation
const email = check('email')
  .notEmpty()
  .withMessage('Email required')
  .isEmail()
  .withMessage('Invalid email address')
  .custom((val) =>
    User.findOne({ email: val }).then((user) => {
      if (user) {
        return Promise.reject(new Error('Please Enter Another Email'));
      }
    })
  ).isLength({ max: 150})
  .withMessage('email limit execed');
//password validation
const password = check('password')
  .notEmpty()
  .withMessage('Password is required')
  .isLength({ min: 8 })
  .withMessage('Password must be at least 8 characters')
  .matches(/(?=.*[a-zA-Z])/)
  .withMessage('Password must contain at least one letter')
  .matches(/(?=.*\d)/)
  .withMessage('Password must contain at least one number')
  .matches(/(?=.*[!@#$%^&*(),.?":{}|<>])/)
  .withMessage('Password must contain at least one special character')
  .custom((password, { req }) => {
    if (password !== req.body.passwordConfirm) {
      throw new Error('Password Confirmation does not match');
    }
    return true;
  }).isLength({ max: 110})
  .withMessage('password limit execed');;
//password passwordConfirm validation
const passwordConfirm = check('passwordConfirm')
  .notEmpty()
  .withMessage('Password confirmation required');

//  
exports.signupValidator = [
  name, email, password, passwordConfirm,
  validatorMiddleware
];

exports.loginValidator = [
  check('email')
  .notEmpty()
  .withMessage('Email required')
  .isEmail()
  .withMessage('Invalid email address')
  .isLength({ max: 110})
  .withMessage('email limit execed'),
   check('password')
  .notEmpty()
  .withMessage('Password is required')
  .isLength({ min: 8 })
  .withMessage('Password must be at least 8 characters').isLength({ max: 110})
  .withMessage('password limit execed'),
  validatorMiddleware
];
