import { Router } from "express";
import { PurchaseModel, UserModel } from "../middleware/db.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import "dotenv/config";
import {
  userAuthMiddleware,
  userSigninMiddleware,
  userSignupMiddleware,
} from "../middleware/middleware.js";

const USER_JWT_SECRET = process.env.USER_JWT_SECRET;
const userRouter = Router();

userRouter.post("/signup", userSignupMiddleware, async (req, res) => {
  try {
    const { username, password } = req.body;
    const hashed = await bcrypt.hash(password, 10);
    const userdata = { username, password: hashed };

    await UserModel.create(userdata);
    res.status(201).json({ msg: "Signup successful." });
  } catch (error) {
    res.status(500).json({ msg: "Signup failed.", error: error.message });
  }
});

userRouter.post("/signin", userSigninMiddleware, async (req, res) => {
  try {
    const userId = req.userId;
    const token = jwt.sign({ userId }, USER_JWT_SECRET, { expiresIn: "1h" });

    res.status(200).json({ msg: "Signin successful.", token });
  } catch (error) {
    res.status(500).json({ msg: "Signin failed.", error: error.message });
  }
});

userRouter.get("/courses", userAuthMiddleware, async (req, res) => {
  try {
    const userId = req.userId;
    const purchase = await PurchaseModel.findOne({ userId }).populate(
      "courses",
      "title"
    );

    if (!purchase || purchase.courses.length === 0) {
      return res.status(404).json({
        msg: "No purchased courses found. Please purchase a course first.",
      });
    }

    res.status(200).json({ courses: purchase.courses });
  } catch (error) {
    res.status(500).json({
      msg: "Failed to fetch purchased courses.",
      error: error.message,
    });
  }
});

export default userRouter;
