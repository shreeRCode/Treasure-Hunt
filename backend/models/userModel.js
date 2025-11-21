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

// Use existing model if already compiled, else create new model
const User = mongoose.models.User || mongoose.model("User", userSchema);

export default User;
