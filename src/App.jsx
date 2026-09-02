import { Routes, Route, Navigate } from "react-router";
import PublicRoute from "./routes/PublicRoute";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import VerifyEmail from "./pages/auth/VerifyEmail";
import ForgotPassword from "./pages/auth/ForgetPassword";
import ResetPassword from "./pages/auth/ResetPassword";
import ProtectedRoute from "./routes/ProtectedRoute";
import MainLayout from "./layouts/MainLayout";
import Home from "./pages/user/Home";
import Explore from "./pages/user/Explore";
import Notifications from "./pages/user/Notifications";
import Messages from "./pages/user/Messages";
import Profile from "./pages/user/Profile";
import Saved from "./pages/user/Saved";
import Settings from "./pages/user/Settings";


export default function App() {
  return (
    <Routes>
      {/* ==================== PUBLIC ROUTES ==================== */}
      <Route element={<PublicRoute />}>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/verify-email" element={<VerifyEmail />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password" element={<ResetPassword />} />
      </Route>

      {/* ==================== PROTECTED USER ROUTES ==================== */}
      <Route element={<ProtectedRoute />}>
        <Route element={<MainLayout />}>
          <Route path="/home" element={<Home />} />
          <Route path="/explore" element={<Explore />} />
          <Route path="/notifications" element={<Notifications />} />
          <Route path="/messages" element={<Messages />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/saved" element={<Saved />} />
          <Route path="/settings" element={<Settings />} />
        </Route>
      </Route>

      {/* ==================== DEFAULT ROUTE ==================== */}
      <Route
        path="/"
        element={<Navigate to="/login" replace />}
      />

      {/* ==================== 404 / UNKNOWN ROUTES ==================== */}
      <Route
        path="*"
        element={<Navigate to="/login" replace />}
      />
    </Routes>
  );
}

