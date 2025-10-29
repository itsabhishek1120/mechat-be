import jwt from "jsonwebtoken";

const authMiddleware = (req, res, next) => {
  const token = req.header("Authorization")?.split(" ")[1];
  if (!token){
    res.status(401);
    res.message = "No token, authorization denied";
    next(res);
    return;
  } 

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded.userId;
    next();
  } catch (err) {
    res.status(401);
    res.message = "Token is not valid";
    next(res);
  }
};

export default authMiddleware;