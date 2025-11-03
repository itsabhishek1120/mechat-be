import express from "express";
import { accessChat } from "../controller/chat.controller.js";

const chatRouter = express.Router();

chatRouter.route('/access-chat').post(accessChat);

export default chatRouter;