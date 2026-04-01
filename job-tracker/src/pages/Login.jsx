import {useState} from "react"
import { loginUser } from "../appwrite/auth"
import { useNavigate } from "react-router-dom"
import { Link } from "react-router-dom";

function Login() {
  //creating email,password variables
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  //create a load variable to show loading state
  const [loading, setLoading] = useState(false)

  const navigate = useNavigate();

  const handleLogin = async()=>{
    if (!email || !password) {  //checking if user entered all fields or not
      alert("Please fill all fields");
      return;
    }
    setLoading(true)
    try {
      await loginUser(email,password)
      navigate('/dashboard')
    } catch (error) {
      alert(error.message)
    } finally{
      setLoading(false)
    }
  }

  return (
    <div className="dark:bg-gray-900 h-screen flex flex-col items-center justify-center gap-4">
      <input 
        type="email"
        placeholder="Email"
        className="border p-2 rounded dark:bg-gray-700 dark:text-white dark:border-gray-600"
        onChange={(e)=>setEmail(e.target.value)}
      />
      <input 
        type="password" 
        placeholder="Password"
        className="border p-2 rounded dark:bg-gray-700 dark:text-white dark:border-gray-600"
        onChange={(e)=>setPassword(e.target.value)}
      />

      <button onClick={handleLogin} className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded cursor-pointer">
        {loading ? "Logging in..." : "Login"}
      </button>

      <p className="text-white">
        Don't have an account? 
        {/* instead if full page relod we use Link to avoid it */}
        {/* <a href="/register" className="text-blue-500"> Register</a>  */}
        <Link to="/register" className="text-blue-400">Register</Link>
      </p>
    </div>
  )
}

export default Login
