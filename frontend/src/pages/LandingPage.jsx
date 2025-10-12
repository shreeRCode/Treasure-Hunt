// src/pages/LandingPage.jsx
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
    <div className="landing-page min-h-screen bg-yellow-100 flex flex-col items-center justify-start p-6">
      {/* Header */}
      <header className="mt-12 text-center" data-aos="fade-down">
        <h1 className="text-5xl md:text-6xl font-extrabold text-yellow-900 mb-4">
          🏴‍☠️ Treasure Hunt Adventure
        </h1>
        <p className="text-lg md:text-xl text-yellow-800 max-w-2xl mx-auto">
          Embark on a thrilling quest to uncover hidden treasures, overcome
          challenges, and become the ultimate pirate champion!
        </p>
      </header>

      {/* Begin Hunt Button */}
      <div className="flex flex-col gap-6 mt-12" data-aos="fade-up">
        <button
          onClick={() => navigate("/login")} // always go to login
          className="bg-yellow-700 hover:bg-yellow-800 text-white font-bold py-3 px-8 rounded-lg shadow-lg transition transform hover:-translate-y-1"
        >
          Begin the Hunt
        </button>
      </div>

      {/* Decorative Pirate Section */}
      <section className="mt-16 flex flex-wrap justify-center gap-10">
        <img
          src="/assets/pirate-ship.jpg"
          alt="Pirate Ship"
          className="w-32 md:w-40 animate-bounce"
          data-aos="fade-right"
        />
        <img
          src="/assets/parrot.webp"
          alt="Parrot"
          className="w-20 md:w-24 animate-spin-slow"
          data-aos="fade-up"
        />
        <img
          src="/assets/treasure-chest.jpg"
          alt="Treasure Chest"
          className="w-28 md:w-32 animate-bounce"
          data-aos="fade-left"
        />
      </section>

      {/* About Section */}
      <section
        className="mt-20 max-w-3xl text-center text-yellow-900 px-4"
        data-aos="fade-up"
      >
        <h2 className="text-3xl font-bold mb-4">Why Play?</h2>
        <p className="text-lg md:text-xl">
          Solve riddles, follow the treasure map, and collect rewards along the
          way. Test your wit, strategy, and courage—every adventure is unique!
        </p>
      </section>

      {/* Footer */}
      <footer className="mt-20 text-yellow-900 text-sm mb-8 text-center">
        &copy; 2025 Treasure Hunt. All rights reserved.
      </footer>
    </div>
  );
};

export default LandingPage;
