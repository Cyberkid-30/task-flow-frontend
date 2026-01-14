import { createBrowserRouter } from "react-router-dom";
import Login from "../pages/auth/Login";
import Register from "../pages/auth/Register";
import TaskList from "../pages/tasks/TaskList";
import TaskDetail from "../pages/tasks/TaskDetail";
import TaskCreate from "../pages/tasks/TaskCreate";
import TaskEdit from "../pages/tasks/TaskEdit";
import Account from "../pages/Account";
import NotFound from "../pages/NotFound";
import AppLayout from "../layouts/AppLayout";
import AuthLayout from "../layouts/AuthLayout";
import { Navigate } from "react-router-dom";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Navigate to="/auth/login" replace />,
  },
  {
    path: "/auth",
    element: <AuthLayout />,
    children: [
      { path: "login", element: <Login /> },
      { path: "register", element: <Register /> },
    ],
  },
  {
    path: "/app",
    element: <AppLayout />,
    children: [
      { path: "tasks", element: <TaskList /> },
      { path: "tasks/create", element: <TaskCreate /> },
      { path: "tasks/:id", element: <TaskDetail /> },
      { path: "tasks/:id/edit", element: <TaskEdit /> },
      { path: "account", element: <Account /> },
    ],
  },
  { path: "*", element: <NotFound /> },
]);
