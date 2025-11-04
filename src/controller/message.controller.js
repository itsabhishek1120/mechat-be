import Message from "../model/message.model.js";
import Chat from "../model/chat.model.js";

export const sendMessage = async (req, res, next) => {
    console.log("sendMessage API..");
    try {
        const { reciever, content, chatId } = req.body;
        if(!reciever || !content ||!chatId ){
            res.status(400);
            res.message = "Params missing";
            next(res);
            return;
        }

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

        if(chat){
            chat.latestMessage = mssg._id;
            await chat.save();
        } else {
            res.status(400);
            res.message = "Chat not found";
            next(res);
            return;
        }
        
        res.status(200).json({ message: "Message sent", data: mssg });

    } catch (err) {
        res.status(500);
        res.message = err.message;
        next(res);
    }
    
}