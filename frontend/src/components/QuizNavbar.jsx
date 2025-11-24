import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../context/AppContext";

const QuizNavbar = () => {
  const navigate = useNavigate();
  const { logout } = useContext(AppContext);

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

        {/* LOGOUT BUTTON */}
        <button
          onClick={logout}
          className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded-lg font-semibold"
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default QuizNavbar;
