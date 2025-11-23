import { useContext } from "react";
import { AppContext } from "../context/AppContext";
import { useNavigate } from "react-router-dom";
import QuizNavbar from "../components/QuizNavbar";

const HomePage = () => {
  const { userData } = useContext(AppContext);
  const navigate = useNavigate();

  return (
    <>
      {/* Full-width Navbar with no side space */}
      <QuizNavbar />

      {/* Content */}
      <div className="min-h-screen bg-gradient-to-b from-yellow-100 via-orange-200 to-red-300 p-6 relative overflow-hidden">
        {/* Pirate-themed background accents */}
        <div className="absolute top-0 left-0 w-48 h-48 bg-yellow-400 rounded-full opacity-20 rotate-12 -z-10"></div>
        <div className="absolute bottom-0 right-0 w-64 h-64 bg-orange-400 rounded-full opacity-25 -z-10"></div>

        {/* Greeting */}
        <h1 className="text-4xl md:text-5xl font-extrabold text-red-900 mb-10 drop-shadow-lg">
          Ahoy, {userData?.name || "Adventurer"}!
        </h1>
        <p className="text-lg md:text-xl text-red-800 mb-12 max-w-2xl">
          Set sail on your treasure hunt! Explore islands, solve riddles, and find
          hidden treasures across the map.
        </p>

        {/* Game Button */}
        <div className="flex flex-col gap-6 justify-center items-center">
          <button
            className="bg-orange-500 text-red-900 font-bold px-8 py-4 rounded-xl shadow-xl hover:bg-orange-600 hover:scale-105 transform transition"
            onClick={() => navigate("/quiz/1")}
          >
            New Adventure
          </button>
        </div>

        {/* Decorative elements */}
        <div className="absolute bottom-10 left-10 text-yellow-800 text-6xl opacity-20">
          🗺️
        </div>
        <div className="absolute top-20 right-20 text-red-900 text-6xl opacity-25">
          🏝️
        </div>
        <div className="absolute bottom-20 right-40 text-yellow-900 text-5xl opacity-20">
          💰
        </div>
      </div>
    </>
  );
};

export default HomePage;
