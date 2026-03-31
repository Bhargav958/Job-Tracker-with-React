import { useState } from "react";
import { registerUser } from "../appwrite/auth";

function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleRegister = async () => {
    try {
      await registerUser(email, password);
      alert("Registered Successfully");
    } catch (error) {
      console.log(error);
      alert(error.message);
    }
  };

  return (
    <div className="h-screen flex flex-col items-center justify-center gap-4">
      <input
        type="email"
        placeholder="Email"
        className="border p-2"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <input
        type="password"
        placeholder="Password"
        className="border p-2"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      <button
        onClick={handleRegister}
        className="bg-blue-500 text-white px-4 py-2"
      >
        Register
      </button>
    </div>
  );
}

export default Register;