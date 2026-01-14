import { RouterProvider } from "react-router-dom";
import { router } from "./router";
import ToastContainer from "./components/ui/ToastContainer";

function App() {
  return (
    <main className="font-ovo">
      <RouterProvider router={router} />
      <ToastContainer />
    </main>
  );
}

export default App;
