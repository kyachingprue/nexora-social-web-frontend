
import { Navigate, Outlet, useLocation } from "react-router";
import { ShieldAlert, LoaderCircle } from "lucide-react";

import { useAuth } from "../hooks/useAuth";

const AdminRoute = () => {
  const { user, loading } = useAuth();
  const location = useLocation();

  // Check authentication/loading state
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
              Checking admin access...
            </p>
          </div>
        </div>
      </div>
    );
  }

  // User is not authenticated
  if (!user) {
    return (
      <Navigate
        to="/login"
        replace
        state={{
          from: location,
        }}
      />
    );
  }

  // User is authenticated but is not an admin
  if (user.role !== "ADMIN") {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-50 px-4 dark:bg-gray-950">
        <div className="w-full max-w-md rounded-3xl border border-gray-200 bg-white p-8 text-center shadow-xl dark:border-gray-800 dark:bg-gray-900">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-red-100 dark:bg-red-500/10">
            <ShieldAlert
              size={32}
              className="text-red-500"
            />
          </div>

          <h1 className="mt-6 text-2xl font-bold text-gray-900 dark:text-white">
            Access Denied
          </h1>

          <p className="mt-3 text-sm leading-6 text-gray-500 dark:text-gray-400">
            You don't have permission to access the Nexora admin dashboard.
          </p>

          <button
            type="button"
            onClick={() => {
              window.location.href = "/home";
            }}
            className="mt-6 w-full rounded-xl bg-sky-500 px-5 py-3 text-sm font-semibold text-white transition hover:bg-sky-600 active:scale-[0.98]"
          >
            Back to Home
          </button>
        </div>
      </div>
    );
  }

  // User is authenticated and is an admin
  return <Outlet />;
};

export default AdminRoute;

