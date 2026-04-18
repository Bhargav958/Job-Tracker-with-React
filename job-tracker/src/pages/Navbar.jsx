import { useNavigate, Link } from "react-router-dom";
import { account } from "../appwrite/config";
import { useState, useEffect } from "react";

function Navbar() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await account.deleteSession("current");
      navigate("/login");
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    account
      .get()
      .then(setUser)
      .catch(() => setUser(null));
  }, []);

  const displayName =
    user?.name?.trim() || user?.email?.split("@")[0] || "Profile";
  const initials = displayName
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase())
    .join("");

  return (
    <nav className="fixed top-0 left-0 w-full z-50 flex justify-between items-center gap-2 px-3 sm:px-6 py-3 sm:py-4 bg-white/5 backdrop-blur-lg border-b border-white/10">
      <Link
        to="/"
        className="text-base sm:text-xl font-bold truncate min-w-0 max-w-[55%] sm:max-w-none"
      >
        Job Tracker<span className="hidden sm:inline">👨‍💼</span>
      </Link>

      <div className="flex items-center gap-2 sm:gap-4 shrink-0">
        {user && (
          <>
            <Link
              to="/profile"
              className="hidden md:flex items-center gap-3 rounded-full border border-white/10 bg-white/5 px-2 py-1 hover:bg-white/10 transition"
            >
              <span className="flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br from-indigo-500 to-purple-500 text-xs font-semibold text-white">
                {initials || "P"}
              </span>
              <span className="pr-2 text-left">
                <span className="block text-sm text-white leading-tight max-w-[140px] truncate">
                  {displayName}
                </span>
                <span
                  className="block text-xs text-gray-400 leading-tight max-w-[180px] truncate"
                  title={user.email}
                >
                  {user.email}
                </span>
              </span>
            </Link>

            <span
              className="md:hidden flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br from-indigo-500 to-purple-500 text-xs font-semibold text-white"
              title={user.email}
            >
              {initials || "P"}
            </span>
          </>
        )}

        {/* <Link
          to="/dashboard"
          className="hidden sm:inline text-sm hover:text-indigo-400 transition"
        >
          Dashboard
        </Link>
        <Link
          to="/profile"
          className="hidden sm:inline text-sm hover:text-indigo-400 transition"
        >
          Profile
        </Link> */}
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

export default Navbar;
