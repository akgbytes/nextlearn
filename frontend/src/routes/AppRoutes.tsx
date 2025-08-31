import { Routes, Route } from "react-router";

import ProtectedRoute from "./ProtectedRoute";
import AdminRoute from "./AdminRoute";

import AuthLayout from "@/layouts/AuthLayout";
import MainLayout from "@/layouts/MainLayout";
import AdminLayout from "@/layouts/AdminLayout";

import Home from "@/pages/Home";
import Dashboard from "@/pages/Dashboard";

import SignUp from "@/pages/auth/SignUp";
import SignIn from "@/pages/auth/SignIn";
import VerifyEmail from "@/pages/auth/VerifyEmail";

import AdminDashboard from "@/pages/admin/AdminDashboard";
import AdminCourses from "@/pages/admin/AdminCourses";
import CreateCourse from "@/pages/admin/CreateCourse";
import EditCourse from "@/pages/admin/EditCourse";

const AppRoutes = () => {
  return (
    <Routes>
      {/* Auth routes */}
      <Route element={<AuthLayout />}>
        <Route path="/signin" element={<SignIn />} />
        <Route path="/verify-email" element={<VerifyEmail />} />
        <Route path="/signup" element={<SignUp />} />
      </Route>

      {/* Protected user routes */}
      <Route element={<ProtectedRoute />}>
        <Route element={<MainLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/dashboard" element={<Dashboard />} />
        </Route>
      </Route>

      {/* Admin routes */}
      <Route element={<ProtectedRoute />}>
        <Route element={<AdminRoute />}>
          <Route element={<AdminLayout />}>
            <Route path="/admin" element={<AdminDashboard />} />
            <Route path="/admin/courses" element={<AdminCourses />} />
            <Route path="/admin/courses/create" element={<CreateCourse />} />
            <Route path="/admin/courses/:id/edit" element={<EditCourse />} />
          </Route>
        </Route>
      </Route>
    </Routes>
  );
};

export default AppRoutes;
