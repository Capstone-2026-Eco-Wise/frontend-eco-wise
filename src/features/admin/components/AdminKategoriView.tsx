import { useState } from "react";
import {
  Plus,
  Search,
  Trash2,
  Edit2,
  ShieldCheck,
  Activity,
  X,
  AlertTriangle,
} from "lucide-react";
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
import useAdminWasteCategories from "@/features/admin/hooks/useAdminWasteCategories";
import type { WasteCategory } from "@/services/wasteCategoriesService";
import { wasteCategoriesService } from "@/services/wasteCategoriesService";

// --- Modal Tambah/Edit Kategori ---
function CategoryModal({
  category,
  onSuccess,
  onClose,
}: {
  category?: WasteCategory;
  onSuccess: (msg: string) => void;
  onClose: () => void;
}) {
  const isEdit = !!category;
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    categoryName: category?.categoryName || "",
    categoryCode: category?.categoryCode || "",
    description: category?.description || "",
    handlingTips: category?.handlingTips || "",
    colorHex: category?.colorHex || "#4ade80",
    pointsReward: category?.pointsReward || 10,
  });

  const handleSubmit = async () => {
    if (!formData.categoryName.trim() || !formData.categoryCode.trim()) {
      toast.error("Nama Kategori dan Kode Kategori wajib diisi");
      return;
    }

    try {
      setLoading(true);
      if (isEdit && category) {
        await wasteCategoriesService.update(category.id, formData);
      } else {
        await wasteCategoriesService.create(formData);
      }
      onSuccess(
        isEdit
          ? "Kategori berhasil diperbarui!"
          : "Kategori berhasil ditambahkan!",
      );
    } catch (err) {
      const error = err as {
        response?: { data?: { message?: string } };
        message?: string;
      };
      toast.error(error.response?.data?.message || "Gagal menyimpan kategori");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4">
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-[28px] shadow-2xl w-full max-w-lg animate-in fade-in zoom-in-95 duration-200 overflow-hidden flex flex-col max-h-[90vh]">
        <div className="flex items-center justify-between p-6 pb-4 border-b border-slate-100 dark:border-slate-800">
          <h2 className="text-xl font-extrabold text-[#1e293b] dark:text-white">
            {isEdit ? "Edit Kategori Sampah" : "Tambah Kategori Sampah"}
          </h2>
          <button
            onClick={onClose}
            className="size-9 flex items-center justify-center rounded-xl text-slate-400 dark:text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-slate-600 dark:hover:text-slate-200 transition-colors"
          >
            <X className="size-5" />
          </button>
        </div>

        <div className="p-6 overflow-y-auto space-y-5">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2">
                Nama Kategori
              </label>
              <input
                type="text"
                value={formData.categoryName}
                onChange={(e) =>
                  setFormData({ ...formData, categoryName: e.target.value })
                }
                placeholder="cth: Organik"
                className="w-full h-11 px-4 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 placeholder:text-slate-400 dark:placeholder:text-slate-650 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all text-sm font-medium"
              />
            </div>
            <div>
              <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2">
                Kode Kategori
              </label>
              <input
                type="text"
                value={formData.categoryCode}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    categoryCode: e.target.value.toUpperCase(),
                  })
                }
                placeholder="cth: ORG"
                maxLength={5}
                disabled={isEdit} // Mencegah perubahan kode setelah dibuat karena relasi/unique
                className={`w-full h-11 px-4 rounded-xl border border-slate-200 transition-all text-sm font-medium ${isEdit ? "bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400 cursor-not-allowed" : "bg-slate-50 dark:bg-slate-950 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 text-slate-900 dark:text-slate-100"}`}
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2">
              Deskripsi Lengkap
            </label>
            <textarea
              rows={2}
              value={formData.description}
              onChange={(e) =>
                setFormData({ ...formData, description: e.target.value })
              }
              placeholder="Jelaskan detail kategori ini..."
              className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 placeholder:text-slate-400 dark:placeholder:text-slate-650 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all text-sm font-medium resize-none"
            />
          </div>

          <div>
            <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2">
              Tips Penanganan
            </label>
            <textarea
              rows={2}
              value={formData.handlingTips}
              onChange={(e) =>
                setFormData({ ...formData, handlingTips: e.target.value })
              }
              placeholder="Cara membuang jenis sampah ini..."
              className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 placeholder:text-slate-400 dark:placeholder:text-slate-650 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all text-sm font-medium resize-none"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2">
                Poin Reward
              </label>
              <input
                type="number"
                value={formData.pointsReward}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    pointsReward: Number(e.target.value),
                  })
                }
                min={1}
                className="w-full h-11 px-4 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all text-sm font-medium"
              />
            </div>
            <div>
              <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2">
                Warna (Hex)
              </label>
              <div className="flex gap-2 items-center">
                <input
                  type="color"
                  value={formData.colorHex}
                  onChange={(e) =>
                    setFormData({ ...formData, colorHex: e.target.value })
                  }
                  className="size-11 rounded-xl cursor-pointer border-0 bg-transparent p-1"
                />
                <input
                  type="text"
                  value={formData.colorHex}
                  onChange={(e) =>
                    setFormData({ ...formData, colorHex: e.target.value })
                  }
                  className="w-full h-11 px-4 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all text-sm font-medium"
                />
              </div>
            </div>
          </div>
        </div>

        <div className="flex gap-3 px-6 pb-6 pt-2">
          <button
            onClick={onClose}
            className="flex-1 h-11 rounded-xl border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 text-sm font-bold hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors bg-transparent"
          >
            Batal
          </button>
          <button
            onClick={handleSubmit}
            disabled={loading}
            className="flex-1 h-11 rounded-xl bg-linear-to-r from-emerald-600 to-teal-500 text-white text-sm font-bold shadow-lg shadow-emerald-500/20 hover:shadow-emerald-500/40 hover:-translate-y-0.5 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading
              ? "Menyimpan..."
              : isEdit
                ? "Simpan Perubahan"
                : "Tambah Kategori"}
          </button>
        </div>
      </div>
    </div>
  );
}

