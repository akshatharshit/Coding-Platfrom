import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, NavLink } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { registerUser } from "../authSlice";
import Lottie from "lottie-react";
import animationData from "../assets/Programming Computer.json"

const signupSchema = z.object({
  firstName: z.string().min(3, "Minimum character should be 3"),
  emailId: z.string().email("Invalid Email"),
  password: z.string().min(8, "Password is too weak"),
});

function Signup() {
  const [showPassword, setShowPassword] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isAuthenticated, loading, error } = useSelector((state) => state.auth);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: zodResolver(signupSchema) });

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/");
    }
  }, [isAuthenticated, navigate]);

  const onSubmit = (data) => {
    dispatch(registerUser(data));
  };

  return (
    <div className="min-h-screen flex items-center justify-center 
                    bg-gradient-to-br from-blue-200 via-violet-200 to-pink-200 
                    dark:from-blue-900 dark:via-purple-900 dark:to-black 
                    transition-colors duration-300 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-md rounded-2xl shadow-xl 
                      bg-white/90 dark:bg-neutral-900/80 ring-1 
                      ring-gray-200 dark:ring-neutral-800 p-8">
        <div className="w-full flex flex-col items-center">
          <Lottie
            animationData={animationData}
            loop
            className="w-28 h-28 mb-4"
            style={{ minWidth: 70, minHeight: 70, maxWidth: 130, maxHeight: 130 }}
          />
          <h2 className="text-3xl font-extrabold bg-gradient-to-r from-sky-600 to-pink-500 bg-clip-text text-transparent select-none mb-2 text-center">
            Leet
          </h2>
        </div>

        {error && (
          <div className="w-full text-center text-red-600 bg-red-100 dark:bg-red-900/40 px-3 py-2 rounded shadow-inner text-sm font-semibold mb-6 select-none" role="alert">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit(onSubmit)} noValidate className="flex flex-col gap-6">
          {/* First Name */}
          <div>
            <label className="block text-sm font-bold mb-1 text-neutral-800 dark:text-neutral-200">
              First Name
            </label>
            <input
              type="text"
              placeholder="John"
              className={`w-full px-3 py-2 rounded-[0.7rem] border font-medium bg-white dark:bg-neutral-800 transition focus:outline-none focus:ring-2 focus:ring-sky-400 text-sm ${errors.firstName ? "border-red-500" : "border-gray-300 dark:border-neutral-700"
                }`}
              {...register("firstName")}
              aria-invalid={errors.firstName ? "true" : "false"}
              aria-describedby="firstName-error"
              autoComplete="given-name"
            />
            {errors.firstName && (
              <p id="firstName-error" className="text-xs text-red-500 mt-1">
                {errors.firstName.message}
              </p>
            )}
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm font-bold mb-1 text-neutral-800 dark:text-neutral-200">
              Email
            </label>
            <input
              type="email"
              placeholder="john@example.com"
              className={`w-full px-3 py-2 rounded-[0.7rem] border font-medium bg-white dark:bg-neutral-800 transition focus:outline-none focus:ring-2 focus:ring-sky-400 text-sm ${errors.emailId ? "border-red-500" : "border-gray-300 dark:border-neutral-700"
                }`}
              {...register("emailId")}
              aria-invalid={errors.emailId ? "true" : "false"}
              aria-describedby="email-error"
              autoComplete="email"
            />
            {errors.emailId && (
              <p id="email-error" className="text-xs text-red-500 mt-1">
                {errors.emailId.message}
              </p>
            )}
          </div>

          {/* Password */}
          <div className="relative">
            <label className="block text-sm font-bold mb-1 text-neutral-800 dark:text-neutral-200">
              Password
            </label>
            <input
              type={showPassword ? "text" : "password"}
              placeholder="••••••••"
              className={`w-full px-3 py-2 pr-10 rounded-[0.7rem] border font-medium bg-white dark:bg-neutral-800 transition focus:outline-none focus:ring-2 focus:ring-sky-400 text-sm ${errors.password ? "border-red-500" : "border-gray-300 dark:border-neutral-700"
                }`}
              {...register("password")}
              aria-invalid={errors.password ? "true" : "false"}
              aria-describedby="password-error"
              autoComplete="new-password"
            />
            <button
              type="button"
              onClick={() => setShowPassword((v) => !v)}
              className="absolute top-1/2 right-3 -translate-y-1/2 text-neutral-400 hover:text-neutral-700 dark:hover:text-neutral-200 transition"
              aria-label={showPassword ? "Hide password" : "Show password"}
              tabIndex={-1}
              title={showPassword ? "Hide password" : "Show password"}
            >
              {showPassword ? (
                <svg xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5" fill="none" viewBox="0 0 24 24"
                  stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round"
                    d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M3 3l18 18" />
                </svg>
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5" fill="none" viewBox="0 0 24 24"
                  stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round"
                    d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round"
                    d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
              )}
            </button>
            {errors.password && (
              <p id="password-error" className="text-xs text-red-500 mt-1">
                {errors.password.message}
              </p>
            )}
          </div>

          <button
            type="submit"
            disabled={loading}
            className={`w-full py-2.5 rounded-xl font-semibold text-base bg-gradient-to-r from-sky-400 to-pink-400 text-white shadow-md transition ${loading ? "opacity-75 cursor-not-allowed" : "hover:from-pink-400 hover:to-sky-400 hover:scale-[1.04]"
              }`}
          >
            {loading ? "Signing up..." : "Sign Up"}
          </button>
        </form>

        <p className="mt-5 text-sm text-neutral-500 dark:text-neutral-400 select-none text-center">
          Already have an account?{" "}
          <NavLink
            to="/login"
            className="font-bold text-sky-700 dark:text-sky-300 underline hover:text-pink-500 dark:hover:text-pink-400"
          >
            Login
          </NavLink>
        </p>
      </div>
    </div>
  );
}

export default Signup;
