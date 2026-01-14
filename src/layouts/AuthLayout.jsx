import { Outlet, Navigate } from "react-router-dom";
import { useAuthStore } from "../stores/authStore";
import { useUIStore } from "../stores/uiStore";
import { useEffect } from "react";

export default function AuthLayout() {
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated);
  const darkMode = useUIStore((s) => s.darkMode);

  // Apply theme class to document
  useEffect(() => {
    document.documentElement.classList.toggle("dark", darkMode);
  }, [darkMode]);

  if (isAuthenticated) return <Navigate to="/app/tasks" replace />;

  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <Outlet />
    </div>
  );
}
