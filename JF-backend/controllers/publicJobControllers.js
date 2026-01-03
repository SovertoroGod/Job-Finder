const Job = require("./../model/jobModel");

exports.getAllJobs = async (req, res) => {
  try {
    const isAdmin = req.user && req.user.role === "Admin";
    // console.log(req.query, "QUrey page");
    const page = parseInt(req.query.page, 10) || 1;
    const limit = parseInt(req.query.limit, 10) || 12;
    const skip = (page - 1) * limit;
    // console.log(page, "Pages");
    // console.log(limit, "limit");
    // console.log(skip, "skip");
    const today = new Date();
    let query = isAdmin
      ? {}
      : {
          isDeleted: false,
          status: "active",
          deadline: { $gte: today },
        };

    const total = await Job.countDocuments(query);
    const jobs = await Job.find(query)
      .sort("-createdAt")
      .populate("recruiter", isAdmin ? "name email companyName" : "companyName")
      .skip(skip)
      .limit(limit);

    const totalPages = Math.ceil(total / limit);
    // console.log(totalPages, "Total Pages");

    res.status(200).json({
      success: true,
      message: "Success",
      pagination: {
        currentPage: page,
        totalJobs: total,
        totalPages: totalPages,
        hasNextPage: page < totalPages,
        hasPrevPage: page > 1,
      },
      data: jobs,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
      error: error.message,
    });
  }
};

exports.searchJob = async (req, res) => {
  try {
    const { title, location, skills } = req.query;
    const today = new Date();
    let query = {
      isDeleted: false,
      status: "active",
      deadline: { $gte: today },
    };

    const page = parseInt(req.query.page, 10) || 1;
    const limit = parseInt(req.query.limit, 10) || 12;
    const skip = (page - 1) * limit;

    if (title) {
      query.title = { $regex: title, $options: "i" };
    }
    // i is for not case-sensitive
    // $regex ka mongoose schema ka lr tr. for key work searching
    if (location) {
      query.$or = [
        { "location.city": { $regex: location, $options: "i" } },
        { "location.country": { $regex: location, $options: "i" } },
      ];
    }

    if (skills) {
      const skillsArray = skills.split(",").map((skill) => ({
        skillsRequired: { $regex: skill.trim(), $options: "i" },
      }));
      query.$and = skillsArray;
    }

    const total = await Job.countDocuments(query);
    const jobs = await Job.find(query)
      .populate("recruiter", "companyName")
      .sort("-createdAt")
      .skip(skip)
      .limit(limit);

    const totalPages = Math.ceil(total / limit);
    res.status(200).json({
      success: true,
      message: "Success",
      count: jobs.length,
      pagination: {
        totalJobs: total,
        currentPage: page,
        totalPages: totalPages,
        hasNextPage: page < totalPages,
        hasPrevPage: page > 1,
      },
      data: jobs,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
      error: error.message,
    });
  }
};

exports.getJobById = async (req, res) => {
  try {
    const job = await Job.findOne({
      _id: req.params.id,
      isDeleted: false,
    }).populate("recruiter", "name companyName");

    if (!job) {
      return res.status(404).json({
        success: false,
        message: "Job not found or has been deleted",
      });
    }

    res.status(200).json({
      success: true,
      message: "Successful",
      data: job,
    });
  } catch (error) {
    if (error.kind === "ObjectId") {
      return res.status(404).json({
        success: false,
        message: "Invalid Job Id",
        error: error.message,
      });
    }
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
      error: error.message,
    });
  }
};


