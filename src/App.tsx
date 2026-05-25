import { lazy, Suspense } from "react";
import { Route, Routes } from "react-router-dom";
import { Loader2 } from "lucide-react";
import { ErrorBoundary } from "./components/common/ErrorBoundary";

const AdminBerandaView = lazy(
  () => import("./features/admin/components/AdminBerandaView"),
);
const AdminDailyTaskView = lazy(
  () => import("./features/admin/components/AdminDailyTaskView"),
);
const AdminFAQView = lazy(
  () => import("./features/admin/components/AdminFAQView"),
);
const AdminPenggunaView = lazy(
  () => import("./features/admin/components/AdminPenggunaView"),
);
const AdminKategoriView = lazy(
  () => import("./features/admin/components/AdminKategoriView"),
);
const BerandaView = lazy(
  () => import("./features/user/components/BerandaView"),
);
const PengaturanView = lazy(() => import("./components/common/PengaturanView"));
const RiwayatView = lazy(
  () => import("./features/user/components/RiwayatView"),
);
const ScannerView = lazy(
  () => import("./features/user/components/ScannerView"),
);
const AdminDashboard = lazy(() => import("./pages/AdminDashboard"));
const LandingPage = lazy(() => import("./pages/LandingPage"));
const LoginPage = lazy(() => import("./pages/LoginPage"));
const RegisterPage = lazy(() => import("./pages/RegisterPage"));
const UserDashboard = lazy(() => import("./pages/UserDashboard"));
const LeaderboardView = lazy(
  () => import("./features/user/components/LeaderboardView"),
);
const NotFoundPage = lazy(() => import("./pages/NotFoundPage"));
import ProtectedRoute from "./routes/ProtectedRoute";
import PublicRoute from "./routes/PublicRoute";

const LoadingSpinner = () => (
  <div className="flex h-screen w-screen flex-col items-center justify-center bg-slate-50 text-emerald-600 gap-3">
    <Loader2 className="h-10 w-10 animate-spin" />
    <p className="text-sm font-medium text-slate-500 animate-pulse">
      Memuat halaman...
    </p>
  </div>
);

function App() {
  return (
    <ErrorBoundary>
      <Suspense fallback={<LoadingSpinner />}>
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
              <Route path="leaderboard" element={<LeaderboardView />} />
              <Route path="pengaturan" element={<PengaturanView />} />
            </Route>
          </Route>

          {/* 404 — catch-all route */}
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </Suspense>
    </ErrorBoundary>
  );
}

export default App;
