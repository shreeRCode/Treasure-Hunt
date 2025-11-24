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
  },
  // LEVEL 3 — RIDDLE QUESTIONS
  {
    level: 3,
    question:
      "I speak without a mouth and hear without ears. I have no body, but I come alive with wind. What am I?",
    options: ["Shadow", "Echo", "Cloud", "Whistle"],
    correctAnswer: "Echo",
  },
  {
    level: 3,
    question: "The more of this there is, the less you see. What is it?",
    options: ["Fog", "Darkness", "Water", "Smoke"],
    correctAnswer: "Darkness",
  },
  {
    level: 3,
    question:
      "I have keys but no locks. I have space but no rooms. You can enter, but you can’t go outside. What am I?",
    options: ["Keyboard", "Map", "Treasure Chest", "Secret Cave"],
    correctAnswer: "Keyboard",
  },
];

async function seed() {
  try {
    console.log("Connecting to DB...");
    await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log("Removing old quiz...");
    await Quiz.deleteMany();

    console.log("Inserting new quiz data...");
    await Quiz.insertMany(quizData);

    console.log("Quiz seeded successfully!");
    process.exit(0);
  } catch (err) {
    console.error("SEEDING ERROR:", err);
    process.exit(1);
  } finally {
    mongoose.connection.close();
  }
}

seed();
