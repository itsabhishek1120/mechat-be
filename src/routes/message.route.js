import express from "express";
import { sendMessage } from "../controller/message.controller.js";

const mssgRouter = express.Router();

mssgRouter.route('/send').post(sendMessage);

export default mssgRouter;