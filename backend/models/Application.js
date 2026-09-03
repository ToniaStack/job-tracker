import mongoose from "mongoose";

const applicationSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    company: {
      type: String,
      required: true,
      trim: true,
    },
    role: {
      type: String,
      trim: true,
    },
    position: {
      type: String,
      trim: true,
    },
    status: {
      type: String,
      enum: ["applied", "interview", "assessment", "offer", "rejected"],
      default: "applied",
    },
    location: {
      type: String,
      default: "",
    },
    jobType: {
      type: String,
      default: "Full-time",
    },
    salary: {
      type: String,
      default: "",
    },
    dateApplied: {
      type: Date,
      default: Date.now,
    },
    jobUrl: {
      type: String,
      default: "",
    },
    notes: {
      type: String,
      default: "",
    },
  },
  { timestamps: true }
);

// Synchronous hook without calling next()
applicationSchema.pre("save", function () {
  if (!this.role && this.position) this.role = this.position;
  if (!this.position && this.role) this.position = this.role;
  if (this.status) this.status = this.status.toLowerCase();
});

export default mongoose.model("Application", applicationSchema);