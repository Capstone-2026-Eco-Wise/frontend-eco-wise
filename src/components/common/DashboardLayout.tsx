import { Footer } from './Footer';
import { Navbar } from './Navbar';
import type { ReactNode } from 'react';

type DashboardLayoutProps = {
  children: ReactNode;
  navLinks: Array<{ id: string; name: string; path: string }>;
};

export default function DashboardLayout({
  children,
  navLinks,
}: DashboardLayoutProps) {
  return (
    <div className="min-h-screen flex flex-col bg-[#f4f7fb] font-sans">
      <Navbar navLinks={navLinks} />

      <main className="flex-1 max-w-7xl mx-auto w-full px-6 py-10">
        {children}
      </main>

      <Footer />
    </div>
  );
}
