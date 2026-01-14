import { useAuthStore } from "../../stores/authStore";
import { Link, useLocation } from "react-router-dom";
import {
  ListCheckIcon,
  LogOutIcon,
  PlusCircle,
  ListTodo,
  User,
  ChevronDown,
} from "lucide-react";
import { useUIStore } from "../../stores/uiStore";
import ThemeSwitch from "./ThemeSwitch";
import { useState, useEffect, useRef } from "react";

export default function Navbar() {
  const { user, logout } = useAuthStore();
  const { setShowModal, setModalMessage } = useUIStore();
  const location = useLocation();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  const handleLogout = async () => {
    setDropdownOpen(false);
    setShowModal(true);
    setModalMessage("Logging out");
    await new Promise((resolve) => setTimeout(resolve, 1000));
    logout();
    setShowModal(false);
  };

  const username = user?.username.substring(0, 2);

  const isActive = (path) => location.pathname === path;

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };

    if (dropdownOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [dropdownOpen]);

  return (
    <header className="sticky top-0 z-40 bg-surface-elevated/95 backdrop-blur-xl border-b border-b-color shadow-lg text-primary">
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link
            to="/app/tasks"
            className="text-2xl font-bold flex gap-2.5 items-center group transition-all duration-300"
          >
            <div className="bg-linear-to-br from-foreground to-accent-pink p-2 rounded-xl shadow-lg group-hover:shadow-foreground/25 transition-all duration-300 group-hover:scale-105">
              <ListCheckIcon className="size-6 text-white" strokeWidth={2.5} />
            </div>
            <span className="bg-linear-to-r from-primary via-foreground to-primary bg-clip-text text-transparent font-extrabold">
              Task-Flow
            </span>
          </Link>

          {/* Navigation */}
          <nav className="flex items-center gap-2">
            {/* Nav Links */}
            <div className="flex items-center gap-1 mr-2">
              <Link
                to="/app/tasks/create"
                className={`flex items-center gap-2 px-4 py-2 rounded-xl font-medium transition-all duration-300 ${
                  isActive("/app/tasks/create")
                    ? "bg-foreground text-white shadow-lg shadow-foreground/25"
                    : "text-text-secondary hover:text-foreground hover:bg-foreground/10"
                }`}
              >
                <PlusCircle className="size-4" strokeWidth={2.5} />
                <span className="hidden sm:inline">Create Task</span>
              </Link>

              <Link
                to="/app/tasks"
                className={`flex items-center gap-2 px-4 py-2 rounded-xl font-medium transition-all duration-300 ${
                  isActive("/app/tasks")
                    ? "bg-foreground text-white shadow-lg shadow-foreground/25"
                    : "text-text-secondary hover:text-foreground hover:bg-foreground/10"
                }`}
              >
                <ListTodo className="size-4" strokeWidth={2.5} />
                <span className="hidden sm:inline">Tasks</span>
              </Link>
            </div>

            {/* Divider */}
            <div className="h-8 w-px bg-b-color/50 mx-1"></div>

            {/* User Avatar Dropdown */}
            <div className="relative" ref={dropdownRef}>
              <button
                onClick={() => setDropdownOpen(!dropdownOpen)}
                className="flex items-center gap-2 p-1 pr-3 rounded-xl hover:bg-foreground/10 transition-all duration-300 group"
              >
                <div className="relative">
                  <div className="size-10 rounded-xl bg-linear-to-br from-foreground to-accent-purple text-white font-bold flex justify-center items-center shadow-md transition-all duration-300 group-hover:shadow-lg group-hover:scale-105">
                    {username.toUpperCase()}
                  </div>
                  <div className="absolute -bottom-1 -right-1 size-3 bg-success rounded-full border-2 border-surface-elevated"></div>
                </div>
                <ChevronDown
                  className={`size-4 text-text-secondary transition-transform duration-300 ${
                    dropdownOpen ? "rotate-180" : ""
                  }`}
                  strokeWidth={2}
                />
              </button>

              {/* Dropdown Menu */}
              {dropdownOpen && (
                <div className="absolute right-0 mt-2 w-56 bg-form border border-b-color rounded-xl shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-200 origin-top-right">
                  {/* User Info Header */}
                  <div className="px-4 py-3 border-b border-b-color bg-background-secondary/50">
                    <p className="text-sm font-semibold text-primary truncate">
                      {user?.username}
                    </p>
                    <p className="text-xs text-text-secondary truncate">
                      {user?.email}
                    </p>
                  </div>

                  {/* Menu Items */}
                  <div className="py-1">
                    <Link
                      to="/app/account"
                      onClick={() => setDropdownOpen(false)}
                      className="flex items-center gap-3 px-4 py-3 text-primary hover:bg-foreground/10 hover:text-foreground transition-colors"
                    >
                      <User className="size-5" strokeWidth={2} />
                      <span className="font-medium">Account Settings</span>
                    </Link>

                    <button
                      onClick={handleLogout}
                      className="w-full flex items-center gap-3 px-4 py-3 text-error hover:bg-error/10 transition-colors"
                    >
                      <LogOutIcon className="size-5" strokeWidth={2} />
                      <span className="font-medium">Logout</span>
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Theme Switch */}
            <div className="ml-1">
              <ThemeSwitch />
            </div>
          </nav>
        </div>
      </div>
    </header>
  );
}
