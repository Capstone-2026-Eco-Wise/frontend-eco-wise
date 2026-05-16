import DashboardLayout from "@/features/user/components/DashboardLayout";
import { Outlet } from "react-router-dom";

export default function AdminDashboard() {
  const navLinks = [
    { id: "/admin", name: "Beranda", path: "/admin" },
    {
      id: "/admin/user",
      name: "Manajemen Users",
      path: "/admin/user",
    },
    { id: "/admin/faq", name: "Manajemen FAQ", path: "/admin/faq" },
    {
      id: "/admin/daily-tasks",
      name: "Daily Tasks",
      path: "/admin/daily-tasks",
    },
    {
      id: "/admin/kategori",
      name: "Kategori Sampah",
      path: "/admin/kategori",
    },
  ];

  return (
    <DashboardLayout navLinks={navLinks}>
      <Outlet />
    </DashboardLayout>
  );
}
