import mongoose from "mongoose";

async function connectDB() {
  try {
    await mongoose.connect(process.env.MONGODB_URL as string, {});
  } catch (error) {
    console.error("Error in connecting to the database:", error);
  }
}

export default connectDB;
