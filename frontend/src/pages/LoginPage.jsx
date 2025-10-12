import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../context/AppContext";
import axios from "axios";
import { toast } from "react-toastify";

const LoginPage = () => {
  const navigate = useNavigate();
  const { backendUrl, setIsLoggedin, getUserData } = useContext(AppContext);

  const [state, setState] = useState("Sign Up"); // Sign Up / Login
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    axios.defaults.withCredentials = true;

    try {
      if (state === "Sign Up") {
        const { data } = await axios.post(backendUrl + "/api/auth/register", {
          name,
          email,
          password,
        });

        if (data.success) {
          setIsLoggedin(true);
          getUserData();
          toast.success("Successfully signed up!");
          navigate("/home");
        } else toast.error(data.message);
      } else {
        const { data } = await axios.post(backendUrl + "/api/auth/login", {
          email,
          password,
        });

        if (data.success) {
          setIsLoggedin(true);
          getUserData();
          toast.success("Successfully logged in!");
          navigate("/home");
        } else toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen px-6 sm:px-0 bg-gradient-to-br from-blue-200 to-purple-400">
      <div className="bg-slate-900 p-10 rounded-lg shadow-lg w-full sm:w-96 text-indigo-300 text-sm text-center">
        <h2 className="text-3xl font-semibold text-white mb-3">
          {state === "Sign Up" ? "Create Account" : "Login"}
        </h2>
        <p className="text-sm mb-6">
          {state === "Sign Up"
            ? "Create your account"
            : "Login to your account!"}
        </p>

        <form onSubmit={onSubmitHandler} className="w-full">
          {/* Full Name (Sign Up only) */}
          {state === "Sign Up" && (
            <div className="mb-4 w-full px-5 py-2.5 rounded-full bg-[#333A5C]">
              <input
                type="text"
                placeholder="Full Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full bg-transparent outline-none text-white"
                required
              />
            </div>
          )}

          {/* Email */}
          <div className="mb-4 w-full px-5 py-2.5 rounded-full bg-[#333A5C]">
            <input
              type="email"
              placeholder="Email ID"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-transparent outline-none text-white"
              required
            />
          </div>

          {/* Password */}
          <div className="mb-4 w-full px-5 py-2.5 rounded-full bg-[#333A5C]">
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-transparent outline-none text-white"
              required
            />
          </div>

          {/* Submit Button */}
          <button className="w-full py-2.5 rounded-full bg-gradient-to-r from-indigo-500 to-indigo-900 text-white font-medium">
            {state}
          </button>
        </form>

        {/* Toggle Login / Sign Up */}
        {state === "Sign Up" ? (
          <p className="text-gray-400 text-xs mt-4">
            Already have an account?{" "}
            <span
              onClick={() => setState("Login")}
              className="text-blue-400 cursor-pointer underline"
            >
              Login here
            </span>
          </p>
        ) : (
          <p className="text-gray-400 text-xs mt-4">
            Don’t have an account?{" "}
            <span
              onClick={() => setState("Sign Up")}
              className="text-blue-400 cursor-pointer underline"
            >
              Sign up
            </span>
          </p>
        )}
      </div>
    </div>
  );
};

export default LoginPage;
