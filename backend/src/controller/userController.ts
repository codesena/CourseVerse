import { User } from "../models/user";
import { Course } from "../models/course";
import jwt from "jsonwebtoken";
import mongoose, { Document } from "mongoose";
import { Request, Response } from "express";
import {
  signupSchema,
  loginSchema,
  courseIdSchema,
} from "@adityakumar172001/courselling_types";
const userSceret = "asdfgh";

export async function userSignup(req: Request, res: Response) {
  try {
    // Validate request body using signupSchema
    const parsed = signupSchema.safeParse(req.body);
    if (!parsed.success)
      return res.status(401).json({ message: "Unauthorized" });
    const { username, password } = parsed.data;

    // Check if user with the same username already exists
    const user = await User.findOne({ username });
    if (user) {
      return res.status(400).json({ message: "User already exists" });
    }

    // Create a new user
    const newUser = new User({ username, password });
    await newUser.save();
    res.json({ message: "User created successfully" });
  } catch (err) {
    res.status(400).json({ message: "Invalid data" });
  }
}

export async function userLogin(req: Request, res: Response) {
  try {
    // Validate request body using loginSchema
    const parsed = loginSchema.safeParse(req.body);
    if (!parsed.success)
      return res.status(401).json({ message: "Unauthorized" });
    const { username, password } = parsed.data;

    // Check user's credentials
    const user = await User.findOne({ username, password });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Create JWT token
    const payload = { username };
    const options = { expiresIn: "1h" };
    const token = jwt.sign(payload, userSceret, options);

    res.json({ message: "Logged in successfully", token });
  } catch (err) {
    res.status(500).json({ message: "Internal server error" });
  }
}

export async function getUserCourses(req: Request, res: Response) {
  try {
    const courses = await Course.find({ isPublished: true });
    res.json(courses);
  } catch (err) {
    res.status(500).json({ message: "Internal server error" });
  }
}

interface MyRequest extends Request {
  user?: {
    username: string;
    password: string;
    purchasedCourses: mongoose.Types.ObjectId[];
  } & Document;
}

export async function purchaseCourse(req: MyRequest, res: Response) {
  try {
    // Validate courseId from params
    const parsedCourseId = courseIdSchema.safeParse(req.params.courseId);
    if (!parsedCourseId.success)
      return res.status(400).json({ message: "Bad Request" });
    const courseId = parsedCourseId.data;

    // Check if course exists
    const course = await Course.findById(courseId);
    if (!course) return res.status(400).json({ message: "Invalid courseId" });
    const { user } = req;
    if (!user) return res.status(401).json({ msg: "user not found" });

    // Update user's purchasedCourses
    user.purchasedCourses.push(courseId as unknown as mongoose.Types.ObjectId);
    await user.save();

    res.json({ message: "Course purchased successfully" });
  } catch (err) {
    res.status(500).json({ message: "Internal server error" });
  }
}

export async function getPurchasedCourses(req: MyRequest, res: Response) {
  const { user } = req;
  try {
    if (!user) return res.status(401).json({ msg: "user not found" });
    await user.populate("purchasedCourses");
    res.json(user.purchasedCourses || []);
  } catch (err) {
    res.status(500).json({ message: "Internal server error" });
  }
}
