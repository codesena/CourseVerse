import { z } from "zod";
import { Types } from "mongoose";

export const signupSchema = z.object({
  username: z.string(),
  password: z.string(),
});
export type signupType = z.infer<typeof signupSchema>;

export const loginSchema = z.object({
  username: z.string(),
  password: z.string(),
});
export type loginType = z.infer<typeof loginSchema>;

export const courseIdSchema = z
  .string()
  .refine((val) => Types.ObjectId.isValid(val), {
    message: "Invalid ObjectId format",
  });
export type courseIdType = z.infer<typeof courseIdSchema>;

export const courseSchema = z.object({
  _id: courseIdSchema.optional(),
  title: z.string(),
  description: z.string(),
  price: z.union([z.number(), z.literal("")]),
  imageURL: z.string().url(),
  isPublished: z.boolean(),
});
export type courseType = z.infer<typeof courseSchema>;

export const userSchema = z.object({
  username: z.string(),
  password: z.string(),
  purchasedCourses: z.array(courseIdSchema),
});
export type userType = z.infer<typeof userSchema>;
