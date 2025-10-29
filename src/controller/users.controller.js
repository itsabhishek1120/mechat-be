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