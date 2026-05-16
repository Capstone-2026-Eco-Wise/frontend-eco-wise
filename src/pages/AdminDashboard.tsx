import DashboardLayout from '@/features/user/components/DashboardLayout';
import { Outlet } from 'react-router-dom';

export default function AdminDashboard() {
  const navLinks = [
    { id: '/admin', name: 'Beranda', path: '/admin' },
    { id: '/admin/pengguna', name: 'Pengguna', path: '/admin/pengguna' },
  ];

  return (
    <DashboardLayout navLinks={navLinks}>
      <Outlet />
    </DashboardLayout>
  );
}
