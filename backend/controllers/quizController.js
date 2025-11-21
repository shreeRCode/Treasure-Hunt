// --- CRITICAL FIX: The path must be '../models/...' to go up one directory ---
import Quiz from "../models/quizModel.js"; 
import User from "../models/userModel.js"; 

// --- The function to fetch quiz questions from the database ---
export const getQuiz = async (req, res) => {
  // 1. Get the level number from the URL parameter and parse it.
  const level = parseInt(req.params.level);

  if (isNaN(level) || level <= 0) {
    return res.status(400).json({ success: false, message: "Invalid level ID provided." });
  }

  try {
    // 2. Query the database using the Mongoose model
    const quizzes = await Quiz.find({ level: level });
    
    // 3. Handle case where no questions are found for that level
    if (quizzes.length === 0) {
      // Returning 200/false to allow front-end to show the 'No questions' message without an error crash.
      return res.status(200).json({
        success: false, 
        message: `No quiz questions found for Level ${level}.`,
        quizData: []
      });
    }

    // 4. Success: Send the fetched quiz data back to the client
    return res.status(200).json({
      success: true,
      quizData: quizzes, // This uses the correct key expected by QuizPage.jsx
    });
    
  } catch (error) {
    // 5. Catch actual database connection or query errors
    console.error(`CRITICAL ERROR fetching quiz for Level ${level}:`, error.message);
    return res.status(500).json({ success: false, message: "Server error while fetching quiz." }); 
  }
};

// --- Function to submit quiz answers (uses database data for scoring) ---
export const submitQuiz = async (req, res) => {
  const level = parseInt(req.params.level);
  const { answers } = req.body; 
  const userId = req.user.userId;

  if (isNaN(level) || !Array.isArray(answers)) {
    return res.status(400).json({ success: false, message: "Missing level or invalid answers structure." });
  }

  try {
    const correctQuizzes = await Quiz.find({ level: level });
    
    // Map the incoming answers array to an object for quick lookup: { questionId: submittedAnswer }
    const submittedAnswersMap = answers.reduce((acc, current) => {
        // Front-end sends the Mongoose _id as 'id'
        acc[current.id] = current.answer; 
        return acc;
    }, {});
    
    let score = 0;
    let totalQuestions = correctQuizzes.length;
    let isLevelComplete = false;

    // Scoring Logic
    correctQuizzes.forEach(quiz => {
      // Use quiz._id (Mongoose default ID field) to look up the submitted answer
      const submittedAnswer = submittedAnswersMap[quiz._id.toString()]; 
      
      if (submittedAnswer && submittedAnswer === quiz.correctAnswer) {
        score++;
      }
    });

    const percentage = totalQuestions > 0 ? (score / totalQuestions) * 100 : 0;

    if (percentage >= 70) { 
        isLevelComplete = true;
        // Logic to update user's progress to the next level
        await User.findByIdAndUpdate(userId, { $set: { currentLevel: level + 1 } });
    }

    return res.status(200).json({
      success: true,
      message: isLevelComplete 
        ? `Congratulations! Level ${level} complete. Score: ${score}/${totalQuestions}` 
        : `Score: ${score}/${totalQuestions}. You need 70% to pass. Try again!`,
      score: score,
      passed: isLevelComplete
    });

  } catch (error) {
    console.error("Error submitting quiz:", error.message);
    return res.status(500).json({ success: false, message: "Server error while submitting quiz." });
  }
};