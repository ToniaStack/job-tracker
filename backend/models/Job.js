import mongoose from "mongoose";

const jobSchema = new mongoose.Schema(
  {
    creator: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    company: {
      type: String,
      required: true,
      trim: true,
    },
    title: {
      type: String,
      required: true,
      trim: true,
    },
    location: {
      type: String,
      required: true,
      trim: true,
    },
    type: {
      type: String,
      default: "Full-time",
    },
    salary: {
      type: String,
      default: "",
    },
    description: {
      type: String,
      required: true,
    },
    requirements: {
      type: [String],
      default: [],
    },
    status: {
      type: String,
      enum: ["Open", "Closed"],
      default: "Open",
    },
    applicants: [
      {
        applicant: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User",
        },
        name: String,
        email: String,
        notes: String,
        // Candidate status tracked by the Job Giver
        status: {
          type: String,
          enum: ["applied", "interview", "offer", "rejected"],
          default: "applied",
        },
        appliedAt: {
          type: Date,
          default: Date.now,
        },
      },
    ],
  },
  { timestamps: true }
);

export default mongoose.model("Job", jobSchema);