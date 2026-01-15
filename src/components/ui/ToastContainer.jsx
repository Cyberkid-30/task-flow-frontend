import { useEffect } from "react";
import { useUIStore } from "../../stores/uiStore";

const ToastIcon = () => (
  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
    <path
      fillRule="evenodd"
      d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
      clipRule="evenodd"
    />
  </svg>
);

export default function ToastContainer() {
  const { toasts, removeToast, clearToasts } = useUIStore();

  useEffect(() => {
    const timer = setTimeout(() => {
      clearToasts();
    }, 5000);

    return () => clearTimeout(timer);
  }, [toasts, clearToasts]);

  return (
    <div className="fixed bottom-6 right-6 z-50 space-y-3 max-w-md">
      {toasts.map((toast) => (
        <div
          key={toast.id}
          className="shadow-lg backdrop-blur-sm border border-b-color bg-surface-elevated text-text-primary transition-all duration-300 ease-in-out flex items-start gap-3 px-4 py-3 rounded-xl min-w-[320px]"
        >
          <div className="shrink-0 mt-0.5 text-foreground">
            <ToastIcon />
          </div>
          <p className="flex-1 text-sm font-medium leading-relaxed">
            {toast.message}
          </p>
          <button
            onClick={() => removeToast(toast.id)}
            className="shrink-0 opacity-60 hover:opacity-100 transition-opacity duration-200 focus:outline-none focus:ring-2 focus:ring-current rounded p-0.5"
            aria-label="Close notification"
          >
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
              <path
                fillRule="evenodd"
                d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                clipRule="evenodd"
              />
            </svg>
          </button>
        </div>
      ))}
    </div>
  );
}
