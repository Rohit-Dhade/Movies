import express from 'express';
const AuthRouter = express.Router();
import {RegisterController, LoginController, LogoutController, GetmeController} from '../Controllers/auth.controller.js';

AuthRouter.post('/register', RegisterController);
AuthRouter.post('/login', LoginController);
AuthRouter.post('/logout', LogoutController);
AuthRouter.get('/profile', GetmeController);

export default AuthRouter;