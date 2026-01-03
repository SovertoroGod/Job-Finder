const User = require('../model/userModel');
const fs = require('fs');

exports.updateProfile = async (req, res) => {
    try {

        const { name, password } = req.body;

        if (!req.file) {
            return res.status(400).json({
                success: false,
                message: "No file uploaded"
            });
        };

        const user = await User.findById(req.user.id).select('name password profileImage');
        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found"
            });
        };

        if (name) user.name = name;

        if (password) user.password = password;

        if (req.file) {
            if (user.profileImage && user.profileImage !== 'defaultProfile.jpg') {
                const oldPath = `uploads/profiles/${user.profileImage}`;
                if (fs.existsSync(oldPath)) {
                    fs.unlinkSync(oldPath);
                };
            };
            user.profileImage = req.file.filename;
        };

        
        await user.save();
        res.status(200).json({
            success: true,
            message: "Image upload successful",
            data: {
                name: user.name,
                imageUrl: `/uploads/profiles/${user.profileImage}`
            }
        });
        
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Internal Server Error",
            error: error.message
        });
    }
};

exports.viewMyProfile = async (req, res) => {
    try {
        
        const myProfile = await User.findById(req.user.id).select('_id profileImage name email role');
        if (!myProfile) {
            return res.status(404).json({
                success: false,
                message: "User not found or deactivated account"
            });
        };

        res.status(200).json({
            success: true,
            message: "Successful",
            data: myProfile
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Internal Server Error",
            error: error.message
        });
    }
};

