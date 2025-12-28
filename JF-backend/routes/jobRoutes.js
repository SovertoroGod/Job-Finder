const express = require('express');
const { getAllJobs, searchJob } = require("./../controllers/publicJobControllers");

const router = express.Router();

router.get('/getAllJobs', getAllJobs);
router.get('/searchJobs', searchJob);

module.exports = router;