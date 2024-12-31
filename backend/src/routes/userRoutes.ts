import express from "express";
const router = express.Router();
import {
  userSignup,
  userLogin,
  getUserCourses,
  purchaseCourse,
  getPurchasedCourses,
} from "../controller/userController";
import { validateUserCredentials } from "../middlewares/userAuthMiddleware";

router.post("/signup", userSignup);
router.post("/login", userLogin);

router.use(validateUserCredentials);

router.get("/courses", getUserCourses);
router.post("/courses/:courseId", purchaseCourse);
router.get("/purchasedCourses", getPurchasedCourses);

export default router;
