import { Outlet, Link, useLocation } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import { useNotifications } from "../../contexts/NotificationContext";

import { FaBell } from "react-icons/fa";
import Banner from "../../assets/images/Banner.mp4";

const Layout = () => {
  const { user, logout } = useAuth();
  const { unreadCount } = useNotifications();
  const location = useLocation();

  if (!user) return <Outlet />;

  const navItems = [
    { label: "Dashboard", path: "/dashboard" },
    { label: "Ships", path: "/ships" },
    { label: "Components", path: "/components" },
    { label: "Jobs", path: "/jobs" },
    { label: "Calendar", path: "/calendar" },
  ];

  const isActive = (path) => location.pathname.startsWith(path);

  return (
    <div className="flex flex-col w-full min-h-screen bg-[#292e39] text-white">
      {/* Header */}
      <header className="bg-gradient-to-r from-[#141617] to-[#1a237e] shadow-md">
        <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between gap-4 flex-wrap">
          <h1 className="text-2xl font-extrabold tracking-wide">
            ⛴️ Ship Maintenance Dashboard
          </h1>

          <nav className="flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-8 w-full sm:w-auto">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`group relative flex cursor-pointer items-center gap-3 ${
                  isActive(item.path) ? "text-yellow-300" : "text-white/70"
                }`}
              >
                {item.label}
              </Link>
            ))}

            <Link
              to="/notifications"
              className={`group relative flex cursor-pointer items-center gap-3 ${
                location.pathname.startsWith("/notifications")
                  ? "text-yellow-300"
                  : "text-white/70"
              }`}
            >
              <FaBell className="text-lg" />
              {unreadCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-xs text-white rounded-full w-5 h-5 flex items-center justify-center">
                  {unreadCount}
                </span>
              )}
            </Link>

            <button
              onClick={logout}
              className="px-1 py-1.5  text-xl font-extrabold"
            >
              Signout ({user.role})
            </button>
          </nav>
        </div>
      </header>

      {/* Main Content */}
      <main className="relative w-full flex-grow px-4 py-6 z-10">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover opacity-90 z-[-1]"
        >
          <source src={Banner} type="video/mp4" loading="lazy" />
        </video>

        <div className="absolute top-0 left-0 w-fit h-full bg-black/40 z-[-1]" />
        <Outlet />
      </main>

      {/* Footer */}
      <footer className="bg-[#0b1120] border-t border-gray-700 py-3">
        <div className="max-w-7xl mx-auto text-center text-sm text-gray-300">
          © {new Date().getFullYear()} ENTENTE Solution L.L.C-FZ Ship
          Maintenance System
        </div>
      </footer>
    </div>
  );
};

export default Layout;
