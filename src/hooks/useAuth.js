import { useEffect } from "react";
import { useAuthStore } from "../stores/authStore";
import authService from "../services/authService";

export default function useAuth() {
  const { token, user, logout, isAuthenticated } = useAuthStore();

  useEffect(() => {
    if (!token) return;

    authService.me().catch(() => logout());
  }, [token]);

  return { isAuthenticated, user };
}
