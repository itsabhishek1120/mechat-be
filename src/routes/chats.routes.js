import express from "express";
import { accessChat, fetchAllChats } from "../controller/chat.controller.js";

const chatRouter = express.Router();

chatRouter.route('/access-chat').post(accessChat);
chatRouter.route('/fetch-all-chats').get(fetchAllChats);

export default chatRouter;