const { check } = require('express-validator');

exports.validateRegister = [
  check("name", "Name is required").not().isEmpty(),
  check("email", "Please include valid email").isEmail(),
  check("password", "Password must be 8 or more characters").isLength({
    min: 8,
  }),
  check("role")
    .optional()
    .isIn(["Admin", "Recruiter", "Candidate"])
    .withMessage("Role must be one : Admin, Recruiter, Candidate"),
  check("companyName")
    .if((value, { req }) => req.body.role === "Recruiter")
    .not()
    .isEmpty()
    .withMessage("Company Name is required for recruiter role.")
    .trim(),
  check("profileImage")
    .optional()
    .isString()
    .withMessage("Invalid Image format"),
];

exports.validateLogin = [
  check("email", "Please include valid email").isEmail(),
  check("password", "Password is required").exists(),
];