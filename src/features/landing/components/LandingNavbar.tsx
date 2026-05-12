import { Link } from "react-router-dom";
import { Leaf, ArrowRight } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import getRedirectPath from "@/features/auth/utils/roleRedirect";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export default function LandingNavbar() {
  const { isAuthenticated, role } = useAuth();
  const redirectPath = getRedirectPath(role || "user");

  const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    const element = document.getElementById(id);
    if (element) {
      const y = element.getBoundingClientRect().top + window.scrollY - 80;
      window.scrollTo({ top: y, behavior: "smooth" });
    }
  };

  return (
    <nav className="border-b border-slate-100 dark:border-slate-800 bg-white/80 dark:bg-slate-950/80 backdrop-blur-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="size-10 rounded-xl bg-linear-to-br from-emerald-400 to-teal-500 flex items-center justify-center shadow-lg shadow-emerald-500/20">
            <Leaf className="text-white size-6" />
          </div>
          <span className="text-2xl font-bold bg-clip-text text-transparent bg-linear-to-r from-emerald-600 to-teal-600 dark:from-emerald-400 dark:to-teal-400 tracking-tight">
            EcoWise
          </span>
        </div>

        <div className="hidden md:flex items-center gap-8">
          <a href="#beranda" onClick={(e) => scrollToSection(e, 'beranda')} className="text-emerald-500 font-semibold text-sm border-b-2 border-emerald-500 pb-1">Beranda</a>
          <a href="#fitur" onClick={(e) => scrollToSection(e, 'fitur')} className="text-emerald-400/80 hover:text-emerald-500 font-medium text-sm transition-colors pb-1 border-b-2 border-transparent">Fitur</a>
          <a href="#tentang-kami" onClick={(e) => scrollToSection(e, 'tentang-kami')} className="text-emerald-400/80 hover:text-emerald-500 font-medium text-sm transition-colors pb-1 border-b-2 border-transparent">Tentang Kami</a>
          <a href="#faq" onClick={(e) => scrollToSection(e, 'faq')} className="text-emerald-400/80 hover:text-emerald-500 font-medium text-sm transition-colors pb-1 border-b-2 border-transparent">FAQ</a>
        </div>

        <div className="flex items-center gap-4">
          {isAuthenticated ? (
            <Link
              to={redirectPath}
              className={cn(
                buttonVariants({ variant: "default" }),
                "rounded-full shadow-md bg-slate-900 hover:bg-slate-800 dark:bg-emerald-500 dark:hover:bg-emerald-400"
              )}
            >
              Go to Dashboard
            </Link>
          ) : (
            <>
              <Link
                to="/login"
                className={cn(
                  buttonVariants({ variant: "outline" }),
                  "rounded-full border-slate-200 text-slate-600 hover:text-slate-900 hover:bg-slate-50 dark:border-slate-800 dark:text-slate-300 px-6 font-medium"
                )}
              >
                Masuk
              </Link>
              <Link
                to="/register"
                className={cn(
                  buttonVariants({ variant: "default" }),
                  "rounded-full bg-[#20c997] hover:bg-[#1ba87e] text-white px-6 font-medium shadow-none border-none"
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
