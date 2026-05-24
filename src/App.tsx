import { Route, Routes } from "react-router-dom";
import AdminBerandaView from "./features/admin/components/AdminBerandaView";
import AdminDailyTaskView from "./features/admin/components/AdminDailyTaskView";
import AdminFAQView from "./features/admin/components/AdminFAQView";
import AdminPenggunaView from "./features/admin/components/AdminPenggunaView";
import AdminKategoriView from "./features/admin/components/AdminKategoriView";
import BerandaView from "./features/user/components/BerandaView";
import PengaturanView from "./components/common/PengaturanView";
import RiwayatView from "./features/user/components/RiwayatView";
import ScannerView from "./features/user/components/ScannerView";
import AdminDashboard from "./pages/AdminDashboard";
import LandingPage from "./pages/LandingPage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import UserDashboard from "./pages/UserDashboard";
import ProtectedRoute from "./routes/ProtectedRoute";
import PublicRoute from "./routes/PublicRoute";

function App() {
  return (
    <Routes>
      {/* Public Landing Page */}
      <Route path="/" element={<LandingPage />} />

      {/* Public Auth Routes (Accessible only if NOT logged in) */}
      <Route element={<PublicRoute />}>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
      </Route>

      {/* Protected Admin Routes (Accessible only if Admin) */}
      <Route element={<ProtectedRoute allowedRoles={["admin"]} />}>
        <Route path="/admin" element={<AdminDashboard />}>
          <Route index element={<AdminBerandaView />} />
          <Route path="user" element={<AdminPenggunaView />} />
          <Route path="faq" element={<AdminFAQView />} />
          <Route path="daily-tasks" element={<AdminDailyTaskView />} />
          <Route path="kategori" element={<AdminKategoriView />} />
          <Route path="pengaturan" element={<PengaturanView />} />
        </Route>
      </Route>

      {/* Protected User Routes (Accessible only if User/Authenticated) */}

      <Route element={<ProtectedRoute allowedRoles={["user"]} />}>
        <Route path="/dashboard" element={<UserDashboard />}>
          <Route index element={<BerandaView />} />
          <Route path="scan" element={<ScannerView />} />
          <Route path="riwayat" element={<RiwayatView />} />
          <Route path="pengaturan" element={<PengaturanView />} />
        </Route>
      </Route>
    </Routes>
  );
}

export default App;
