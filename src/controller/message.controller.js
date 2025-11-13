import mongoose from "mongoose";
import Message from "../model/message.model.js";
import Chat from "../model/chat.model.js";

export const sendMessage = async (req, res, next) => {
    console.log("sendMessage API..");
    const { reciever, content, chatId } = req.body;
    if(!reciever || !content ||!chatId ){
        res.status(400);
        res.message = "Params missing";
        next(res);
        return;
    }

    try {
            let mssg = await Message.create({
            sender: req.user._id,
            receiver: reciever,
            chat: chatId,
            content: content,
        });

        mssg = await mssg.populate("sender", "username");
        mssg = await mssg.populate("receiver", "username");
        mssg = await mssg.populate("chat");

        let chat = await Chat.findById(chatId);

        if(!chat){
            res.status(400);
            res.message = "Chat not found";
            next(res);
            return;
        }
        chat.latestMessage = mssg._id;
        await chat.save();
        console.log("chat:::",chat);
        

        // Emit the message in real-time
        if (global.io && chat?.users?.length > 0) {
            console.log("req.user._id::",req.user._id);
            chat.users.forEach((user) => {
                console.log("user in for::",user._id);
                
                if (user._id.toString() === req.user._id.toString()) return;
                global.io.to(user._id.toString()).emit("message received", mssg);
            });
        }
        
        res.status(200).json({ message: "Message sent", data: mssg });

    } catch (err) {
        res.status(500);
        res.message = err.message;
        next(res);
    }
    
}

export const getMessages = async (req, res, next) => {
    console.log("getMessages API..");
    const { chatId } = req?.params;
    console.log("req?.params>>",req?.params.chatId);
    console.log("rchatId",chatId);
    
    if(!chatId || !mongoose.Types.ObjectId.isValid(chatId)){
        res.status(400);
        res.message = "Params Missing or Invalid";
        next(res);
        return;
    }
    
    try {
        const messages = await Message.find({ chat: chatId })
        .populate("sender", "username")
        // .populate("receiver", "username")
        .populate("chat");

        if(!messages){
            res.status(400);
            res.message = "Messages not found";
            next(res);
            return;
        }

        res.status(200).json({ message: "Messages fetched", data: messages });

    } catch (err) {
        res.status(500);
        res.message = err.message;
        next(res);
    }
}