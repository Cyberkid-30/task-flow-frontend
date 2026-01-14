import { create } from "zustand";
import { persist } from "zustand/middleware";

// Detect system theme preference
const getSystemTheme = () => {
  if (typeof window !== "undefined") {
    return window.matchMedia("(prefers-color-scheme: dark)").matches;
  }
  return false;
};

export const useUIStore = create(
  persist(
    (set) => ({
      toasts: [],
      showModal: false,
      modalMessage: "Loading",
      darkMode: getSystemTheme(),

      toggleTheme: () => set((s) => ({ darkMode: !s.darkMode })),
      setShowModal: (show) => set({ showModal: show }),
      setModalMessage: (message) => set({ modalMessage: message }),

      clearToasts: () => set({ toasts: [] }),

      addToast: (toast) =>
        set((s) => ({ toasts: [...s.toasts, { id: Date.now(), ...toast }] })),

      removeToast: (id) =>
        set((s) => ({ toasts: s.toasts.filter((t) => t.id !== id) })),
    }),
    {
      name: "ui-storage",
      partiallyPersist: (state) => ({
        darkMode: state.darkMode,
      }),
    }
  )
);
