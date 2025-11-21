import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { XCircle, CheckCircle } from 'lucide-react'; // Using Lucide icons for visual feedback

const QuizPage = () => {
  const { level } = useParams();
  const navigate = useNavigate();

  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState({}); // Stores { q_id: option_index }
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [loading, setLoading] = useState(true);
  const [feedback, setFeedback] = useState(null); // { type: 'success' | 'error', message: string }

  useEffect(() => {
    const fetchQuestions = async () => {
      setLoading(true);
      setFeedback(null);

      try {
        const res = await axios.get(
          `${import.meta.env.VITE_API_URL}/api/quiz/${level}`,
          { withCredentials: true }
        );

        // FIX: Correctly reading 'quizData' key from the backend response
        if (res.data.success) {
          setQuestions(res.data.quizData || []);
          setAnswers({});
        } else {
          setFeedback({ type: 'error', message: res.data.message || 'Failed to fetch quiz.' });
          setQuestions([]);
        }

      } catch (err) {
        console.error("Quiz fetch error:", err);
        setFeedback({ type: 'error', message: 'Could not connect to the server or authentication failed.' });
      } finally {
        setLoading(false);
      }
    };

    fetchQuestions();
  }, [level]);

  // Changed qid to use Mongoose default _id
  const handleSelect = (qid, idx) => {
    setAnswers({ ...answers, [qid]: idx });
  };

  const handleSubmit = async () => {
    setFeedback(null); // Clear previous feedback

    // Map state into the structure the backend submitQuiz function is designed to handle
    const answersArray = questions.map((q) => ({
      // Use q._id (the Mongoose ID)
      id: q._id, 
      // Get the actual selected option string using the index stored in 'answers'
      answer: q.options[answers[q._id]] || "", 
    }));

    try {
      setIsSubmitted(true); // Disable button immediately
      const res = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/quiz/${level}`,
        { answers: answersArray },
        { withCredentials: true }
      );

      if (res.data.passed) {
        setFeedback({ type: 'success', message: res.data.message || 'Quiz passed successfully!' });
      } else {
        // Replaced alert() with state update
        setFeedback({ type: 'error', message: res.data.message || "Some answers are incorrect. Try again!" });
        setIsSubmitted(false); // Re-enable submission on failure
      }
    } catch (err) {
      console.error("Quiz submit error:", err);
      setFeedback({ type: 'error', message: 'Failed to submit quiz. Check server connection.' });
      setIsSubmitted(false); // Re-enable submission on error
    }
  };

  // Navigation Effect
  useEffect(() => {
    // Only navigate if submitted AND passed (handled in handleSubmit), and the success message is set.
    if (feedback?.type === 'success') {
      const timer = setTimeout(() => {
        if (Number(level) >= 5) navigate("/treasure");
        else navigate("/map");
      }, 1500); // 1.5 second delay to show success

      return () => clearTimeout(timer);
    }
  }, [feedback, level, navigate]);


  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-blue-200 to-purple-400 text-white flex items-center justify-center">
        <p className="text-xl">Loading Level {level} Quiz...</p>
      </div>
    );
  }
  
  // Display error page if load failed and no questions were found
  if (questions.length === 0 && feedback?.type === 'error') {
    return (
      <div className="min-h-screen bg-gradient-to-b from-blue-200 to-purple-400 text-white flex flex-col items-center p-8">
        <h1 className="text-3xl font-bold mb-8">🧭 Level {level} Quiz</h1>
        <div className="bg-red-500/80 p-6 rounded-xl shadow-lg flex items-center space-x-3">
          <XCircle className="w-6 h-6"/>
          <p className="font-semibold">{feedback.message}</p>
        </div>
        <button 
          onClick={() => navigate("/map")} 
          className="mt-6 px-4 py-2 bg-blue-500 text-white rounded-xl hover:bg-blue-600 shadow-md"
        >
          Go Back to Map
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-200 to-purple-400 text-white flex flex-col items-center p-8">
      <h1 className="text-3xl font-bold mb-4">🧭 Level {level} Quiz</h1>
      
      {/* Feedback Message Area */}
      {feedback && (
        <div 
          className={`p-4 rounded-xl shadow-lg mb-6 w-full max-w-lg flex items-center space-x-3 transition-all duration-300 ${
            feedback.type === 'success' ? 'bg-green-500/80' : 'bg-red-500/80'
          }`}
        >
          {feedback.type === 'success' ? <CheckCircle className="w-6 h-6"/> : <XCircle className="w-6 h-6"/>}
          <p className="font-semibold">{feedback.message}</p>
        </div>
      )}

      <div className="bg-white/20 p-6 rounded-2xl shadow-md w-full max-w-lg">
        {questions.map((q, idx) => (
          // Using q._id for the key
          <div key={q._id} className="mb-4">
            <p className="font-semibold mb-2">
              {idx + 1}. {q.question}
            </p>
            {q.options.map((opt, i) => (
              <button
                key={i}
                // Using q._id for handleSelect
                onClick={() => handleSelect(q._id, i)}
                className={`block w-full text-left p-2 rounded-lg mb-2 transition-all duration-150 ${
                  // Checking against q._id
                  answers[q._id] === i ? "bg-green-400/70 shadow-inner scale-[1.01]" : "bg-white/20 hover:bg-white/30"
                }`}
              >
                {opt}
              </button>
            ))}
          </div>
        ))}

        <button
          onClick={handleSubmit}
          // Disable button while submission is in progress or if success feedback is shown
          disabled={isSubmitted || feedback?.type === 'success'}
          className="mt-6 px-6 py-2 bg-yellow-400 text-black font-semibold rounded-xl shadow-lg hover:bg-yellow-300 disabled:bg-gray-400 disabled:cursor-not-allowed transition"
        >
          {isSubmitted && feedback?.type !== 'success' ? "Checking Answers..." : "Submit"}
        </button>
      </div>
    </div>
  );
};

export default QuizPage;