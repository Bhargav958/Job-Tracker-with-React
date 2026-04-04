import { useNavigate, Link } from "react-router-dom";
import { account } from "../appwrite/config";
import { useState, useEffect } from "react";

function Navbar() {
    const [user, setUser] = useState(null);
    const navigate = useNavigate();

    const handleLogout = async()=>{
        try {
            await account.deleteSession('current');
            navigate('/login');
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(()=>{
        account.get()
            .then(setUser)
            .catch(()=>setUser(null))
    },[])

  return (
    <nav className="fixed top-0 left-0 w-full z-50 flex justify-between items-center gap-2 px-3 sm:px-6 py-3 sm:py-4 bg-white/5 backdrop-blur-lg border-b border-white/10">
      <Link
        to="/dashboard"
        className="text-base sm:text-xl font-bold truncate min-w-0 max-w-[55%] sm:max-w-none"
      >
        Job Tracker<span className="hidden sm:inline">👨‍💼</span>
      </Link>

      <div className="flex items-center gap-2 sm:gap-4 shrink-0">
        {user && (
          <span
            className="hidden sm:inline text-sm text-gray-300 truncate max-w-[140px] lg:max-w-xs"
            title={user.email}
          >
            {user.email}
          </span>
        )}

        <Link
          to="/dashboard"
          className="hidden sm:inline text-sm hover:text-indigo-400 transition"
        >
          Dashboard
        </Link>
        <button
          type="button"
          onClick={handleLogout}
          className="touch-manipulation bg-red-500 hover:bg-red-600 text-white text-sm px-3 py-1.5 sm:px-4 sm:py-2 rounded-lg cursor-pointer hover:scale-[1.02] transition duration-200"
        >
          Logout
        </button>
      </div>
    </nav>
  );
}

export default Navbar