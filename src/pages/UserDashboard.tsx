import DashboardLayout from '@/components/common/DashboardLayout';
import { Outlet } from 'react-router-dom';

export default function UserDashboard() {
  const navLinks = [
    { id: '/dashboard', name: 'Beranda', path: '/dashboard' },
    { id: '/dashboard/scan', name: 'Pemindai', path: '/dashboard/scan' },
    { id: '/dashboard/riwayat', name: 'Riwayat', path: '/dashboard/riwayat' },
    { id: '/dashboard/riwayat-misi', name: 'Riwayat Misi', path: '/dashboard/riwayat-misi' },
    { id: '/dashboard/leaderboard', name: 'Klasemen', path: '/dashboard/leaderboard' },
  ];

  return (
    <DashboardLayout navLinks={navLinks}>
      <Outlet />
    </DashboardLayout>
  );
}
