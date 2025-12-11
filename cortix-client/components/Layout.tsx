import React, { useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  Cpu,
  Moon,
  Sun,
  Menu,
  X,
  LogOut,
  User as UserIcon,
} from "lucide-react";
import { useAuth } from "../contexts/AuthContext";

interface LayoutProps {
  children: React.ReactNode;
  isDark: boolean;
  setIsDark: (val: boolean) => void;
}

const Layout: React.FC<LayoutProps> = ({ children, isDark, setIsDark }) => {
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);
  const { user, logout } = useAuth();

  // Apply dark mode class to html element
  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [isDark]);

  const navLinks = [
    { name: "Product", path: "/analyzer" },
    { name: "Pricing", path: "/pricing" },
    { name: "About", path: "/about" },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <main
      className={`min-h-screen w-full transition-colors duration-500 font-inter selection:bg-indigo-500/30 ${
        isDark ? "bg-black text-gray-100" : "bg-slate-50 text-gray-900"
      } overflow-x-hidden relative flex flex-col`}
    >
      {/* --- Ambient Background Effects --- */}

      {/* Grid Pattern with Theme Tint */}
      <div
        className={`fixed inset-0 pointer-events-none z-0 transition-all duration-1000 ${
          isDark ? "opacity-20" : "opacity-10"
        }`}
      >
        <div
          className={`absolute inset-0 bg-[linear-gradient(to_right,#333_1px,transparent_1px),linear-gradient(to_bottom,#333_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_0%,#000_70%,transparent_110%)]`}
        ></div>
      </div>

      {/* Vibrant Glowing Orbs (Dark Mode) */}
      {isDark && (
        <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden mix-blend-screen opacity-60">
          <div className="absolute top-[-20%] left-[20%] w-[500px] h-[500px] bg-indigo-900/20 rounded-full blur-[120px]"></div>
          <div className="absolute bottom-[-10%] right-[10%] w-[600px] h-[600px] bg-purple-900/10 rounded-full blur-[150px]"></div>
        </div>
      )}

      {/* Light Mode Gradients */}
      {!isDark && (
        <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-[600px] bg-gradient-to-b from-indigo-100/60 via-purple-50/30 to-transparent"></div>
        </div>
      )}

      {/* --- Navbar --- */}
      <nav
        className={`w-full px-6 py-4 flex justify-between items-center sticky top-0 z-50 transition-all duration-300 backdrop-blur-md ${
          isDark
            ? "bg-black/80 border-b border-white/10"
            : "bg-white/70 border-b border-gray-200 shadow-sm"
        }`}
      >
        {/* Brand */}
        <div className="flex items-center">
          <Link
            to="/"
            className="flex items-center gap-3 group cursor-pointer select-none pe-4"
          >
            <div className="relative flex items-center justify-center">
              <div className="absolute inset-0 bg-indigo-500 rounded-lg blur opacity-0 group-hover:opacity-40 transition duration-500"></div>
              <div
                className={`relative z-10 p-1.5 rounded-lg ${
                  isDark
                    ? "bg-white/5 border border-white/10"
                    : "bg-white border border-indigo-100"
                }`}
              >
                <Cpu className="w-5 h-5 text-indigo-500" />
              </div>
            </div>
            <div className="flex flex-col">
              <span
                className={`font-mono text-sm tracking-[0.2em] font-bold ${
                  isDark ? "text-gray-100" : "text-gray-800"
                } group-hover:text-indigo-400 transition-colors`}
              >
                CORTIX
              </span>
            </div>
          </Link>
          <div className="flex gap-4 text-xs font-mono text-gray-500 dark:text-gray-400 border-l border-gray-200 dark:border-gray-800 ps-4">
            <span className="flex items-center gap-2 border border-gray-300 dark:border-gray-800 px-3 py-1 rounded-full bg-emerald-500/20 backdrop-blur-sm">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              BETA
            </span>
          </div>
        </div>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={`text-sm font-medium transition-colors ${
                isActive(link.path)
                  ? "text-indigo-500"
                  : isDark
                  ? "text-gray-400 hover:text-white"
                  : "text-gray-600 hover:text-gray-900"
              }`}
            >
              {link.name}
            </Link>
          ))}
        </div>

        {/* Right Actions */}
        <div className="hidden md:flex items-center gap-6">
          <button
            onClick={() => setIsDark(!isDark)}
            className={`
              p-2 rounded-full transition-all duration-300
              ${
                isDark
                  ? "bg-white/5 text-gray-400 hover:bg-white/10 hover:text-white"
                  : "bg-gray-100 text-gray-600 hover:bg-gray-200 hover:text-indigo-600"
              }
            `}
          >
            {isDark ? (
              <Sun className="w-4 h-4" />
            ) : (
              <Moon className="w-4 h-4" />
            )}
          </button>

          {user ? (
            <div className="flex items-center gap-4 pl-2">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-indigo-500/20 border border-indigo-500/30 flex items-center justify-center overflow-hidden">
                  {user.avatar ? (
                    <img
                      src={user.avatar}
                      alt="Avatar"
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <UserIcon className="w-4 h-4 text-indigo-400" />
                  )}
                </div>
                <div className="flex flex-col">
                  <span className="text-xs font-medium text-gray-900 dark:text-white">
                    {user.name}
                  </span>
                  <span className="text-[10px] text-gray-500 dark:text-gray-400">
                    Pro Plan
                  </span>
                </div>
              </div>
              <button
                onClick={logout}
                className="p-2 text-gray-400 hover:text-red-500 transition-colors"
                title="Sign Out"
              >
                <LogOut className="w-4 h-4" />
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-4">
              <Link
                to="/login"
                className={`text-sm font-medium ${
                  isDark
                    ? "text-gray-300 hover:text-white"
                    : "text-gray-600 hover:text-black"
                } transition-colors`}
              >
                Sign In
              </Link>
              <Link
                to="/analyzer"
                className="bg-indigo-600 hover:bg-indigo-500 text-white px-4 py-2 rounded-lg text-sm font-medium transition-all shadow-lg shadow-indigo-500/25"
              >
                Launch Console
              </Link>
            </div>
          )}
        </div>

        {/* Mobile Menu Toggle */}
        <button
          className="md:hidden p-2 text-gray-500 hover:text-indigo-500"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? (
            <X className="w-6 h-6" />
          ) : (
            <Menu className="w-6 h-6" />
          )}
        </button>
      </nav>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div
          className={`md:hidden absolute top-16 left-0 w-full z-40 p-4 border-b ${
            isDark ? "bg-black border-white/10" : "bg-white border-gray-200"
          }`}
        >
          <div className="flex flex-col gap-4">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                onClick={() => setIsMobileMenuOpen(false)}
                className={`text-base font-medium py-2 ${
                  isActive(link.path)
                    ? "text-indigo-500"
                    : isDark
                    ? "text-gray-300"
                    : "text-gray-700"
                }`}
              >
                {link.name}
              </Link>
            ))}
            <div className="h-px bg-gray-200 dark:bg-white/10 my-2"></div>

            {user ? (
              <div className="flex items-center justify-between py-2">
                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium text-gray-900 dark:text-white">
                    {user.name}
                  </span>
                </div>
                <button onClick={logout} className="text-sm text-red-500">
                  Sign Out
                </button>
              </div>
            ) : (
              <div className="flex flex-col gap-3">
                <Link
                  to="/login"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`text-center py-2 rounded-lg border ${
                    isDark
                      ? "border-white/10 text-white"
                      : "border-gray-200 text-gray-900"
                  }`}
                >
                  Sign In
                </Link>
                <Link
                  to="/analyzer"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="text-center py-2 rounded-lg bg-indigo-600 text-white"
                >
                  Launch Console
                </Link>
              </div>
            )}

            <div className="flex justify-between items-center mt-2">
              <span
                className={`text-sm ${
                  isDark ? "text-gray-400" : "text-gray-600"
                }`}
              >
                Theme
              </span>
              <button
                onClick={() => setIsDark(!isDark)}
                className={`p-2 rounded-full ${
                  isDark ? "bg-white/10" : "bg-gray-100"
                }`}
              >
                {isDark ? (
                  <Sun className="w-4 h-4" />
                ) : (
                  <Moon className="w-4 h-4" />
                )}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* --- Main Body --- */}
      <div className="flex-1 relative z-10 flex flex-col">{children}</div>

      {/* --- Footer --- */}
      <footer
        className={`w-full py-8 text-center border-t backdrop-blur-sm ${
          isDark ? "border-white/5 bg-black" : "border-gray-200 bg-white/50"
        }`}
      >
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="flex items-center gap-2 opacity-50">
              <Cpu className="w-4 h-4" />
              <span className="font-mono text-xs tracking-widest">
                CORTIX.AI SYSTEM
              </span>
            </div>

            <div
              className={`flex gap-6 text-sm ${
                isDark ? "text-gray-500" : "text-gray-400"
              }`}
            >
              <Link
                to="/privacy"
                className="hover:text-indigo-500 transition-colors"
              >
                Privacy Policy
              </Link>
              <Link
                to="/terms"
                className="hover:text-indigo-500 transition-colors"
              >
                Terms & Services
              </Link>
            </div>

            <p
              className={`text-[10px] font-mono tracking-widest ${
                isDark ? "text-gray-700" : "text-gray-400"
              }`}
            >
              © 2025 CORTIX INC. ALL RIGHTS RESERVED.
            </p>
          </div>
        </div>
      </footer>
    </main>
  );
};

export default Layout;
