import express from "express";
import dotenv from "dotenv";
import User from "./src/model/user.model.js";
import { connectDB } from "./src/config/db.js"
import { errorHandler } from "./src/middleware/errorHandler.js";
import authRouter from "./src/routes/auth.routes.js";
import userRouter from "./src/routes/users.routes.js";
import authMiddleware from "./src/middleware/auth.middleware.js";

dotenv.config();
await connectDB();

const app = express();
const port = process.env.PORT || 3001;

app.use(express.json());

app.use('/auth',authRouter);
app.use('/user', authMiddleware, userRouter);
app.use(errorHandler);

app.get("/",async (req, res) => {
    console.log("API's Workingg..");
    res.status(200).json({Message : "API's Working"});
})

app.listen(port, () => {
    console.log(`MeChat Backend Server Running on PORT ${port}`);
});