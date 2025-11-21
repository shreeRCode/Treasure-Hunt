import express from "express";
import userAuth from "../middleware/userAuth.js";
import { getQuiz, submitQuiz } from "../controllers/quizController.js";

const quizRouter = express.Router();

quizRouter.get("/:level", userAuth, getQuiz);
quizRouter.post("/:level", userAuth, submitQuiz);

export default quizRouter;