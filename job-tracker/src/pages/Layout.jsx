import Navbar from "./Navbar";
import Sidebar from "./Sidebar";

function Layout({children}){
    return(
        <div className="min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100">
            {/* Top navbar */}
            <Navbar />

            <div className="flex">
                {/* Left Sidebar */}
                <Sidebar />
                <div className="flex-1 p-6">
                    {children}
                </div>
            </div>
        </div>
    )
}

export default Layout;