import { useState } from "react";
import { loginUser } from "../appwrite/auth";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

import { toast } from "react-toastify";

import { Mail, Lock, Eye, EyeOff } from "lucide-react";

function Login() {
  //creating email,password variables
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  //create a load variable to show loading state
  const [loading, setLoading] = useState(false);

  //create a showpassword variable to toggle password visibility
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();

  const handleLogin = async () => {
    if (!email || !password) {
      //checking if user entered all fields or not
      toast.info("Please fill all fields");
      return;
    }
    setLoading(true);
    try {
      await loginUser(email, password);
      toast.success("Login successful ✅");
      navigate("/dashboard");
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
        <h2 className="text-2xl text-red-400 font-bold mb-6 text-center">Welcome Back 👋</h2>

        {/* Inputs */}
        {/* <input
          type="email"
          placeholder="Email"
          className="border p-2 rounded w-full mb-3 dark:bg-gray-700 dark:text-white dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
          onChange={(e) => setEmail(e.target.value)}
        /> */}
 
        <div className="relative mb-3">
          <Mail className="absolute left-3 top-2.5 text-gray-400" size={18} />         {/* Added icons for the inputs */}

          <input
            type="email"
            placeholder="Email"
            className="border pl-10 p-2 rounded w-full dark:bg-gray-700 dark:text-white dark:border-gray-600 focus:ring-2 focus:ring-blue-400"
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        {/* <input
          type="password"
          placeholder="Password"
          className="border p-2 rounded w-full mb-4 dark:bg-gray-700 dark:text-white dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
          onChange={(e) => setPassword(e.target.value)}
        /> */}
        <div className="relative mb-4">
          <Lock className="absolute left-3 top-2.5 text-gray-400" size={18} />

          <input
            type={showPassword? "text":"password"}
            placeholder="Password"
            className="border pl-10 p-2 rounded w-full dark:bg-gray-700 dark:text-white dark:border-gray-600 focus:ring-2 focus:ring-blue-400"
            onChange={(e) => setPassword(e.target.value)}
          />
          {/* Eye button */}
          <div
            className="absolute right-3 top-2.5 cursor-pointer text-gray-400 hover:text-gray-600 dark:hover:text-gray-200"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
          </div>
        </div>

        {/* Button */}
        <button
          onClick={handleLogin}
          className="bg-gradient-to-r from-indigo-500 to-purple-500 text-white w-full py-2 rounded cursor-pointer hover:scale-105 transition duration-200"
        >
          {loading ? "Logging in..." : "Login"}
        </button>

        {/* Footer */}
        <p className="text-sm text-center mt-4 text-gray-600 dark:text-gray-300">
          Don't have an account?{" "}
          <Link to="/register" className="text-blue-500 hover:underline">
            Register
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Login;
