import { Leaf } from 'lucide-react';
import { Link } from 'react-router-dom';

export const Footer = () => {
  return (
    <footer className="bg-[#f8fafc] dark:bg-slate-900/50 border-t border-slate-200 dark:border-slate-800 mt-auto transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-6 py-10 flex flex-col lg:flex-row items-center justify-between gap-6">
        <Link to="/" className="flex items-center gap-2 mb-2 lg:mb-0">
          <div className="size-8 rounded-lg bg-linear-to-br from-emerald-400 to-teal-500 flex items-center justify-center shadow-lg shadow-emerald-500/20">
            <Leaf className="text-white size-5" />
          </div>
          <span className="text-xl font-bold bg-clip-text text-transparent bg-linear-to-r from-emerald-600 to-teal-600 dark:from-emerald-400 dark:to-teal-400 tracking-tight">
            EcoWise
          </span>
        </Link>
        <div className="flex flex-wrap justify-center items-center gap-6 md:gap-8 text-xs font-extrabold text-slate-400 dark:text-slate-500 tracking-wider">
          <Link to="#" className="hover:text-slate-600 dark:hover:text-slate-300 transition-colors">
            KEBIJAKAN PRIVASI
          </Link>
          <Link to="#" className="hover:text-slate-600 dark:hover:text-slate-300 transition-colors">
            SYARAT KETENTUAN
          </Link>
          <Link to="#" className="hover:text-slate-600 dark:hover:text-slate-300 transition-colors">
            LAPORAN KEBERLANJUTAN
          </Link>
          <Link to="#" className="hover:text-slate-600 dark:hover:text-slate-300 transition-colors">
            HUBUNGI KAMI
          </Link>
        </div>
        <p className="text-xs text-slate-400 dark:text-slate-500 font-bold text-center lg:text-right max-w-50">
          © 2026 ECO-WISE LIVING LABORATORY. HAK CIPTA DILINDUNGI.
        </p>
      </div>
    </footer>
  );
};
