
import { Navigate, Outlet } from "react-router";
import { LoaderCircle } from "lucide-react";

import useAuth from "../hooks/useAuth";

const PublicRoute = () => {
  const { user, loading } = useAuth();

  // Check authentication state
  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-50 dark:bg-gray-950">
        <div className="flex flex-col items-center gap-4">
          <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-sky-500 shadow-lg shadow-sky-500/20">
            <LoaderCircle
              size={28}
              className="animate-spin text-white"
            />
          </div>

          <div className="text-center">
            <p className="text-sm font-semibold text-gray-900 dark:text-white">
              Loading Nexora
            </p>

            <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
              Checking your session...
            </p>
          </div>
        </div>
      </div>
    );
  }

  // Already logged in → redirect to home
  if (user) {
    return <Navigate to="/home" replace />;
  }

  // Not logged in → allow public routes
  return <Outlet />;
};

export default PublicRoute;

