import jwt from "jsonwebtoken";
import * as User from "../models/userModel.js";

// JWT Authentication Middleware
export const auth = async (req, res, next) => {
  // Get the auth header
  const authHeader = req.headers.authorization;

  if (authHeader) {
    // Split to get the token part
    const token = authHeader.split(" ")[1];

    // Verify the token
    jwt.verify(token, process.env.JWT_SECRET, async (err, user) => {
      if (err) {
        return res.status(403).json({ message: "Invalid or expired token" });
      }
      // Add user info to request object
      user = await User.findUserById(user.id);
      user.password = undefined;
      req.user = user;
      next();
    });
  } else {
    res.status(401).json({ message: "Authentication token is required" });
  }
};

