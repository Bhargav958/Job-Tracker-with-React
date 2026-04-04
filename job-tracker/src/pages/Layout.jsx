import { useState } from "react";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import { useMediaQuery } from "../hooks/useMediaQuery";

function Layout({ children }) {
  const isMdUp = useMediaQuery("(min-width: 768px)");
  const [isSidebarOpen, setIsSidebarOpen] = useState(() =>
    typeof window !== "undefined"
      ? window.matchMedia("(min-width: 768px)").matches
      : true
  );

  return (
    <div className="min-h-screen overflow-x-hidden bg-gradient-to-br from-gray-950 via-gray-900 to-black text-white">
      <Navbar />

      <div className="flex min-h-[calc(100vh-4rem)] pt-16 items-stretch">
        {/* Mobile: tap outside to close drawer */}
        {!isMdUp && isSidebarOpen && (
          <button
            type="button"
            className="fixed inset-x-0 bottom-0 top-16 z-30 bg-black/60 md:hidden"
            onClick={() => setIsSidebarOpen(false)}
            aria-label="Close menu"
          />
        )}

        {isMdUp && isSidebarOpen && (
          <Sidebar onClose={() => setIsSidebarOpen(false)} />
        )}

        {!isMdUp && isSidebarOpen && (
          <Sidebar
            variant="overlay"
            onClose={() => setIsSidebarOpen(false)}
          />
        )}

        {!isSidebarOpen && (
          <div className="flex shrink-0 flex-col items-center pl-3 sm:pl-5 pt-4 sm:pt-5 pr-2">
            <button
              type="button"
              aria-label="Open sidebar"
              onClick={() => setIsSidebarOpen(true)}
              className="touch-manipulation bg-white/5 border border-white/10 rounded-lg p-2.5 hover:bg-white/10 transition"
            >
              ☰
            </button>
          </div>
        )}

        <div className="flex flex-1 min-w-0 flex-col p-4 sm:p-6">
          <div
            className={`w-full max-w-6xl shrink-0 ${
              isSidebarOpen ? "" : "mx-auto"
            }`}
          >
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Layout;
