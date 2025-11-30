import { useForm } from "react-hook-form";
import { useAppDispatch } from "../redux/hooks";
import { useNavigate } from "react-router-dom";
import { login } from "../redux/slices/authSlice";

type LoginFormData = {
  email: string;
  password: string;
};

export default function Login() {
  const { register, handleSubmit } = useForm<LoginFormData>();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const onSubmit = async (data: LoginFormData) => {
    const res = await dispatch(login(data));
    if (login.fulfilled.match(res)) navigate("/employees");
    else alert((res.payload as any)?.message || "Login failed");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-600 flex items-center justify-center px-4">

      {/* Card */}
      <div className="
        bg-white rounded-2xl shadow-2xl w-full max-w-md p-8
        animate-fade-in-up
      ">

        {/* Title */}
        <div className="text-center mb-6">
          <h1 className="text-2xl font-bold text-gray-800 tracking-wide">
            Employee Portal
          </h1>
          <p className="text-sm text-gray-500 mt-1">
            Sign in to manage employees
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">

          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">
              Email
            </label>
            <input
              {...register("email")}
              type="email"
              placeholder="Enter your email"
              className="
                w-full px-4 py-2 border border-gray-300 rounded-lg
                transition focus:scale-[1.02] focus:border-indigo-500 
                focus:ring-2 focus:ring-indigo-500 focus:outline-none
              "
            />
          </div>

          {/* Password */}
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">
              Password
            </label>
            <input
              {...register("password")}
              type="password"
              placeholder="Enter your password"
              className="
                w-full px-4 py-2 border border-gray-300 rounded-lg
                transition focus:scale-[1.02] focus:border-indigo-500 
                focus:ring-2 focus:ring-indigo-500 focus:outline-none
              "
            />
          </div>

          {/* Button */}
          <button
            type="submit"
            className="
              w-full py-2.5 rounded-lg bg-indigo-600 text-white 
              font-semibold tracking-wide shadow-lg
              transition transform duration-200
              hover:scale-[1.02] hover:bg-indigo-700 active:scale-95
            "
          >
            Sign In
          </button>
        </form>

        {/* Footer */}
        <div className="mt-6 text-center text-sm text-gray-500">
          Secure employee access system
        </div>
      </div>
    </div>
  );
}
