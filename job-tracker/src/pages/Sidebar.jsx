import { Link, useLocation } from "react-router-dom";

function Sidebar({ onClose, variant = "default" }) {
  const location = useLocation();
  const isOverlay = variant === "overlay";

  const linkClass = (path) =>
    `block px-4 py-3 sm:py-2 rounded-lg transition touch-manipulation ${
      location.pathname === path
        ? "bg-gradient-to-r from-indigo-500 to-purple-500 text-white shadow"
        : "text-gray-300 hover:bg-white/10 active:bg-white/15"
    }`;

  return (
    <div
      className={
        isOverlay
          ? "fixed left-0 top-16 z-40 h-[calc(100vh-4rem)] w-[min(16rem,88vw)] shrink-0 bg-white/5 backdrop-blur-xl border-r border-white/10 p-5 pt-6 shadow-2xl shadow-black/40"
          : "w-60 shrink-0 h-[calc(100vh-64px)] bg-white/5 backdrop-blur-xl border-r border-white/10 p-5 relative"
      }
    >
      {onClose && (
        <button
          type="button"
          aria-label="Close sidebar"
          onClick={onClose}
          className="absolute top-3 right-3 bg-white/5 hover:bg-white/10 border border-white/10 rounded-md p-2 sm:p-1 transition touch-manipulation"
        >
          ✕
        </button>
      )}
      <h2 className="text-lg font-bold mb-6 pr-10 text-white">Menu</h2>
      <nav className="flex flex-col gap-1 sm:gap-2">
        <Link to="/" className={linkClass("/")} onClick={() => isOverlay && onClose?.()}>
          Home
        </Link>
        <Link
          to="/dashboard"
          className={linkClass("/dashboard")}
          onClick={() => isOverlay && onClose?.()}
        >
          Dashboard
        </Link>
        <Link
          to="/profile"
          className={linkClass("/profile")}
          onClick={() => isOverlay && onClose?.()}
        >
          Profile
        </Link>
      </nav>
    </div>
  );
}

export default Sidebar;
