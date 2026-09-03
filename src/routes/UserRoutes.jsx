import { Navigate, Route, Routes } from "react-router";

// Layout
import MainLayout from "../layouts/MainLayout";

// User Pages
import Home from "../pages/user/Home";
import Explore from "../pages/user/Explore";
import Message from "../pages/user/Message";
import Notifications from "../pages/user/Notifications";
import Profile from "../pages/user/Profile";
import Saved from "../pages/user/Saved";
import Settings from "../pages/user/Settings";

const UserRoutes = () => {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        {/* Default user route */}
        <Route
          path="/"
          element={<Navigate to="/" replace />}
        />

        {/* Home */}
        <Route
          path="/"
          element={<Home />}
        />

        {/* Explore */}
        <Route
          path="/explore"
          element={<Explore />}
        />

        {/* Messages */}
        <Route
          path="/messages"
          element={<Message />}
        />

        {/* Notifications */}
        <Route
          path="/notifications"
          element={<Notifications />}
        />

        {/* Profile */}
        <Route
          path="/profile"
          element={<Profile />}
        />

        {/* Saved Posts */}
        <Route
          path="/saved"
          element={<Saved />}
        />

        {/* User Settings */}
        <Route
          path="/settings"
          element={<Settings />}
        />
      </Route>
    </Routes>
  );
};

export default UserRoutes;

