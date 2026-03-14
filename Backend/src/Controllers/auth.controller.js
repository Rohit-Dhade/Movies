import jwt from "jsonwebtoken";
import UserModel from "../models/User.model.js";
import bcrypt from "bcryptjs";
import redis from "../config/cache.js";

export const RegisterController = async (req, res) => {
  const { username, email, password } = req.body;
  const isAlreadyRegistered = await UserModel.findOne({
    $or: [{ email }, { username }],
  });

  if (isAlreadyRegistered) {
    return res.status(400).json({ message: "User already exists" });
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const newUser = await UserModel.create({
    username,
    email,
    password: hashedPassword,
  });

  const token = jwt.sign(
    { id: newUser._id, name: username },
    process.env.JWT_SECRET,
    { expiresIn: "1d" },
  );

  res.cookie("token", token);

  res.status(201).json({
    message: "User registered successfully",
    user: {
      username: newUser.username,
      email: newUser.email,
    },
  });
};

export const LoginController = async (req, res) => {
  const { email, password } = req.body;
  const user = await UserModel.findOne({ email }).select("+password");
  if (!user) {
    return res.status(400).json({ message: "Invalid credentials" });
  }

  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) {
    return res.status(400).json({ message: "Invalid credentials" });
  }

  const token = jwt.sign(
    { id: user._id, name: user.username },
    process.env.JWT_SECRET,
    { expiresIn: "1d" },
  );

  res.cookie("token", token);

  res.status(200).json({
    message: "User logged in successfully",
    user: {
      username: user.username,
      email: user.email,
    },
  });
};

export const LogoutController = async (req, res) => {
  const token = req.cookies.token;
  res.clearCookie("token");

  await redis.set(token, Date.now().toString(), "EX", 60 * 60);

  res.status(200).json({ message: "User logged out successfully" });
};

export const GetmeController = async (req, res) => {
  const userId = req.user.id;
  const user = await UserModel.findById(userId);

  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  res.status(200).json({
    message: "User details fetched successfully",
    user: {
      Id:user._id,
      username: user.username,
      email: user.email,
    },
  });
};

export default { RegisterController, LoginController, LogoutController , GetmeController };
