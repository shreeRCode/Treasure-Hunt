import jwt from "jsonwebtoken";

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

export default userAuth;
