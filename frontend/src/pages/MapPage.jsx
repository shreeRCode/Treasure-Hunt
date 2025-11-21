import React, { useEffect } from "react";
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
import { useNavigate } from "react-router-dom";
import { motion as Motion } from "framer-motion"; // Renamed import

const MapPage = () => {
  const navigate = useNavigate();

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
    {
      icon: <FaTree className="text-green-700 text-4xl" />,
      style: { top: "10%", left: "5%" },
    },
    {
      icon: <FaTree className="text-green-800 text-5xl" />,
      style: { top: "70%", right: "5%" },
    },
    {
      icon: <FaShip className="text-blue-900 text-5xl" />,
      style: { bottom: "10%", right: "-2rem" },
    },
    {
      icon: <FaShip className="text-blue-800 text-6xl" />,
      style: { top: "10%", left: "-2rem" },
    },
    {
      icon: <FaCrow className="text-black text-3xl" />,
      style: { top: "5%", left: "50%" },
    },
    {
      icon: <FaCrow className="text-gray-800 text-2xl" />,
      style: { top: "20%", right: "20%" },
    },
    {
      icon: <FaParachuteBox className="text-blue-500 text-3xl" />,
      style: { top: "25%", right: "15%" },
    },
    {
      icon: <FaFeatherAlt className="text-blue-400 text-2xl rotate-12" />,
      style: { bottom: "25%", left: "30%" },
    },
    {
      icon: <FaMapMarkedAlt className="text-purple-700 text-3xl" />,
      style: { bottom: "10%", left: "50%" },
    },
  ];

  const pathD = "M 80 80 C 150 150, 250 100, 280 220 S 220 300, 120 400";

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-blue-400 via-yellow-200 to-blue-500 p-6 relative overflow-hidden">
      {/* Animated Waves */}
      <Motion.div
        className="absolute top-0 left-0 w-full h-20 bg-blue-300 opacity-60"
        animate={{ x: [0, 30, -30, 0] }}
        transition={{ repeat: Infinity, duration: 6 }}
      />

      <Motion.div
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
        onClick={() => navigate("/")}
        className="mb-6 bg-yellow-700 hover:bg-yellow-800 text-white font-bold py-2 px-6 rounded-lg shadow-lg transition hover:-translate-y-1 z-10"
        data-aos="fade-up"
      >
        ⬅ Back to Landing Page
      </button>

      {/* Map Container */}
      <div className="relative w-full max-w-2xl h-[500px] bg-yellow-200 border-8 border-yellow-800 rounded-2xl shadow-2xl p-4 overflow-hidden z-10">
        {/* Water edges */}
        <div className="absolute inset-y-0 left-0 w-20 bg-blue-500 opacity-70 rounded-r-full" />
        <div className="absolute inset-y-0 right-0 w-20 bg-blue-500 opacity-70 rounded-l-full" />

        {/* Path */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none">
          <path
            d={pathD}
            stroke="#6b3e0a"
            strokeWidth={3}
            strokeDasharray="8 8"
            fill="none"
          />
        </svg>

        {/* Levels */}
        {levels.map((lvl) => (
          <div
            key={lvl.id}
            className="absolute"
            style={{ left: lvl.cx - 20, top: lvl.cy - 20 }}
          >
            <Motion.div
              whileHover={{ scale: 1.2, rotate: 5 }}
              className="flex flex-col items-center cursor-pointer select-none"
              onClick={() => navigate(`/quiz/${lvl.id}`)}
            >
              <div className="relative">
                <FaSkullCrossbones className="text-red-600 text-5xl drop-shadow-md" />
                <FaHatCowboy className="absolute -top-6 left-1 text-black text-2xl rotate-6" />
              </div>
              <span className="font-bold text-lg mt-1 bg-white px-2 rounded-full shadow">
                {lvl.id}
              </span>
            </Motion.div>
          </div>
        ))}

        {/* Decorations */}
        {decorations.map((dec, idx) => (
          <div key={idx} className="absolute" style={dec.style}>
            {dec.icon}
          </div>
        ))}

        {/* Treasure */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2">
          <Motion.button whileHover={{ scale: 1.3, rotate: 8 }}>
            <FaBoxOpen className="text-yellow-700 text-6xl drop-shadow-lg animate-bounce" />
            <span className="font-bold text-lg mt-1 bg-yellow-100 px-3 py-1 rounded-full shadow-md">
              Treasure
            </span>
          </Motion.button>
        </div>
      </div>
    </div>
  );
};

export default MapPage;
