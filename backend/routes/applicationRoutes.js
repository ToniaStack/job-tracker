import express from "express";
import Application from "../models/Application.js";
import authMiddleware from "../middleware/AuthMiddleware.js";
import {
  getApplications,
  getApplication,
  createApplication,
  updateApplication,
  deleteApplication,
} from "../controllers/applicationController.js";

const router = express.Router();

// Require valid authentication for all application endpoints
router.use(authMiddleware);

// Get all applications for the logged-in user
router.get("/", getApplications);

// Import applications (scoped to logged-in user)
router.post("/import", async (req, res) => {
  try {
    const { applications } = req.body;

    if (!Array.isArray(applications)) {
      return res.status(400).json({
        message: "Applications must be an array",
      });
    }

    const cleanedApplications = applications.map((app) => {
      const { _id, id, __v, createdAt, updatedAt, ...application } = app;
      return {
        ...application,
        user: req.user.id, // Attach to current user
      };
    });

    const imported = await Application.insertMany(cleanedApplications);

    res.status(201).json(imported);
  } catch (error) {
    console.error("Import applications error:", error);
    res.status(500).json({
      message: "Failed to import applications",
    });
  }
});

// Clear only the logged-in user's applications
router.delete("/", async (req, res) => {
  try {
    await Application.deleteMany({ user: req.user.id });

    res.json({
      message: "All applications deleted successfully",
    });
  } catch (error) {
    console.error("Clear all applications error:", error);
    res.status(500).json({
      message: "Failed to clear applications",
    });
  }
});

// Single application operations
router.get("/:id", getApplication);
router.post("/", createApplication);
router.put("/:id", updateApplication);
router.delete("/:id", deleteApplication);

export default router;