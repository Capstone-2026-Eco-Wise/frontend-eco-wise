import {
  Search,
  Filter,
  MoreVertical,
  Edit2,
  Trash2,
  CheckCircle2,
  X,
  Plus,
} from "lucide-react";
import { useState } from "react";
import useAdminUsers, { type AdminUser } from "../hooks/useAdminUsers";
import { toast } from "sonner";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { adminUsersService } from "@/services/adminUsersService";

function AddUserModal({
  onClose,
  onSuccess,
}: {
  onClose: () => void;
  onSuccess: (message: string) => void;
}) {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "",
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleSubmit = async () => {
    try {
      setLoading(true);
      await adminUsersService.createUser(formData);
      onSuccess("Pengguna baru berhasil ditambahkan!");
    } catch (err) {
      const error = err as {
        response?: { data?: { message?: string } };
        message?: string;
      };
      console.error(err);
      toast.error(error.response?.data?.message || "Gagal menambah pengguna");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
      <div className="bg-white dark:bg-slate-900 rounded-[28px] border dark:border-slate-800 shadow-2xl w-full max-w-lg mx-4 animate-in fade-in zoom-in-95 duration-200">
        <div className="flex items-center justify-between p-6 pb-0">
          <h2 className="text-xl font-extrabold text-[#1e293b] dark:text-white">
            Tambah Pengguna Baru
          </h2>
          <button
            onClick={onClose}
            className="size-8 flex items-center justify-center rounded-xl text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-slate-600 dark:hover:text-slate-300 transition-colors"
          >
            <X className="size-5" />
          </button>
        </div>

        <div className="p-6 space-y-4 max-h-[70vh] overflow-y-auto">
          <div>
            <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-1.5">
              Nama Lengkap
            </label>
            <input
              type="text"
              value={formData.fullName}
              onChange={(e) =>
                setFormData({ ...formData, fullName: e.target.value })
              }
              className="w-full h-11 px-4 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/40 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 text-sm font-medium text-slate-800 dark:text-slate-100"
            />
          </div>
          <div>
            <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-1.5">
              Username
            </label>
            <input
              type="text"
              value={formData.username}
              onChange={(e) =>
                setFormData({ ...formData, username: e.target.value })
              }
              className="w-full h-11 px-4 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/40 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 text-sm font-medium text-slate-800 dark:text-slate-100"
            />
          </div>
          <div>
            <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-1.5">
              Email
            </label>
            <input
              type="email"
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
              className="w-full h-11 px-4 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/40 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 text-sm font-medium text-slate-800 dark:text-slate-100"
            />
          </div>
          <div>
            <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-1.5">
              Password
            </label>
            <input
              type="password"
              value={formData.password}
              onChange={(e) =>
                setFormData({ ...formData, password: e.target.value })
              }
              className="w-full h-11 px-4 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/40 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 text-sm font-medium text-slate-800 dark:text-slate-100"
            />
          </div>
          <div>
            <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-1.5">
              Konfirmasi Password
            </label>
            <input
              type="password"
              value={formData.confirmPassword}
              onChange={(e) =>
                setFormData({ ...formData, confirmPassword: e.target.value })
              }
              className="w-full h-11 px-4 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/40 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 text-sm font-medium text-slate-800 dark:text-slate-100"
            />
          </div>
        </div>

        <div className="flex gap-3 px-6 pb-6 pt-2">
          <button
            onClick={onClose}
            className="flex-1 h-11 rounded-xl border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-350 text-sm font-bold hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
          >
            Batal
          </button>
          <button
            onClick={handleSubmit}
            disabled={loading}
            className="flex-1 h-11 rounded-xl bg-linear-to-r from-emerald-600 to-teal-500 text-white text-sm font-bold shadow-lg shadow-emerald-500/20 hover:shadow-emerald-500/40 hover:-translate-y-0.5 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? "Menyimpan..." : "Tambah Pengguna"}
          </button>
        </div>
      </div>
    </div>
  );
}

function RoleModal({
  user,
  onClose,
  onSuccess,
}: {
  user: AdminUser;
  onClose: () => void;
  onSuccess: (message: string) => void;
}) {
  const [loading, setLoading] = useState(false);
  const [role, setRole] = useState(user.role);

  const handleSubmit = async () => {
    try {
      setLoading(true);
      await adminUsersService.updateRole(user.id, role);
      onSuccess("Peran pengguna berhasil diperbarui!");
    } catch (err) {
      const error = err as {
        response?: { data?: { message?: string } };
        message?: string;
      };
      console.error(err);
      toast.error(error.response?.data?.message || "Gagal mengubah peran");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
      <div className="bg-white dark:bg-slate-900 rounded-[28px] border dark:border-slate-800 shadow-2xl w-full max-w-sm mx-4 animate-in fade-in zoom-in-95 duration-200">
        <div className="flex items-center justify-between p-6 pb-0">
          <h2 className="text-xl font-extrabold text-[#1e293b] dark:text-white">
            Ubah Peran Pengguna
          </h2>
          <button
            onClick={onClose}
            className="size-8 flex items-center justify-center rounded-xl text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-slate-600 dark:hover:text-slate-300 transition-colors"
          >
            <X className="size-5" />
          </button>
        </div>

        <div className="p-6 space-y-5">
          <div>
            <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2">
              Peran untuk {user.fullName}
            </label>
            <select
              value={role}
              onChange={(e) => setRole(e.target.value)}
              className="w-full h-11 px-4 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/40 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all text-sm font-medium text-slate-800 dark:text-slate-100"
            >
              <option value="admin">Admin</option>
              <option value="user">User</option>
            </select>
          </div>
        </div>

        <div className="flex gap-3 px-6 pb-6">
          <button
            onClick={onClose}
            className="flex-1 h-11 rounded-xl border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-350 text-sm font-bold hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
          >
            Batal
          </button>
          <button
            onClick={handleSubmit}
            disabled={loading || role === user.role}
            className="flex-1 h-11 rounded-xl bg-linear-to-r from-emerald-600 to-teal-500 text-white text-sm font-bold shadow-lg shadow-emerald-500/20 hover:shadow-emerald-500/40 hover:-translate-y-0.5 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? "Menyimpan..." : "Simpan Perubahan"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default function AdminPenggunaView() {
  const [searchTerm, setSearchTerm] = useState("");
  const [roleFilter, setRoleFilter] = useState("");
  const {
    users,
    pagination,
    loading,
    refetch,
    handleNextPage,
    handlePrevPage,
  } = useAdminUsers(searchTerm, roleFilter);

  const [showRoleModal, setShowRoleModal] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
  const [editTarget, setEditTarget] = useState<AdminUser | undefined>(
    undefined,
  );
  const [deleteTarget, setDeleteTarget] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const confirmDelete = async () => {
    if (!deleteTarget) return;
    try {
      await adminUsersService.deleteUser(deleteTarget);
      setDeleteTarget(null);
      setSuccessMessage("Pengguna berhasil dihapus!");
      refetch();
    } catch (err) {
      const error = err as {
        response?: { data?: { message?: string } };
        message?: string;
      };
      console.error(err);
      toast.error(error.response?.data?.message || "Gagal menghapus pengguna");
    }
  };

  return (
    <>
      {showAddModal && (
        <AddUserModal
          onSuccess={(msg) => {
            refetch();
            setShowAddModal(false);
            setSuccessMessage(msg);
          }}
          onClose={() => setShowAddModal(false)}
        />
      )}
      {showRoleModal && editTarget && (
        <RoleModal
          user={editTarget}
          onSuccess={(msg) => {
            refetch();
            setShowRoleModal(false);
            setSuccessMessage(msg);
          }}
          onClose={() => {
            setShowRoleModal(false);
            setEditTarget(undefined);
          }}
        />
      )}

      {/* Modal Konfirmasi Hapus */}
      <AlertDialog
        open={!!deleteTarget}
        onOpenChange={(open) => !open && setDeleteTarget(null)}
      >
        <AlertDialogContent className="rounded-[28px] p-8 border-0 shadow-2xl max-w-sm bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-100">
          <div className="flex flex-col items-center text-center space-y-4">
            <div className="size-16 bg-rose-50 dark:bg-rose-950/30 text-rose-500 rounded-full flex items-center justify-center mb-2">
              <Trash2 className="size-8" />
            </div>
            <AlertDialogHeader>
              <AlertDialogTitle className="text-2xl font-extrabold text-[#1e293b] dark:text-white text-center">
                Hapus Pengguna?
              </AlertDialogTitle>
              <AlertDialogDescription className="text-slate-500 dark:text-slate-400 font-medium text-sm text-center pt-2">
                Apakah kamu yakin ingin menghapus pengguna ini? Tindakan ini
                tidak bisa dibatalkan.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter className="w-full flex gap-3 mt-6">
              <AlertDialogCancel
                onClick={() => setDeleteTarget(null)}
                className="flex-1 h-12 rounded-full border-2 border-slate-100 dark:border-slate-850 text-slate-500 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
              >
                Batal
              </AlertDialogCancel>
              <AlertDialogAction
                onClick={confirmDelete}
                className="flex-1 h-12 rounded-full bg-rose-500 text-white font-bold hover:bg-rose-600 transition-colors"
              >
                Hapus
              </AlertDialogAction>
            </AlertDialogFooter>
          </div>
        </AlertDialogContent>
      </AlertDialog>

      {/* Modal Sukses */}
      <AlertDialog
        open={!!successMessage}
        onOpenChange={(open) => !open && setSuccessMessage(null)}
      >
        <AlertDialogContent className="rounded-[28px] p-8 border-0 shadow-2xl max-w-sm bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-100">
          <div className="flex flex-col items-center text-center space-y-4">
            <div className="size-16 bg-emerald-50 dark:bg-emerald-950/30 text-emerald-500 rounded-full flex items-center justify-center mb-2">
              <div className="size-8 rounded-full border-2 border-emerald-500 flex items-center justify-center">
                <svg
                  className="size-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={3}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              </div>
            </div>
            <AlertDialogHeader>
              <AlertDialogTitle className="text-2xl font-extrabold text-[#1e293b] dark:text-white text-center">
                Sukses!
              </AlertDialogTitle>
              <AlertDialogDescription className="text-slate-500 dark:text-slate-400 font-medium text-sm text-center pt-2">
                {successMessage}
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter className="w-full mt-6">
              <AlertDialogAction
                onClick={() => setSuccessMessage(null)}
                className="w-full h-12 rounded-full bg-[#10b981] text-white font-bold hover:bg-[#059669] transition-colors"
              >
                Selesai
              </AlertDialogAction>
            </AlertDialogFooter>
          </div>
        </AlertDialogContent>
      </AlertDialog>

      <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
          <div>
            <h1 className="text-4xl font-extrabold text-[#1e293b] dark:text-white mb-2 tracking-tight">
              Manajemen Pengguna
            </h1>
            <p className="text-slate-500 dark:text-slate-400 font-medium text-base">
              Kelola data pengguna, perbarui peran, dan pantau aktivitas akun.
            </p>
          </div>
          <button
            onClick={() => setShowAddModal(true)}
            className="flex items-center gap-2 px-6 py-3 rounded-full bg-linear-to-r from-emerald-600 to-teal-500 text-white font-bold text-sm shadow-lg shadow-emerald-500/20 hover:shadow-emerald-500/40 hover:-translate-y-0.5 transition-all whitespace-nowrap"
          >
            <Plus className="size-4" />
            Tambah Pengguna
          </button>
        </div>

        <div className="bg-white dark:bg-slate-900 rounded-[32px] shadow-sm border border-slate-100 dark:border-slate-800 overflow-hidden">
          {/* Toolbar */}
          <div className="p-6 border-b border-slate-100 dark:border-slate-800 flex flex-col sm:flex-row justify-between items-center gap-4 bg-slate-50/50 dark:bg-slate-800/30">
            <div className="relative w-full sm:w-96">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 size-4 text-slate-400" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Cari nama atau email..."
                className="w-full h-11 pl-11 pr-4 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all text-sm font-medium"
              />
            </div>
            <div className="relative w-full sm:w-auto">
              <Filter className="absolute left-4 top-1/2 -translate-y-1/2 size-4 text-slate-400" />
              <select
                value={roleFilter}
                onChange={(e) => setRoleFilter(e.target.value)}
                className="w-full sm:w-auto h-11 pl-11 pr-10 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all text-sm font-bold text-slate-600 dark:text-slate-350 cursor-pointer appearance-none"
              >
                <option value="">Semua Peran</option>
                <option value="admin">Admin</option>
                <option value="user">User</option>
              </select>
            </div>
          </div>

          {/* Data Table */}
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50 dark:bg-slate-800/40 border-b border-slate-100 dark:border-slate-800 text-slate-500 dark:text-slate-400 text-xs font-bold uppercase tracking-wider">
                  <th className="px-6 py-4">ID Pengguna</th>
                  <th className="px-6 py-4">Informasi Akun</th>
                  <th className="px-6 py-4">Peran</th>
                  <th className="px-6 py-4">Status</th>
                  <th className="px-6 py-4">Bergabung</th>
                  <th className="px-6 py-4 text-right">Aksi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                {loading ? (
                  <tr>
                    <td colSpan={6} className="px-6 py-16 text-center">
                      <div className="flex flex-col items-center justify-center gap-3">
                        <div className="relative flex items-center justify-center">
                          <div className="absolute size-12 rounded-full border-4 border-emerald-100 dark:border-emerald-900/30 animate-ping opacity-75"></div>
                          <div className="relative size-12 rounded-full border-4 border-slate-100 dark:border-slate-800 border-t-emerald-500 animate-spin"></div>
                        </div>
                        <p className="text-sm font-medium text-slate-400 dark:text-slate-500 animate-pulse">
                          Memuat Data...
                        </p>
                      </div>
                    </td>
                  </tr>
                ) : users.length === 0 ? (
                  <tr>
                    <td
                      colSpan={6}
                      className="px-6 py-16 text-center text-slate-400 dark:text-slate-500 font-medium"
                    >
                      Tidak ada pengguna yang ditemukan.
                    </td>
                  </tr>
                ) : (
                  users.map((user: AdminUser) => (
                    <tr
                      key={user.id}
                      className="hover:bg-slate-50/80 dark:hover:bg-slate-800/30 transition-colors group"
                    >
                      <td className="px-6 py-5">
                        <span className="text-sm font-bold text-slate-700 dark:text-slate-350 bg-slate-100 dark:bg-slate-800 px-2.5 py-1 rounded-md">
                          {user.id.substring(0, 8)}
                        </span>
                      </td>
                      <td className="px-6 py-5">
                        <p className="text-sm font-bold text-[#1e293b] dark:text-white mb-0.5">
                          {user.fullName}
                        </p>
                        <p className="text-xs font-medium text-slate-500 dark:text-slate-400">
                          {user.email}
                        </p>
                      </td>
                      <td className="px-6 py-5">
                        <span
                          className={`inline-flex px-2.5 py-1 rounded-full text-xs font-bold ${
                            user.role === "admin"
                              ? "bg-purple-50 dark:bg-purple-950/30 text-purple-600 dark:text-purple-400 border border-purple-100 dark:border-purple-900/30"
                              : "bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-350 border border-slate-200 dark:border-slate-700"
                          }`}
                        >
                          {user.role}
                        </span>
                      </td>
                      <td className="px-6 py-5">
                        <div className="flex items-center gap-1.5">
                          <>
                            <CheckCircle2 className="size-4 text-emerald-500" />
                            <span className="text-sm font-bold text-emerald-600 dark:text-emerald-450">
                              Aktif
                            </span>
                          </>
                        </div>
                      </td>
                      <td className="px-6 py-5 text-sm font-medium text-slate-600 dark:text-slate-350">
                        {user.created_at || user.createdAt ? new Date(user.created_at || user.createdAt || "").toLocaleDateString("id-ID", {
                          day: "numeric",
                          month: "short",
                          year: "numeric",
                        }) : "-"}
                      </td>
                      <td className="px-6 py-5">
                        <div className="flex items-center justify-end gap-2 md:opacity-0 group-hover:opacity-100 transition-opacity">
                          <button
                            onClick={() => {
                              setEditTarget(user);
                              setShowRoleModal(true);
                            }}
                            className="p-2 rounded-lg text-blue-500 hover:bg-blue-50 dark:hover:bg-blue-950/20 transition-colors"
                            title="Edit Peran"
                          >
                            <Edit2 className="size-4" />
                          </button>
                          <button
                            onClick={() => setDeleteTarget(user.id)}
                            className="p-2 rounded-lg text-red-500 hover:bg-red-50 dark:hover:bg-red-950/20 transition-colors"
                            title="Hapus"
                          >
                            <Trash2 className="size-4" />
                          </button>
                          <button
                            className="p-2 rounded-lg text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                            title="Opsi Lain"
                          >
                            <MoreVertical className="size-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div className="p-6 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-sm font-medium text-slate-500 dark:text-slate-450 bg-slate-50/30 dark:bg-slate-800/20">
            <p>
              Menampilkan{" "}
              {users.length > 0
                ? (pagination.page - 1) * pagination.limit + 1
                : 0}{" "}
              hingga{" "}
              {Math.min(
                pagination.page * pagination.limit,
                pagination.totalData,
              )}{" "}
              dari {pagination.totalData} pengguna
            </p>
            <div className="flex gap-2">
              <button
                onClick={handlePrevPage}
                className="px-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 disabled:opacity-50"
                disabled={pagination.page <= 1}
              >
                Sebelumnya
              </button>
              <button
                onClick={handleNextPage}
                className="px-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 disabled:opacity-50"
                disabled={
                  pagination.page >= pagination.totalPage ||
                  pagination.totalPage === 0
                }
              >
                Selanjutnya
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
