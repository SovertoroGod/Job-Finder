const express = require('express');
const {
  getAllJobs,
  searchJob,
  getJobById,
} = require("./../controllers/publicJobControllers");
const { optionalAuth } = require("../middlewares/optionalAuthMiddleware");

const router = express.Router();

router.get("/getAllJobs", optionalAuth, getAllJobs);
router.get("/searchJobs", optionalAuth, searchJob);
router.get("/job/:id", optionalAuth, getJobById);

module.exports = router;