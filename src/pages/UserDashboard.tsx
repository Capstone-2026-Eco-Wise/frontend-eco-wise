import DashboardLayout from "@/features/user/components/DashboardLayout";
import { useSearchParams } from "react-router-dom";
import ScannerView from "@/features/user/components/ScannerView";
import BerandaView from "@/features/user/components/BerandaView";
import RiwayatView from "@/features/user/components/RiwayatView";
import PengaturanView from "@/features/user/components/PengaturanView";

export default function UserDashboard() {
  const [searchParams] = useSearchParams();
  const tab = searchParams.get("tab") || "beranda";

  return (
    <DashboardLayout>
      {tab === "beranda" && <BerandaView />}
      {tab === "scanner" && <ScannerView />}
      {tab === "riwayat" && <RiwayatView />}
      {tab === "pengaturan" && <PengaturanView />}
    </DashboardLayout>
  );
}
