import jwt from "jsonwebtoken";
import redis from "../config/cache.js";
import dotenv from "dotenv";

dotenv.config();

async function identifyUser(req, res, next) {
  const token = req.cookies.token;

  if (!token) {
    return res.status(401).json({ message: "Unauthorized: No token provided" });
  }

  const isTokenBlacklisted = await redis.get(token);

  if (isTokenBlacklisted) {
    return res
      .status(401)
      .json({ message: "Unauthorized: Token is blacklisted" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    req.user = decoded;
    next();
  } catch (error) {
    console.log(error.message);
    return res.status(401).json({ message: "Unauthorized: Invalid token" });
  }
}

export default identifyUser;