// --- Komponen Utama ---
export default function AdminKategoriView() {
  const {
    filteredCategories,
    loading,
    error,
    search,
    setSearch,
    showModal,
    editTarget,
    deleteTarget,
    setDeleteTarget,
    fetchCategories,
    confirmDelete,
    handleEdit,
    handleAdd,
    closeModal,
    closeDeleteModal,
  } = useAdminWasteCategories();

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
            Menyiapkan manajemen kategori
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
        <CategoryModal
          category={editTarget}
          onSuccess={(msg) => {
            fetchCategories();
            closeModal();
            setTimeout(() => toast.success(msg), 100);
          }}
          onClose={closeModal}
        />
      )}

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
                Hapus Kategori?
              </AlertDialogTitle>
              <AlertDialogDescription className="text-slate-500 dark:text-slate-400 font-medium text-sm text-center pt-2">
                Apakah Anda yakin ingin menghapus kategori ini? Data terkait
                mungkin akan terpengaruh.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter className="w-full flex gap-3 mt-6">
              <AlertDialogCancel
                onClick={closeDeleteModal}
                className="flex-1 h-12 rounded-full border-2 border-slate-100 dark:border-slate-800 text-slate-500 dark:text-slate-400 font-bold hover:bg-slate-50 dark:hover:bg-slate-850 transition-colors bg-transparent"
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

      <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-6 mb-8">
          <div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-[#1e293b] dark:text-white tracking-tight mb-2">
              Manajemen Kategori
            </h1>
            <p className="text-sm font-medium text-slate-500 dark:text-slate-400 max-w-xl leading-relaxed">
              Kelola kategori jenis sampah dan tentukan Poin Reward dasar untuk
              setiap hasil scan pengguna.
            </p>
          </div>
          <button
            onClick={handleAdd}
            className="flex items-center gap-2 px-6 py-3 rounded-full bg-linear-to-r from-emerald-600 to-teal-500 text-white font-bold text-sm shadow-lg shadow-emerald-500/20 hover:shadow-emerald-500/40 hover:-translate-y-0.5 transition-all whitespace-nowrap"
          >
            <Plus className="size-4" />
            Tambah Kategori
          </button>
        </div>

        <div className="bg-white dark:bg-slate-900 rounded-3xl shadow-sm border border-slate-200/60 dark:border-slate-800 overflow-hidden flex flex-col h-[calc(100vh-220px)] min-h-[500px] transition-colors duration-300">
          <div className="p-6 border-b border-slate-100 dark:border-slate-800 flex flex-col sm:flex-row justify-between items-center gap-4 bg-slate-50/50 dark:bg-slate-900/50">
            <div className="flex items-center gap-3">
              <div className="p-2.5 bg-emerald-100 dark:bg-emerald-950/20 rounded-xl">
                <ShieldCheck className="size-5 text-emerald-600 dark:text-emerald-400" />
              </div>
              <div>
                <h3 className="font-bold text-slate-800 dark:text-slate-200">Daftar Kategori</h3>
                <p className="text-xs font-medium text-slate-500 dark:text-slate-400">
                  Total {filteredCategories.length} kategori aktif
                </p>
              </div>
            </div>
            <div className="relative w-full sm:w-72 group">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 size-4 text-slate-400 dark:text-slate-500 group-focus-within:text-emerald-500 transition-colors" />
              <input
                type="text"
                placeholder="Cari kategori..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full h-11 pl-10 pr-4 bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl text-sm font-medium focus:outline-none focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10 transition-all text-slate-900 dark:text-slate-100 placeholder:text-slate-400 dark:placeholder:text-slate-655"
              />
            </div>
          </div>

          <div className="flex-1 overflow-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50 dark:bg-slate-900/80 border-b border-slate-100 dark:border-slate-800 text-slate-500 dark:text-slate-400 text-xs font-bold uppercase tracking-wider sticky top-0 z-10">
                  <th className="px-6 py-4">Kode</th>
                  <th className="px-6 py-4">Kategori</th>
                  <th className="px-6 py-4">Poin Dasar</th>
                  <th className="px-6 py-4">Tips</th>
                  <th className="px-6 py-4 text-right">Aksi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                {filteredCategories.length === 0 ? (
                  <tr>
                    <td
                      colSpan={5}
                      className="px-6 py-16 text-center text-slate-400 dark:text-slate-500 font-medium"
                    >
                      Tidak ada kategori ditemukan.
                    </td>
                  </tr>
                ) : (
                  filteredCategories.map((cat) => (
                    <tr
                      key={cat.id}
                      className="hover:bg-slate-50/80 dark:hover:bg-slate-800/40 transition-colors group"
                    >
                      <td className="px-6 py-5">
                        <span className="inline-flex items-center px-2.5 py-1 rounded-md text-xs font-bold bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-350 border border-slate-200 dark:border-slate-700">
                          {cat.categoryCode}
                        </span>
                      </td>
                      <td className="px-6 py-5">
                        <div className="flex items-center gap-3">
                          <div
                            className="size-4 rounded-full shadow-sm"
                            style={{
                              backgroundColor: cat.colorHex || "#cbd5e1",
                            }}
                          />
                          <div>
                            <p className="text-sm font-bold text-[#1e293b] dark:text-slate-150 mb-0.5">
                              {cat.categoryName}
                            </p>
                            <p className="text-xs font-medium text-slate-400 dark:text-slate-500 truncate max-w-[200px]">
                              {cat.description || "-"}
                            </p>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-5">
                        <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold bg-amber-50 dark:bg-amber-950/30 text-amber-600 dark:text-amber-400 border border-amber-100 dark:border-amber-900/30">
                          ⭐ {cat.pointsReward} poin
                        </span>
                      </td>
                      <td className="px-6 py-5">
                        <p className="text-xs font-medium text-slate-500 dark:text-slate-400 line-clamp-2 max-w-xs">
                          {cat.handlingTips || "-"}
                        </p>
                      </td>
                      <td className="px-6 py-5">
                        <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                          <button
                            onClick={() => handleEdit(cat)}
                            className="p-2 text-slate-400 dark:text-slate-555 hover:text-emerald-500 hover:bg-emerald-50 dark:hover:bg-emerald-950/20 rounded-lg transition-colors"
                            title="Edit"
                          >
                            <Edit2 className="size-4" />
                          </button>
                          <button
                            onClick={() => setDeleteTarget(cat.id)}
                            className="p-2 text-slate-400 dark:text-slate-555 hover:text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-950/20 rounded-lg transition-colors"
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
        </div>
      </div>
    </>
  );
}
