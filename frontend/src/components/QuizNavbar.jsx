import React from "react";
import { useNavigate } from "react-router-dom";

const QuizNavbar = () => {
  const navigate = useNavigate();

  return (
    <div className="w-full bg-yellow-900 text-white py-4 px-6 flex justify-between items-center shadow-lg">
      {/* Logo */}
      <h1
        className="text-2xl font-bold cursor-pointer"
        onClick={() => navigate("/home")}
      >
        🏴‍☠️ Treasure Hunt
      </h1>

      {/* Right Buttons */}
      <div className="flex gap-4">
        <button
          onClick={() => navigate("/map")}
          className="bg-yellow-600 hover:bg-yellow-700 px-4 py-2 rounded-lg font-semibold"
        >
          Map
        </button>

        <button
          onClick={() => navigate("/home")}
          className="bg-yellow-600 hover:bg-yellow-700 px-4 py-2 rounded-lg font-semibold"
        >
          Home
        </button>
      </div>
    </div>
  );
};

export default QuizNavbar;
