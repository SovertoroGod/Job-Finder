const Job = require("./../model/jobModel");
const User = require('./../model/userModel');

exports.adminDeleteJob = async (req, res) => {
    try {
        const jobId = req.params.id;

        const job = Job.findByIdAndUpdate(
            jobId,
            { isDeleted: true, status: 'close' },
            { new: true }
        );
        if (!job) {
            return res.status(404).json({
                success: true,
                message: "Job not found or has been deleted",
                data: job
            })
        };

        res.status(200).json({
            success: true,
            message: `Job titled ${job.title} has been deleted by Admin`
        })

    } catch (error) {
        
        if (error.kind === 'ObjectId') {
            return res.status(404).json({
                success: false,
                message: "Invalid Job Id",
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

exports.adminSearchJob = async (req, res) => {
    try {
        
        const { companyName, title, isDeleted, startDate, endDate, location, jobType, industry } = req.query;
        let query = {};

        const page = parseInt(req.query.page, 10) || 1;
        const limit = parseInt(req.query.limit, 10) || 12;
        const skip = (page - 1) * limit;

        if (title) {
            query.title = { $regex: title, $options: "i" };
        };
        if (jobType) {
            query.jobType = jobType
        };
        if (industry) {
            query.industry = { $regex: industry, $options: "i" }
        };
        if (location) {
            query.$or = [
                { "location.city": { $regex: location, $options: 'i' } },
                { "location.country": { $regex: location, $options: "i" } }
            ];
        };
        if (isDeleted !== 'undefined') {
            query.isDeleted = isDeleted == 'true';
        };
        if (startDate || endDate) {
            query.createdAt = {};
            if (startDate) query.createdAt.$gte = new Date(startDate);
            if (endDate) query.createdAt.$lte = new Date(endDate);
        };

        if (skills) {
            const skillsArray = skills.split(',').map(s => new RegExp(s.trim(), 'i'));
            query.skillsRequired = { $in: skillsArray };
        };
        if (companyName) {
            const recruiters = await User.find({
                companyName: { $regex: companyName, $options: 'i' },
                role: "Recruiter"
            }).select('_id');
            const recruiterIds = recruiters.map(r => r._id);
            query.recruiter = { $in: recruiterIds };
        };

        const total = await Job.countDocuments(query);

        const totalPages = Math.ceil(total / limit);

        const jobs = await Job.find(query)
            .populate("recruiter", "name email companyName")
            .sort("-createdAt")
            .skip(skip)
            .limit(limit);
        
        res.status(200).json({
            success: true,
            message: "Successful",
            count: jobs.length,
            pagination: {
                totalJobs: total,
                currentPage: page,
                totalPages: totalPages,
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
        })
    }
};

exports.adminRestoreJob = async (req, res) => {
    try {
        
        const job = await Job.findByIdAndUpdate(
            req.params.id,
            { isDeleted: false, status: 'active' },
            { new: true }
        );
        
        if (!job) {
            res.status(404).json({
                success: false,
                message: "Job not found with this id"
            })
        }

        res.status(200).json({
            success: true,
            message: "Job Restored",
            data: job
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Internal Server Error",
            error: error.message
        })
    }
};