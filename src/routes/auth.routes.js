import express from "express";
import { login, register } from "../controller/auth.controller.js";

const authRouter = express.Router();

authRouter.route('/login').post(login);
authRouter.route('/register').post(register);

export default authRouter;