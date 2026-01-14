import { useEffect } from "react";
import { useUIStore } from "../../stores/uiStore";

export default function ToastContainer() {
  const { toasts, removeToast, clearToasts } = useUIStore();

  useEffect(() => {
    (async () => {
      await new Promise((resolve) => setTimeout(resolve, 10000));
      clearToasts();
    })();
  });

  return (
    <div className="fixed bottom-4 right-4 space-y-2">
      {toasts.map((t) => (
        <div key={t.id} className="bg-gray-900 text-white px-4 py-2 rounded">
          {t.message}
          <button onClick={async () => removeToast(t.id)} className="ml-2">
            ✕
          </button>
        </div>
      ))}
    </div>
  );
}
