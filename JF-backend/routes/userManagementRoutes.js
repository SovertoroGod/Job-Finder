const express = require('express');
const { viewMyProfile, updateProfile } = require("../controllers/userControllers");
const { protect } = require("./../middlewares/authMiddleware");
const { } = require('./../middlewares/upload');
const upload = require('./../middlewares/upload');

const router = express.Router();

// router.use(protect);

router.get('/my-profile',protect, viewMyProfile);

router.patch('/profile/upload-profile',protect, upload.single('profileImage'), updateProfile);

module.exports = router;