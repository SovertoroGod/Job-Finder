const express = require('express');
const {
  getAllJobs,
  searchJob,
  getJobById,
} = require("./../controllers/publicJobControllers");

const router = express.Router();

router.get("/getAllJobs", getAllJobs);
router.get("/searchJobs", searchJob);
router.get("/job/:id", getJobById);

module.exports = router;