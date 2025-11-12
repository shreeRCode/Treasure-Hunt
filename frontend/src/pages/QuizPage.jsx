import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { AppContext } from "../context/AppContext";

const QuizPage = () => {
  const { level } = useParams();
  const navigate = useNavigate();
  const { token } = useContext(AppContext);
  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_API_URL}/api/quiz/${level}`,
          {
            headers: { Authorization: `Bearer ${token}` },
            withCredentials: true,
          }
        );
        setQuestions(res.data); // assuming backend returns questions array
        setAnswers({}); // reset answers on level change
      } catch (err) {
        console.error(err);
      }
    };
    if (token) fetchQuestions();
  }, [level, token]);

  const handleSelect = (qid, idx) => {
    setAnswers({ ...answers, [qid]: idx });
  };

  const handleSubmit = async () => {
    const answersArray = questions.map((q) => ({
      id: q.id,
      answer: q.options[answers[q.id]] || "",
    }));

    try {
      const res = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/quiz/${level}`,
        { answers: answersArray },
        { headers: { Authorization: `Bearer ${token}` }, withCredentials: true }
      );

      if (res.data.passed) {
        setIsSubmitted(true);
      } else {
        alert("Some answers are incorrect. Please try again.");
      }
    } catch (err) {
      console.error(err);
    }
  };

  if (isSubmitted) {
    if (Number(level) >= 5) navigate("/treasure");
    else navigate("/map");
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-200 to-purple-400 text-white flex flex-col items-center p-8">
      <h1 className="text-3xl font-bold mb-4">🧭 Level {level} Quiz</h1>
      <div className="bg-white/20 p-6 rounded-2xl shadow-md w-full max-w-lg">
        {questions.map((q, idx) => (
          <div key={q.id} className="mb-4">
            <p className="font-semibold mb-2">
              {idx + 1}. {q.question}
            </p>
            {q.options.map((opt, i) => (
              <button
                key={i}
                onClick={() => handleSelect(q.id, i)}
                className={`block w-full text-left p-2 rounded-lg mb-2 ${
                  answers[q.id] === i ? "bg-green-400/70" : "bg-white/20"
                }`}
              >
                {opt}
              </button>
            ))}
          </div>
        ))}

        <button
          onClick={handleSubmit}
          className="mt-6 px-6 py-2 bg-yellow-400 text-black font-semibold rounded-xl shadow-lg hover:bg-yellow-300"
        >
          Submit
        </button>
      </div>
    </div>
  );
};

export default QuizPage;
