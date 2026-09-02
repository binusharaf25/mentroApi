import React from "react";
import { QueryClientProvider, useQuery } from "@tanstack/react-query";
import Task from "./component/Task";
import { Navigate, Route, Routes } from "react-router";
import LoginPage from "./component/pages/auth/LoginPage";
import RegisterPage from "./component/pages/auth/RegisterPage";
import Dashboard from "./component/pages/dashboard/Dashboard";
import ProtectedRoute from "./component/auth/ProtectedRoute";
import AdminProtectedRoute from "./component/auth/AdminProtectedRoute";
import AdminRoute from "./component/pages/dashboard/AdminRoute";
const App = () => {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />

      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        }
      />
      <Route
        path="/admin"
        element={
          <AdminProtectedRoute>
            <Dashboard />
          </AdminProtectedRoute>
        }
      />
      <Route path="/" element={<Navigate to={"/login"} replace />} />
    </Routes>
  );
};

export default App;
