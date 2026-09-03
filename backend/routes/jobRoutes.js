import express from "express";
import authMiddleware from "../middleware/AuthMiddleware.js";
import {
  getJobs,
  getMyJobs,
  createJob,
  updateJob,
  deleteJob,
  applyToJob,
  updateApplicantStatus, // <-- Import here
} from "../controllers/jobController.js";

const router = express.Router();

router.use(authMiddleware);

router.get("/", getJobs);
router.get("/my-jobs", getMyJobs);
router.post("/", createJob);
router.put("/:id", updateJob);
router.delete("/:id", deleteJob);
router.post("/:id/apply", applyToJob);
router.put("/:jobId/applicants/:applicantId/status", updateApplicantStatus); // <-- Add route

export default router;