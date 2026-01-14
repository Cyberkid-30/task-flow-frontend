import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center">
      <h1 className="text-3xl font-bold">404</h1>
      <p className="text-gray-500">Page not found</p>
      <Link to="/" className="text-blue-600 mt-4">
        Go home
      </Link>
    </div>
  );
}
