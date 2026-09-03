import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import applicationRoutes from "./routes/applicationRoutes.js";
import authRoutes from "./routes/authRoutes.js";
import jobRoutes from "./routes/jobRoutes.js";

dotenv.config();

const app = express();

connectDB();

const allowedOrigins = [
  "http://localhost:5173",
  "https://job-tracker-mznj0cns5-toniababys-projects.vercel.app/", // 
];

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin) return callback(null, true);

      // Matches localhost or any vercel.app subdomain (e.g. *.vercel.app)
      const isAllowed =
        origin.includes("localhost") ||
        origin.endsWith(".vercel.app");

      if (isAllowed) {
        callback(null, true);
      } else {
        callback(new Error(`CORS blocked for origin: ${origin}`));
      }
    },
    credentials: true,
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

app.use(express.json());

app.get("/", (req, res) => {
  res.json({
    message: "JobTrack API is running 🚀",
  });
});

app.use("/api/applications", applicationRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/jobs", jobRoutes);

const PORT = process.env.PORT || 5000;


app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server running on port ${PORT}`);
});