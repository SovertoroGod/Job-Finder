const Job = require("./../model/jobModel");

exports.getAllJobs = async (req, res) => {
    try {
        
        const page = parseInt(req.query.page, 10) || 1;
        const limit = parseInt(req.query.limit, 10) || 12;
        const skip = (page - 1) * limit;

        const query = { isDeleted: false, status: "active" };

        const total = await Job.countDocuments(query);
        const jobs = await Job.find(query)
            .sort('-createdAt')
            .skip(skip)
            .limit(limit);
        
        res.status(200).json({
            success: true,
            message: "Success",
            pagination: {
                total: page,
                totalPages: Math.ceil(total / limit)
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

exports.searchJob = async (req, res) => {
    try {
        
        const { title, location, skills } = req.query;
        let query = { isDeleted: false, status: 'active' };

        if (title) {
            query.title = { $regex: title, $option: 'i' };
        };
        // i is for not case-sensitive
        // $regex ka mongoose schema ka lr tr. for key work searching
        if (location) {
            query.$or = [
                { "location.city": { $regex: location, option: 'i' } },
                { "location.country": { $regex: location, option: 'i' } }
            ];
        };

        if (skills) {
            const skillsArray = skills.split(',');
            query.skillsRequired = { $in: skillsArray };
        };

        const jobs = await Job.find(query).sort('-createdAt');
        
        res.status(200).json({
            success: true,
            message: "Success",
            count: jobs.length,
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