import { Router } from "express";
import { CourseModel, PurchaseModel } from "../middleware/db.js";
import { userAuthMiddleware } from "../middleware/middleware.js";

const courseRouter = Router();

// Get all available courses (no authentication required)
courseRouter.get("/", async (req, res) => {
  try {
    const courses = await CourseModel.find().populate(
      "adminId",
      "username -_id"
    );

    res.status(200).json({ courses });
  } catch (error) {
    res.status(500).json({
      msg: "An error occurred while fetching courses.",
      error: error.message,
    });
  }
});

// Purchase a course (requires authentication)
courseRouter.post(
  "/purchase/:courseId",
  userAuthMiddleware,
  async (req, res) => {
    try {
      const { courseId } = req.params;

      const userId = req.userId;

      if (!courseId) {
        return res.status(400).json({ error: "Course ID is required." });
      }

      const course = await CourseModel.findById(courseId);
      if (!course) {
        return res.status(404).json({ error: "Course not found." });
      }
      let purchase = await PurchaseModel.findOne({ userId });

      if (!purchase) {
        purchase = new PurchaseModel({ userId, courses: [courseId] });
      } else if (purchase.courses.includes(courseId)) {
        return res.status(400).json({ msg: "Course already purchased." });
      } else {
        purchase.courses.push(courseId);
      }

      await purchase.save();

      res.status(201).json({ msg: "Course purchased successfully." });
    } catch (error) {
      res.status(500).json({
        error: "An error occurred while purchasing the course.",
        details: error.message,
      });
    }
  }
);

export default courseRouter;
