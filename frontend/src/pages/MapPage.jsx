// src/pages/MapPage.jsx
import React, { useEffect } from "react";
import { motion } from "framer-motion";
import AOS from "aos";
import "aos/dist/aos.css";
import {
  FaSkullCrossbones,
  FaBoxOpen,
  FaParachuteBox,
  FaMapMarkedAlt,
  FaTree,
  FaFeatherAlt,
  FaShip,
  FaCrow,
  FaHatCowboy,
} from "react-icons/fa";

const MapPage = ({ onBack }) => {
  useEffect(() => {
    AOS.init({ duration: 1200, once: true });
  }, []);

  const levels = [
    { id: 1, cx: 80, cy: 80 },
    { id: 2, cx: 200, cy: 140 },
    { id: 3, cx: 280, cy: 220 },
    { id: 4, cx: 200, cy: 320 },
    { id: 5, cx: 120, cy: 400 },
  ];

  const decorations = [
    { icon: <FaTree className="text-green-700 text-4xl" />, style: { top: "10%", left: "5%" } },
    { icon: <FaTree className="text-green-800 text-5xl" />, style: { top: "70%", right: "5%" } },
    { icon: <FaShip className="text-blue-900 text-5xl" />, style: { bottom: "10%", right: "-2rem" } },
    { icon: <FaShip className="text-blue-800 text-6xl" />, style: { top: "10%", left: "-2rem" } },
    { icon: <FaCrow className="text-black text-3xl" />, style: { top: "5%", left: "50%" } },
    { icon: <FaCrow className="text-gray-800 text-2xl" />, style: { top: "20%", right: "20%" } },
    { icon: <FaParachuteBox className="text-blue-500 text-3xl" />, style: { top: "25%", right: "15%" } },
    { icon: <FaFeatherAlt className="text-blue-400 text-2xl rotate-12" />, style: { bottom: "25%", left: "30%" } },
    { icon: <FaMapMarkedAlt className="text-purple-700 text-3xl" />, style: { bottom: "10%", left: "50%" } },
  ];

  const pathD = "M 80 80 C 150 150, 250 100, 280 220 S 220 300, 120 400";

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-blue-400 via-yellow-200 to-blue-500 p-6 relative overflow-hidden">
      {/* Animated waves */}
      <motion.div
        className="absolute top-0 left-0 w-full h-20 bg-blue-300 opacity-60"
        animate={{ x: [0, 30, -30, 0] }}
        transition={{ repeat: Infinity, duration: 6 }}
      />
      <motion.div
        className="absolute bottom-0 left-0 w-full h-20 bg-blue-400 opacity-70"
        animate={{ x: [0, -30, 30, 0] }}
        transition={{ repeat: Infinity, duration: 8 }}
      />

      {/* Title */}
      <h1
        className="text-4xl font-extrabold mb-6 text-yellow-900 tracking-wide drop-shadow-lg z-10"
        data-aos="fade-down"
      >
        Pirate Treasure Hunt Map
      </h1>

      {/* Back Button */}
      <button
        onClick={onBack}
        className="mb-6 bg-yellow-700 hover:bg-yellow-800 text-white font-bold py-2 px-6 rounded-lg shadow-lg transition transform hover:-translate-y-1 z-10"
        data-aos="fade-up"
      >
        ⬅ Back to Landing Page
      </button>

      {/* Map Container */}
      <div className="relative w-full max-w-2xl h-[500px] bg-yellow-200 border-8 border-yellow-800 rounded-2xl shadow-2xl p-4 overflow-hidden z-10">
        {/* Island water edges */}
        <div className="absolute inset-y-0 left-0 w-20 bg-blue-500 opacity-70 rounded-r-full" />
        <div className="absolute inset-y-0 right-0 w-20 bg-blue-500 opacity-70 rounded-l-full" />

        {/* Treasure path */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none" aria-hidden>
          <path d={pathD} stroke="#6b3e0a" strokeWidth={3} strokeDasharray="8 8" fill="none" />
        </svg>

        {/* Levels */}
        {levels.map((lvl) => (
          <div key={lvl.id} className="absolute" style={{ left: lvl.cx - 20, top: lvl.cy - 20 }}>
            <motion.div
              whileHover={{ scale: 1.2, rotate: 5 }}
              className="flex flex-col items-center select-none cursor-pointer"
              role="button"
              aria-label={`Level ${lvl.id}`}
              tabIndex={0}
            >
              <div className="relative">
                <FaSkullCrossbones className="text-red-600 text-5xl drop-shadow-md" aria-hidden />
                <FaHatCowboy className="absolute -top-6 left-1 text-black text-2xl rotate-6" />
              </div>
              <span className="font-bold text-lg mt-1 bg-white px-2 rounded-full shadow">
                {lvl.id}
              </span>
            </motion.div>
          </div>
        ))}

        {/* Decorations */}
        {decorations.map((dec, idx) => (
          <div key={idx} className="absolute" style={dec.style}>
            {dec.icon}
          </div>
        ))}

        {/* Treasure chest */}
        <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2">
          <motion.button
            whileHover={{ scale: 1.3, rotate: 8 }}
            className="flex flex-col items-center focus:outline-none"
            aria-label="Treasure chest"
          >
            <FaBoxOpen
              className="text-yellow-700 text-6xl drop-shadow-lg animate-bounce"
              aria-hidden
            />
            <span className="font-bold text-lg mt-1 bg-yellow-100 px-3 py-1 rounded-full shadow-md">
              Treasure
            </span>
          </motion.button>
        </div>
      </div>
    </div>
  );
};

export default MapPage;
