import express from "express";
import { fetchAllUsers, addContact, getCurrentUser } from "../controller/users.controller.js";

const userRouter = express.Router();

userRouter.route('/get-users').get(fetchAllUsers);
userRouter.route('/current-user').get(getCurrentUser);
userRouter.route('/add-contact').post(addContact);

export default userRouter;