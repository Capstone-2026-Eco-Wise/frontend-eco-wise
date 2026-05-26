import { buttonVariants } from '@/components/ui/button';
import { useSession } from '@/features/auth/hooks/useSession';
import { cn } from '@/lib/utils';
import { Leaf, Sun, Moon } from 'lucide-react';
import { useTheme } from 'next-themes';
import { Link } from 'react-router-dom';

export default function LandingNavbar() {
  const { userData } = useSession();
  const { theme, setTheme } = useTheme();
  const redirectPath = userData?.data?.role === 'admin' ? '/admin' : '/dashboard';

  const scrollToSection = (
    e: React.MouseEvent<HTMLAnchorElement>,
    id: string,
  ) => {
    e.preventDefault();
    const element = document.getElementById(id);
    if (element) {
      const y = element.getBoundingClientRect().top + window.scrollY - 80;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  };

  return (
    <nav className="border-b border-slate-100 dark:border-slate-800 bg-white/80 dark:bg-slate-950/80 backdrop-blur-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-20 flex items-center justify-between">
        <div className="flex items-center gap-1.5 sm:gap-2">
          <div className="size-8 sm:size-10 rounded-xl bg-linear-to-br from-emerald-400 to-teal-500 flex items-center justify-center shadow-lg shadow-emerald-500/20 shrink-0">
            <Leaf className="text-white size-5 sm:size-6" />
          </div>
          <span className="text-lg sm:text-2xl font-bold bg-clip-text text-transparent bg-linear-to-r from-emerald-600 to-teal-600 dark:from-emerald-400 dark:to-teal-400 tracking-tight">
            EcoWise
          </span>
        </div>

        <div className="hidden md:flex items-center gap-8">
          <a
            href="#beranda"
            onClick={(e) => scrollToSection(e, 'beranda')}
            className="text-emerald-500 font-semibold text-sm border-b-2 border-emerald-500 pb-1"
          >
            Beranda
          </a>
          <a
            href="#fitur"
            onClick={(e) => scrollToSection(e, 'fitur')}
            className="text-emerald-400/80 hover:text-emerald-500 font-medium text-sm transition-colors pb-1 border-b-2 border-transparent"
          >
            Fitur
          </a>
          <a
            href="#tentang-kami"
            onClick={(e) => scrollToSection(e, 'tentang-kami')}
            className="text-emerald-400/80 hover:text-emerald-500 font-medium text-sm transition-colors pb-1 border-b-2 border-transparent"
          >
            Tentang Kami
          </a>
          <a
            href="#faq"
            onClick={(e) => scrollToSection(e, 'faq')}
            className="text-emerald-400/80 hover:text-emerald-500 font-medium text-sm transition-colors pb-1 border-b-2 border-transparent"
          >
            FAQ
          </a>
        </div>

        <div className="flex items-center gap-2 sm:gap-3">
          <button
            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
            className="p-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 transition-colors focus:outline-none border border-slate-100 dark:border-slate-800 flex items-center justify-center shrink-0 cursor-pointer"
            aria-label="Toggle theme"
          >
            {theme === 'dark' ? (
              <Sun className="size-4 text-amber-500" />
            ) : (
              <Moon className="size-4 text-slate-500" />
            )}
          </button>

          {userData ? (
            <Link
              to={redirectPath}
              className={cn(
                buttonVariants({ variant: 'default' }),
                'rounded-full shadow-md bg-slate-900 hover:bg-slate-800 dark:bg-emerald-500 dark:hover:bg-emerald-400 text-xs sm:text-sm px-3.5 sm:px-6 py-1.5 sm:py-2',
              )}
            >
              Go to Dashboard
            </Link>
          ) : (
            <>
              <Link
                to="/login"
                className={cn(
                  buttonVariants({ variant: 'outline' }),
                  'rounded-full border-slate-200 text-slate-600 hover:text-slate-900 hover:bg-slate-50 dark:border-slate-800 dark:text-slate-300 px-3.5 sm:px-6 text-xs sm:text-sm font-medium',
                )}
              >
                Masuk
              </Link>
              <Link
                to="/register"
                className={cn(
                  buttonVariants({ variant: 'default' }),
                  'rounded-full bg-[#20c997] hover:bg-[#1ba87e] text-white px-3.5 sm:px-6 text-xs sm:text-sm font-medium shadow-none border-none',
                )}
              >
                Daftar
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}
