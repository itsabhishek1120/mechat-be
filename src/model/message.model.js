import mongoose from "mongoose";

const messageSchema = new mongoose.Schema({
  sender: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  receiver: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  chat: {type: mongoose.Schema.Types.ObjectId, ref: "Chat", required: true },
  content: { type: String , trim: true, required: true },
  isRead: { type: Boolean, default: false },
  readBy: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
},{
    timestamps: true,
    versionKey: false
});

const Message = mongoose.model("Message", messageSchema);
export default Message;