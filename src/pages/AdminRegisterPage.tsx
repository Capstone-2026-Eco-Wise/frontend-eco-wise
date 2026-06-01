import { ArrowLeft, Sun, Moon } from 'lucide-react';
import { useTheme } from 'next-themes';
import { Link } from 'react-router-dom';
import AdminRegisterForm from '../features/auth/components/AdminRegisterForm';

export default function AdminRegisterPage() {
  const { theme, setTheme } = useTheme();
  return (
    <div className="min-h-screen flex items-stretch bg-white dark:bg-slate-950 relative">
      {/* Back to Landing Button */}
      <Link
        to="/"
        className="absolute top-5 left-5 z-50 flex items-center gap-2 px-3.5 py-2 rounded-full bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 text-sm font-semibold hover:bg-white dark:hover:bg-slate-800 hover:text-emerald-600 dark:hover:text-emerald-400 hover:border-emerald-200 dark:hover:border-emerald-800 transition-all shadow-sm hover:shadow-md group"
      >
        <ArrowLeft className="size-4 transition-transform group-hover:-translate-x-0.5" />
        Beranda
      </Link>

      {/* Dark Mode Toggle */}
      <button
        onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
        className="absolute top-5 right-5 z-50 p-2.5 rounded-full bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm border border-slate-200 dark:border-slate-700 text-slate-500 dark:text-slate-400 hover:bg-white dark:hover:bg-slate-800 hover:text-slate-700 dark:hover:text-slate-200 hover:border-slate-300 dark:hover:border-slate-600 transition-all shadow-sm hover:shadow-md cursor-pointer"
        aria-label="Toggle theme"
      >
        {theme === 'dark' ? (
          <Sun className="size-4 text-amber-500" />
        ) : (
          <Moon className="size-4" />
        )}
      </button>

      {/* Left decorative panel */}
      <div className="hidden lg:flex lg:w-2/5 bg-linear-to-br from-teal-400 via-emerald-500 to-cyan-400 relative overflow-hidden">
        {/* Blurred blobs */}
        <div className="absolute -top-20 -left-20 w-80 h-80 bg-white/20 rounded-full blur-3xl" />
        <div className="absolute -bottom-15 -right-15 -w-65 -h-65 bg-teal-300/30 rounded-full blur-2xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-50 h-50 bg-white/10 rounded-full blur-2xl" />

        {/* Brand / illustration text */}
        <div className="relative z-10 flex flex-col justify-end p-12 text-white">
          <span className="text-xs font-semibold uppercase tracking-widest text-white/70 mb-3">
            EcoWise Admin
          </span>
          <h2 className="text-4xl font-bold leading-tight mb-4">
            Kelola platform <br /> EcoWise Anda.
          </h2>
          <p className="text-white/80 text-sm leading-relaxed max-w-xs">
            Daftar sebagai admin untuk mengelola pengguna, konten, dan statistik platform secara efektif.
          </p>
        </div>
      </div>

      {/* Right form panel */}
      <div className="flex flex-1 items-center justify-center px-6 py-12 lg:px-16">
        <div className="w-full max-w-md">
          {/* Card */}
          <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-xl shadow-slate-200/60 dark:shadow-slate-900/40 p-8 border border-slate-100 dark:border-slate-800">
            <AdminRegisterForm />
          </div>

          {/* Login link */}
          <p className="mt-6 text-center text-sm text-gray-500 dark:text-gray-400">
            Sudah punya akun?{' '}
            <Link
              to="/login"
              className="font-semibold text-emerald-600 hover:text-emerald-700 dark:text-emerald-400 dark:hover:text-emerald-300 transition-colors"
            >
              Masuk di sini
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
