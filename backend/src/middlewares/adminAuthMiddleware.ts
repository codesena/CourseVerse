import jwt from "jsonwebtoken";
import { Admin } from "../models/admin";
import { Request, Response, NextFunction } from "express";
const adminSecret = "qwerty";

export async function validateAdminCredentials(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    if (req.headers.authorization === undefined)
      return res.status(401).json({ message: "Unauthorized" });
    const token: string = req.headers.authorization.split(" ")[1];
    const credentials = jwt.verify(token, adminSecret);
    if (typeof credentials === "string")
      return res.status(401).json({ message: "Unauthorized" });
    const admin = await Admin.findOne({ username: credentials.username });
    if (admin === null)
      return res.status(401).json({ message: "Unauthorized" });
    next();
  } catch (err) {
    res.status(401).json({ message: "Unauthorized" });
  }
}
