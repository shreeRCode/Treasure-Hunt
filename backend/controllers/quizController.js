import Quiz from "../models/quizModel.js";
import User from "../models/userModel.js";

// ====================== GET QUIZ ======================
export const getQuiz = async (req, res) => {
  const level = Number(req.params.level);

  if (!level || level <= 0) {
    return res.status(400).json({
      success: false,
      message: "Invalid level provided.",
    });
  }

  try {
    const quizzes = await Quiz.find({ level });

    if (!quizzes || quizzes.length === 0) {
      return res.status(200).json({
        success: false,
        message: `No quiz questions found for Level ${level}.`,
        quizData: [],
      });
    }

    return res.status(200).json({
      success: true,
      quizData: quizzes,
    });
  } catch (error) {
    console.error("Error fetching quiz:", error);
    return res.status(500).json({
      success: false,
      message: "Server error while fetching quiz.",
    });
  }
};

// ====================== SUBMIT QUIZ ======================
export const submitQuiz = async (req, res) => {
  const level = Number(req.params.level);
  const { answers } = req.body;
  const userId = req.user?.userId;

  if (!level || !Array.isArray(answers)) {
    return res.status(400).json({
      success: false,
      message: "Invalid level or answers.",
    });
  }

  try {
    // Fetch actual quiz questions
    const correctQuizzes = await Quiz.find({ level });

    if (correctQuizzes.length === 0) {
      return res.status(200).json({
        success: false,
        message: "No quiz questions exist for this level.",
      });
    }

    // Convert submitted answers → map for faster lookup
    const submittedMap = answers.reduce((acc, a) => {
      acc[a.id] = a.answer?.trim().toLowerCase();
      return acc;
    }, {});

    let score = 0;
    const totalQuestions = correctQuizzes.length;

    correctQuizzes.forEach((quiz) => {
      const submitted = submittedMap[quiz._id.toString()];
      const correct = quiz.correctAnswer.trim().toLowerCase();

      if (submitted && submitted === correct) {
        score++;
      }
    });

    const percentage = (score / totalQuestions) * 100;
    const passed = percentage >= 70;

    // Fetch user for progress update
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found.",
      });
    }

    // Prevent skipping levels
    if (passed && user.currentLevel === level) {
      await User.findByIdAndUpdate(userId, {
        $set: { currentLevel: level + 1 },
      });
    }

    return res.status(200).json({
      success: true,
      passed,
      score,
      message: passed
        ? `🎉 Level ${level} completed! Score: ${score}/${totalQuestions}`
        : `Score: ${score}/${totalQuestions}. You need 70% to pass. Try again!`,
    });
  } catch (error) {
    console.error("Error submitting quiz:", error);
    return res.status(500).json({
      success: false,
      message: "Server error while submitting quiz.",
    });
  }
};
