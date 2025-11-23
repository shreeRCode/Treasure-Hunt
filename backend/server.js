import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import mongoose from "mongoose";

import authRouter from "./routes/authRoutes.js";
import quizRouter from "./routes/quizRoutes.js";

dotenv.config();

const app = express();
app.set("trust proxy", 1);

// CORS
app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "https://treasure-hunt-xi-seven.vercel.app",
    ],
    credentials: true,
  })
);

// Fix preflight CORS requests

app.use(express.json());
app.use(cookieParser());

// DB
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => {
    console.error("MongoDB error:", err.message);
    process.exit(1);
  });

// Routes
app.use("/api/auth", authRouter);
app.use("/api/quiz", quizRouter);

// Root
app.get("/", (req, res) => {
  res.send("Treasure Hunt Backend Running 🚀");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on ${PORT}`));
