const { body } = require("express-validator");

exports.jobValidationRule = [
  body("title").notEmpty().withMessage("Job Title is required"),
  body("description")
    .isLength({ min: 20 })
    .withMessage("Description at least 20 characters long."),
  body("location.city").notEmpty().withMessage("City is required"),
  body("location.country").notEmpty().withMessage("Country is required"),
  body("location.state").notEmpty().withMessage("State is required"),
  body("location.isRemote").optional().isBoolean().withMessage("Invalid Value"),
  body("jobType")
    .isIn(["Full-time", "Part-time", "Contract", "Internship", "Freelance"])
    .withMessage("Invalid Job Type"),
  body("experienceLevel")
    .isIn(["Entry Level", "Mid Level", "Senior Level", "Director", "Executive"])
    .withMessage("Invalid Experience level"),
  body("skillsRequired")
    .isArray({ min: 1 })
    .withMessage("At least one skill is required"),
  body("salary.currency")
    .optional()
    .matches(/^[A-Z]+$/)
    .withMessage("Invalid Currency"),
  body("salary.min")
    .optional()
    .isNumeric()
    .withMessage("Minimum salary must be number"),
  body("salary.max")
    .optional()
    .isNumeric()
    .withMessage("Maximum salary must be number"),
  body("salary.isNegotiable")
    .optional()
    .isBoolean()
    .withMessage("Invalid Value"),
  body("industry")
    .isIn(["IT", "Finance", "Marketing", "Healthcare", "Education", "Other"])
    .withMessage("Invalid Industry Field"),
  body("status")
    .optional()
    .isIn(["active", "closed", "archived"])
    .withMessage("Invalid Status"),
  body("deadline").isDate().withMessage("Invalid Date Format"),
];
