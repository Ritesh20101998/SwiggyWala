const { body, validationResult } = require('express-validator');

const validateSignup = [
  body('username').not().isEmpty().withMessage('Username is required'),
  body('email').isEmail().withMessage('Invalid email format'),
  body('mobile')
    .isMobilePhone('any', { strictMode: false })
    .withMessage('Invalid mobile number')
    .isLength({ min: 10, max: 15 })
    .withMessage('Mobile number must be between 10 and 15 characters'),
  body('password')
    .isLength({ min: 6 })
    .withMessage('Password must be at least 6 characters long'),
];

const validateLogin = [
  body('email').isEmail().withMessage('Invalid email format'),
  body('password')
    .isLength({ min: 6 })
    .withMessage('Password must be at least 6 characters long'),
];

const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (errors.isEmpty()) {
    return next();
  }
  const errorMessages = errors.array().map((error) => error.msg);
  res.status(400).json({ errors: errorMessages });
};

module.exports = { validateSignup, validateLogin, validate };
