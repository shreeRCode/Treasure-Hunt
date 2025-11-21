import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

import quizRoutes from "./routes/quizRoutes.js";
import User from "./models/userModel.js";

dotenv.config();

const app = express();

app.set("trust proxy", 1);

// CORS Configuration
app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "http://localhost:5174",
      "https://treasure-hunt-xi-seven.vercel.app", // frontend URL
    ],
    credentials: true,
  })
);

app.use(express.json());
app.use(cookieParser());
