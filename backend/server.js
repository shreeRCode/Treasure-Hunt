// import express from "express";
// import dotenv from "dotenv";
// import cors from "cors";
// import cookieParser from "cookie-parser"; // MUST ADD
// import connectDB from "./config/mongodb.js";
// import authRouter from "./routes/authRoutes.js"; // ADD - adjust path if needed
// import userRouter from "./routes/userRoutes.js"; // ADD - adjust path if needed

// dotenv.config();
// connectDB();

// const app = express();

// // CRITICAL: CORS must allow credentials and specify origin
// app.use(
//   cors({
//     origin: "http://localhost:5173", // Your React app URL
//     credentials: true, // REQUIRED for cookies
//   })
// );

// app.use(express.json());
// app.use(cookieParser()); // REQUIRED to read cookies

// // Register your routes - THIS WAS MISSING!
// app.use("/api/auth", authRouter);
// app.use("/api/user", userRouter);

// app.get("/", (req, res) => {
//   res.send("Treasure Hunt Backend Running 🚀");
// });

// const PORT = process.env.PORT || 5000;
// app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
//new
import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

dotenv.config();

const app = express();

// CORS Configuration
app.use(
  cors({
    origin: "http://localhost:5174",
    credentials: true,
  })
);

app.use(express.json());
app.use(cookieParser());

// MongoDB Connection
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("✅ MongoDB Connected Successfully");
  } catch (error) {
    console.error("❌ MongoDB Connection Failed:", error.message);
    process.exit(1);
  }
};

connectDB();

// User Model
const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    currentLevel: { type: Number, default: 1 },
    answeredQuestions: [
      {
        level: Number,
        questionId: String,
        isCorrect: Boolean,
      },
    ],
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);

// Middleware
const userAuth = (req, res, next) => {
  const { token } = req.cookies;
  if (!token)
    return res.json({
      success: false,
      message: "Not Authorized! Login again.",
    });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = { userId: decoded.id, name: decoded.name };
    next();
  } catch (error) {
    return res.json({ success: false, message: "Token invalid or expired" });
  }
};

// Routes

// Register
app.post("/api/auth/register", async (req, res) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password)
    return res.json({ success: false, message: "Missing details" });

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser)
      return res.json({ success: false, message: "User already exists!" });

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ name, email, password: hashedPassword });
    await user.save();

    const token = jwt.sign(
      { id: user._id, name: user.name },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    res.cookie("token", token, {
      httpOnly: true,
      secure: false,
      sameSite: "lax",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    return res.json({
      success: true,
      user: { name: user.name, email: user.email },
    });
  } catch (error) {
    return res.json({ success: false, message: error.message });
  }
});

// Login
app.post("/api/auth/login", async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password)
    return res.json({ success: false, message: "Email and password required" });

  try {
    const user = await User.findOne({ email });
    if (!user) return res.json({ success: false, message: "Invalid email" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      return res.json({ success: false, message: "Invalid password" });

    const token = jwt.sign(
      { id: user._id, name: user.name },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    res.cookie("token", token, {
      httpOnly: true,
      secure: false,
      sameSite: "lax",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    return res.json({
      success: true,
      user: { name: user.name, email: user.email },
    });
  } catch (error) {
    return res.json({ success: false, message: error.message });
  }
});

// Logout
app.post("/api/auth/logout", userAuth, async (req, res) => {
  try {
    res.clearCookie("token");
    return res.json({ success: true, message: "Logged out successfully" });
  } catch (error) {
    return res.json({ success: false, message: error.message });
  }
});

// Check Auth
app.get("/api/auth/is-auth", async (req, res) => {
  try {
    const { token } = req.cookies;
    if (!token) return res.json({ success: false });

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (decoded.id) {
      return res.json({ success: true });
    } else {
      return res.json({ success: false });
    }
  } catch (err) {
    return res.json({ success: false });
  }
});

// Get User Data
app.get("/api/user/data", userAuth, async (req, res) => {
  try {
    const user = await User.findById(req.user.userId);
    if (!user) return res.json({ success: false, message: "User not found" });

    return res.json({
      success: true,
      userData: { name: user.name, email: user.email },
    });
  } catch (error) {
    return res.json({ success: false, message: error.message });
  }
});

// Root route
app.get("/", (req, res) => {
  res.send("Treasure Hunt Backend Running 🚀");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
