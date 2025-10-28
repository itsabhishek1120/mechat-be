import User from "../model/user.model.js"
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";


export const login = async (req, res, next) => {
  try {
    console.log("login api!!");
    const { identifier, password } = req.body;
    console.log("body:",JSON.stringify(req.body));
    const user = await User.findOne({ 
      $or: [{ username: identifier }, { email: identifier }]
    });
    if(!user){
      res.status(400);
      res.message = "Invalid username/email or password";
      next(res);
      return;
    }
    console.log("userr>>",user);
    const match = await bcrypt.compare(password, user.password);
    if(!match){
      res.status(400);
      res.message = "Invalid username/email or password";
      next(res);
      return;
    }
    const token = generateToken(user._id);
    console.log("token>>",token);
    res.status(200).json({ 
      message: "Login successful",
      user: { id: user._id, username: user.username },
      token: token
    });
  } catch (err) {
    res.status(500);
      res.message = err?.message;
      next(res);
  }

}

export const register = async (req, res, next) => {
  try {
    console.log("register api!!",req.body);
    const { username, email, password } = req.body;
    if(!username || !email || !password){
        res.status(400);
        res.message = "Required fields missing";
        next(res);
        return;
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    console.log("hashedPassword::",hashedPassword);
    const checkUser = await User.findOne({ 
      $or: [{ username: username }, { email: email }]
     });
    if(checkUser){
      res.status(403);
        res.message = "User Alreaady Exists";
        next(res);
        return;
    }
    const user = await User.create({ username: username, email: email, password: hashedPassword });
    const token = generateToken(user._id);
    console.log("token>>",token);
    res.status(200).json({
      message: "User created successfully",
      user: { id: user._id, username: user.username },
      token: token
    });
  } catch (err) {
    res.status(500);
      res.message = err?.message;
      next(res);
  }
    
}

const generateToken = (userId) => {
  return jwt.sign({ id: userId }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN || "1d",
  });
};