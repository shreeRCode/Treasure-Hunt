import mongoose from "mongoose";
import dotenv from "dotenv";
import Quiz from "./models/quizModel.js";

dotenv.config();

const quizData = [
  {
    level: 1,
    question: "What is the capital of India?",
    options: ["Mumbai", "Delhi", "Chennai", "Kolkata"],
    correctAnswer: "Delhi",
  },
  {
    level: 1,
    question: "Which planet is known as the Red Planet?",
    options: ["Earth", "Mars", "Jupiter", "Saturn"],
    correctAnswer: "Mars",
  },
  {
    level: 2,
    question: "What is 5 × 3?",
    options: ["8", "10", "15", "20"],
    correctAnswer: "15",
  },
  {
    level: 2,
    question: "Which gas do plants absorb?",
    options: ["Oxygen", "Carbon Dioxide", "Nitrogen", "Helium"],
    correctAnswer: "Carbon Dioxide",
  },
  {
    level: 3,
    question: "Which is the largest ocean?",
    options: ["Indian", "Arctic", "Pacific", "Atlantic"],
    correctAnswer: "Pacific",
  }
];

async function seed() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("Connected to DB");

    await Quiz.deleteMany();
    console.log("Old questions removed");

    await Quiz.insertMany(quizData);
    console.log("New quiz inserted!");

    process.exit();
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
}

seed();
