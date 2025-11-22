import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import AOS from "aos";
import "aos/dist/aos.css";

const LandingPage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    AOS.init({ duration: 1200, once: true });
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-yellow-100 to-yellow-200 flex flex-col items-center p-6">
      {/* Title Section */}
      <header className="mt-20 text-center" data-aos="fade-down">
        <h1 className="text-6xl md:text-7xl font-extrabold text-yellow-900 drop-shadow-lg tracking-wide">
          🏴‍☠️ Treasure Hunt
        </h1>
        <p className="text-lg md:text-xl text-yellow-800 mt-4 max-w-2xl mx-auto">
          Embark on a legendary pirate adventure. Solve clues. Unlock levels.
          Claim the treasure.
        </p>
      </header>

      {/* Animated Pirate Circle */}
      <div
        data-aos="zoom-in"
        className="relative mt-16 w-64 h-64 md:w-72 md:h-72 rounded-full bg-yellow-300 shadow-2xl border-8 border-yellow-800 flex items-center justify-center overflow-hidden"
      >
        <div className="absolute inset-0 bg-yellow-400 animate-pulse opacity-40 rounded-full"></div>

        <div className="relative text-yellow-900 text-5xl md:text-6xl font-black tracking-widest">
          ☠️
        </div>
      </div>

      {/* Button */}
      <div className="mt-16" data-aos="fade-up">
        <button
          onClick={() => navigate("/login")}
          className="bg-yellow-700 hover:bg-yellow-800 text-white font-bold py-3 px-10 text-xl rounded-xl shadow-xl transition transform hover:-translate-y-1 hover:scale-105"
        >
          Begin the Hunt
        </button>
      </div>

      {/* Features Section */}
      <section
        className="mt-20 max-w-3xl text-center text-yellow-900 px-4"
        data-aos="fade-up"
      >
        <h2 className="text-3xl font-bold mb-4">Your Pirate Journey Awaits</h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-yellow-900 mt-8">
          <div className="bg-yellow-200 p-6 rounded-xl shadow-lg hover:shadow-xl transition">
            <div className="text-3xl mb-2">🗺️</div>
            <h3 className="font-semibold text-lg">Follow the Map</h3>
            <p className="text-sm mt-1">
              Unlock levels and travel across the pirate's pathway.
            </p>
          </div>

          <div className="bg-yellow-200 p-6 rounded-xl shadow-lg hover:shadow-xl transition">
            <div className="text-3xl mb-2">🧩</div>
            <h3 className="font-semibold text-lg">Crack the Clues</h3>
            <p className="text-sm mt-1">
              Answer quiz challenges to move forward.
            </p>
          </div>

          <div className="bg-yellow-200 p-6 rounded-xl shadow-lg hover:shadow-xl transition">
            <div className="text-3xl mb-2">💎</div>
            <h3 className="font-semibold text-lg">Find the Treasure</h3>
            <p className="text-sm mt-1">
              Reach the final level and uncover riches!
            </p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="mt-20 text-yellow-900 text-sm mb-8 text-center">
        © 2025 Treasure Hunt. All rights reserved.
      </footer>
    </div>
  );
};

export default LandingPage;
