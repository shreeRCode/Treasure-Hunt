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
import { motion as Motion } from "framer-motion";

const MapPage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    AOS.init({ duration: 1200, once: true });
  }, []);

  const levels = [
    { id: 1, cx: 80, cy: 80 },
    { id: 2, cx: 200, cy: 140 },
    { id: 3, cx: 280, cy: 220 },
  ];

  const decorations = [
    { icon: <FaTree className="text-green-700 text-4xl" />, style: { top: "8%", left: "6%" } },
    { icon: <FaTree className="text-green-800 text-5xl" />, style: { top: "65%", right: "5%" } },
    { icon: <FaShip className="text-blue-900 text-5xl" />, style: { bottom: "8%", right: "-2rem" } },
    { icon: <FaShip className="text-blue-800 text-6xl" />, style: { top: "8%", left: "-2rem" } },
    { icon: <FaCrow className="text-black text-3xl" />, style: { top: "5%", left: "50%" } },
    { icon: <FaCrow className="text-gray-800 text-2xl" />, style: { top: "20%", right: "20%" } },
    { icon: <FaParachuteBox className="text-blue-500 text-3xl" />, style: { top: "25%", right: "15%" } },
    { icon: <FaFeatherAlt className="text-blue-400 text-2xl rotate-12" />, style: { bottom: "25%", left: "30%" } },
    // removed separate FaMapMarkedAlt decoration to avoid overlap; location icon will be on the chest
  ];

  const pathD = "M 80 80 C 150 150, 250 100, 350 300";

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-blue-300 via-cyan-200 to-blue-500 p-6 relative overflow-hidden">

      {/* Soft waves overlays */}
      <Motion.div
        className="absolute top-0 left-0 w-full h-28 bg-blue-300 opacity-40 blur-md"
        animate={{ x: [0, 40, -40, 0] }}
        transition={{ repeat: Infinity, duration: 10 }}
      />
      <Motion.div
        className="absolute bottom-0 left-0 w-full h-28 bg-blue-400 opacity-40 blur-md"
        animate={{ x: [0, -40, 40, 0] }}
        transition={{ repeat: Infinity, duration: 12 }}
      />

      <h1 className="text-5xl font-extrabold mb-6 text-yellow-100 tracking-wider drop-shadow-[2px_3px_3px_rgba(0,0,0,0.7)] z-10">
        🌴 Pirate Treasure Island 🌊
      </h1>

      <button
        onClick={() => navigate("/")}
        className="mb-6 bg-yellow-600 hover:bg-yellow-700 text-white font-bold py-2 px-6 rounded-lg shadow-lg transition hover:scale-105 hover:-translate-y-1 z-10"
      >
        ⬅ Back to Landing Page
      </button>

      <div className="relative w-full max-w-2xl h-[500px] bg-[url('/assets/sand_texture.jpg')] bg-cover border-8 border-yellow-800 rounded-3xl shadow-[0_0_50px_rgba(0,0,0,.5)] p-4 overflow-hidden z-10">

        {/* 🌊 Real shoreline water on both sides */}
        <Motion.div
          className="absolute top-0 left-0 w-28 h-full overflow-hidden"
          animate={{ y: [0, -6, 0] }}
          transition={{ repeat: Infinity, duration: 3 }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-blue-700 via-blue-500 to-blue-300 opacity-70" />
          <Motion.div
            className="absolute top-0 left-0 w-full h-full border-r-[10px] border-white rounded-full opacity-90 blur-[1px]"
            animate={{ y: [0, 12, 0] }}
            transition={{ repeat: Infinity, duration: 2 }}
          />
        </Motion.div>

        <Motion.div
          className="absolute top-0 right-0 w-28 h-full overflow-hidden"
          animate={{ y: [0, -6, 0] }}
          transition={{ repeat: Infinity, duration: 3 }}
        >
          <div className="absolute inset-0 bg-gradient-to-l from-blue-700 via-blue-500 to-blue-300 opacity-70" />
          <Motion.div
            className="absolute top-0 right-0 w-full h-full border-l-[10px] border-white rounded-full opacity-90 blur-[1px]"
            animate={{ y: [0, 12, 0] }}
            transition={{ repeat: Infinity, duration: 2 }}
          />
        </Motion.div>

        {/* Rope Path */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none">
          <path d={pathD} stroke="#8b5a2b" strokeWidth={4} strokeDasharray="10 6" strokeLinecap="round" fill="none" />
        </svg>

        {/* Levels */}
        {levels.map((lvl) => (
          <div key={lvl.id} className="absolute" style={{ left: lvl.cx - 20, top: lvl.cy - 20 }}>
            <Motion.div
              whileHover={{ scale: 1.25, rotate: 5 }}
              className="flex flex-col items-center cursor-pointer select-none"
              onClick={() => navigate(`/quiz/${lvl.id}`)}
            >
              <div className="relative">
                <FaSkullCrossbones className="text-red-600 text-5xl drop-shadow-md" />
                <FaHatCowboy className="absolute -top-6 left-1 text-black text-2xl rotate-6" />
              </div>
              <span className="font-bold text-lg mt-1 bg-white/80 px-2 rounded-full shadow">{lvl.id}</span>
            </Motion.div>
          </div>
        ))}

        {/* Decorations */}
        {decorations.map((dec, idx) => (
          <Motion.div
            key={idx}
            className="absolute"
            style={dec.style}
            animate={{ y: [0, -3, 0] }}
            transition={{ repeat: Infinity, duration: 4, delay: idx * 0.3 }}
          >
            {dec.icon}
          </Motion.div>
        ))}

        {/* 💎 Treasure with strong glow + location icon on top + label below */}
        <div className="absolute top-[280px] left-[60%] -translate-x-1/2">
          <Motion.button whileHover={{ scale: 1.3, rotate: 6 }} className="relative flex flex-col items-center">

            {/* stronger glow layers */}
            <div className="absolute inset-0 -z-10 animate-[pulse_2.5s_infinite]">
              <div className="absolute inset-0 rounded-full bg-yellow-300 opacity-60 blur-[45px]" />
              <div className="absolute inset-0 rounded-full bg-yellow-200 opacity-70 blur-[65px]" />
            </div>

            {/* firefly particles */}
            <div className="absolute inset-0 -z-10 animate-[ping_5s_infinite]">
              {[...Array(8)].map((_, i) => (
                <div
                  key={i}
                  className="absolute bg-yellow-200 rounded-full"
                  style={{
                    width: 6,
                    height: 6,
                    top: `${Math.random() * 80}%`,
                    left: `${Math.random() * 80}%`,
                    opacity: 0.8,
                    filter: "blur(2px)",
                  }}
                />
              ))}
            </div>

            {/* Location icon placed visually on top of chest */}
            <FaMapMarkedAlt className="text-purple-700 text-3xl z-20 -mb-2 drop-shadow-lg" />

            {/* Chest icon */}
            <FaBoxOpen className="text-yellow-600 text-6xl drop-shadow-[0_0_30px_rgba(255,220,120,1)] animate-bounce z-10" />

            {/* Label moved below the icon so it doesn't overlap */}
            <span className="font-bold text-lg mt-3 bg-yellow-100 px-3 py-1 rounded-full shadow-md z-20">
              Treasure
            </span>
          </Motion.button>
        </div>
      </div>
    </div>
  );
};

export default MapPage;
