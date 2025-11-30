import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { createEmployee, updateEmployee } from "../redux/slices/employeeSlice";
import api from "../api/axios";
import { useNavigate, useParams } from "react-router-dom";
import type { AppDispatch } from "../redux/store";

interface EmployeeFormData {
  firstName: string;
  lastName: string;
  email: string;
  employeeId: string;
  department: string;
  role: string;
  status: "active" | "inactive";
  dateOfJoining?: string;
  notes?: string;
}

export default function EmployeeForm() {
  const { id } = useParams<{ id: string }>();
  const isEdit = !!id;

  const { register, handleSubmit, reset } = useForm<EmployeeFormData>();
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  useEffect(() => {
    if (id) {
      (async () => {
        try {
          const res = await api.get(`/employees/${id}`);
          const data = res.data;

          reset({
            firstName: data.firstName,
            lastName: data.lastName,
            email: data.email,
            employeeId: data.employeeId,
            department: data.department,
            role: data.role,
            status: data.status,
            dateOfJoining: data.dateOfJoining?.split("T")[0] || "",
            notes: data.notes || ""
          });
        } catch {
          alert("Unable to fetch employee");
          navigate("/employees");
        }
      })();
    }
  }, [id, reset, navigate]);

  const onSubmit = async (data: EmployeeFormData) => {
    try {
      if (id) {
        await dispatch(updateEmployee({ id, data }));
      } else {
        await dispatch(createEmployee(data));
      }
      navigate("/employees");
    } catch {
      alert("Something went wrong");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6 flex justify-center items-center">

      <div className="w-full max-w-3xl bg-white rounded-2xl shadow-xl p-8 animate-fade-in-up">

        {/* Header */}
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-800">
            {isEdit ? "Edit Employee" : "Create Employee"}
          </h1>
          <p className="text-sm text-gray-500 mt-1">
            Fill all required employee details carefully
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">

          <div className="grid md:grid-cols-2 gap-5">

            {/* First Name */}
            <div>
              <label className="block text-sm text-gray-600 mb-1">First Name</label>
              <input
                {...register("firstName")}
                className="form-input"
                placeholder="John"
              />
            </div>

            {/* Last Name */}
            <div>
              <label className="block text-sm text-gray-600 mb-1">Last Name</label>
              <input
                {...register("lastName")}
                className="form-input"
                placeholder="Doe"
              />
            </div>

            {/* Email */}
            <div className="md:col-span-2">
              <label className="block text-sm text-gray-600 mb-1">Email</label>
              <input
                {...register("email")}
                type="email"
                className="form-input"
                placeholder="john@example.com"
              />
            </div>

            {/* Employee ID */}
            <div>
              <label className="block text-sm text-gray-600 mb-1">Employee ID</label>
              <input
                {...register("employeeId")}
                className="form-input"
                placeholder="EMP001"
              />
            </div>

            {/* Department */}
            <div>
              <label className="block text-sm text-gray-600 mb-1">Department</label>
              <input
                {...register("department")}
                className="form-input"
                placeholder="Human Resources"
              />
            </div>

            {/* Role */}
            <div>
              <label className="block text-sm text-gray-600 mb-1">Role</label>
              <input
                {...register("role")}
                className="form-input"
                placeholder="Manager"
              />
            </div>

            {/* Date */}
            <div>
              <label className="block text-sm text-gray-600 mb-1">Date of Joining</label>
              <input
                {...register("dateOfJoining")}
                type="date"
                className="form-input"
              />
            </div>

            {/* Status */}
            <div>
              <label className="block text-sm text-gray-600 mb-1">Status</label>
              <select {...register("status")} className="form-input">
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
              </select>
            </div>

            {/* Notes */}
            <div className="md:col-span-2">
              <label className="block text-sm text-gray-600 mb-1">Notes</label>
              <textarea
                {...register("notes")}
                rows={3}
                className="form-input resize-none"
                placeholder="Extra information..."
              />
            </div>
          </div>

          {/* Buttons */}
          <div className="flex justify-end gap-4 pt-4 border-t">

            <button
              type="button"
              onClick={() => navigate("/employees")}
              className="px-5 py-2 border rounded-lg hover:bg-gray-100 transition"
            >
              Cancel
            </button>

            <button
              type="submit"
              className="px-6 py-2 bg-indigo-600 text-white rounded-lg shadow hover:bg-indigo-700 hover:scale-105 transition"
            >
              {isEdit ? "Update Employee" : "Create Employee"}
            </button>

          </div>
        </form>
      </div>

      {/* Input global style */}
      <style>{`
        .form-input {
          width: 100%;
          padding: 0.6rem 0.9rem;
          border-radius: 0.5rem;
          border: 1px solid #d1d5db;
          outline: none;
          transition: 0.2s;
        }
        .form-input:focus {
          border-color: #6366f1;
          box-shadow: 0 0 0 2px rgba(99, 102, 241, 0.3);
        }
      `}</style>

    </div>
  );
}
