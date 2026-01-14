import { Outlet } from "react-router-dom";
import ProtectedRoute from "../components/common/ProtectedRoute";
import Navbar from "../components/ui/Navbar";
import LoadingOverlay from "../components/ui/LoadingModal";
import { useUIStore } from "../stores/uiStore";

export default function AppLayout() {
  const { showModal, modalMessage } = useUIStore();

  return (
    <ProtectedRoute>
      <div className="min-h-screen w-full flex flex-col">
        <Navbar />

        <main className="flex-1 flex flex-col bg-background">
          <Outlet />
        </main>

        <LoadingOverlay isLoading={showModal} message={modalMessage} />
      </div>
    </ProtectedRoute>
  );
}
