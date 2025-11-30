import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import Login from "./pages/Login";
import Employees from "./pages/Employees";
import EmployeeForm from "./pages/EmployeeForm";
import EmployeeDetails from "./pages/EmployeeDetails";
import Navbar from "./components/Navbar";
import PrivateRoute from "./components/PrivateRoute";
import AdminCreateSupervisor from "./components/AdminCreateSupervisor";

import { useAppSelector } from "./redux/hooks";

export default function App() {
  const token = useAppSelector((state) => state.auth.token);

  return (
    <BrowserRouter>
      {token && <Navbar />}

      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Navigate to="/employees" replace />} />

        <Route
          path="/employees"
          element={
            <PrivateRoute>
              <Employees />
            </PrivateRoute>
          }
        />

        <Route
          path="/employees/new"
          element={
            <PrivateRoute>
              <EmployeeForm />
            </PrivateRoute>
          }
        />

        <Route
          path="/employees/:id/edit"
          element={
            <PrivateRoute>
              <EmployeeForm />
            </PrivateRoute>
          }
        />

        <Route
          path="/employees/:id"
          element={
            <PrivateRoute>
              <EmployeeDetails />
            </PrivateRoute>
          }
        />

        <Route
          path="/admin/create-supervisor"
          element={
            <PrivateRoute>
              <AdminCreateSupervisor />
            </PrivateRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}
