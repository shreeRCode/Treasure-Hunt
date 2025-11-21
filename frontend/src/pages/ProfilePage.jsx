import React, { useEffect, useState, useContext, createContext } from "react";
import axios from "axios";
import { User, Mail, Zap, CheckCircle, LogOut, Loader2, XCircle } from 'lucide-react';
import { useNavigate } from "react-router-dom";

// --- START: Mock AppContext for self-contained component ---
// NOTE: Since the real AppContext path failed to resolve, 
// we are mocking it to ensure the component compiles and runs.
// In your production app, remove this mock and ensure the correct path is used.
const MockAppContext = createContext({
    isLoggedin: true, // Assume logged in for profile view
    setIsLoading: () => console.log('Mock: Set Loading'),
    setIsLoggedin: () => console.log('Mock: Set Logged In'),
});
const AppContext = MockAppContext; 
// --- END: Mock AppContext ---


const ProfilePage = () => {
  const { isLoggedin, setIsLoading, setIsLoggedin } = useContext(AppContext);
  const navigate = useNavigate();

  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // --- Fetch User Data ---
  useEffect(() => {
    // If not logged in (e.g., navigated directly), redirect
    // NOTE: This check depends on the real AppContext being functional. Using the mock for now.
    // if (!isLoggedin && !loading) {
    //   navigate("/login");
    //   return;
    // }

    const fetchUserData = async () => {
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_API_URL}/api/user/data`,
          { withCredentials: true }
        );

        if (res.data.success) {
          setUserData(res.data.userData);
          setError(null);
        } else {
          setError(res.data.message || "Authentication failed. Please log in.");
          setIsLoggedin(false); // Force logout if auth fails
        }
      } catch (err) {
        console.error("Profile fetch error:", err);
        setError("Could not connect to the server or fetch data.");
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [isLoggedin, navigate, setIsLoading, setIsLoggedin, loading]);


  // --- Logout Handler ---
  const handleLogout = async () => {
    setIsLoading(true); // Show global loading state

    try {
      await axios.post(
        `${import.meta.env.VITE_API_URL}/api/auth/logout`,
        {},
        { withCredentials: true }
      );
    } catch (err) {
      console.error("Logout error (ignored):", err);
    } finally {
      // Clear local state and redirect regardless of server response
      setIsLoggedin(false);
      setUserData(null);
      setIsLoading(false);
      navigate("/login");
    }
  };

  // --- Loading State UI ---
  if (loading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-8">
        <Loader2 className="w-8 h-8 text-blue-500 animate-spin mb-4" />
        <p className="text-xl text-gray-600">Loading Profile Data...</p>
      </div>
    );
  }

  // --- Error State UI ---
  if (error || !userData) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-8">
        <div className="p-6 bg-white rounded-xl shadow-lg border border-red-300 max-w-sm text-center">
          <XCircle className="w-8 h-8 text-red-500 mx-auto mb-3" />
          <h2 className="text-xl font-bold text-red-700 mb-2">Error Loading Profile</h2>
          <p className="text-gray-600">{error || "User data is unavailable."}</p>
        </div>
      </div>
    );
  }

  // Calculate progress metrics
  const questionsAnsweredCount = userData.answeredQuestions ? userData.answeredQuestions.length : 0;
  const levelProgress = userData.currentLevel || 1; 
  
  // Example total quizzes (based on the fixed 5 levels in MapPage)
  const totalQuizzes = 5; 
  const progressPercentage = (levelProgress / totalQuizzes) * 100;
  // Use a reasonable max level value if progressPercentage exceeds 100%
  const clampedProgress = Math.min(100, progressPercentage);

  // --- Main Profile UI ---
  return (
    <div className="min-h-screen bg-gray-100 p-4 sm:p-8 flex justify-center items-start pt-16 font-sans">
      <div className="w-full max-w-2xl bg-white rounded-3xl shadow-2xl p-6 sm:p-10 border-t-8 border-indigo-500">
        
        {/* Header and Logout */}
        <div className="flex justify-between items-start mb-8 border-b pb-6">
          <div className="flex items-center space-x-4">
            <div className="w-16 h-16 bg-indigo-500 rounded-full flex items-center justify-center text-white text-3xl font-bold shadow-lg">
              {userData.name ? userData.name[0].toUpperCase() : 'U'}
            </div>
            <div>
              <h1 className="text-3xl font-extrabold text-gray-800">{userData.name || 'Treasure Hunter'}</h1>
              <p className="text-sm text-gray-500">Welcome back!</p>
            </div>
          </div>
          
          {/* Logout Button */}
          <button
            onClick={handleLogout}
            className="flex items-center space-x-1 px-4 py-2 bg-red-500 text-white rounded-xl shadow-md hover:bg-red-600 transition-colors text-sm font-medium"
          >
            <LogOut className="w-4 h-4" />
            <span>Logout</span>
          </button>
        </div>

        {/* Details Section */}
        <div className="space-y-4 border-b pb-6 mb-6">
          <h2 className="text-xl font-bold text-gray-800 mb-4">Account Information</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex items-center space-x-3 text-gray-700 p-3 bg-gray-50 rounded-lg">
              <Mail className="w-5 h-5 text-indigo-500" />
              <span className="font-medium">Email:</span>
              <span>{userData.email}</span>
            </div>
            <div className="flex items-center space-x-3 text-gray-700 p-3 bg-gray-50 rounded-lg">
              <User className="w-5 h-5 text-indigo-500" />
              <span className="font-medium">Type:</span>
              <span>Treasure Hunter</span>
            </div>
          </div>
        </div>

        {/* Progress Section */}
        <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center space-x-2">
          <Zap className="w-6 h-6 text-yellow-500" />
          Your Progress
        </h2>
        
        <div className="space-y-5">
          {/* Current Level */}
          <div className="p-4 bg-indigo-100 rounded-xl">
            <p className="text-lg font-semibold text-indigo-800 mb-1">Current Level: {levelProgress}</p>
            <p className="text-sm text-gray-700">You are currently tackling the challenges of Level {levelProgress}.</p>
          </div>

          {/* Questions Answered */}
          <div className="flex items-center space-x-3 text-gray-700 p-4 bg-green-100 rounded-xl">
            <CheckCircle className="w-6 h-6 text-green-600" />
            <span className="font-medium">Questions Answered Total:</span>
            <span className="text-lg font-bold text-green-800">{questionsAnsweredCount}</span>
          </div>

          {/* Overall Progress Bar */}
          <div>
            <p className="font-medium text-gray-700 mb-2">Overall Map Completion: {clampedProgress.toFixed(0)}%</p>
            <div className="w-full bg-gray-200 rounded-full h-3 shadow-inner">
              <div 
                className="bg-indigo-600 h-3 rounded-full transition-all duration-700" 
                style={{ width: `${clampedProgress}%` }}
              ></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;