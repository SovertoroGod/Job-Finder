const { check } = require('express-validator');

exports.validateRegister = [
    check('name', 'Name is required')
        .not()
        .isEmpty(),
    check('email', 'Please include valid email')
        .isEmail(),
    check('password', "Password must be 8 or more characters")
        .isLength({ min: 8 }),
    check('role')
        .optional()
        .isIn(['Admin', 'Recruiter', 'Candidate'])
        .withMessage('Role must be one : Admin, Recruiter, Candidate')
];

exports.validateLogin = [
    check('email', 'Please include valid email')
        .isEmail(),
    check('password', "Password is required")
        .exists()
]