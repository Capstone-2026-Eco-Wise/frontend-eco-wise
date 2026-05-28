import { useLogout } from '@/features/auth/hooks/useLogout';
import { useSession } from '@/features/auth/hooks/useSession';
import { useEcoPoints } from '@/features/user/hooks/useEcoPoints';
import { Flame, Leaf, Menu, Moon, Sun, X } from 'lucide-react';
import { useTheme } from 'next-themes';
import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';

type NavbarProps = {
  navLinks: Array<{ id: string; name: string; path: string }>;
};

export const Navbar = ({ navLinks }: NavbarProps) => {
  const { userData } = useSession();
  const { pointsData, streak } = useEcoPoints({
    enabled: userData?.data?.role === 'user',
  });
  const { theme, setTheme } = useTheme();
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { pathname } = useLocation();
  const { handleLogout } = useLogout();
  const settingsPath =
    userData?.data?.role === 'admin'
      ? '/admin/pengaturan'
      : '/dashboard/pengaturan';

  return (
    <>
      <header className="bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 sticky top-0 z-50 transition-colors duration-300">
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
              const isActive = link.id === pathname;
              return (
                <Link
                  key={link.id}
                  to={link.path}
                  className={`text-sm font-bold h-full flex items-center border-b-[3px] pt-0.75 transition-colors ${
                    isActive
                      ? 'text-[#10b981] border-[#10b981]'
                      : 'text-slate-500 dark:text-slate-400 border-transparent hover:text-slate-800 dark:hover:text-slate-100'
                  }`}
                >
                  {link.name}
                </Link>
              );
            })}
          </nav>

          <div className="flex items-center gap-4 relative">
            {userData?.data?.role === 'user' && pointsData && (
              <div
                className="hidden sm:flex items-center gap-1 bg-[#fff7ed] dark:bg-orange-950/20 px-2.5 py-1 rounded-full border border-orange-100/50 dark:border-orange-900/30 mr-1 select-none"
                title={pointsData.message}
              >
                <Flame
                  className={`size-4 ${streak.flameColor} ${streak.isAnimated ? 'hover:scale-110 transition-transform' : ''}`}
                  fill={streak.isLit ? 'currentColor' : 'none'}
                />
                <span
                  className={`text-xs font-extrabold ${streak.isLit ? 'text-orange-700 dark:text-orange-400' : 'text-slate-400 dark:text-slate-500'}`}
                >
                  {streak.streakCount}
                </span>
              </div>
            )}

            <button
              onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
              className="p-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 transition-colors focus:outline-none border border-slate-100 dark:border-slate-800 flex items-center justify-center shrink-0 cursor-pointer"
              aria-label="Toggle theme"
            >
              {theme === 'dark' ? (
                <Sun className="size-4.5 text-amber-500" />
              ) : (
                <Moon className="size-4.5 text-slate-500" />
              )}
            </button>

            <div className="hidden sm:flex flex-col items-end mr-1">
              <p className="text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider leading-none mb-1">
                Eco Warrior
              </p>

              <p className="text-sm font-extrabold text-[#1e293b] dark:text-slate-100 leading-none">
                {userData?.data?.fullName}
              </p>
            </div>

            <button
              onClick={() => setIsProfileOpen(!isProfileOpen)}
              className="text-[#10b981] hover:text-[#059669] transition-all focus:outline-none flex items-center gap-2 bg-slate-50 dark:bg-slate-800 p-1.5 rounded-full border border-slate-100 dark:border-slate-700 hover:border-emerald-200 dark:hover:border-emerald-800"
            >
              <Avatar>
                <AvatarImage src={userData?.data?.avatar_url} />
                <AvatarFallback>
                  {userData?.data?.username.slice(0, 2).toUpperCase() || 'User'}
                </AvatarFallback>
              </Avatar>
            </button>

            <button
              onClick={() => setIsMobileMenuOpen(true)}
              className="md:hidden text-slate-400 hover:text-slate-700 transition-colors focus:outline-none"
            >
              <Menu className="size-7" />
            </button>

            {isProfileOpen && (
              <div className="absolute top-12 right-0 w-48 bg-white dark:bg-slate-900 rounded-xl shadow-xl shadow-slate-200/50 dark:shadow-none border border-slate-100 dark:border-slate-700 py-2 z-50 animate-in fade-in slide-in-from-top-2">
                <Link
                  to={settingsPath}
                  onClick={() => setIsProfileOpen(false)}
                  className="flex items-center px-4 py-2 text-sm font-bold text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 hover:text-[#10b981] transition-colors"
                >
                  Pengaturan Profil
                </Link>

                <div className="h-px bg-slate-100 dark:bg-slate-700 my-1" />

                <button
                  onClick={() => {
                    setIsProfileOpen(false);
                    handleLogout();
                  }}
                  className="w-full flex items-center px-4 py-2 text-sm font-bold text-red-500 hover:bg-red-50 dark:hover:bg-red-950/20 transition-colors"
                >
                  Keluar
                </button>
              </div>
            )}
          </div>
        </div>
      </header>

      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-60 flex md:hidden">
          <div
            className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm transition-opacity animate-in fade-in"
            onClick={() => setIsMobileMenuOpen(false)}
          />

          {/* Sidebar */}
          <div className="relative w-64 max-w-[80%] bg-white dark:bg-slate-900 h-full shadow-2xl flex flex-col animate-in slide-in-from-left duration-300">
            <div className="h-16 flex items-center justify-between px-6 border-b border-slate-100 dark:border-slate-800">
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
                className="text-slate-400 hover:text-slate-650 bg-slate-50 dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700 p-1.5 rounded-full transition-colors"
              >
                <X className="size-4" />
              </button>
            </div>

            <nav className="flex-1 overflow-y-auto py-6 px-4 flex flex-col gap-2">
              {navLinks.map((link) => {
                const isActive = link.id === pathname;
                return (
                  <Link
                    key={link.id}
                    to={link.path}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={`px-4 py-3 rounded-xl text-sm font-bold transition-all ${
                      isActive
                        ? 'bg-[#ecfdf5] dark:bg-[#ecfdf5]/10 text-[#10b981]'
                        : 'text-slate-600 dark:text-slate-350 hover:bg-slate-50 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-slate-100'
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
    </>
  );
};
