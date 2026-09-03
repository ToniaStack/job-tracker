import Job from "../models/Job.js";
import Application from "../models/Application.js";

// Helper to extract user ID regardless of token encoding
const getUserId = (req) => req.user?.id || req.user?._id;

// @desc    Get all public open jobs
// @route   GET /api/jobs
export const getJobs = async (req, res) => {
  try {
    const { search, type } = req.query;
    let query = { status: "Open" };

    if (search) {
      query.$or = [
        { title: { $regex: search, $options: "i" } },
        { company: { $regex: search, $options: "i" } },
        { location: { $regex: search, $options: "i" } },
      ];
    }

    if (type && type !== "All") {
      query.type = type;
    }

    const jobs = await Job.find(query).sort({ createdAt: -1 });
    res.status(200).json(jobs);
  } catch (error) {
    console.error("Get jobs error:", error);
    res.status(500).json({ message: "Failed to fetch jobs", error: error.message });
  }
};

// @desc    Get jobs created by the logged-in Job Giver
// @route   GET /api/jobs/my-jobs
export const getMyJobs = async (req, res) => {
  try {
    const userId = getUserId(req);
    if (!userId) {
      return res.status(401).json({ message: "User not authenticated" });
    }

    // Safely query without deep population breaking on edge cases
    const jobs = await Job.find({ creator: userId }).sort({ createdAt: -1 });
    res.status(200).json(jobs);
  } catch (error) {
    console.error("Get my jobs error:", error);
    res.status(500).json({ message: "Failed to fetch your jobs", error: error.message });
  }
};

// @desc    Create a new job posting (Job Giver)
// @route   POST /api/jobs
export const createJob = async (req, res) => {
  try {
    const userId = getUserId(req);
    if (!userId) {
      return res.status(401).json({ message: "User not authenticated. Please log in again." });
    }

    const { company, title, location, type, salary, description, requirements } = req.body;

    if (!company?.trim() || !title?.trim() || !location?.trim() || !description?.trim()) {
      return res.status(400).json({
        message: "Company, Job Title, Location, and Description are required.",
      });
    }

    let parsedRequirements = [];
    if (Array.isArray(requirements)) {
      parsedRequirements = requirements;
    } else if (typeof requirements === "string" && requirements.trim()) {
      parsedRequirements = requirements.split(",").map((r) => r.trim()).filter(Boolean);
    }

    const job = await Job.create({
      creator: userId,
      company: company.trim(),
      title: title.trim(),
      location: location.trim(),
      type: type || "Full-time",
      salary: salary ? salary.trim() : "",
      description: description.trim(),
      requirements: parsedRequirements,
      status: "Open",
      applicants: [],
    });

    res.status(201).json(job);
  } catch (error) {
    console.error("Create job error:", error);
    res.status(400).json({
      message: error.message || "Failed to create job",
    });
  }
};

// @desc    Update job posting
// @route   PUT /api/jobs/:id
export const updateJob = async (req, res) => {
  try {
    const userId = getUserId(req);
    const job = await Job.findOneAndUpdate(
      { _id: req.params.id, creator: userId },
      req.body,
      { new: true, runValidators: true }
    );

    if (!job) {
      return res.status(404).json({ message: "Job not found or unauthorized" });
    }

    res.status(200).json(job);
  } catch (error) {
    res.status(400).json({ message: "Failed to update job", error: error.message });
  }
};

// @desc    Delete job posting
// @route   DELETE /api/jobs/:id
export const deleteJob = async (req, res) => {
  try {
    const userId = getUserId(req);
    const job = await Job.findOneAndDelete({
      _id: req.params.id,
      creator: userId,
    });

    if (!job) {
      return res.status(404).json({ message: "Job not found or unauthorized" });
    }

    res.status(200).json({ message: "Job deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Failed to delete job", error: error.message });
  }
};

export const applyToJob = async (req, res) => {
  try {
    const userId = req.user?.id;
    if (!userId) {
      return res.status(401).json({ message: "Authentication required" });
    }

    const job = await Job.findById(req.params.id);
    if (!job) {
      return res.status(404).json({ message: "Job not found" });
    }

    // Guard: Prevent Job Givers from applying
    if (req.user.role === "job_giver" || req.user.role === "creator") {
      return res.status(403).json({
        message: "Job Givers cannot submit applications to jobs.",
      });
    }

    const alreadyApplied = job.applicants?.some(
      (app) => String(app.applicant) === String(userId)
    );

    if (alreadyApplied) {
      return res.status(400).json({ message: "You have already applied to this job." });
    }

    // 1. Add applicant record to the job
    job.applicants.push({
      applicant: userId,
      name: req.body.name || "Candidate",
      email: req.body.email || "",
      notes: req.body.notes || "",
      appliedAt: new Date(),
    });
    await job.save();

    // 2. Add into Job Seeker's own application tracker
    const application = await Application.create({
      user: userId,
      company: job.company,
      role: job.title,
      position: job.title,
      location: job.location,
      salary: job.salary || "Not specified",
      jobUrl: `https://jobtrack.app/jobs/${job._id}`,
      status: "applied",
      notes: req.body.notes
        ? `Applied via JobTrack. Note: ${req.body.notes}`
        : "Applied directly on JobTrack.",
    });

    res.status(201).json({
      message: "Application submitted successfully",
      application,
    });
  } catch (error) {
    console.error("Apply to job error:", error);
    res.status(500).json({
      message: error.message || "Failed to apply to job",
    });
  }
};


// @desc    Job Giver updates an applicant's status (Approve/Reject/Interview)
// @route   PUT /api/jobs/:jobId/applicants/:applicantId/status
export const updateApplicantStatus = async (req, res) => {
  try {
    const { jobId, applicantId } = req.params;
    const { status } = req.body; // 'interview', 'offer', or 'rejected'

    // 1. Ensure the job belongs to this logged-in employer
    const job = await Job.findOne({ _id: jobId, creator: req.user.id });
    if (!job) {
      return res.status(404).json({ message: "Job not found or unauthorized." });
    }

    // 2. Find applicant in the job subdocument
    const applicantRecord = job.applicants.find(
      (a) => a._id.toString() === applicantId || a.applicant?.toString() === applicantId
    );

    if (!applicantRecord) {
      return res.status(404).json({ message: "Applicant not found on this job." });
    }

    applicantRecord.status = status.toLowerCase();
    await job.save();

    // 3. Sync candidate's private tracker so their board updates in real-time
    await Application.findOneAndUpdate(
      {
        user: applicantRecord.applicant,
        company: job.company,
        role: job.title,
      },
      { status: status.toLowerCase() }
    );

    res.status(200).json({
      message: `Applicant status updated to ${status}`,
      job,
    });
  } catch (error) {
    console.error("Update applicant status error:", error);
    res.status(500).json({ message: "Failed to update status", error: error.message });
  }
};