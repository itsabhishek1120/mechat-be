import Chat from "../model/chat.model.js";
import User from "../model/user.model.js";

export const accessChat = async (req, res, next) => {
    console.log("accessChat API.."); 
    try {
        const { userId } = req.body;
        if(!userId){
            res.status(400);
            res.message = "userId Param is missing";
            next(res);
            return;
        }

        if(userId == req.user._id){
            res.status(400);
            res.message = "Cannot create a chat with yourself";
            next(res);
            return;
        }

        const existingChat = await Chat.findOne({
            isGroupChat: false,
            users: { $all: [req.user._id, userId] }
        })
        .populate("users", "-password")
        .populate("latestMessage");

        if(existingChat){
            console.log("existingChat:",existingChat);
            return res.status(200).json({ message: "Found existing chat", data: existingChat});
        }

        const newChat = await Chat.create({
            chatName : "sender",
            isGroupChat : false,
            users : [req.user._id, userId]
        })

        const fullChat = await Chat.findById(newChat._id).populate("users", "-password");
        console.log("fullChat:",fullChat);
        res.status(200).json({ message: "New chat created", data: fullChat});

    } catch (err) {
        res.status(500);
        res.message = err.message;
        next(res);
    }
}

export const fetchAllChats = async (req, res, next) => {
    console.log("fetchAllChats API..");
    try {
        const allChats = await Chat.find({
            users: { $elemMatch: { $eq: req.user._id } }
        })
        .populate("users", "_id username")
        .populate("latestMessage")
        .sort({ updatedAt: -1 });

        res.status(200).json({ message: `Fetched all chats of ${req.user.username}`, data: allChats });
        
    } catch (err) {
        res.status(500);
        res.message = err.message;
        next(res);
    }
}