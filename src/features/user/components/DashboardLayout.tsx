import { useState } from "react";
import { UserCircle, Leaf, Menu, X } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { Link, useSearchParams } from "react-router-dom";
import type { DashboardLayoutProps } from "../types";

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  const { logoutState } = useAuth();
  const [searchParams] = useSearchParams();
  const currentTab = searchParams.get("tab") || "beranda";
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navLinks = [
    { name: "Beranda", id: "beranda", path: "/dashboard?tab=beranda" },
    { name: "Pemindai", id: "scanner", path: "/dashboard?tab=scanner" },
    { name: "Riwayat", id: "riwayat", path: "/dashboard?tab=riwayat" },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-[#f4f7fb] font-sans">
      {/* Top Navbar */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2">
            <div className="size-8 rounded-lg bg-linear-to-br from-emerald-400 to-teal-500 flex items-center justify-center shadow-lg shadow-emerald-500/20">
              <Leaf className="text-white size-5" />
            </div>
            <span className="text-xl font-bold bg-clip-text text-transparent bg-linear-to-r from-emerald-600 to-teal-600 tracking-tight">
              EcoWise
            </span>
          </Link>

          <nav className="hidden md:flex items-center gap-8 h-full">
            {navLinks.map((link) => {
              const isActive = link.id === currentTab;
              return (
                <Link
                  key={link.id}
                  to={link.path}
                  className={`text-sm font-bold h-full flex items-center border-b-[3px] pt-[3px] transition-colors ${
                    isActive
                      ? "text-[#10b981] border-[#10b981]"
                      : "text-slate-500 border-transparent hover:text-slate-800"
                  }`}
                >
                  {link.name}
                </Link>
              );
            })}
          </nav>

          <div className="flex items-center gap-4 relative">
            <div className="hidden sm:flex flex-col items-end mr-1">
              <p className="text-xs font-bold text-slate-400 uppercase tracking-wider leading-none mb-1">
                Eco Warrior
              </p>
              <p className="text-sm font-extrabold text-[#1e293b] leading-none">
                {(useAuth() as any).user?.user_metadata?.full_name || "User"}
              </p>
            </div>
            <button
              onClick={() => setIsProfileOpen(!isProfileOpen)}
              className="text-[#10b981] hover:text-[#059669] transition-all focus:outline-none flex items-center gap-2 bg-slate-50 p-1.5 rounded-full border border-slate-100 hover:border-emerald-200"
            >
              <UserCircle className="size-8" />
            </button>
            <button
              onClick={() => setIsMobileMenuOpen(true)}
              className="md:hidden text-slate-400 hover:text-slate-700 transition-colors focus:outline-none"
            >
              <Menu className="size-7" />
            </button>

            {isProfileOpen && (
              <div className="absolute top-12 right-0 w-48 bg-white rounded-xl shadow-xl shadow-slate-200/50 border border-slate-100 py-2 z-50 animate-in fade-in slide-in-from-top-2">
                <Link
                  to="/dashboard?tab=pengaturan"
                  onClick={() => setIsProfileOpen(false)}
                  className="flex items-center px-4 py-2 text-sm font-bold text-slate-700 hover:bg-slate-50 hover:text-[#10b981] transition-colors"
                >
                  Pengaturan Profil
                </Link>
                <div className="h-px bg-slate-100 my-1" />
                <button
                  onClick={() => {
                    setIsProfileOpen(false);
                    logoutState();
                  }}
                  className="w-full flex items-center px-4 py-2 text-sm font-bold text-red-500 hover:bg-red-50 transition-colors"
                >
                  Keluar
                </button>
              </div>
            )}
          </div>
        </div>
      </header>

      {/* Mobile Sidebar Overlay */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-60 flex md:hidden">
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm transition-opacity animate-in fade-in"
            onClick={() => setIsMobileMenuOpen(false)}
          />

          {/* Sidebar */}
          <div className="relative w-64 max-w-[80%] bg-white h-full shadow-2xl flex flex-col animate-in slide-in-from-left duration-300">
            <div className="h-16 flex items-center justify-between px-6 border-b border-slate-100">
              <Link
                to="/"
                className="flex items-center gap-2"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <div className="size-6 rounded-md bg-linear-to-br from-emerald-400 to-teal-500 flex items-center justify-center shadow-sm">
                  <Leaf className="text-white size-3.5" />
                </div>
                <span className="text-lg font-bold bg-clip-text text-transparent bg-linear-to-r from-emerald-600 to-teal-600 tracking-tight">
                  EcoWise
                </span>
              </Link>
              <button
                onClick={() => setIsMobileMenuOpen(false)}
                className="text-slate-400 hover:text-slate-600 bg-slate-50 hover:bg-slate-100 p-1.5 rounded-full transition-colors"
              >
                <X className="size-4" />
              </button>
            </div>

            <nav className="flex-1 overflow-y-auto py-6 px-4 flex flex-col gap-2">
              {navLinks.map((link) => {
                const isActive = link.id === currentTab;
                return (
                  <Link
                    key={link.id}
                    to={link.path}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={`px-4 py-3 rounded-xl text-sm font-bold transition-all ${
                      isActive
                        ? "bg-[#ecfdf5] text-[#10b981]"
                        : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                    }`}
                  >
                    {link.name}
                  </Link>
                );
              })}
            </nav>
          </div>
        </div>
      )}

      {/* Main Content */}
      <main className="flex-1 max-w-7xl mx-auto w-full px-6 py-10">
        {children}
      </main>

      {/* Footer */}
      <footer className="bg-[#f8fafc] border-t border-slate-200 mt-auto">
        <div className="max-w-7xl mx-auto px-6 py-10 flex flex-col lg:flex-row items-center justify-between gap-6">
          <Link to="/" className="flex items-center gap-2 mb-2 lg:mb-0">
            <div className="size-8 rounded-lg bg-linear-to-br from-emerald-400 to-teal-500 flex items-center justify-center shadow-lg shadow-emerald-500/20">
              <Leaf className="text-white size-5" />
            </div>
            <span className="text-xl font-bold bg-clip-text text-transparent bg-linear-to-r from-emerald-600 to-teal-600 tracking-tight">
              EcoWise
            </span>
          </Link>
          <div className="flex flex-wrap justify-center items-center gap-6 md:gap-8 text-xs font-extrabold text-slate-400 tracking-wider">
            <Link to="#" className="hover:text-slate-600 transition-colors">
              KEBIJAKAN PRIVASI
            </Link>
            <Link to="#" className="hover:text-slate-600 transition-colors">
              SYARAT KETENTUAN
            </Link>
            <Link to="#" className="hover:text-slate-600 transition-colors">
              LAPORAN KEBERLANJUTAN
            </Link>
            <Link to="#" className="hover:text-slate-600 transition-colors">
              HUBUNGI KAMI
            </Link>
          </div>
          <p className="text-xs text-slate-400 font-bold text-center lg:text-right max-w-[200px]">
            © 2026 ECO-WISE LIVING LABORATORY. HAK CIPTA DILINDUNGI.
          </p>
        </div>
      </footer>
    </div>
  );
}
