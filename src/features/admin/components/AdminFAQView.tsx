import { useState } from "react";
import {
  Plus,
  Search,
  Edit2,
  Trash2,
  Tag,
  ToggleLeft,
  ToggleRight,
  Activity,
  ShieldCheck,
  X,
} from "lucide-react";
import { cn } from "@/lib/utils";
import useAdminFAQs from "../hooks/useAdminFAQs";
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

import { type FAQ, faqsService } from "@/services/faqsService";

// --- Modal Tambah/Edit FAQ ---
function FAQModal({
  faq,
  onClose,
  onSuccess,
}: {
  faq?: FAQ;
  onClose: () => void;
  onSuccess: (message: string) => void;
}) {
  const isEdit = !!faq;
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    question: faq?.question || "",
    answer: faq?.answer || "",
    category: faq?.category || "",
    orderNumber: faq?.orderNumber || 1,
    isActive: faq?.isActive ?? true,
  });

  const handleSubmit = async () => {
    try {
      setLoading(true);
      if (isEdit && faq) {
        await faqsService.update(faq.id, formData);
      } else {
        await faqsService.create(formData);
      }
      onSuccess(
        isEdit ? "FAQ berhasil diperbarui!" : "FAQ berhasil ditambahkan!",
      );
    } catch (err) {
      const error = err as {
        response?: { data?: { message?: string } };
        message?: string;
      };
      console.error(err);
      toast.error(error.response?.data?.message || "Gagal menyimpan FAQ");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
      <div className="bg-white dark:bg-slate-900 border dark:border-slate-800 rounded-[28px] shadow-2xl w-full max-w-lg mx-4 animate-in fade-in zoom-in-95 duration-200">
        <div className="flex items-center justify-between p-8 pb-0">
          <h2 className="text-xl font-extrabold text-[#1e293b] dark:text-white">
            {isEdit ? "Edit FAQ" : "Tambah FAQ Baru"}
          </h2>
          <button
            onClick={onClose}
            className="size-9 flex items-center justify-center rounded-xl text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-slate-600 dark:hover:text-slate-350 transition-colors"
          >
            <X className="size-5" />
          </button>
        </div>

        <div className="p-8 space-y-5">
          <div>
            <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2">
              Pertanyaan
            </label>
            <input
              type="text"
              value={formData.question}
              onChange={(e) =>
                setFormData({ ...formData, question: e.target.value })
              }
              placeholder="Masukkan pertanyaan..."
              className="w-full h-11 px-4 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/40 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all text-sm font-medium text-slate-800 dark:text-slate-100"
            />
          </div>
          <div>
            <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2">
              Jawaban
            </label>
            <textarea
              rows={4}
              value={formData.answer}
              onChange={(e) =>
                setFormData({ ...formData, answer: e.target.value })
              }
              placeholder="Masukkan jawaban..."
              className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/40 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all text-sm font-medium text-slate-800 dark:text-slate-100 resize-none"
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2">
                Kategori
              </label>
              <input
                type="text"
                value={formData.category}
                onChange={(e) =>
                  setFormData({ ...formData, category: e.target.value })
                }
                placeholder="cth: Umum, Fitur..."
                className="w-full h-11 px-4 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/40 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all text-sm font-medium text-slate-800 dark:text-slate-100"
              />
            </div>
            <div>
              <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2">
                Urutan
              </label>
              <input
                type="number"
                value={formData.orderNumber}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    orderNumber: Number(e.target.value),
                  })
                }
                placeholder="1"
                min={1}
                className="w-full h-11 px-4 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/40 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all text-sm font-medium text-slate-800 dark:text-slate-100"
              />
            </div>
          </div>
          <div className="flex items-center justify-between p-4 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/40">
            <div>
              <p className="text-sm font-bold text-slate-700 dark:text-slate-350">Status Aktif</p>
              <p className="text-xs font-medium text-slate-500 dark:text-slate-400">
                Tampilkan FAQ ini di halaman publik
              </p>
            </div>
            <button
              onClick={() =>
                setFormData({ ...formData, isActive: !formData.isActive })
              }
              className={cn(
                "relative inline-flex h-6 w-11 items-center rounded-full transition-colors",
                formData.isActive ? "bg-emerald-500" : "bg-slate-300",
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
            className="flex-1 h-11 rounded-xl border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-355 text-sm font-bold hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
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
                : "Tambah FAQ"}
          </button>
        </div>
      </div>
    </div>
  );
}

