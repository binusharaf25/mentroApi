import jwt from "jsonwebtoken";
import Auth from "../models/auth.js";
import { generateToken } from "../utils/generateToken.js";

export const protect = async (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) return res.status(401).json({ message: "No token provided " });
  try {
    const decode = jwt.verify(token, process.env.JWT_SECRET);
    console.log("Decoded ",decode)
    req.user = await Auth.findById(decode.id).select("-password");
    console.log("decode user req", req.user);
    next();
  } catch (error) {
    res.status(401).json({ message: "Expired or invalid token" });
  }
};
