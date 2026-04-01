import { useNavigate, Link } from "react-router-dom";
import { account } from '../appwrite/config'
import { useState, useEffect, use } from "react";

function  Navbar(){
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

    return(
        <nav className="flex justify-between items-center px-6 py-4 bg-white dark:bg-gray-800 shadow">
            <Link to='/dashboard' className="text-xl font-bold">
                Job Tracker👨‍💼
            </Link>

            <div className="flex items-center gap-4">
                {user && (
                    <span className="text-sm text-gray-600 dark:text-gray-300">
                    {user.email}
                    </span>
                )}

                <Link to='/dashboard' className="hover:text-blue-500">
                    Dashboard
                </Link>
                <button onClick={handleLogout} className="bg-red-500 text-white px-3 py-1 rounded">
                    Logout
                </button>
            </div>
        </nav>
    )
}

export default Navbar