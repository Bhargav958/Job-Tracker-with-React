import {useState} from "react"
import { loginUser } from "../appwrite/auth"
import { useNavigate } from "react-router-dom"

function Login() {
  //creating email,password variables
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const navigate = useNavigate();

  const handleLogin = async()=>{
    try {
      await loginUser(email,password)
      navigate('/dashboard')
    } catch (error) {
      alert(error.message)
    }
  }

  return (
    <div className="h-screen flex flex-col items-center justify-center gap-4">
      <input 
        type="email"
        placeholder="Email"
        className="border p-2"
        onChange={(e)=>setEmail(e.target.value)}
      />
      <input 
        type="password" 
        placeholder="Password"
        className="border p-2"
        onChange={(e)=>setPassword(e.target.value)}
      />

      <button onClick={handleLogin} className="bg-green-500 text-white px-4 py-2">
        Login
      </button>

      <p>
        Don't have an account? 
        <a href="/register" className="text-blue-500"> Register</a>
      </p>
    </div>
  )
}

export default Login
