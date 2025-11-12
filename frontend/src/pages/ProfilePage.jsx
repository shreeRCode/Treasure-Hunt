import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { AppContext } from "../context/AppContext";

const ProfilePage = () => {
  const { user, token } = useContext(AppContext);
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_API_URL}/api/user/data`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        setUserData(res.data.user);
      } catch (err) {
        console.error(err);
      }
    };
    fetchUser();
  }, [token]);

  if (!userData) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-blue-200 to-purple-400">
        <p className="text-white text-lg">Loading your pirate profile...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-200 to-purple-400 flex flex-col items-center p-8 text-white">
      <h1 className="text-4xl font-bold mb-6">🏴‍☠️ {userData.name}'s Profile</h1>

      <div className="bg-white/20 p-6 rounded-2xl shadow-lg w-full max-w-md">
        <p className="text-lg mb-2">
          <strong>Email:</strong> {userData.email}
        </p>
        <p className="text-lg mb-2">
          <strong>Current Level:</strong> {userData.currentLevel}
        </p>

        <h2 className="text-2xl mt-6 mb-3 font-semibold">Progress</h2>
        <ul className="space-y-2">
          {userData.answeredQuestions.map((q, i) => (
            <li
              key={i}
              className="bg-white/10 p-2 rounded-md flex justify-between"
            >
              <span>Level {q.level}</span>
              <span>{q.isCorrect ? "✅ Correct" : "❌ Wrong"}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default ProfilePage;
