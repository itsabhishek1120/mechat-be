import express from "express";
import { fetchAllUsers, addContact } from "../controller/users.controller.js";

const userRouter = express.Router();

userRouter.route('/getUsers').get(fetchAllUsers);
userRouter.route('/addContact').post(addContact);

export default userRouter;