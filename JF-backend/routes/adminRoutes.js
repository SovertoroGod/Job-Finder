const express = require('express');
const { protect, authorizeRoles } = require('../middlewares/authMiddleware');
const { adminDeleteJob, adminSearchJob, adminRestoreJob } = require('../controllers/adminJobControllers');
const { getAllUsers, getRoleCount } = require('./../controllers/adminUsersControllers')

const router = express.Router();

// router.use(protect);

// Users management
router.get('/admin/getAllUsers', protect, authorizeRoles("Admin"), getAllUsers);
router.get('/admin/role-counter', protect, authorizeRoles("Admin"), getRoleCount);

// Jobs management
router.get('/admin/search-jobs', protect, authorizeRoles('Admin'), adminSearchJob);

router.patch('/admin/restore-job/:id', protect, authorizeRoles('Admin'), adminRestoreJob);

router.delete('/admin/delete-job/:id', protect, authorizeRoles("Admin"), adminDeleteJob);

module.exports = router;

