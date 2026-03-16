import { body, validationResult } from "express-validator";

const validate = (req, res, next) => {
  const error = validationResult(req);

  if (error.isEmpty()) {
    return next();
  }

  res.status(400).json({
    errors: error.array(),
  });
};

export const registerValidation = [
  body("username").isString().withMessage("Username should be string"),
  body("email").isEmail().withMessage("Email should be valid email address"),
  body("password")
    .isLength({ min: 6, max: 10 })
    .withMessage("Password must be at least 6 characters"),
  validate,
];

export const loginValidation = [
  body("email").isEmail().withMessage("Email should be valid email address"),
  body("password")
    .isLength({ min: 6, max: 10 })
    .withMessage("Password must be at least 6 characters"),
  validate,
];
