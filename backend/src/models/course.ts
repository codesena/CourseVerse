import mongoose from "mongoose";

const courseSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
    min: 300,
  },
  imageURL: {
    type: String,
    required: true,
  },
  isPublished: {
    type: Boolean,
    required: true,
  },
});

export const Course = mongoose.model("Course", courseSchema);
