import React from "react";

const TreasurePage = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-yellow-200 to-orange-400 text-white">
      <h1 className="text-5xl font-bold mb-6">🏆 Congratulations!</h1>
      <p className="text-xl mb-4">
        You’ve found the treasure! You are now a certified Cyber Pirate! 🏴‍☠️
      </p>
      <img
        src="/treasure-chest.png"
        alt="Treasure Chest"
        className="w-64 animate-bounce"
      />
    </div>
  );
};

export default TreasurePage;
