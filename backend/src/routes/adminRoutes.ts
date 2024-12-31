import express from "express";
const router = express.Router();
import {
  adminSignup,
  adminLogin,
  createCourse,
  updateCourse,
  getAllCourses,
  deleteCourse,
} from "../controller/adminController";
import { validateAdminCredentials } from "../middlewares/adminAuthMiddleware";

// Admin Signup
router.post("/signup", adminSignup);

// Admin Login
router.post("/login", adminLogin);

// Admin authentication middleware
router.use(validateAdminCredentials);

// Create A Course
router.post("/courses", createCourse);

// Update A Course
router.put("/courses/:courseId", updateCourse);

// Get All Courses
router.get("/courses", getAllCourses);

// Delete A Course
router.delete("/courses/:courseId", deleteCourse);

export default router;
