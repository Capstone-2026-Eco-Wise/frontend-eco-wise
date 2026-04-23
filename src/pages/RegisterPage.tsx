import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { register } from "../features/auth/api/authApi";
import type { RegisterPayLoad } from "../features/auth/types/auth";
import RegisterForm from "../features/auth/components/RegisterForm";

export default function RegisterPage() {
  const navigate = useNavigate();

  const handleRegister = async (payload: RegisterPayLoad) => {
    const { error } = await register(payload);

    if (!error) {
      alert("Registration successful! Please login.");
      navigate("/login", { replace: true });
    } else {
      alert("Registration failed! Please check your details.");
    }
  };

  return (
    <div className="min-h-screen flex items-stretch bg-white dark:bg-slate-950">
      {/* Left decorative panel */}
      <div className="hidden lg:flex lg:w-2/5 bg-linear-to-br from-teal-400 via-emerald-500 to-cyan-400 relative overflow-hidden">
        {/* Blurred blobs */}
        <div className="absolute top-[-80px] left-[-80px] w-[320px] h-[320px] bg-white/20 rounded-full blur-3xl" />
        <div className="absolute bottom-[-60px] right-[-60px] w-[260px] h-[260px] bg-teal-300/30 rounded-full blur-2xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[200px] h-[200px] bg-white/10 rounded-full blur-2xl" />

        {/* Brand / illustration text */}
        <div className="relative z-10 flex flex-col justify-end p-12 text-white">
          <span className="text-xs font-semibold uppercase tracking-widest text-white/70 mb-3">
            EcoWise
          </span>
          <h2 className="text-4xl font-bold leading-tight mb-4">
            Start your <br /> green journey.
          </h2>
          <p className="text-white/80 text-sm leading-relaxed max-w-xs">
            Join thousands of people who are actively reducing their carbon
            footprint and making a difference every day.
          </p>
        </div>
      </div>

      {/* Right form panel */}
      <div className="flex flex-1 items-center justify-center px-6 py-12 lg:px-16">
        <div className="w-full max-w-md">
          {/* Card */}
          <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-xl shadow-slate-200/60 dark:shadow-slate-900/40 p-8 border border-slate-100 dark:border-slate-800">
            <RegisterForm registerAction={handleRegister} />
          </div>

          {/* Login link */}
          <p className="mt-6 text-center text-sm text-gray-500 dark:text-gray-400">
            Already have an account?{" "}
            <Link
              to="/login"
              className="font-semibold text-emerald-600 hover:text-emerald-700 dark:text-emerald-400 dark:hover:text-emerald-300 transition-colors"
            >
              Sign in here
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
