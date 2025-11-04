import express from "express";
import { sendMessage, getMessages } from "../controller/message.controller.js";

const mssgRouter = express.Router();

mssgRouter.route('/send').post(sendMessage);
mssgRouter.route('/get-messages/:chatId').get(getMessages);

export default mssgRouter;