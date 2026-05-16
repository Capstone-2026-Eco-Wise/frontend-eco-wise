import { Link } from 'react-router-dom';
import LoginForm from '../features/auth/components/LoginForm';

export default function LoginPage() {
  return (
    <div className="min-h-screen flex items-stretch bg-white dark:bg-slate-950">
      {/* Left decorative panel */}
      <div className="hidden lg:flex lg:w-2/5 bg-linear-to-br from-teal-400 via-emerald-500 to-cyan-400 relative overflow-hidden">
        {/* Blurred blobs */}
        <div className="absolute -top-20 -left-20 w-80 h-80 bg-white/20 rounded-full blur-3xl" />
        <div className="absolute -bottom-15 -right-15 -w-65 -h-65 bg-teal-300/30 rounded-full blur-2xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-50 h-50 bg-white/10 rounded-full blur-2xl" />

        {/* Brand / illustration text */}
        <div className="relative z-10 flex flex-col justify-end p-12 text-white">
          <span className="text-xs font-semibold uppercase tracking-widest text-white/70 mb-3">
            EcoWise
          </span>
          <h2 className="text-4xl font-bold leading-tight mb-4">
            Jadikan bumi <br /> tempat yang lebih baik.
          </h2>
          <p className="text-white/80 text-sm leading-relaxed max-w-xs">
            Masuk untuk mengakses dashboard analitik lingkungan Anda dan terus
            membangun ekosisem yang lebih cerdas
          </p>
        </div>
      </div>

      {/* Right form panel */}
      <div className="flex flex-1 items-center justify-center px-6 py-12 lg:px-16">
        <div className="w-full max-w-md">
          {/* Card */}
          <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-xl shadow-slate-200/60 dark:shadow-slate-900/40 p-8 border border-slate-100 dark:border-slate-800">
            <LoginForm />
          </div>

          {/* Sign up link */}
          <p className="mt-6 text-center text-sm text-gray-500 dark:text-gray-400">
            Belum punya akun?{' '}
            <Link
              to="/register"
              className="font-semibold text-emerald-600 hover:text-emerald-700 dark:text-emerald-400 dark:hover:text-emerald-300 transition-colors"
            >
              Daftar gratis
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
