import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

export default function CTASection() {
  return (
    <section className="py-24 bg-emerald-600 dark:bg-slate-950 border-t border-emerald-500/20 dark:border-slate-900">
      <div className="max-w-4xl mx-auto px-6 text-center">
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-white mb-6 leading-tight">
          Jadilah Pahlawan untuk Bumi yang Lebih Hijau
        </h2>
        
        <p className="text-lg text-emerald-50 dark:text-slate-400 max-w-2xl mx-auto mb-10">
          Bergabung dengan ribuan pengguna lainnya di EcoWise. Kumpulkan poin,
          tukarkan hadiah menarik, dan ciptakan dampak nyata untuk lingkungan
          kita.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            to="/register"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-xl bg-white text-emerald-700 hover:bg-slate-50 dark:bg-emerald-600 dark:text-white dark:hover:bg-emerald-500 font-bold transition-colors shadow-lg shadow-emerald-950/20 dark:shadow-none"
          >
            Daftar Sekarang
            <ArrowRight className="size-5" />
          </Link>
          <Link
            to="/login"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white font-bold transition-colors border border-emerald-500/50 dark:bg-slate-900 dark:hover:bg-slate-800 dark:border-slate-800"
          >
            Masuk ke Akun
          </Link>
        </div>
      </div>
    </section>
  );
}


