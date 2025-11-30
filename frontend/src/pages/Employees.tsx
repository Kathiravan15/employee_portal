import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { fetchEmployees, deleteEmployee } from "../redux/slices/employeeSlice";
import EmployeeCard from "../components/EmployeeCard";
import { useAppDispatch, useAppSelector } from "../redux/hooks";

interface Employee {
  _id: string;
  firstName: string;
  lastName: string;
  employeeId: string;
  email: string;
  department: string;
  role: string;
  status: string;
  notes?: string;
  dateOfJoining?: string;
}

export default function Employees() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const { items, loading } = useAppSelector((state) => state.employee);
  const user = useAppSelector((state) => state.auth.user);

  const [search, setSearch] = useState<string>("");

  useEffect(() => {
    dispatch(fetchEmployees({ search }));
  }, [dispatch, search]);

  const handleEdit = (emp: Employee) => {
    navigate(`/employees/${emp._id}/edit`);
  };

  const handleDelete = async (emp: Employee) => {
    const confirmed = window.confirm("Delete this employee?");
    if (!confirmed) return;
    await dispatch(deleteEmployee(emp._id));
  };

  return (
    <div className="min-h-screen bg-gray-50 px-6 py-6">

      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Employees</h1>
        <p className="text-sm text-gray-500">
          Manage your organization employees here
        </p>
      </div>

      {/* Top Controls */}
      <div className="bg-white p-4 rounded-xl shadow flex flex-col md:flex-row justify-between items-center gap-4 mb-6 animate-fade-in-up">

        {/* Search */}
        <div className="flex w-full md:w-auto gap-2">
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search employee..."
            className="
              w-full md:w-64 px-4 py-2 rounded-lg border
              border-gray-300 focus:ring-2 focus:ring-indigo-500
              focus:outline-none
            "
          />

          <button
            onClick={() => dispatch(fetchEmployees({ search }))}
            className="
              px-4 py-2 rounded-lg bg-indigo-600 text-white
              hover:bg-indigo-700 transition
            "
          >
            Search
          </button>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-3">
          {user?.role === "admin" && (
            <button
              onClick={() => navigate("/admin/create-supervisor")}
              className="
                px-4 py-2 rounded-lg bg-green-500 text-white
                hover:bg-green-600 transition
                shadow hover:scale-105 duration-200
              "
            >
              + Supervisor
            </button>
          )}

          <button
            onClick={() => navigate("/employees/new")}
            className="
              px-4 py-2 rounded-lg bg-indigo-600 text-white
              hover:bg-indigo-700 transition
              shadow hover:scale-105 duration-200
            "
          >
            + New Employee
          </button>
        </div>
      </div>

      {/* Body */}
      {loading ? (
        <div className="flex justify-center items-center py-16">
          <div className="animate-spin rounded-full h-10 w-10 border-t-4 border-indigo-600 border-solid"></div>
        </div>
      ) : items.length === 0 ? (
        <div className="bg-white p-10 rounded-xl shadow text-center animate-fade-in-up">
          <h3 className="text-lg font-semibold text-gray-700 mb-2">
            No employees found
          </h3>
          <p className="text-sm text-gray-500 mb-4">
            Start by creating a new employee
          </p>
          <button
            onClick={() => navigate("/employees/new")}
            className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
          >
            Add Employee
          </button>
        </div>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5 animate-fade-in-up">
          {items.map((emp: Employee) => (
            <EmployeeCard
              key={emp._id}
              emp={emp}
              onEdit={handleEdit}
              onDelete={handleDelete}
            />
          ))}
        </div>
      )}
    </div>
  );
}
