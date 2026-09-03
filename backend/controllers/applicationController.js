import Application from "../models/Application.js";

// @desc    Get all applications for the logged-in user
// @route   GET /api/applications
const getApplications = async (req, res) => {
  try {
    // Only return applications belonging to this user
    const applications = await Application.find({ user: req.user.id }).sort({
      createdAt: -1,
    });

    res.status(200).json(applications);
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch applications",
      error: error.message,
    });
  }
};

// @desc    Get one application (only if owned by the logged-in user)
// @route   GET /api/applications/:id
const getApplication = async (req, res) => {
  try {
    const application = await Application.findOne({
      _id: req.params.id,
      user: req.user.id,
    });

    if (!application) {
      return res.status(404).json({
        message: "Application not found",
      });
    }

    res.status(200).json(application);
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch application",
      error: error.message,
    });
  }
};

const createApplication = async (req, res) => {
  try {
    const userId = req.user?.id || req.user?._id;

    if (!userId) {
      return res.status(401).json({
        message: "Authentication session expired. Please log in again.",
      });
    }

    const { company, position, role, location, salary, jobUrl, dateApplied, status, notes } = req.body;
    const jobTitle = (position || role || "").trim();

    // Check all compulsory fields
    if (!company?.trim()) {
      return res.status(400).json({ message: "Company name is required." });
    }
    if (!jobTitle) {
      return res.status(400).json({ message: "Job title is required." });
    }
    if (!location?.trim()) {
      return res.status(400).json({ message: "Location is required." });
    }
    if (!salary?.trim()) {
      return res.status(400).json({ message: "Salary range is required." });
    }
    if (!jobUrl?.trim()) {
      return res.status(400).json({ message: "Job URL is required." });
    }

    const application = await Application.create({
      user: userId,
      company: company.trim(),
      role: jobTitle,
      position: jobTitle,
      location: location.trim(),
      salary: salary.trim(),
      jobUrl: jobUrl.trim(),
      dateApplied: dateApplied ? new Date(dateApplied) : new Date(),
      status: (status || "applied").toLowerCase(),
      notes: notes || "",
    });

    res.status(201).json(application);
  } catch (error) {
    console.error("Create application error:", error);
    res.status(400).json({
      message: error.message || "Failed to create application",
    });
  }
};

// @desc    Update application (only if owned by the logged-in user)
// @route   PUT /api/applications/:id
const updateApplication = async (req, res) => {
  try {
    const application = await Application.findOneAndUpdate(
      { _id: req.params.id, user: req.user.id },
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );

    if (!application) {
      return res.status(404).json({
        message: "Application not found or unauthorized",
      });
    }

    res.status(200).json(application);
  } catch (error) {
    res.status(400).json({
      message: "Failed to update application",
      error: error.message,
    });
  }
};

// @desc    Delete application (only if owned by the logged-in user)
// @route   DELETE /api/applications/:id
const deleteApplication = async (req, res) => {
  try {
    const application = await Application.findOneAndDelete({
      _id: req.params.id,
      user: req.user.id,
    });

    if (!application) {
      return res.status(404).json({
        message: "Application not found or unauthorized",
      });
    }

    res.status(200).json({
      message: "Application deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to delete application",
      error: error.message,
    });
  }
};

export {
  getApplications,
  getApplication,
  createApplication,
  updateApplication,
  deleteApplication,
};