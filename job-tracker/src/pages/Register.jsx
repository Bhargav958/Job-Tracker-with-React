import { useState } from "react";
import { registerUser } from "../appwrite/auth";
import { useNavigate } from "react-router-dom";

import { toast } from "react-toastify";

import { Mail, Lock, Eye, EyeOff } from "lucide-react";

function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  const handleRegister = async () => {
    if (!email || !password) {
      toast.info("Please fill all fields");
      return;
    }
    setLoading(true);
    try {
      await registerUser(email, password);
      navigate("/dashboard"); //used navigate instead of alert to redirect user to dashboard after successful registration
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-950 via-gray-900 to-black px-4 py-8">
      <div className="bg-white/5 backdrop-blur-xl border border-white/10 p-6 sm:p-8 rounded-2xl shadow-lg w-full max-w-sm">
        {/* Title */}
        <h2 className="text-2xl text-blue-400 font-bold mb-6 text-center">
          Create Account ✨
        </h2>

        {/* Email */}
        {/* <input
          type="email"
          placeholder="Email"
          className="border p-2 rounded w-full mb-3 dark:bg-gray-700 dark:text-white dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-green-400"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        /> */}
        <div className="relative mb-3">
          <Mail className="absolute left-3 top-2.5 text-gray-400" size={18} />

          <input
            type="email"
            placeholder="Email"
            className="border pl-10 p-2 rounded w-full dark:bg-gray-700 dark:text-white dark:border-gray-600 focus:ring-2 focus:ring-green-400"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        {/* Password */}
        {/* <input
          type="password"
          placeholder="Password"
          className="border p-2 rounded w-full mb-4 dark:bg-gray-700 dark:text-white dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-green-400"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        /> */}
        <div className="relative mb-4">
          <Lock className="absolute left-3 top-2.5 text-gray-400" size={18} />

          <input
            type={showPassword? "text":"password"}
            placeholder="Password"
            className="border pl-10 p-2 rounded w-full dark:bg-gray-700 dark:text-white dark:border-gray-600 focus:ring-2 focus:ring-green-400"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <div
            className="absolute right-3 top-2.5 cursor-pointer text-gray-400 hover:text-gray-600 dark:hover:text-gray-200"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
          </div>
        </div>

        {/* Button */}
        <button
          onClick={handleRegister}
          className="bg-green-500 hover:bg-green-600 text-white w-full py-2 rounded cursor-pointer hover:scale-105 transition duration-200"
        >
          {loading ? "Creating account..." : "Register"}
        </button>

        {/* Footer */}
        <p className="text-sm text-center mt-4 text-gray-600 dark:text-gray-300">
          Already have an account?{" "}
          <span
            onClick={() => navigate("/login")}
            className="text-green-500 cursor-pointer hover:underline"
          >
            Login
          </span>
        </p>
      </div>
    </div>
  );
}

export default Register;
