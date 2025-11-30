import React, { useEffect, useState } from "react";
import api from "../api/axios";
import { useParams, useNavigate } from "react-router-dom";

interface Employee {
  _id: string;
  employeeId: string;
  firstName: string;
  lastName: string;
  email: string;
  role: string;
  department: string;
  status: string;
  notes?: string;
  dateOfJoining?: string;
}

export default function EmployeeDetails() {
  const { id } = useParams();
  const [emp, setEmp] = useState<Employee | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    (async () => {
      try {
        const res = await api.get(`/employees/${id}`);
        setEmp(res.data);
      } catch {
        alert("Unable to fetch employee");
        navigate("/employees");
      }
    })();
  }, [id, navigate]);

  if (!emp) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-pulse text-gray-600">Loading employee...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-purple-100 p-6 flex justify-center items-center">

      <div className="bg-white w-full max-w-3xl rounded-2xl shadow-xl p-8 animate-fade-in-up relative">

        {/* Back Button */}
        <button
          onClick={() => navigate("/employees")}
          className="absolute left-6 top-6 text-sm text-indigo-600 hover:underline"
        >
          ← Back
        </button>

        {/* Header */}
        <div className="flex items-center gap-5 mb-6">

          {/* Avatar */}
          <div className="w-16 h-16 rounded-full bg-indigo-600 text-white flex items-center justify-center text-2xl font-bold shadow-md">
            {emp.firstName[0]}
          </div>

          <div>
            <h2 className="text-2xl font-bold text-gray-800">
              {emp.firstName} {emp.lastName}
            </h2>

            <p className="text-sm text-gray-500">
              #{emp.employeeId}
            </p>
          </div>
        </div>

        {/* Badge Section */}
        <div className="flex gap-3 mb-6">
          <span className={`
            px-3 py-1 text-xs font-semibold rounded-full
            ${emp.status === "active"
              ? "bg-green-100 text-green-700"
              : "bg-gray-200 text-gray-600"}
          `}>
            {emp.status}
          </span>

          <span className={`
            px-3 py-1 text-xs font-semibold rounded-full
            ${emp.role === "admin"
              ? "bg-red-100 text-red-700"
              : emp.role === "supervisor"
                ? "bg-blue-100 text-blue-700"
                : "bg-indigo-100 text-indigo-700"}
          `}>
            {emp.role}
          </span>

          <span className="px-3 py-1 text-xs font-semibold rounded-full bg-purple-100 text-purple-700">
            {emp.department}
          </span>
        </div>

        {/* Info Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-6">

          {/* Email */}
          <div>
            <p className="text-sm text-gray-500">Email</p>
            <p className="font-medium text-gray-800">{emp.email}</p>
          </div>

          {/* Join Date */}
          <div>
            <p className="text-sm text-gray-500">Joined On</p>
            <p className="font-medium text-gray-800">
              {emp.dateOfJoining
                ? new Date(emp.dateOfJoining).toLocaleDateString()
                : "-"}
            </p>
          </div>

        </div>

        {/* Notes Section */}
        <div>
          <p className="text-sm text-gray-500 mb-1">Notes</p>
          <div className="bg-gray-50 border rounded-lg p-3 text-gray-700 min-h-[80px]">
            {emp.notes?.trim() || "No notes provided"}
          </div>
        </div>

      </div>
    </div>
  );
}
