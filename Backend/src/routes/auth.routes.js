import express from "express";
const AuthRouter = express.Router();
import {
  RegisterController,
  LoginController,
  LogoutController,
  GetmeController,
} from "../Controllers/auth.controller.js";
import identifyUser from "../middlewares/auth.middleware.js";
import {
  loginValidation,
  registerValidation,
} from "../validation/auth.validator.js";

AuthRouter.post("/register", registerValidation, RegisterController);
AuthRouter.post("/login", loginValidation, LoginController);
AuthRouter.post("/logout", LogoutController);
AuthRouter.get("/get-me", identifyUser, GetmeController);

export default AuthRouter;
