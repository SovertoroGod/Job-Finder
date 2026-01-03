const { protect, authorizeRoles } = require("./../middlewares/authMiddleware");
const { handleValidateErrors } = require("./../middlewares/validateErrorHandler");
const { jobValidationRule } = require("./../validations/jobValidation");
const { createJobs, getRecruiterJob, updateJobs, deleteJobs } = require("./../controllers/recruiterJobControllers");
const express = require("express");

const router = express.Router();
// router.use(protect);
// router.use(authorizeRoles("Recruiter"))

router.post('/recruiter/create-job',protect,authorizeRoles("Recruiter"), jobValidationRule, handleValidateErrors, createJobs);

router.get('/recruiter/get-job',protect,authorizeRoles("Recruiter"), getRecruiterJob);

router.put("/recruiter/:id/edit-job",protect, authorizeRoles("Recruiter"), updateJobs);

router.delete('/recruiter/:id/delete-job',protect,authorizeRoles("Recruiter"), deleteJobs);

module.exports = router;