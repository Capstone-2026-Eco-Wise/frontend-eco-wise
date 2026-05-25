import { Link } from 'react-router-dom';
import { Leaf, ArrowLeft, SearchX } from 'lucide-react';

export default function NotFoundPage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#f4f7fb] dark:bg-slate-950 px-6 text-center">
      {/* Logo */}
      <div className="flex items-center gap-2 mb-12">
        <div className="size-10 rounded-xl bg-linear-to-br from-emerald-400 to-teal-500 flex items-center justify-center shadow-lg shadow-emerald-500/20">
          <Leaf className="text-white size-6" />
        </div>
        <span className="text-2xl font-bold bg-clip-text text-transparent bg-linear-to-r from-emerald-600 to-teal-600 dark:from-emerald-400 dark:to-teal-400 tracking-tight">
          EcoWise
        </span>
      </div>

      {/* Icon */}
      <div className="size-24 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center mb-6 shadow-inner">
        <SearchX className="size-12 text-slate-400 dark:text-slate-500" />
      </div>

      {/* Text */}
      <h1 className="text-8xl font-extrabold text-slate-200 dark:text-slate-800 leading-none mb-4 select-none">
        404
      </h1>
      <h2 className="text-2xl font-bold text-slate-800 dark:text-slate-200 mb-3">
        Halaman Tidak Ditemukan
      </h2>
      <p className="text-slate-500 dark:text-slate-400 max-w-sm mb-10 leading-relaxed">
        Sepertinya halaman yang kamu cari tidak ada atau sudah dipindahkan. Mari kembali ke tempat yang aman.
      </p>

      {/* CTA */}
      <Link
        to="/"
        className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-linear-to-r from-emerald-600 to-teal-500 text-white font-bold shadow-lg shadow-emerald-500/20 hover:shadow-emerald-500/40 hover:-translate-y-0.5 transition-all"
      >
        <ArrowLeft className="size-4" />
        Kembali ke Beranda
      </Link>
    </div>
  );
}
