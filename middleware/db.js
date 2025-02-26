import mongoose, { Schema, model } from "mongoose";
import "dotenv/config";

const MONGO_URI = process.env.MONGO_URI;

const UserSchema = new Schema({
  username: { type: String, required: true },
  password: { type: String, required: true },
});

const AdminSchema = new Schema({
  username: { type: String, required: true },
  password: { type: String, required: true },
  superadmin: { type: Boolean, default: false },
});

const CourseSchema = new Schema({
  adminId: { type: mongoose.Types.ObjectId, ref: "admins" },
  title: { type: String, required: true },
  date: { type: Date, default: Date.now },
  price: { type: Number, default: 99 },
});

const PurchaseSchema = new Schema({
  userId: { type: mongoose.Types.ObjectId, ref: "users", required: true },
  courses: [{ type: mongoose.Types.ObjectId, ref: "courses", required: true }],
});


const UserModel = model("users", UserSchema);
const CourseModel = model("courses", CourseSchema);
const PurchaseModel = model("purchases", PurchaseSchema);
const AdminModel = model("admins", AdminSchema);

async function connectDB() {
  try {
    await mongoose.connect(MONGO_URI);
    console.log("DB connected");
  } catch (error) {
    console.log(error);
  }
}

export { UserModel, CourseModel, PurchaseModel, AdminModel, connectDB };
