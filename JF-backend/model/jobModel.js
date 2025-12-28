const mongoose = require("mongoose");
const User = require("./../model/userModel");


const jobSchema = mongoose.Schema({
    recruiter: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    title: {
        type: String,
        required: [true, 'Please add a job title'],
        trim: true,
        maxlength: [100, "Title cannot be more than 100 characters"]
    },
    description: {
        type: String,
        required: [true, "Please fill description"]
    },
    companyName: {
        type: String,
        required: [true, "Please fill company name"],
    },
    jobType: {
        type: String,
        enum: ['Full-time', 'Part-time', 'Contract', 'Internship', 'Freelance'],
        default: "Full-time"
    },
    location: {
        city: { type: String, required: true },
        state: { type: String, required: true },
        country: { type: String, required: true },
        isRemote: { type: Boolean, default: false }
    },
    industry: {
        type: String,
        required: true,
        enum: ["IT", "Finance", "Marketing", "Healthcare", "Education", "Other"]
    },
    experienceLevel: {
        type: String,
        required: true,
        enum: ["Entry Level", "Mid Level", "Senior Level", "Director", "Executive"]
    },
    salary: {
        min: { type: Number },
        max: { type: Number },
        currency: { type: String, default: "MMK" },
        isNegotiable: { type: Boolean, default: false }
    },
    skillsRequired: {
        type: [String],
        required: true
    },
    status: {
        type: String,
        enum: ['active', 'closed', 'archived'],
        default: 'active'
    },
    deadline: {
        type: Date
    },
    isDeleted: {
        type: Boolean,
        default: false,
        index: true // Indexing this makes queries faster
    },
    deletedAt: {
        type: Date,
        default: null
    }
}, { timestamps: true });


// allows users to search by text in the title or description
jobSchema.index({ title: 'text', description: "text" });
jobSchema.index({ recruiter: 1, isDeleted: 1 });
module.exports = mongoose.model("Job", jobSchema);