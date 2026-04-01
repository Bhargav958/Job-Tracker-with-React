import { useState } from "react";
import { registerUser } from "../appwrite/auth";
import { useNavigate } from "react-router-dom";

function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleRegister = async () => {
    if (!email || !password) {
      alert("Please fill all fields");
      return;
    }
    try {
      await registerUser(email, password);
      navigate("/dashboard");  //used navigate instead of alert to redirect user to dashboard after successful registration
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <div className="dark:bg-gray-900 h-screen flex flex-col items-center justify-center gap-4">
      <input
        type="email"
        placeholder="Email"
        className="border p-2 rounded dark:bg-gray-700 dark:text-white dark:border-gray-600"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <input
        type="password"
        placeholder="Password"
        className="border p-2 rounded dark:bg-gray-700 dark:text-white dark:border-gray-600"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      <button
        onClick={handleRegister}
        className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded cursor-pointer"
      >
        Register
      </button>
    </div>
  );
}

export default Register;