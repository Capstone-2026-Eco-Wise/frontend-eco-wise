import { useState } from "react";
import {
  Plus,
  Search,
  Edit2,
  Trash2,
  CheckCircle2,
  XCircle,
  Calendar,
  X,
  Activity,
  ShieldCheck,
  AlertTriangle,
} from "lucide-react";
import { cn } from "@/lib/utils";
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
import useAdminDailyTasks from "@/features/admin/hooks/useAdminDailyTasks";
import {
  dailyTasksService,
  type DailyTask,
} from "@/services/dailyTasksService";

// --- Modal Tambah/Edit Task ---
function TaskModal({
  task,
  categories,
  onSuccess,
  onClose,
}: {
  task?: DailyTask;
  categories: { id: string; categoryName: string; categoryCode: string }[];
  onSuccess: (msg: string) => void;
  onClose: () => void;
}) {
  const isEdit = !!task;
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    taskName: task?.taskName || "",
    categoryId: task?.categoryId || "",
    description: task?.description || "",
    pointReward: task?.pointReward || 10,
    isActive: task?.isActive ?? true,
    activeDate: task?.activeDate
      ? new Date(task.activeDate).toISOString().split("T")[0]
      : new Date().toISOString().split("T")[0],
  });

  const handleSubmit = async () => {
    if (
      !formData.taskName.trim() ||
      !formData.description.trim() ||
      !formData.categoryId
    ) {
      toast.error("Kategori, Nama Task, dan Deskripsi tidak boleh kosong");
      return;
    }

    try {
      setLoading(true);
      if (isEdit && task) {
        await dailyTasksService.update(task.id, formData);
      } else {
        await dailyTasksService.create(formData);
      }
      onSuccess(
        isEdit ? "Task berhasil diperbarui!" : "Task berhasil ditambahkan!",
      );
    } catch (err) {
      const error = err as {
        response?: { data?: { message?: string } };
        message?: string;
      };
      toast.error(
        error.response?.data?.message ||
          error.message ||
          "Gagal menyimpan Task",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-[28px] shadow-2xl w-full max-w-lg mx-4 animate-in fade-in zoom-in-95 duration-200">
        <div className="flex items-center justify-between p-8 pb-0">
          <h2 className="text-xl font-extrabold text-[#1e293b] dark:text-white">
            {isEdit ? "Edit Daily Task" : "Tambah Daily Task"}
          </h2>
          <button
            onClick={onClose}
            className="size-9 flex items-center justify-center rounded-xl text-slate-400 dark:text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-slate-600 dark:hover:text-slate-200 transition-colors"
          >
            <X className="size-5" />
          </button>
        </div>

        <div className="p-8 space-y-5">
          <div>
            <label className="block text-sm font-bold text-slate-700 dark:text-slate-350 mb-2">
              Nama Task
            </label>
            <input
              type="text"
              value={formData.taskName}
              onChange={(e) =>
                setFormData({ ...formData, taskName: e.target.value })
              }
              placeholder="cth: Daur Ulang Botol Plastik"
              className="w-full h-11 px-4 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 placeholder:text-slate-400 dark:placeholder:text-slate-600 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all text-sm font-medium"
            />
          </div>
          <div>
            <label className="block text-sm font-bold text-slate-700 dark:text-slate-350 mb-2">
              Kategori
            </label>
            <select
              value={formData.categoryId}
              onChange={(e) =>
                setFormData({ ...formData, categoryId: e.target.value })
              }
              className="w-full h-11 px-4 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all text-sm font-medium"
            >
              <option value="" className="bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100">-- Pilih Kategori --</option>
              {categories.map((cat) => (
                <option key={cat.id} value={cat.id} className="bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100">
                  {cat.categoryName} ({cat.categoryCode})
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-bold text-slate-700 dark:text-slate-350 mb-2">
              Deskripsi
            </label>
            <textarea
              rows={3}
              value={formData.description}
              onChange={(e) =>
                setFormData({ ...formData, description: e.target.value })
              }
              placeholder="Jelaskan detail task ini..."
              className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 placeholder:text-slate-400 dark:placeholder:text-slate-600 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all text-sm font-medium resize-none"
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-bold text-slate-700 dark:text-slate-350 mb-2">
                Poin Reward
              </label>
              <input
                type="number"
                value={formData.pointReward}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    pointReward: Number(e.target.value),
                  })
                }
                min={1}
                className="w-full h-11 px-4 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all text-sm font-medium"
              />
            </div>
            <div>
              <label className="block text-sm font-bold text-slate-700 dark:text-slate-350 mb-2">
                Tanggal Aktif
              </label>
              <input
                type="date"
                value={formData.activeDate}
                onChange={(e) =>
                  setFormData({ ...formData, activeDate: e.target.value })
                }
                className="w-full h-11 px-4 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all text-sm font-medium"
              />
            </div>
          </div>
          <div className="flex items-center justify-between p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950">
            <div>
              <p className="text-sm font-bold text-slate-700 dark:text-slate-350">Status Aktif</p>
              <p className="text-xs font-medium text-slate-500 dark:text-slate-400">
                Tampilkan Task ini di pengguna
              </p>
            </div>
            <button
              onClick={() =>
                setFormData({ ...formData, isActive: !formData.isActive })
              }
              className={cn(
                "relative inline-flex h-6 w-11 items-center rounded-full transition-colors",
                formData.isActive ? "bg-emerald-500" : "bg-slate-300 dark:bg-slate-700",
              )}
            >
              <span
                className={cn(
                  "inline-block size-4 transform rounded-full bg-white transition-transform",
                  formData.isActive ? "translate-x-6" : "translate-x-1",
                )}
              />
            </button>
          </div>
        </div>

        <div className="flex gap-3 px-8 pb-8">
          <button
            onClick={onClose}
            className="flex-1 h-11 rounded-xl border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 text-sm font-bold hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors bg-transparent"
          >
            Batal
          </button>
          <button
            onClick={handleSubmit}
            disabled={loading}
            className="flex-1 h-11 rounded-xl bg-linear-to-r from-emerald-600 to-teal-500 text-white text-sm font-bold shadow-lg shadow-emerald-500/20 hover:shadow-emerald-500/40 hover:-translate-y-0.5 transition-all disabled:opacity-50"
          >
            {loading
              ? "Menyimpan..."
              : isEdit
                ? "Simpan Perubahan"
                : "Tambah Task"}
          </button>
        </div>
      </div>
    </div>
  );
}

// --- Komponen Utama ---
export default function AdminDailyTaskView() {
  const {
    tasks,
    categories,
    filteredTasks,
    activeTasksCount,
    loading,
    error,
    search,
    setSearch,
    showModal,
    editTarget,
    deleteTarget,
    setDeleteTarget,
    fetchTasks,
    confirmDelete,
    handleToggleActive,
    handleEdit,
    handleAdd,
    closeModal,
    closeDeleteModal,
    closeSuccessModal,
  } = useAdminDailyTasks();

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4">
        <div className="relative flex items-center justify-center">
          <div className="absolute size-16 rounded-full border-4 border-emerald-100 dark:border-emerald-950/30 animate-ping opacity-75"></div>
          <div className="relative size-16 rounded-full border-4 border-slate-100 dark:border-slate-800 border-t-emerald-500 animate-spin"></div>
          <ShieldCheck className="absolute size-6 text-emerald-500 animate-pulse" />
        </div>
        <div className="text-center space-y-1">
          <h3 className="text-lg font-bold text-slate-700 dark:text-slate-300 animate-pulse">
            Memuat Data...
          </h3>
          <p className="text-sm font-medium text-slate-400 dark:text-slate-500">
            Menyiapkan dashboard Anda
          </p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4">
        <div className="size-16 rounded-full bg-rose-50 dark:bg-rose-950/20 border-2 border-rose-100 dark:border-rose-900/30 flex items-center justify-center">
          <Activity className="size-8 text-rose-500" />
        </div>
        <div className="text-center space-y-1">
          <h3 className="text-lg font-bold text-slate-700 dark:text-slate-350">
            Gagal Memuat Data
          </h3>
          <p className="text-sm font-medium text-slate-400 dark:text-slate-500">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="mt-2 inline-flex items-center px-4 py-2 bg-rose-500 text-white rounded-lg hover:bg-rose-600 transition-colors shadow-sm text-sm font-medium"
          >
            Coba Lagi
          </button>
        </div>
      </div>
    );
  }

  return (
    <>
      {showModal && (
        <TaskModal
          task={editTarget}
          categories={categories}
          onSuccess={(msg) => {
            fetchTasks();
            closeModal();
            closeSuccessModal();
            setTimeout(() => toast.success(msg), 100);
          }}
          onClose={closeModal}
        />
      )}

      {/* MODAL KONFIRMASI DELETE */}
      <AlertDialog
        open={!!deleteTarget}
        onOpenChange={(open) => !open && closeDeleteModal()}
      >
        <AlertDialogContent className="rounded-[28px] p-8 border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-2xl max-w-sm">
          <div className="flex flex-col items-center text-center space-y-4">
            <div className="size-16 bg-rose-50 dark:bg-rose-950/20 text-rose-500 rounded-full flex items-center justify-center mb-2">
              <AlertTriangle className="size-8" />
            </div>
            <AlertDialogHeader>
              <AlertDialogTitle className="text-2xl font-extrabold text-[#1e293b] dark:text-white text-center">
                Hapus Task?
              </AlertDialogTitle>
              <AlertDialogDescription className="text-slate-500 dark:text-slate-400 font-medium text-sm text-center pt-2">
                Tindakan ini tidak dapat dibatalkan. Task ini akan dihapus
                secara permanen.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter className="w-full flex gap-3 mt-6">
              <AlertDialogCancel
                onClick={closeDeleteModal}
                className="flex-1 h-12 rounded-full border-2 border-slate-100 dark:border-slate-800 text-slate-500 dark:text-slate-400 font-bold hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors bg-transparent"
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

      <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-4xl font-extrabold text-[#1e293b] dark:text-white mb-2 tracking-tight">
              Daily Tasks
            </h1>
            <p className="text-slate-500 dark:text-slate-400 font-medium text-base">
              Kelola tugas harian yang dapat diselesaikan pengguna.{" "}
              <span className="text-emerald-600 dark:text-emerald-400 font-bold">
                {activeTasksCount} task aktif hari ini.
              </span>
            </p>
          </div>
          <button
            onClick={handleAdd}
            className="flex items-center gap-2 px-6 py-3 rounded-full bg-linear-to-r from-emerald-600 to-teal-500 text-white font-bold text-sm shadow-lg shadow-emerald-500/20 hover:shadow-emerald-500/40 hover:-translate-y-0.5 transition-all whitespace-nowrap"
          >
            <Plus className="size-4" />
            Tambah Task
          </button>
        </div>

        {/* Table Card */}
        <div className="bg-white dark:bg-slate-900 rounded-[32px] shadow-sm border border-slate-100 dark:border-slate-800 overflow-hidden transition-colors duration-300">
          {/* Toolbar */}
          <div className="p-6 border-b border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/50">
            <div className="relative w-full sm:w-96">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 size-4 text-slate-400 dark:text-slate-500" />
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Cari nama atau deskripsi task..."
                className="w-full h-11 pl-11 pr-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all text-sm font-medium text-slate-900 dark:text-slate-100 placeholder:text-slate-400 dark:placeholder:text-slate-600"
              />
            </div>
          </div>

          {/* Table */}
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50 dark:bg-slate-900/80 border-b border-slate-100 dark:border-slate-800 text-slate-500 dark:text-slate-400 text-xs font-bold uppercase tracking-wider">
                  <th className="px-6 py-4">Nama Task</th>
                  <th className="px-6 py-4">Kategori</th>
                  <th className="px-6 py-4">Poin</th>
                  <th className="px-6 py-4">Tanggal Aktif</th>
                  <th className="px-6 py-4">Status</th>
                  <th className="px-6 py-4 text-right">Aksi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                {filteredTasks.length === 0 ? (
                  <tr>
                    <td
                      colSpan={6}
                      className="px-6 py-16 text-center text-slate-400 dark:text-slate-500 font-medium"
                    >
                      Tidak ada task ditemukan.
                    </td>
                  </tr>
                ) : (
                  filteredTasks.map((task) => (
                    <tr
                      key={task.id}
                      className="hover:bg-slate-50/80 dark:hover:bg-slate-800/40 transition-colors group"
                    >
                      <td className="px-6 py-5 max-w-xs">
                        <p className="text-sm font-bold text-[#1e293b] dark:text-slate-150 mb-0.5">
                          {task.taskName}
                        </p>
                        <p className="text-xs font-medium text-slate-400 dark:text-slate-555 truncate">
                          {task.description}
                        </p>
                      </td>
                      <td className="px-6 py-5">
                        {task.category ? (
                          <span className="inline-flex items-center gap-1 px-2 py-1 rounded-md text-xs font-bold bg-blue-50 dark:bg-blue-950/30 text-blue-600 dark:text-blue-400 border border-blue-100 dark:border-blue-900/30">
                            {task.category.categoryName}
                          </span>
                        ) : (
                          <span className="text-xs font-medium text-slate-400 dark:text-slate-500">
                            -
                          </span>
                        )}
                      </td>
                      <td className="px-6 py-5">
                        <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold bg-amber-50 dark:bg-amber-950/30 text-amber-600 dark:text-amber-400 border border-amber-100 dark:border-amber-900/30">
                          ⭐ {task.pointReward} poin
                        </span>
                      </td>
                      <td className="px-6 py-5">
                        <div className="flex items-center gap-1.5 text-sm font-medium text-slate-600 dark:text-slate-350">
                          <Calendar className="size-4 text-slate-400 dark:text-slate-500" />
                          {new Date(task.activeDate).toLocaleDateString(
                            "id-ID",
                            {
                              day: "numeric",
                              month: "long",
                              year: "numeric",
                            },
                          )}
                        </div>
                      </td>
                      <td className="px-6 py-5">
                        <button
                          onClick={() => handleToggleActive(task)}
                          className={cn(
                            "inline-flex items-center gap-1.5 text-xs font-bold px-2 py-1 rounded-md transition-colors",
                            task.isActive
                              ? "text-emerald-600 dark:text-emerald-400 hover:bg-emerald-50 dark:hover:bg-emerald-950/20"
                              : "text-slate-400 dark:text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800",
                          )}
                          title={
                            task.isActive ? "Nonaktifkan Task" : "Aktifkan Task"
                          }
                        >
                          {task.isActive ? (
                            <>
                              <CheckCircle2 className="size-4" /> Aktif
                            </>
                          ) : (
                            <>
                              <XCircle className="size-4" /> Nonaktif
                            </>
                          )}
                        </button>
                      </td>
                      <td className="px-6 py-5">
                        <div className="flex items-center justify-end gap-2 md:opacity-0 group-hover:opacity-100 transition-opacity">
                          <button
                            onClick={() => handleEdit(task)}
                            className="p-2 rounded-lg text-blue-500 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-950/20 transition-colors"
                            title="Edit"
                          >
                            <Edit2 className="size-4" />
                          </button>
                          <button
                            onClick={() => setDeleteTarget(task.id)}
                            className="p-2 rounded-lg text-red-500 dark:text-red-450 hover:bg-red-50 dark:hover:bg-red-950/20 transition-colors"
                            title="Hapus"
                          >
                            <Trash2 className="size-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

          {/* Footer */}
          <div className="p-6 border-t border-slate-100 dark:border-slate-800 bg-slate-50/30 dark:bg-slate-900/30 flex items-center justify-between text-sm font-medium text-slate-500 dark:text-slate-400">
            <p>
              Menampilkan {filteredTasks.length} dari {tasks.length} task
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
