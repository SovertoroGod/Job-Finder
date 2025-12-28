const jwt = require("jsonwebtoken");
const User = require('./../model/userModel');


// verify token
exports.protect = async (req, res, next) => {
    let token;
    if (req.headers.authorization &&
        req.headers.authorization.startsWith('Bearer')
    ) {
        try {
            token = req.headers.authorization.split(' ')[1];
            const decoded = jwt.verify(token, process.env.JWT_SECRET);


            // get user from token payload(without password)
            req.user = await User.findById(decoded.userId).select("-password");

            if (!req.user) {
                return res.status(401).json({
                    success: false,
                    message: "Not authorized, user not found"
                })
            };

            if (req.user.idDeleted) {
                return res.status(403).json({
                    success: false,
                    message: "Account disabled"
                });
            };
            next();

        } catch (error) {
            res.status(401).json({
                success: false,
                message: "Not authorized, token fail",
                error: error.message
            })
        }
    }

    if (!token) {
        res.status(401).json({
            success: false,
            message: "Not authorized, no token"
        });
    }
};


// role access kwal tr 
exports.authorizeRoles = (...roles) => {
    return (req, res, next) => {
        if (!roles.includes(req.user.role)) {
            return res.status(403).json({
                success: false,
                message: `User role ${req.user.role} is not authorized to access this route`
            });
        }
        next();
    };
};