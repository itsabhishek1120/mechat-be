import User from "../model/user.model.js";

export const fetchAllUsers = async (req, res, next) => {
    try {
        console.log("fetchAllUsers API..");
        const allUsers = await User.find({},'_id username email');
        console.log("allUsers>>",allUsers);
        res.status(200).json({
            message: "Fetched all Users",
            data: allUsers
        })
    } catch (err) {
        res.status(500);
        res.message = err?.message;
        next(res);
    }
    
}

export const addContact = async (req, res, next) => {
    try {
        console.log("addContact API..");
        const { userId, contactId } = req.body;
        if(userId == contactId){
            res.status(403);
            res.message = "Cannot add yourself";
            next(res);
            return;
        }
        // const contactObj = await User.findById(contactId);
        const user = await User.findById(userId);
        console.log("Userr::",user);
        
        if(user.contacts){
            const contacts = user.contacts;
            if(contacts.some(c => c.contactId.toString() === contactId)){
                res.status(403);
                res.message = "Contact already added";
                next(res);
                return;
            }
        }
        user.contacts.push({ contactId });
        console.log("user contacts>>",user);
        await user.save();
        res.status(200).json({ message: "Contact added successfully" });
    } catch (err) {
        res.status(500);
        res.message = err?.message;
        next(res);
    }
}