import { Routes, Route } from "react-router";

import ProtectedRoute from "./ProtectedRoute";
import AdminRoute from "./AdminRoute";

import AuthLayout from "@/layouts/AuthLayout";
import MainLayout from "@/layouts/MainLayout";
import AdminLayout from "@/layouts/AdminLayout";

import Home from "@/pages/home";
import Dashboard from "@/pages/dashboard";

import SignUp from "@/pages/auth/signup";
import SignIn from "@/pages/auth/signin";
import VerifyEmail from "@/pages/auth/verify-email";

import AdminDashboard from "@/pages/admin";
import AdminCourses from "@/pages/admin/courses";
import CourseCreation from "@/pages/admin/courses/create";

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
            <Route path="/admin/courses/create" element={<CourseCreation />} />
          </Route>
        </Route>
      </Route>
    </Routes>
  );
};

export default AppRoutes;
