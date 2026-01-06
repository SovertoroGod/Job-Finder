const { protect } = require("./authMiddleware")

exports.optionalAuth = (req, res, next) => {
    if (req.headers.authorization) {
        protect(req, res, next);
    } else {
        next();
    }
}