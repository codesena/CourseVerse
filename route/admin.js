import express from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import "dotenv/config";
import { AdminModel, CourseModel } from "../middleware/db.js";
import {
  adminSignupMiddleware,
  adminAuthMiddleware,
  adminSigninMiddleware,
} from "../middleware/middleware.js";

const adminRouter = express.Router();
const ADMIN_JWT_SECRET = process.env.ADMIN_JWT_SECRET;

if (!ADMIN_JWT_SECRET) {
  throw new Error(
    "Fatal Error: ADMIN_JWT_SECRET is not set in environment variables."
  );
}

// Admin signup
adminRouter.post("/signup", adminSignupMiddleware, async (req, res) => {
  try {
    const { username, password } = req.body;
    const hashed = await bcrypt.hash(password, 10);
    await AdminModel.create({ username, password: hashed });
    res.status(201).json({ msg: "Signup successful" });
  } catch (error) {
    res.status(500).json({ msg: "Server error", error: error.message });
  }
});

// Admin signin
adminRouter.post("/signin", adminSigninMiddleware, async (req, res) => {
  try {
    const adminId = req.adminId;
    const token = jwt.sign({ adminId }, ADMIN_JWT_SECRET, { expiresIn: "1h" });
    res.status(200).json({ msg: "Signin successful", token });
  } catch (error) {
    res.status(500).json({ msg: "Server error", error: error.message });
  }
});

// Create a course
adminRouter.post("/courses", adminAuthMiddleware, async (req, res) => {
  try {
    const adminId = req.adminId;
    let { title, price } = req.body;
    title = title?.trim();

    if (!title || typeof title !== "string" || title.length === 0) {
      return res
        .status(400)
        .json({ msg: "Title is required and must be a valid string." });
    }
    if (price === undefined || typeof price !== "number" || price < 0) {
      return res.status(400).json({ msg: "Price must be a positive number." });
    }

    const course = await CourseModel.create({ adminId, title, price });
    res.status(201).json({ msg: "Course created successfully", course });
  } catch (error) {
    res.status(500).json({ msg: "Server error", error: error.message });
  }
});

// Get all courses
adminRouter.get("/courses", adminAuthMiddleware, async (req, res) => {
  try {
    const courses = await CourseModel.find({ adminId: req.adminId });
    res.status(200).json({ courses });
  } catch (error) {
    res.status(500).json({ msg: "Server error", error: error.message });
  }
});

// Get a specific course
adminRouter.get("/courses/:courseId", adminAuthMiddleware, async (req, res) => {
  try {
    const course = await CourseModel.findOne({
      adminId: req.adminId,
      _id: req.params.courseId,
    });
    if (!course) {
      return res.status(404).json({ msg: "Course not found or unauthorized." });
    }
    res.status(200).json({ course });
  } catch (error) {
    res.status(500).json({ msg: "Server error", error: error.message });
  }
});

// Delete a course
adminRouter.delete(
  "/courses/:courseId",
  adminAuthMiddleware,
  async (req, res) => {
    try {
      const course = await CourseModel.findOneAndDelete({
        adminId: req.adminId,
        _id: req.params.courseId,
      });
      if (!course) {
        return res
          .status(404)
          .json({ msg: "Course not found or unauthorized." });
      }
      res.status(200).json({ msg: "Course deleted successfully" });
    } catch (error) {
      res.status(500).json({ msg: "Server error", error: error.message });
    }
  }
);

// Update a course
adminRouter.patch(
  "/courses/:courseId",
  adminAuthMiddleware,
  async (req, res) => {
    try {
      const { courseId } = req.params;
      const { price, title } = req.body;
      const course = await CourseModel.findOne({
        adminId: req.adminId,
        _id: courseId,
      });

      if (!course) {
        return res
          .status(404)
          .json({ msg: "Course not found or unauthorized." });
      }

      if (title !== undefined) {
        course.title = title.trim();
      }
      if (price !== undefined) {
        if (typeof price !== "number" || price < 0) {
          return res
            .status(400)
            .json({ msg: "Price must be a positive number." });
        }
        course.price = price;
      }

      await course.save();
      res.status(200).json({ msg: "Course updated successfully", course });
    } catch (error) {
      res.status(500).json({ msg: "Server error", error: error.message });
    }
  }
);

export default adminRouter;
