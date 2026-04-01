import { Link, useLocation } from "react-router-dom";

function Sidebar(){
    const location = useLocation();
    const linkClass = (path) =>
    `block px-4 py-2 rounded transition ${
        location.pathname === path
        ? "bg-blue-500 text-white"
        : "text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700"
    }`;

    return(
        <div className="w-60 min-h-screen bg-white dark:bg-gray-800 p-4 shadow text-gray-900 dark:text-gray-100">
            <h2 className="text-lg font-bold mb-6">Menu</h2>
            <nav className="flex flex-col gap-2">
                <Link to='/dashboard' className={linkClass("/dashboard")}>
                Dashboard
                </Link>
                <Link to='/' className={linkClass("/dashboard")}>
                Home
                </Link>
            </nav>
        </div>
    )
}
export default Sidebar;