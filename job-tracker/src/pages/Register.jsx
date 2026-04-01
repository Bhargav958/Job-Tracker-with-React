import { useState } from "react";
import { registerUser } from "../appwrite/auth";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleRegister = async () => {
    if (!email || !password) {
      toast.info("Please fill all fields");
      return;
    }
    setLoading(true);
    try {
      await registerUser(email, password);
      const [loading, setLoading] = useState(false);
      navigate("/dashboard"); //used navigate instead of alert to redirect user to dashboard after successful registration
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
     }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900">
      <div className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow w-80">
        {/* Title */}
        <h2 className="text-2xl font-bold mb-6 text-center">
          Create Account ✨
        </h2>

        {/* Email */}
        <input
          type="email"
          placeholder="Email"
          className="border p-2 rounded w-full mb-3 dark:bg-gray-700 dark:text-white dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-green-400"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        {/* Password */}
        <input
          type="password"
          placeholder="Password"
          className="border p-2 rounded w-full mb-4 dark:bg-gray-700 dark:text-white dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-green-400"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

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
