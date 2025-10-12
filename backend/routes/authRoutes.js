import express from "express";
import {
  login,
  register,
  isAuth,
  logout,
} from "../controllers/authController.js"; // only needed functions
import userAuth from "../middleware/userAuth.js";

const authRouter = express.Router();

// Register new user
authRouter.post("/register", register);

// Login existing user
authRouter.post("/login", login);

// Logout (optional)
authRouter.post("/logout", userAuth, logout);

authRouter.get("/is-auth", isAuth);

export default authRouter;
