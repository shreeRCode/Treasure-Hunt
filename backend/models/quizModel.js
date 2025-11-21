import mongoose from "mongoose";

const quizSchema = new mongoose.Schema({
  level: { type: Number, required: true },
  question: { type: String, required: true },
  options: { type: [String], required: true },
  correctAnswer: { type: String, required: true }
});

export default mongoose.model("Quiz", quizSchema);
