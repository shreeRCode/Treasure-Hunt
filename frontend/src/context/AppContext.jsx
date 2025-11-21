import { createContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";

// eslint-disable-next-line react-refresh/only-export-components
export const AppContext = createContext();

export const AppContextProvider = (props) => {
  const backendUrl =
    import.meta.env.VITE_BACKEND_URL || "http://localhost:5000";

  const [isLoggedin, setIsLoggedin] = useState(false);
  const [userData, setUserData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  // 🔥 FIX 1 — REMOVE axios.defaults.withCredentials
  // Everything must pass withCredentials manually

  const getAuthState = async () => {
    try {
      setIsLoading(true);
      const { data } = await axios.get(
        `${backendUrl}/api/auth/is-auth`,
        { withCredentials: true } // 🔥 FIX 2 — add this
      );

      if (data.success) {
        setIsLoggedin(true);
        await getUserData(); // fetch user info AFTER success
      } else {
        setIsLoggedin(false);
      }
    } catch (error) {
      console.error("Auth error:", error);
      setIsLoggedin(false);
    } finally {
      setIsLoading(false);
    }
  };

  const getUserData = async () => {
    try {
      const { data } = await axios.get(
        `${backendUrl}/api/user/data`,
        { withCredentials: true } // 🔥 FIX 3 — important
      );

      if (data.success) setUserData(data.userData);
      else setUserData(null);
    } catch (error) {
      console.error("User data error:", error);
      setUserData(null);
    }
  };

  // 🔥 FIX 4 — also send cookie on logout
  const logout = async () => {
    try {
      await axios.post(
        `${backendUrl}/api/auth/logout`,
        {},
        { withCredentials: true }
      );

      setIsLoggedin(false);
      setUserData(null);
      toast.success("Logged out successfully!");
      // eslint-disable-next-line no-unused-vars
    } catch (error) {
      toast.error("Logout failed");
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
