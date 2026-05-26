import { Link } from "react-router-dom";
import { useSession } from "@/features/auth/hooks/useSession";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export default function HeroSection() {
  const { isAuthenticated } = useSession();

  return (
    <div id="beranda" className="max-w-7xl mx-auto px-6 pt-24 pb-32 text-center relative z-10">
      <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-50 dark:bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 font-medium text-sm mb-8 ring-1 ring-emerald-500/20">
        <span className="relative flex h-2 w-2">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
        </span>
        Bergabunglah dengan 10.000+ pejuang lingkungan hari ini
      </div>

      <h1 className="text-4xl sm:text-6xl lg:text-8xl font-extrabold text-slate-900 dark:text-white tracking-tight leading-[1.1] mb-8">
        Jadikan Bumi <br />
        <span className="text-transparent bg-clip-text bg-linear-to-r from-emerald-500 to-teal-400">
          Tempat yang Lebih Baik.
        </span>
      </h1>

      <p className="text-lg lg:text-xl text-slate-600 dark:text-slate-400 max-w-2xl mx-auto mb-12 leading-relaxed">
        Lacak dampak lingkungan Anda, kurangi jejak karbon, dan bergabunglah
        dengan komunitas yang berdedikasi untuk masa depan yang berkelanjutan.
        Langkah kecil memberikan dampak besar.
      </p>

      {!isAuthenticated && (
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            to="/register"
            className={cn(
              buttonVariants({ size: "lg", variant: "default" }),
              "w-full sm:w-auto px-8 py-6 rounded-full text-base font-bold text-white bg-slate-900 hover:bg-slate-800 dark:bg-white dark:text-slate-900 dark:hover:bg-slate-100 transition-all shadow-xl hover:-translate-y-1"
            )}
          >
            Mulai Perjalanan Anda
          </Link>
          <Link
            to="/login"
            className={cn(
              buttonVariants({ size: "lg", variant: "outline" }),
              "w-full sm:w-auto px-8 py-6 rounded-full text-base font-bold text-slate-700 bg-white border border-slate-200 hover:border-slate-300 dark:bg-slate-900 dark:text-slate-300 dark:border-slate-800 dark:hover:border-slate-700 transition-all shadow-sm hover:-translate-y-1"
            )}
          >
            Masuk
          </Link>
        </div>
      )}
    </div>
  );
}
