import { AlertTriangle, X } from "lucide-react";
import { Spinner } from "./Spinner";

export default function DeleteModal({
  isOpen,
  onClose,
  onConfirm,
  title = "Delete Task",
  message = "Are you sure you want to delete this task? This action cannot be undone.",
  isLoading = false,
}) {
  if (!isOpen) return null;

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget && !isLoading) {
      onClose();
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center animate-in fade-in duration-200"
      onClick={handleBackdropClick}
    >
      {/* Backdrop with blur effect */}
      <div className="absolute inset-0 bg-overlay-bg backdrop-blur-md"></div>

      {/* Modal Container */}
      <div className="relative z-10 bg-form border border-b-color rounded-2xl shadow-2xl max-w-md w-full mx-4 animate-in zoom-in-95 duration-300">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-b-color">
          <div className="flex items-center gap-3">
            <div className="bg-error/10 p-2 rounded-lg">
              <AlertTriangle className="size-6 text-error" strokeWidth={2.5} />
            </div>
            <h2 className="text-xl font-bold text-primary">{title}</h2>
          </div>
          {!isLoading && (
            <button
              onClick={onClose}
              className="text-text-secondary hover:text-primary transition-colors p-1 rounded-lg hover:bg-background/50"
              title="Close"
            >
              <X className="size-5" strokeWidth={2} />
            </button>
          )}
        </div>

        {/* Content */}
        <div className="p-6">
          <p className="text-text-primary leading-relaxed">{message}</p>
        </div>

        {/* Actions */}
        <div className="flex gap-3 p-6 border-t border-b-color bg-background/30">
          <button
            onClick={onClose}
            disabled={isLoading}
            className="flex-1 px-4 py-3 bg-background-secondary hover:bg-background border border-b-color text-primary font-semibold rounded-xl transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            disabled={isLoading}
            className="flex-1 px-4 py-3 bg-error hover:bg-error/90 text-white font-semibold rounded-xl transition-all duration-200 shadow-lg shadow-error/20 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            {isLoading ? (
              <>
                <Spinner />
                <span>Deleting...</span>
              </>
            ) : (
              "Delete"
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
