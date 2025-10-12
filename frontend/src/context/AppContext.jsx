import { createContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";

// eslint-disable-next-line react-refresh/only-export-components
export const AppContext = createContext();

export const AppContextProvider = (props) => {
  // Set Axios defaults once
  axios.defaults.withCredentials = true;
  const backendUrl =
    import.meta.env.VITE_BACKEND_URL || "http://localhost:5000"; // Fallback for dev

  const [isLoggedin, setIsLoggedin] = useState(false);
  const [userData, setUserData] = useState(null); // Fixed: null instead of false
  const [isLoading, setIsLoading] = useState(true); // Added: Global loading

  const getAuthState = async () => {
    try {
      setIsLoading(true);
      const { data } = await axios.get(`${backendUrl}/api/auth/is-auth`);
      if (data.success) {
        setIsLoggedin(true);
        getUserData();
      } else {
        setIsLoggedin(false);
      }
    } catch (error) {
      const errorMsg =
        error.response?.data?.message ||
        error.message ||
        "Authentication check failed";
      console.error("Auth error:", error); // Log for debugging
      toast.error(errorMsg);
      setIsLoggedin(false);
    } finally {
      setIsLoading(false);
    }
  };

  const getUserData = async () => {
    try {
      const { data } = await axios.get(`${backendUrl}/api/user/data`);
      if (data.success) {
        setUserData(data.userData);
      } else {
        toast.error(data.message || "Failed to fetch user data");
        setUserData(null);
      }
    } catch (error) {
      const errorMsg =
        error.response?.data?.message ||
        error.message ||
        "Failed to fetch user data";
      console.error("User data error:", error);
      toast.error(errorMsg);
      setUserData(null);
    }
  };

  // Added: Logout function
  const logout = async () => {
    try {
      await axios.post(`${backendUrl}/api/auth/logout`);
      setIsLoggedin(false);
      setUserData(null);
      toast.success("Logged out successfully!");
    } catch (error) {
      const errorMsg =
        error.response?.data?.message || error.message || "Logout failed";
      toast.error(errorMsg);
    }
  };

  useEffect(() => {
    getAuthState();
  }, []);

  const value = {
    backendUrl,
    isLoggedin,
    setIsLoggedin,
    userData,
    setUserData,
    isLoading,
    getUserData,
    logout,
  };

  return (
    <AppContext.Provider value={value}>{props.children}</AppContext.Provider>
  );
};
