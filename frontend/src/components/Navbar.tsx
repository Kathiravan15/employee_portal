import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../redux/slices/authSlice";
import { useNavigate } from "react-router-dom";
import type { RootState, AppDispatch } from "../redux/store";

export default function Navbar() {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const user = useSelector((state: RootState) => state.auth.user);

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };

  return (
    <div className="sticky top-0 z-50 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 backdrop-blur-lg shadow-xl animate-slide-down">
      
      <div className="max-w-7xl mx-auto px-6 py-3 flex justify-between items-center">
        
        {/* Left Logo */}
        <div
          onClick={() => navigate("/employees")}
          className="flex items-center gap-3 cursor-pointer"
        >
          <div className="bg-white text-indigo-600 w-9 h-9 flex items-center justify-center rounded-full font-bold shadow-md">
            EP
          </div>

          <h1 className="text-lg font-bold text-white tracking-wide">
            Employee Portal
          </h1>
        </div>

        {/* Right Side */}
        <div className="flex items-center gap-6">

          {/* User Info */}
          {user && (
            <div className="text-right">
              <div className="text-sm font-semibold text-white">
                {user.firstName}
              </div>
              <div className="text-xs text-white/80 capitalize">
                {user.role}
              </div>
            </div>
          )}

          {/* Employees Button */}
          <button
            onClick={() => navigate("/employees")}
            className="
              px-4 py-1.5 text-sm font-medium rounded-lg
              text-white bg-white/20 hover:bg-white/30
              transition-all duration-200 hover:scale-105
            "
          >
            Employees
          </button>

          {/* Logout Button */}
          <button
            onClick={handleLogout}
            className="
              px-4 py-1.5 text-sm font-medium rounded-lg
              bg-red-500 text-white
              shadow-lg transition-all duration-200
              hover:bg-red-600 hover:scale-105
              active:scale-95
            "
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
}
