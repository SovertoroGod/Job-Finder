const { matchedData } = require('express-validator');
const Job = require('../model/jobModel');

// Recruiter's Section
exports.createJobs = async (req, res) => {
    try {
        const data = matchedData(req, { location: "body" });
        
        const jobData = {
            ...data,
            recruiter: req.user.id
        };

        const job = await Job.create(jobData);
        res.status(201).json({
            success: true,
            message: "Job is created",
            data: job
        })

    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Internal server error",
            error: error.message
        })
    }
};

exports.deleteJobs = async (req, res) => {
    try {
        const job = await Job.findById(req.params.id);
        if (!job) {
            return res.status(404).json({
                success: false,
                message: "Job not found"
            })
        }
        if (job.recruiter.toString() !== req.user.id) {
            return res.status(401).json({
                success: false,
                message: "Not Authorized"
            });
        };
        job.isDeleted = true;
        job.deletedAt = Date.now();
        await job.save();

        res.status(200).json({
            success: true,
            message: "Job is deleted successfully."
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Internal server error",
            error: error.message
        })
    }
};

exports.getRecruiterJob = async (req, res) => {
    try {
        
        const page = parseInt(req.query.page, 10) || 1;
        const limit = parseInt(req.query.limit, 10) || 12;
        const skip = (page - 1) * limit;

        const query = {
            recruiter: req.params.id,
            isDeleted: false
        };

        const total = await Job.countDocuments(query);
        const jobs = await Job.find(query)
            .sort('-createdAt')
            .skip(skip)
            .limit(limit);

        const totalPages = Math.ceil(total / limit);
        
        res.status(200).json({
            success: true,
            count: jobs.length,
            pagination: {
                totalJobs: total,
                totalPages: totalPages,
                currentPage: page,
                hasNextPage: page < totalPages,
                hasPrevPage: page > 1
            },
            data: jobs
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Internal Server Error",
            error: error.message
        });
    }
};

exports.updateJobs = async (req, res) => {
    try {
        
        let job = await Job.findOne({ _id: req.params.id, isDeleted: false });
        if (!job) {
            return res.status(404).json({
                success: false,
                message: "Job not found or has been deleted."
            })
        };

        if (job.recruiter.toString() !== req.user.id) {
            return res.status(401).json({
                success: true,
                message: "You have not authorized to update."
            })
        };

        // Prevent the recruiter from changing the owner of the job via update
        delete req.body.recruiter;

        job = await Job.findByIdAndUpdate(
            req.params.id,
            { $set: req.body }, // $set ka body mhr change tae field only pl change tr but frontend mhr ll remaining twy ko htae pay mhr so tok $set nae ma yay ll ya tl
            {
                new: true, // update p yin d hr pl return pyan tr
                runValidator: true // mongoose schema htl ka validation rule twy ko pyan activate tr
            }
        );
        
        res.status(200).json({
            success: true,
            message: 'Job is updated successfully',
            data: job
        });

    } catch (error) {
        
        if (error.kind === 'ObjectId') {
            return res.status(404).json({
                success: false,
                message: "Job is not found",
                error: error.message
            });
        };
        res.status(500).json({
            success: false,
            message: "Internal Server Error",
            error: error.message
        });

    }
};