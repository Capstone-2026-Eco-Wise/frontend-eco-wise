import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { login } from "../features/auth/api/authApi";
import type { LoginPayLoad } from "../features/auth/types/auth";
import LoginForm from "../features/auth/components/LoginForm";
import getRedirectPath from "../features/auth/utils/roleRedirect";

export default function LoginPage() {
  const navigate = useNavigate();
  const { loginState } = useAuth();

  const handleLogin = async (payload: LoginPayLoad) => {
    const { error, data } = await login(payload);

    if (!error && data) {
      loginState(data);
      const path = getRedirectPath(data.role);
      navigate(path, { replace: true });
    } else {
      alert("Login failed! Please check your credentials.");
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
            Make the earth <br /> a better place.
          </h2>
          <p className="text-white/80 text-sm leading-relaxed max-w-xs">
            Track your environmental impact, reduce your carbon footprint, and
            join a community that cares.
          </p>
        </div>
      </div>

      {/* Right form panel */}
      <div className="flex flex-1 items-center justify-center px-6 py-12 lg:px-16">
        <div className="w-full max-w-md">
          {/* Card */}
          <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-xl shadow-slate-200/60 dark:shadow-slate-900/40 p-8 border border-slate-100 dark:border-slate-800">
            <LoginForm loginAction={handleLogin} />
          </div>

          {/* Sign up link */}
          <p className="mt-6 text-center text-sm text-gray-500 dark:text-gray-400">
            Don't have an account?{" "}
            <Link
              to="/register"
              className="font-semibold text-emerald-600 hover:text-emerald-700 dark:text-emerald-400 dark:hover:text-emerald-300 transition-colors"
            >
              Sign up for free
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
