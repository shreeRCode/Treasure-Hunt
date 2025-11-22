import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { XCircle, CheckCircle } from "lucide-react";
import QuizNavbar from "../components/QuizNavbar";

const QuizPage = () => {
  const { level } = useParams();
  const navigate = useNavigate();

  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState({});
  const [loading, setLoading] = useState(true);
  const [feedback, setFeedback] = useState(null);
  const [quizPassed, setQuizPassed] = useState(false);

  // ---------------- FETCH QUESTIONS ----------------
  useEffect(() => {
    const fetchQuestions = async () => {
      setLoading(true);
      setFeedback(null);
      setQuizPassed(false);

      try {
        const res = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/api/quiz/${level}`,
          { withCredentials: true }
        );

        if (res.data.success) {
          setQuestions(res.data.quizData || []);
          setAnswers({});
        } else {
          setFeedback({
            type: "error",
            message: res.data.message || "Failed to fetch quiz.",
          });
        }
      } catch (err) {
        console.error("Quiz fetch error:", err);
        setFeedback({
          type: "error",
          message: "Server unreachable. Try again later.",
        });
      } finally {
        setLoading(false);
      }
    };

    fetchQuestions();
  }, [level]);

  // ---------------- STORE SELECTED ANSWERS ----------------
  const handleSelect = (qid, idx) => {
    setAnswers((prev) => ({ ...prev, [qid]: idx }));
  };

  // ---------------- SUBMIT ANSWERS ----------------
  const handleSubmit = async () => {
    setFeedback(null);

    const answersArray = questions.map((q) => ({
      id: q._id,
      answer: q.options[answers[q._id]] || "",
    }));

    try {
      const res = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/quiz/${level}`,
        { answers: answersArray },
        { withCredentials: true }
      );

      if (res.data.passed) {
        setFeedback({
          type: "success",
          message: res.data.message || `Level ${level} completed!`,
        });
        setQuizPassed(true);
      } else {
        setFeedback({
          type: "error",
          message: res.data.message || "Incorrect answers. Try again!",
        });
      }
    } catch (err) {
      console.error("Quiz submit error:", err);
      setFeedback({
        type: "error",
        message: "Failed to submit quiz. Please try again.",
      });
    }
  };

  // ---------------- AUTO-NAVIGATION FOR LEVELS 1 & 2 ----------------
  useEffect(() => {
    if (!quizPassed) return;

    if (Number(level) === 3) return; // final level stops auto-navigation

    const timeout = setTimeout(() => {
      const nextLevel = Number(level) + 1;
      navigate(`/quiz/${nextLevel}`);
    }, 1500);

    return () => clearTimeout(timeout);
  }, [quizPassed, level, navigate]);

  // ---------------- LOADING ----------------
  if (loading) {
    return (
      <>
        <QuizNavbar />
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-blue-200 to-purple-400 text-white">
          <p className="text-xl">Loading Level {level} Quiz...</p>
        </div>
      </>
    );
  }

  // ---------------- ERROR ON LOAD ----------------
  if (questions.length === 0 && feedback?.type === "error") {
    return (
      <>
        <QuizNavbar />
        <div className="min-h-screen bg-gradient-to-b from-blue-200 to-purple-400 text-white flex flex-col items-center p-8">
          <h1 className="text-3xl font-bold mb-8">🧭 Level {level} Quiz</h1>

          <div className="bg-red-500/80 p-6 rounded-xl shadow-lg flex items-center space-x-3">
            <XCircle className="w-6 h-6" />
            <p className="font-semibold">{feedback.message}</p>
          </div>

          <button
            onClick={() => navigate("/map")}
            className="mt-6 px-4 py-2 bg-blue-500 text-white rounded-xl hover:bg-blue-600 shadow-md"
          >
            Go Back
          </button>
        </div>
      </>
    );
  }

  // ---------------- MAIN UI ----------------
  return (
    <>
      <QuizNavbar />

      <div className="min-h-screen bg-gradient-to-b from-blue-200 to-purple-400 text-white flex flex-col items-center p-8">
        <h1 className="text-3xl font-bold mb-4">🧭 Level {level} Quiz</h1>

        {/* Feedback */}
        {feedback && (
          <div
            className={`p-4 rounded-xl shadow-lg mb-6 w-full max-w-lg flex items-center space-x-3 ${
              feedback.type === "success" ? "bg-green-500/80" : "bg-red-500/80"
            }`}
          >
            {feedback.type === "success" ? (
              <CheckCircle className="w-6 h-6" />
            ) : (
              <XCircle className="w-6 h-6" />
            )}
            <p className="font-semibold">{feedback.message}</p>
          </div>
        )}

        {/* 🎉 FINAL LEVEL — BOUNCING TREASURE ANIMATION */}
        {quizPassed && Number(level) === 3 && (
          <div className="flex flex-col items-center bg-yellow-200 text-yellow-900 p-8 mt-6 mb-8 rounded-2xl shadow-xl max-w-lg">
            <div className="text-7xl animate-bounce mb-4">💰</div>
            <h2 className="text-3xl font-bold">You found the treasure!</h2>
            <p className="text-md mt-2 mb-4 font-semibold">
              Great job completing all levels!
            </p>

            <button
              onClick={() => navigate("/home")}
              className="bg-yellow-700 hover:bg-yellow-800 text-white px-6 py-3 rounded-lg font-semibold shadow-lg transition"
            >
              Return to Home
            </button>
          </div>
        )}

        {/* QUIZ QUESTIONS */}
        {!quizPassed && (
          <div className="bg-white/20 p-6 rounded-2xl shadow-md w-full max-w-lg">
            {questions.map((q, idx) => (
              <div key={q._id} className="mb-4">
                <p className="font-semibold mb-2">
                  {idx + 1}. {q.question}
                </p>

                {q.options.map((opt, i) => (
                  <button
                    key={i}
                    onClick={() => handleSelect(q._id, i)}
                    className={`block w-full text-left p-2 rounded-lg mb-2 transition-all ${
                      answers[q._id] === i
                        ? "bg-green-400/70 shadow-inner scale-[1.01]"
                        : "bg-white/20 hover:bg-white/30"
                    }`}
                  >
                    {opt}
                  </button>
                ))}
              </div>
            ))}

            <button
              onClick={handleSubmit}
              disabled={quizPassed}
              className="mt-6 px-6 py-2 bg-yellow-400 text-black font-semibold rounded-xl shadow-lg hover:bg-yellow-300 disabled:bg-gray-400 disabled:cursor-not-allowed"
            >
              Submit
            </button>
          </div>
        )}
      </div>
    </>
  );
};

export default QuizPage;
