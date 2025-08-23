import { Routes, Route } from "react-router";

import ProtectedRoute from "./ProtectedRoute";
import AdminRoute from "./AdminRoute";

import AuthLayout from "@/layouts/AuthLayout";
import MainLayout from "@/layouts/MainLayout";
import AdminLayout from "@/layouts/AdminLayout";

import HomePage from "@/pages/HomePage";

import DashboardPage from "@/pages/Dashboard";
import AdminPage from "@/pages/AdminPage";
import VerifyEmailPage from "@/pages/VerifyEmailPage";

import SignInPage from "@/pages/SignInPage";
import SignUpPage from "@/pages/SignUpPage";

const AppRoutes = () => {
  return (
    <Routes>
      {/* Auth routes */}
      <Route element={<AuthLayout />}>
        <Route path="/signin" element={<SignInPage />} />
        <Route path="/verify-email" element={<VerifyEmailPage />} />
        <Route path="/signup" element={<SignUpPage />} />
      </Route>

      {/* Protected user routes */}
      <Route element={<ProtectedRoute />}>
        <Route element={<MainLayout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/dashboard" element={<DashboardPage />} />
        </Route>
      </Route>

      {/* Admin routes */}
      <Route element={<ProtectedRoute />}>
        <Route element={<AdminRoute />}>
          <Route element={<AdminLayout />}>
            <Route path="/admin" element={<AdminPage />} />
          </Route>
        </Route>
      </Route>
    </Routes>
  );
};

export default AppRoutes;
