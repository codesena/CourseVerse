import { Admin } from "../models/admin";
import { Course } from "../models/course";
import jwt from "jsonwebtoken";
import { Request, Response } from "express";
import {
  signupSchema,
  loginSchema,
  courseSchema,
  courseIdSchema,
} from "@adityakumar172001/courselling_types";
const adminSceret = "qwerty";

export async function adminSignup(req: Request, res: Response) {
  try {
    // Validate request body using signupSchema
    const parsed = signupSchema.safeParse(req.body);
    if (!parsed.success)
      return res.status(401).json({ message: "Unauthorized" });
    const { username, password } = parsed.data;

    // Check if admin with the same username already exists
    const admin = await Admin.findOne({ username });
    if (admin) {
      return res.status(409).json({ message: "User already exists" });
    }

    // Create a new admin
    const newAdmin = new Admin({ username, password });
    await newAdmin.save();
    res.json({ message: "Admin created successfully" });
  } catch (err) {
    res.status(400).json({ message: "Invalid data" });
  }
}

export async function adminLogin(req: Request, res: Response) {
  try {
    // Validate request body using loginSchema
    const parsed = loginSchema.safeParse(req.body);
    if (!parsed.success)
      return res.status(401).json({ message: "Unauthorized" });
    const { username, password } = parsed.data;

    // Check admin's credentials
    const admin = await Admin.findOne({ username, password });
    if (!admin) {
      return res.status(404).json({ message: "User not found" });
    }

    // Create JWT token
    const payload = { username };
    const options = { expiresIn: "1h" };
    const token = jwt.sign(payload, adminSceret, options);

    res.json({ message: "Logged in successfully", token });
  } catch (err) {
    res.status(500).json({ message: "Internal server error" });
  }
}

export async function createCourse(req: Request, res: Response) {
  try {
    // Validate request body using courseSchema
    const parsed = courseSchema.safeParse(req.body);
    if (!parsed.success)
      return res.status(400).json({ message: "Invalid data" });
    const newCourse = new Course(parsed.data);
    // Save the new course
    await newCourse.save();
    res.json({
      message: "Course created successfully",
      courseId: newCourse._id,
    });
  } catch (err) {
    res.status(400).json({ message: "Invalid data" });
  }
}

export async function updateCourse(req: Request, res: Response) {
  try {
    // Validate courseId from params
    const parsedCourseId = courseIdSchema.safeParse(req.params.courseId);
    if (!parsedCourseId.success)
      return res.status(400).json({ message: "Bad Request" });
    const courseId = parsedCourseId.data;

    // Validate course data from body
    const parsedCourseData = courseSchema.safeParse(req.body);
    if (!parsedCourseData.success)
      return res.status(400).json({ message: "Invalid data" });

    // Update the course
    const course = await Course.findByIdAndUpdate(
      courseId,
      parsedCourseData.data,
      {
        new: true,
        runValidators: true,
      }
    );

    // Handle course not found
    if (!course) {
      return res.status(404).json({ message: "Course not found" });
    }

    res.json({ message: "Course updated successfully" });
  } catch (err) {
    res.status(400).json({ message: "Invalid data" });
  }
}

export async function getAllCourses(req: Request, res: Response) {
  try {
    const courses = await Course.find();
    res.json(courses);
  } catch (err) {
    res.status(500).json({ message: "Internal server error" });
  }
}

export async function deleteCourse(req: Request, res: Response) {
  try {
    // Validate courseId from params
    const parsedCourseId = courseIdSchema.safeParse(req.params.courseId);
    if (!parsedCourseId.success)
      return res.status(400).json({ message: "Bad Request" });
    const courseId = parsedCourseId.data;

    // Delete the course
    const courses = await Course.findByIdAndDelete(courseId);
    res.json({ message: "Course deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: "Internal server error" });
  }
}
