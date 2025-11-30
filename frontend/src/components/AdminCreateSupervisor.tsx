import React from "react";
import { useForm } from "react-hook-form";
import api from "../api/axios";

type SupervisorForm = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
};

export default function AdminCreateSupervisor() {
  const { register, handleSubmit, reset } = useForm<SupervisorForm>();

  const onSubmit = async (data: SupervisorForm) => {
    try {
      await api.post("/auth/create-supervisor", data);
      alert("Supervisor created successfully ✅");
      reset();
    } catch (err: any) {
      alert(err.response?.data?.message || "Error creating supervisor");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-6">

      <div className="w-full max-w-lg bg-white rounded-2xl shadow-xl p-8 animate-fade-in-up">

        {/* Header */}
        <div className="mb-6 text-center">
          <div className="w-12 h-12 mx-auto mb-3 bg-indigo-600 text-white rounded-full flex items-center justify-center font-bold text-lg shadow">
            A
          </div>
          <h1 className="text-2xl font-bold text-gray-800">
            Create Supervisor
          </h1>
          <p className="text-sm text-gray-500 mt-1">
            Add a new supervisor to your system
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">

          {/* First + Last Name */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-sm text-gray-600 mb-1 block">
                First Name
              </label>
              <input
                {...register("firstName")}
                placeholder="John"
                className="form-input"
              />
            </div>

            <div>
              <label className="text-sm text-gray-600 mb-1 block">
                Last Name
              </label>
              <input
                {...register("lastName")}
                placeholder="Doe"
                className="form-input"
              />
            </div>
          </div>

          {/* Email */}
          <div>
            <label className="text-sm text-gray-600 mb-1 block">
              Email
            </label>
            <input
              {...register("email")}
              type="email"
              placeholder="john@example.com"
              className="form-input"
            />
          </div>

          {/* Password */}
          <div>
            <label className="text-sm text-gray-600 mb-1 block">
              Password
            </label>
            <input
              {...register("password")}
              type="password"
              placeholder="Enter strong password"
              className="form-input"
            />
          </div>

          {/* Button */}
          <button
            type="submit"
            className="
              w-full py-2.5 rounded-lg bg-indigo-600 text-white
              font-semibold tracking-wide shadow-lg
              hover:bg-indigo-700 transition duration-200
              hover:scale-[1.02] active:scale-95
            "
          >
            Create Supervisor
          </button>
        </form>
      </div>

      {/* Reusable input style */}
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
