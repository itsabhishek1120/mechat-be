import express from "express";
import { fetchAllUsers } from "../controller/users.controller.js";

const userRouter = express.Router();

userRouter.route('/getUsers').get(fetchAllUsers);

export default userRouter;