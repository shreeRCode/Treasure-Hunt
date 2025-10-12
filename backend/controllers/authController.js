import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import userModel from "../models/userModel.js";

// Register
export const register = async (req, res) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password)
    return res.json({ success: false, message: "Missing details" });

  try {
    const existingUser = await userModel.findOne({ email });
    if (existingUser)
      return res.json({ success: false, message: "User already exists!" });

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new userModel({ name, email, password: hashedPassword });
    await user.save();

    const token = jwt.sign(
      { id: user._id, name: user.name },
      process.env.JWT_SECRET,
      {
        expiresIn: "7d",
      }
    );

    res.cookie("token", token, {
      httpOnly: true,
      secure: false, // false in dev, true in prod HTTPS
      sameSite: "lax", // 'lax' for dev, 'none' for prod HTTPS
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    return res.json({
      success: true,
      user: { name: user.name, email: user.email },
    });
  } catch (error) {
    return res.json({ success: false, message: error.message });
  }
};

// Login
export const login = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password)
    return res.json({ success: false, message: "Email and password required" });

  try {
    const user = await userModel.findOne({ email });
    if (!user) return res.json({ success: false, message: "Invalid email" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      return res.json({ success: false, message: "Invalid password" });

    const token = jwt.sign(
      { id: user._id, name: user.name },
      process.env.JWT_SECRET,
      {
        expiresIn: "7d",
      }
    );

    res.cookie("token", token, {
      httpOnly: true,
      secure: false, // false in dev, true in prod HTTPS
      sameSite: "lax", // 'lax' for dev, 'none' for prod HTTPS
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    return res.json({
      success: true,
      user: { name: user.name, email: user.email },
    });
  } catch (error) {
    return res.json({ success: false, message: error.message });
  }
};

// Logout
export const logout = async (req, res) => {
  try {
    res.clearCookie("token");
    return res.json({ success: true, message: "Logged out successfully" });
  } catch (error) {
    return res.json({ success: false, message: error.message });
  }
};

export const isAuth = async (req, res) => {
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
};
