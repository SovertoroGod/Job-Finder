const { protect, authorizeRoles } = require("./../middlewares/authMiddleware");
const { handleValidateErrors } = require("./../middlewares/validateErrorHandler");
const { jobValidationRule } = require("./../validations/jobValidation");
const { createJobs, getRecruiterJob, updateJobs, deleteJobs } = require("./../controllers/recruiterJobControllers");
const express = require("express");

const router = express.Router();
router.use(protect);
// router.use(authorizeRoles("Recruiter"))

router.post('/recruiter/create-job',authorizeRoles("Recruiter"), jobValidationRule, handleValidateErrors, createJobs);

router.get('/recruiter/get-job',authorizeRoles("Recruiter"), getRecruiterJob);

router.put('/recruiter/:id/edit-job',authorizeRoles("Recruiter"), jobValidationRule, handleValidateErrors, updateJobs);

router.delete('/recruiter/:id/delete-job',authorizeRoles("Recruiter"), deleteJobs);

module.exports = router;