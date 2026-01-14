import { create } from "zustand";
import { persist } from "zustand/middleware";
import authService from "../services/authService";
import { clearToken, setToken } from "../utils/storage";

export const useAuthStore = create(
  persist(
    (set) => ({
      user: null,
      token: null,
      isAuthenticated: false,

      login: async (data) => {
        const res = await authService.login(data);
        setToken(res.access_token);

        const loggedInUser = await authService.me();
        set({
          user: loggedInUser,
          token: res.access_token,
          isAuthenticated: true,
        });
      },

      register: async (data) => {
        const res = await authService.register(data);
        setToken(res.access_token);

        set({
          user: res.user,
          token: res.access_token,
          isAuthenticated: true,
        });
      },

      logout: () => {
        clearToken();
        set({ user: null, token: null, isAuthenticated: false });
      },
    }),
    { name: "auth-store" }
  )
);
