import { Loader2Icon } from "lucide-react";

export default function LoadingOverlay({ isLoading, message = "Loading" }) {
  if (!isLoading) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center animate-in fade-in duration-200">
      {/* Backdrop with blur effect */}
      <div className="absolute inset-0 bg-overlay-bg backdrop-blur-md"></div>

      {/* Simple card container */}
      <div className="relative z-10 bg-form border border-b-color rounded-2xl shadow-2xl p-8 min-w-70 max-w-md mx-4 animate-in zoom-in-95 duration-300">
        <div className="flex flex-col items-center space-y-4">
          {/* Spinning icon */}
          <Loader2Icon
            className="animate-spin size-12 text-foreground"
            strokeWidth={2.5}
          />

          {/* Loading message */}
          <p className="text-primary text-lg font-medium">{message}</p>
        </div>
      </div>
    </div>
  );
}
