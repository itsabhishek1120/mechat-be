import jwt from "jsonwebtoken";
import User from "../model/user.model.js"

const authMiddleware = async (req, res, next) => {
  const token = req.header("Authorization")?.split(" ")[1];
  if (!token){
    res.status(401);
    res.message = "No token, authorization denied";
    next(res);
    return;
  } 

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await User.findById(decoded.id).select("-password");
    // console.log("req.user>>>",req.user);
    next();
  } catch (err) {
    res.status(401);
    res.message = "Token is not valid";
    next(res);
  }
};

export default authMiddleware;