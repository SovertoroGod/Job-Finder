const User = require("./../model/userModel");

exports.getAllUsers = async (req, res) => {
    try {
        
        const { name, email, role, companyName, startDate, endDate } = req.query;
        const page = parseInt(req.query.page, 10) || 1;
        const limit = parseInt(req.query.limit, 10) || 12;
        const skip = (page - 1) * limit;
        let query = {};

        if (name) query.name = { $regex: name, $options: "i" };
        if (email) query.name = { $regex: email, $options: "i" };
        if (role) query.role = role;
        if (companyName) query.companyName = { $regex: companyName, $options: "i" };
        if (startDate || endDate) {
            query.createdAt = {};
            if (startDate) query.createdAt.$gte = new Date(startDate);
            if (endDate) query.createdAt.$lte = new Date(endDate);
        };
 
        const total = await User.countDocuments(query);
        const users = await User.find(query)
            .select("-password")
            .sort("-createdAt")
            .skip(skip)
            .limit(limit);
        
        const totalPages = Math.ceil(total / limit);
        
        res.status(200).json({
            success: true,
            message: "Success",
            pagination: {
                totalUsers: total,
                totalPages: totalPages,
                currentPage: page,
                hasNextPage: page < totalPages,
                hasPrevPage: page > 1
            },
            data: users
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Internal Server Error",
            error: error.message
        });
    }
};

exports.getRoleCount = async (req, res) => {
    try {
        
        const stats = await User.aggregate([
            { $group: { _id: "$role", count: { $sum: 1 } } }
        ]);

        res.status(200).json({
            success: true,
            message: "Success",
            data: stats
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Internal Server Error",
            error: error.message
        });
    }
};