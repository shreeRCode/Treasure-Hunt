import React, { useContext } from "react";
import { Routes, Route, Navigate } from "react-router-dom"; // Fixed: Added missing imports
import { ToastContainer } from "react-toastify"; // Fixed: Added import
import "react-toastify/dist/ReactToastify.css"; // Required for toasts styling

// Page components (Fixed: Added all missing imports - adjust paths if your folder structure differs)
import LandingPage from "./pages/LandingPage";
import LoginPage from "./pages/LoginPage";
import HomePage from "./pages/HomePage";
import MapPage from "./pages/MapPage";

// Stub ProfilePage (Fixed: Added missing /profile route)
const ProfilePage = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-blue-200 to-purple-400 p-6">
      <div className="text-center text-white">
        <h1 className="text-4xl font-bold mb-4">Profile</h1>
        <p>
          Coming soon! Your pirate profile will show progress, treasures, and
          more.
        </p>
      </div>
    </div>
  );
};

import { AppContext } from "./context/AppContext"; // Fixed: Path consistency

// Fixed: ProtectedRoute wrapper for dynamic auth checks
const ProtectedRoute = ({ children }) => {
  const { isLoggedin, isLoading } = useContext(AppContext);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        Loading...
      </div>
    );
  }

  return isLoggedin ? children : <Navigate to="/login" replace />;
};

const App = () => {
  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      <Routes>
        <Route path="/" element={<LandingPage />} />{" "}
        {/* Public: Always renders */}
        <Route path="/login" element={<LoginPage />} /> {/* Public */}
        {/* Fixed: Wrapped in ProtectedRoute for dynamic checks */}
        <Route
          path="/home"
          element={
            <ProtectedRoute>
              <HomePage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/map"
          element={
            <ProtectedRoute>
              <MapPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <ProfilePage />
            </ProtectedRoute>
          }
        />
        {/* Fixed: Added 404 fallback */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </>
  );
};

export default App;
