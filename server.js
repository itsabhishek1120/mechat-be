import express from "express";
import dotenv from "dotenv";
import http from "http";
import cors from "cors";
import { Server } from "socket.io"
import { connectDB } from "./src/config/db.js"
import { errorHandler } from "./src/middleware/errorHandler.js";
import authRouter from "./src/routes/auth.routes.js";
import userRouter from "./src/routes/users.routes.js";
import chatRouter from "./src/routes/chats.routes.js";
import mssgRouter from "./src/routes/message.route.js";
import authMiddleware from "./src/middleware/auth.middleware.js";

dotenv.config();
await connectDB();

const app = express();
const port = process.env.PORT || 3001;
app.use(
    cors({
      origin: (process.env.ENV == "dev") ? "http://localhost:4200" : process.env.FRONTEND_URL,
      credentials: true,
    })
  );
app.use(express.json());

app.use('/auth', authRouter);
app.use('/user', authMiddleware, userRouter);
app.use('/chat', authMiddleware, chatRouter);
app.use('/message', authMiddleware, mssgRouter);
app.get("/",async (req, res) => {
    console.log("API's Workingg..");
    res.status(200).json({Message : "API's Working"});
})

app.use(errorHandler);

const server = http.createServer(app);

const io = new Server(server, {
  pingTimeout: 60000, // disconnect idle clients after 60s
  cors: {
    origin: "*", // later restrict to your frontend origin (e.g. "http://localhost:4200")
  },
});

//For global access
global.io = io;

io.on("connection", (socket) => {
  console.log("⚡ New client connected:", socket.id);

  // Setup personal room for the user
  socket.on("setup", (userData) => {
    socket.join(userData.id);
    console.log(`User joined personal room: ${userData.id}`);
    socket.emit("connected");
  });

  // Join a specific chat room
  socket.on("join chat", (chatId) => {
    if (!chatId) return;
    socket.join(chatId);
    console.log(`User joined chat room: ${chatId}`);
  });

  // Typing indicator events
  socket.on("typing", (room) => socket.to(room).emit("typing"));
  socket.on("stop typing", (room) => socket.to(room).emit("stop typing"));

  // Handle disconnect
  socket.on("disconnect", () => {
    console.log("❌ User disconnected:", socket.id);
  });
});

server.listen(port, () => {
  console.log(`🚀 MeChat Backend Server Running on PORT ${port}`);
});