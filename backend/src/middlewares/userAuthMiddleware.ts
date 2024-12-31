import jwt from "jsonwebtoken";
import mongoose, { Document } from "mongoose";
import { User } from "../models/user";
import { Request, Response, NextFunction } from "express";
const userSecret = "asdfgh";

interface MyRequest extends Request {
  user?: {
    username: string;
    password: string;
    purchasedCourses: mongoose.Types.ObjectId[];
  } & Document;
}

export async function validateUserCredentials(
  req: MyRequest,
  res: Response,
  next: NextFunction
) {
  try {
    if (req.headers.authorization === undefined)
      return res.status(401).json({ message: "Unauthorized" });
    const token = req.headers.authorization.split(" ")[1];
    const credentials = jwt.verify(token, userSecret);
    if (typeof credentials === "string")
      return res.status(401).json({ message: "Unauthorized" });
    const user = await User.findOne({ username: credentials.username });
    if (user === null) return res.status(401).json({ message: "Unauthorized" });
    req.user = user;
    next();
  } catch (err) {
    res.status(401).json({ message: "Unauthorized" });
  }
}
