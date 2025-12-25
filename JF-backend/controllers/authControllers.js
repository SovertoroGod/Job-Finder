const User = require("./../model/userModel");
const generateToken = require("../utils/generateToken");
const { matchedData } = require('express-validator');


exports.registerUser = async (req, res) => {
    try {
        const data = matchedData(req, { locations: 'body' });
        const { name, email, password, role } = data;
        const userExit = await User.findOne({ email });

        if (userExit) return res.status(400).json({ success: false, message: "User is already exists" });
    
        const user = await User.create({
            name,
            email,
            password,
            role: role || 'Candidate'
        });

        res.status(201).json({
            success: true,
            message: "Register Successful",
            data: user
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Internal Server Error",
            error: error.message
        })
    };
};

exports.loginUser = async (req, res) => {

    try {
        const data = matchedData(req, { locations: "body" });
        const { email, password } = data;
        const user = await User.findOne({ email });

        if (user && (await user.comparePassword(password))) {
            const token = generateToken(res, user._id);
            res.status(200).json({
                success: true,
                message: "Login Successful",
                data: {
                    _id: user._id,
                    name: user.name,
                    role: user.role,
                    token
                }
            })
        } else {
            res.status(401).json({
                success: false,
                message: "Invalid Email or Password"
            })
        }
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Internal server error",
            error: error.message
        })
    }
    
};