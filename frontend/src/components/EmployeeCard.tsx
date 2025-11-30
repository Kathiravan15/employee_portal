import React from "react";

interface Employee {
  _id: string;
  firstName: string;
  lastName: string;
  employeeId: string;
  email: string;
  department: string;
  role: string;
  status: string;
}

interface EmployeeCardProps {
  emp: Employee;
  onEdit: (emp: Employee) => void;
  onDelete: (emp: Employee) => void;
}

export default function EmployeeCard({ emp, onEdit, onDelete }: EmployeeCardProps) {
  return (
    <div className="
      bg-white rounded-xl shadow-md p-5
      flex flex-col sm:flex-row sm:items-center justify-between
      hover:shadow-lg transition-all duration-300
      border border-gray-100
      animate-fade-in-up
    ">

      {/* Left Section */}
      <div className="flex items-center gap-4 mb-4 sm:mb-0">

        {/* Avatar */}
        <div className="w-12 h-12 rounded-full bg-indigo-100 text-indigo-600 flex items-center justify-center font-bold text-lg">
          {emp.firstName[0]}
        </div>

        {/* Info */}
        <div>
          <div className="font-semibold text-gray-800 text-base">
            {emp.firstName} {emp.lastName}
            <span className="text-xs text-gray-400 ml-2">
              #{emp.employeeId}
            </span>
          </div>

          <div className="text-sm text-gray-600 mt-0.5">
            {emp.department} • {emp.email}
          </div>

          {/* Role badge */}
          <span className={`
            inline-block mt-1 px-2 py-0.5 text-xs rounded-full font-medium
            ${emp.role === "admin" 
              ? "bg-red-100 text-red-600" 
              : emp.role === "supervisor"
              ? "bg-blue-100 text-blue-600"
              : "bg-green-100 text-green-600"}
          `}>
            {emp.role}
          </span>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex gap-2 justify-end">

        <button
          onClick={() => onEdit(emp)}
          className="
            px-4 py-1.5 rounded-lg border border-gray-300
            text-gray-700 text-sm
            hover:bg-gray-100
            transition duration-200
            hover:scale-105 active:scale-95
          "
        >
          Edit
        </button>

        <button
          onClick={() => onDelete(emp)}
          className="
            px-4 py-1.5 rounded-lg
            bg-red-500 text-white text-sm
            shadow-sm
            hover:bg-red-600
            transition duration-200
            hover:scale-105 active:scale-95
          "
        >
          Delete
        </button>

      </div>
    </div>
  );
}