// --- Komponen Utama ---
export default function AdminFAQView() {
  const [search, setSearch] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [editTarget, setEditTarget] = useState<FAQ | undefined>(undefined);
  const [deleteTarget, setDeleteTarget] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const { faqs, loading, error, refetch } = useAdminFAQs();

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4">
        {/* Lingkaran Animasi */}
        <div className="relative flex items-center justify-center">
          <div className="absolute size-16 rounded-full border-4 border-emerald-100 dark:border-emerald-950/30 animate-ping opacity-75"></div>
          <div className="relative size-16 rounded-full border-4 border-slate-100 dark:border-slate-800 border-t-emerald-500 animate-spin"></div>
          {/* Ikon di tengah lingkaran */}
          <ShieldCheck className="absolute size-6 text-emerald-500 animate-pulse" />
        </div>

        {/* Teks Animasi */}
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
        {/* Ikon Error */}
        <div className="size-16 rounded-full bg-rose-50 border-2 border-rose-100 flex items-center justify-center">
          <Activity className="size-8 text-rose-500" />
        </div>

        {/* Teks Error */}
        <div className="text-center space-y-1">
          <h3 className="text-lg font-bold text-slate-700">
            Gagal Memuat Data
          </h3>
          <p className="text-sm font-medium text-slate-400">{error}</p>
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

  const filtered = faqs.filter(
    (f) =>
      f.question.toLowerCase().includes(search.toLowerCase()) ||
      f.category.toLowerCase().includes(search.toLowerCase()),
  );

  const handleEdit = (faq: FAQ) => {
    setEditTarget(faq);
    setShowModal(true);
  };

  const handleAdd = () => {
    setEditTarget(undefined);
    setShowModal(true);
  };

  const confirmDelete = async () => {
    if (!deleteTarget) return;
    try {
      await faqsService.delete(deleteTarget);
      setDeleteTarget(null);
      setSuccessMessage("FAQ berhasil dihapus!");
      refetch();
    } catch (err) {
      const error = err as {
        response?: { data?: { message?: string } };
        message?: string;
      };
      toast.error(error.response?.data?.message || "Gagal menghapus FAQ");
    }
  };

  const handleToggleActive = async (faqToToggle: FAQ) => {
    try {
      await faqsService.update(faqToToggle.id, {
        question: faqToToggle.question,
        answer: faqToToggle.answer,
        category: faqToToggle.category,
        orderNumber: faqToToggle.orderNumber,
        isActive: !faqToToggle.isActive,
      });
      toast.success(
        `FAQ berhasil di${faqToToggle.isActive ? "nonaktifkan" : "aktifkan"}!`,
      );
      refetch();
    } catch (err) {
      const error = err as {
        response?: { data?: { message?: string } };
        message?: string;
      };
      toast.error(error.response?.data?.message || "Gagal mengubah status FAQ");
    }
  };

  return (
    <>
      {showModal && (
        <FAQModal
          faq={editTarget}
          onSuccess={(msg) => {
            refetch();
            setShowModal(false);
            setSuccessMessage(msg);
          }}
          onClose={() => {
            setShowModal(false);
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
                Hapus FAQ?
              </AlertDialogTitle>
              <AlertDialogDescription className="text-slate-500 dark:text-slate-400 font-medium text-sm text-center pt-2">
                Apakah kamu yakin ingin menghapus FAQ ini? Tindakan ini tidak
                bisa dibatalkan.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter className="w-full flex gap-3 mt-6">
              <AlertDialogCancel
                onClick={() => setDeleteTarget(null)}
                className="flex-1 h-12 rounded-full border-2 border-slate-100 dark:border-slate-800 text-slate-500 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
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

      {/* Modal Sukses (Sesuai Screenshot) */}
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
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-4xl font-extrabold text-[#1e293b] dark:text-white mb-2 tracking-tight">
              Manajemen FAQ
            </h1>
            <p className="text-slate-500 dark:text-slate-400 font-medium text-base">
              Kelola pertanyaan yang ditampilkan di halaman publik.
            </p>
          </div>
          <button
            onClick={handleAdd}
            className="flex items-center gap-2 px-6 py-3 rounded-full bg-linear-to-r from-emerald-600 to-teal-500 text-white font-bold text-sm shadow-lg shadow-emerald-500/20 hover:shadow-emerald-500/40 hover:-translate-y-0.5 transition-all whitespace-nowrap"
          >
            <Plus className="size-4" />
            Tambah FAQ
          </button>
        </div>

        {/* Table Card */}
        <div className="bg-white dark:bg-slate-900 rounded-[32px] shadow-sm border border-slate-100 dark:border-slate-800 overflow-hidden">
          {/* Toolbar */}
          <div className="p-6 border-b border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/30">
            <div className="relative w-full sm:w-96">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 size-4 text-slate-400" />
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Cari pertanyaan atau kategori..."
                className="w-full h-11 pl-11 pr-4 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all text-sm font-medium"
              />
            </div>
          </div>

          {/* Table */}
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50 dark:bg-slate-800/40 border-b border-slate-100 dark:border-slate-800 text-slate-500 dark:text-slate-400 text-xs font-bold uppercase tracking-wider">
                  <th className="px-6 py-4">No</th>
                  <th className="px-6 py-4">Pertanyaan</th>
                  <th className="px-6 py-4">Kategori</th>
                  <th className="px-6 py-4">Status</th>
                  <th className="px-6 py-4 text-right">Aksi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                {filtered.length === 0 ? (
                  <tr>
                    <td
                      colSpan={5}
                      className="px-6 py-16 text-center text-slate-400 dark:text-slate-500 font-medium"
                    >
                      Tidak ada FAQ ditemukan.
                    </td>
                  </tr>
                ) : (
                  filtered.map((faq) => (
                    <tr
                      key={faq.id}
                      className="hover:bg-slate-50/80 dark:hover:bg-slate-800/30 transition-colors group"
                    >
                      <td className="px-6 py-5">
                        <span className="text-sm font-bold text-slate-500 dark:text-slate-400 bg-slate-100 dark:bg-slate-800 size-7 flex items-center justify-center rounded-lg">
                          {faq.orderNumber}
                        </span>
                      </td>
                      <td className="px-6 py-5 max-w-sm">
                        <p className="text-sm font-bold text-[#1e293b] dark:text-white mb-0.5 truncate">
                          {faq.question}
                        </p>
                        <p className="text-xs font-medium text-slate-400 dark:text-slate-500 truncate">
                          {faq.answer}
                        </p>
                      </td>
                      <td className="px-6 py-5">
                        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold bg-blue-50 dark:bg-blue-950/40 text-blue-600 dark:text-blue-400 border border-blue-100 dark:border-blue-900/40">
                          <Tag className="size-3" />
                          {faq.category}
                        </span>
                      </td>
                      <td className="px-6 py-5">
                        <button
                          onClick={() => handleToggleActive(faq)}
                          className={cn(
                            "inline-flex items-center gap-1.5 text-xs font-bold px-2 py-1 rounded-md transition-colors",
                            faq.isActive
                              ? "text-emerald-600 dark:text-emerald-400 hover:bg-emerald-50 dark:hover:bg-emerald-950/20"
                              : "text-slate-400 dark:text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800",
                          )}
                          title={
                            faq.isActive ? "Nonaktifkan FAQ" : "Aktifkan FAQ"
                          }
                        >
                          {faq.isActive ? (
                            <>
                              <ToggleRight className="size-5" /> Aktif
                            </>
                          ) : (
                            <>
                              <ToggleLeft className="size-5" /> Nonaktif
                            </>
                          )}
                        </button>
                      </td>
                      <td className="px-6 py-5">
                        <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                          <button
                            onClick={() => handleEdit(faq)}
                            className="p-2 rounded-lg text-blue-500 hover:bg-blue-50 dark:hover:bg-blue-950/20 transition-colors"
                            title="Edit"
                          >
                            <Edit2 className="size-4" />
                          </button>
                          <button
                            className="p-2 rounded-lg text-red-500 hover:bg-red-50 dark:hover:bg-red-950/20 transition-colors"
                            title="Hapus"
                            onClick={() => setDeleteTarget(faq.id)}
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
          <div className="p-6 border-t border-slate-100 dark:border-slate-800 bg-slate-50/30 dark:bg-slate-800/20 flex items-center justify-between text-sm font-medium text-slate-500 dark:text-slate-400">
            <p>
              Menampilkan {filtered.length} dari {faqs.length} FAQ
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
