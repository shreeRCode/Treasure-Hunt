import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    currentLevel: {
      type: Number,
      default: 1,
    },
    answeredQuestions: [
      {
        level: Number,
        questionId: String,
        isCorrect: Boolean,
      },
    ],
  },
  { timestamps: true }
);

export default mongoose.model("User", userSchema);
