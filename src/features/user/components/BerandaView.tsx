import LeaderboardWidget from "@/components/common/LeaderboardWidget";
import { useSession } from "@/features/auth/hooks/useSession";
import { type ScanResultResponse } from "@/services/scanHistoryService";
import { userTaskCompletionsService } from "@/services/userTaskCompletionsService";
import {
  AlertCircle,
  Award,
  CheckCircle2,
  Droplets,
  Flame,
  Leaf,
  Loader2,
  Recycle,
  ScanLine,
  Trash2,
  Upload,
  X,
} from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "sonner";
import { useDailyTasks } from "../hooks/useDailyTasks";
import { useEcoPoints } from "../hooks/useEcoPoints";
import { useScanHistory } from "../hooks/useScanHistory";
import { useUserTaskCompletions } from "../hooks/useUserTaskCompletions";

export default function BerandaView() {
  const {
    pointsData,
    loading: pointsLoading,
    streak,
    refetch: refetchPoints,
  } = useEcoPoints();
  const {
    history,
    loading: historyLoading,
    refetch: refetchHistory,
  } = useScanHistory();
  const {
    tasks,
    loading: tasksLoading,
    refetch: refetchTasks,
  } = useDailyTasks();
  const { history: completions, refetch: refetchCompletions } =
    useUserTaskCompletions();
  const { refetchUser } = useSession();
  const [completingTaskId, setCompletingTaskId] = useState<string | null>(null);
  const [refreshKey, setRefreshKey] = useState(0);
  const [uploadResult, setUploadResult] = useState<ScanResultResponse | null>(
    null,
  );
  const [showResultModal, setShowResultModal] = useState(false);

  const closeResultModal = () => {
    setShowResultModal(false);
    setUploadResult(null);
    // Refresh all user states when modal is closed
    refetchPoints();
    refetchHistory();
    refetchTasks();
    refetchCompletions();
    setRefreshKey((prev) => prev + 1);
    refetchUser();
  };
  const handleUploadProof = async (
    taskId: string,
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      setCompletingTaskId(taskId);
      const result = await userTaskCompletionsService.completeTask(
        taskId,
        file,
      );

      // Reset file input so the same file can be re-selected
      e.target.value = '';

      // Show result modal with the scan result
      setUploadResult(result);
      setShowResultModal(true);
    } catch (err) {
      // Reset file input on error too
      e.target.value = '';
      const error = err as {
        response?: { data?: { message?: string } };
        message?: string;
      };
      toast.error(
        error.response?.data?.message ||
          error.message ||
          "Gagal mengirim bukti tugas",
      );
    } finally {
      setCompletingTaskId(null);
    }
  };

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="mb-8">
        <h1 className="text-4xl font-extrabold text-[#1e293b] dark:text-white mb-2 tracking-tight">
          Ringkasan Dampak
        </h1>
        <p className="text-slate-500 dark:text-slate-400 font-medium text-base">
          {pointsData?.message ||
            "Pantau kontribusi Anda untuk bumi yang lebih hijau."}
        </p>
      </div>

      {/* Stats row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white dark:bg-slate-900 rounded-[24px] p-6 shadow-sm border border-slate-100 dark:border-slate-800 flex items-center gap-4 hover:shadow-md transition-shadow">
          <div className="size-14 rounded-full bg-[#ecfdf5] dark:bg-emerald-950/30 flex items-center justify-center shrink-0">
            <Leaf className="size-6 text-[#10b981]" />
          </div>
          <div>
            <p className="text-sm font-bold text-slate-500 dark:text-slate-400 mb-1">
              Total Poin Eco
            </p>
            <p className="text-3xl font-extrabold text-[#1e293b] dark:text-white">
              {pointsLoading
                ? "..."
                : (pointsData?.totalPoints ?? 0).toLocaleString()}
            </p>
          </div>
        </div>

        <div className="bg-white dark:bg-slate-900 rounded-[24px] p-6 shadow-sm border border-slate-100 dark:border-slate-800 flex items-center gap-4 hover:shadow-md transition-shadow">
          <div className="size-14 rounded-full bg-[#eff6ff] dark:bg-blue-950/30 flex items-center justify-center shrink-0">
            <Recycle className="size-6 text-[#3b82f6]" />
          </div>
          <div>
            <p className="text-sm font-bold text-slate-500 dark:text-slate-400 mb-1">
              Barang Didaur Ulang
            </p>
            <p className="text-3xl font-extrabold text-[#1e293b] dark:text-white">
              {historyLoading ? '...' : (history?.length || 0).toLocaleString()}
            </p>
          </div>
        </div>

        <div className="bg-white dark:bg-slate-900 rounded-[24px] p-6 shadow-sm border border-slate-100 dark:border-slate-800 flex items-center gap-4 hover:shadow-md transition-shadow">
          <div className="size-14 rounded-full bg-[#fef2f2] dark:bg-red-950/30 flex items-center justify-center shrink-0">
            <Award className="size-6 text-[#ef4444]" />
          </div>
          <div>
            <p className="text-sm font-bold text-slate-500 dark:text-slate-400 mb-1">
              Misi Tersedia
            </p>
            <p className="text-3xl font-extrabold text-[#1e293b] dark:text-white">
              {tasksLoading ? '...' : (tasks?.length || 0).toLocaleString()}
            </p>
          </div>
        </div>

        <div
          className="bg-white dark:bg-slate-900 rounded-[24px] p-6 shadow-sm border border-slate-100 dark:border-slate-800 flex items-center gap-4 hover:shadow-md transition-shadow"
          title={pointsData?.message}
        >
          <div
            className={`size-14 rounded-full flex items-center justify-center shrink-0 ${streak?.isLit ? "bg-[#fff7ed] dark:bg-orange-950/20" : "bg-slate-50 dark:bg-slate-800/50"}`}
          >
            <Flame
              className={`size-6 ${streak?.flameColor}`}
              fill={streak?.isLit ? "currentColor" : "none"}
            />
          </div>
          <div>
            <p className="text-sm font-bold text-slate-500 dark:text-slate-400 mb-1">
              Streak Misi
            </p>
            <p className="text-3xl font-extrabold text-[#1e293b] dark:text-white">
              {pointsLoading ? '...' : (streak?.streakCount ?? 0)}
            </p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column: Misi Harian */}
        <div className="lg:col-span-2 bg-white dark:bg-slate-900 rounded-[32px] p-4 sm:p-6 md:p-8 shadow-sm border border-slate-100 dark:border-slate-800 h-fit">
          <h2 className="text-xl font-bold text-[#1e293b] dark:text-white mb-6">
            Misi Harian
          </h2>

          <div className="flex flex-col gap-4">
            {tasksLoading ? (
              <p className="text-slate-400 dark:text-slate-500 font-medium text-sm text-center py-10">
                Memuat misi...
              </p>
            ) : tasks.length === 0 ? (
              <p className="text-slate-400 dark:text-slate-500 font-medium text-sm text-center py-10">
                Belum ada misi hari ini.
              </p>
            ) : (
              tasks.map((task) => {
                const isCompleted = completions?.some(
                  (c) => c.taskId === task.id && c.isCompleted,
                );

                return (
                  <div
                    key={task.id}
                    className={`p-4 sm:p-5 rounded-2xl border flex flex-col sm:flex-row justify-between sm:items-center gap-4 hover:shadow-md transition-all group ${
                      isCompleted
                        ? 'bg-emerald-50/20 dark:bg-emerald-950/10 border-emerald-100 dark:border-emerald-900/30 hover:bg-emerald-50/30 dark:hover:bg-emerald-950/15'
                        : 'bg-slate-50 dark:bg-slate-800/40 border-slate-100 dark:border-slate-800 hover:bg-white dark:hover:bg-slate-800'
                    }`}
                  >
                    <div className="flex items-start gap-4">
                      <div
                        className={`size-10 rounded-full flex items-center justify-center shrink-0 ${
                          isCompleted
                            ? 'bg-emerald-100 dark:bg-emerald-950/30 text-emerald-500'
                            : 'bg-amber-100 dark:bg-amber-950/30 text-amber-500'
                        }`}
                      >
                        {isCompleted ? (
                          <CheckCircle2 className="size-5" />
                        ) : (
                          <Award className="size-5" />
                        )}
                      </div>
                      <div className="flex-1">
                        <div className="flex flex-wrap items-center gap-2 mb-1.5">
                          <h3
                            className={`text-base font-bold transition-colors ${
                              isCompleted
                                ? 'text-slate-400 dark:text-slate-500 line-through decoration-slate-400/40'
                                : 'text-slate-800 dark:text-slate-200 group-hover:text-emerald-600'
                            }`}
                          >
                            {task.taskName}
                          </h3>
                          {task.category && (
                            <span
                              className={`inline-flex items-center px-2 py-0.5 rounded-md text-[10px] font-bold border ${
                                isCompleted
                                  ? 'bg-emerald-50/55 dark:bg-emerald-950/30 text-emerald-600 dark:text-emerald-400 border-emerald-200/40 dark:border-emerald-900/40'
                                  : 'bg-blue-50 dark:bg-blue-950/40 text-blue-600 dark:text-blue-400 border-blue-100 dark:border-blue-900/40'
                              }`}
                            >
                              {task.category.categoryName}
                            </span>
                          )}
                        </div>
                        <p
                          className={`text-sm font-medium ${
                            isCompleted
                              ? 'text-slate-400/80 dark:text-slate-500'
                              : 'text-slate-500 dark:text-slate-450'
                          }`}
                        >
                          {task.description}
                        </p>
                      </div>
                    </div>

                    <div className="flex flex-wrap items-center justify-between sm:justify-end w-full sm:w-auto gap-3 shrink-0">
                      <span
                        className={`inline-flex items-center px-2.5 py-1 rounded-full text-[11px] sm:text-xs font-bold border ${
                          isCompleted
                            ? 'bg-emerald-100/45 dark:bg-emerald-950/20 text-emerald-600 dark:text-emerald-400 border-emerald-200/30'
                            : 'bg-amber-50 dark:bg-amber-950/40 text-amber-600 dark:text-amber-400 border-amber-200 dark:border-amber-900/40'
                        }`}
                      >
                        +{task.pointReward} Poin
                      </span>

                      {isCompleted ? (
                        <span className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-emerald-100 dark:bg-emerald-950/40 text-emerald-600 dark:text-emerald-455 font-bold text-xs sm:text-sm border border-emerald-200/30">
                          <CheckCircle2 className="size-4" />
                          Selesai
                        </span>
                      ) : (
                        <div className="flex items-center flex-wrap gap-2 justify-end w-full sm:w-auto">
                          <input
                            type="file"
                            id={`proof-${task.id}`}
                            accept="image/*"
                            className="hidden"
                            disabled={completingTaskId !== null}
                            onChange={(e) => handleUploadProof(task.id, e)}
                          />
                          <label
                            htmlFor={`proof-${task.id}`}
                            className={`cursor-pointer inline-flex items-center justify-center gap-1.5 px-3 py-2 sm:px-4 sm:py-2 rounded-xl bg-emerald-600 text-white text-xs sm:text-sm font-bold shadow-sm hover:bg-emerald-700 transition-all ${
                              completingTaskId === task.id
                                ? 'opacity-50 pointer-events-none'
                                : ''
                            }`}
                          >
                            {completingTaskId === task.id ? (
                              <>
                                <Loader2 className="size-4 animate-spin" />
                                Mengirim...
                              </>
                            ) : (
                              <>
                                <Upload className="size-4" />
                                Kirim Bukti
                              </>
                            )}
                          </label>

                          <Link
                            to={`/dashboard/scan?taskId=${task.id}`}
                            className="inline-flex items-center justify-center gap-1.5 px-3 py-2 sm:px-4 sm:py-2 rounded-xl bg-slate-900 dark:bg-slate-800 text-white dark:text-slate-100 text-xs sm:text-sm font-bold shadow-sm hover:bg-slate-800 dark:hover:bg-slate-700 transition-all"
                          >
                            <ScanLine className="size-4" />
                            Scan AI
                          </Link>
                        </div>
                      )}
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>

        {/* Right Column: Klasemen Top Poin */}
        <div className="h-full">
          <LeaderboardWidget key={refreshKey} />
        </div>
      </div>
      {/* Upload Proof Result Modal */}
      {showResultModal && uploadResult && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-300"
            onClick={closeResultModal}
          />

          {/* Modal Content */}
          <div className="relative w-full max-w-md bg-white dark:bg-slate-900 rounded-[32px] shadow-2xl overflow-hidden flex flex-col max-h-[90vh] animate-in zoom-in-95 duration-300 border border-slate-100 dark:border-slate-800">
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-slate-100 dark:border-slate-800">
              <h2 className="text-xl font-extrabold text-[#1e293b] dark:text-white">
                Hasil Verifikasi Misi
              </h2>
              <button
                onClick={closeResultModal}
                className="size-10 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-500 hover:text-slate-800 dark:hover:text-slate-200 transition-colors"
              >
                <X className="size-5" />
              </button>
            </div>

            {/* Body */}
            <div className="overflow-y-auto flex-1 p-6 sm:p-8 custom-scrollbar">
              <div className="space-y-6">
                {/* Status Badge */}
                <div className="flex items-center gap-3">
                  <div
                    className={`size-12 rounded-full flex items-center justify-center shrink-0 ${
                      uploadResult.completedTask?.isCompleted
                        ? 'bg-emerald-100 dark:bg-emerald-950/40'
                        : 'bg-rose-100 dark:bg-rose-950/40'
                    }`}
                  >
                    {uploadResult.completedTask?.isCompleted ? (
                      <CheckCircle2 className="size-6 text-emerald-600 dark:text-emerald-400" />
                    ) : (
                      <AlertCircle className="size-6 text-rose-600 dark:text-rose-400" />
                    )}
                  </div>
                  <div>
                    <p
                      className={`text-lg font-extrabold ${
                        uploadResult.completedTask?.isCompleted
                          ? 'text-emerald-700 dark:text-emerald-300'
                          : 'text-rose-700 dark:text-rose-300'
                      }`}
                    >
                      {uploadResult.completedTask?.isCompleted
                        ? 'Misi Berhasil!'
                        : 'Misi Gagal'}
                    </p>
                    <p className="text-sm font-medium text-slate-500 dark:text-slate-400">
                      {uploadResult.completedTask?.isCompleted
                        ? 'Bukti berhasil diverifikasi oleh AI'
                        : 'Barang tidak sesuai dengan kategori misi'}
                    </p>
                  </div>
                </div>

                {/* AI Result */}
                <div className="bg-slate-50 dark:bg-slate-800/50 rounded-2xl p-5">
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-extrabold tracking-widest mb-3 uppercase bg-[#ccfbf1] dark:bg-teal-950/40 text-[#0f766e] dark:text-teal-400">
                    <Recycle className="size-3.5" />
                    TERDETEKSI
                  </div>
                  <h3 className="text-2xl font-extrabold mb-2">
                    <span className="text-transparent bg-clip-text bg-linear-to-r from-emerald-600 to-teal-500 dark:from-emerald-400 dark:to-teal-300">
                      {uploadResult.aiResult?.labelAi?.split('_').join(' ') ||
                        'Tidak diketahui'}
                    </span>
                  </h3>
                  <p className="text-slate-500 dark:text-slate-400 text-sm font-medium">
                    Tingkat kepercayaan:{' '}
                    <span className="font-bold text-emerald-600 dark:text-emerald-400">
                      {(
                        Number(uploadResult.scanHistory?.confidenceScore || 0) *
                        100
                      ).toFixed(1)}
                      %
                    </span>
                  </p>
                </div>

                {/* Points Earned */}
                {uploadResult.completedTask && (
                  <div
                    className={`rounded-2xl p-4 flex items-center gap-4 ${
                      uploadResult.completedTask.isCompleted
                        ? 'bg-[#eff6ff] dark:bg-blue-950/30'
                        : 'bg-rose-50 dark:bg-rose-950/30'
                    }`}
                  >
                    <div className="size-10 rounded-full bg-white dark:bg-slate-800 flex items-center justify-center shrink-0 shadow-sm">
                      <Leaf
                        className={`size-5 ${
                          uploadResult.completedTask.isCompleted
                            ? 'text-[#10b981]'
                            : 'text-rose-500'
                        }`}
                      />
                    </div>
                    <div>
                      <p
                        className={`text-sm font-extrabold ${
                          uploadResult.completedTask.isCompleted
                            ? 'text-slate-800 dark:text-slate-200'
                            : 'text-rose-800 dark:text-rose-200'
                        }`}
                      >
                        +{uploadResult.completedTask.pointAwarded} Poin Eco
                      </p>
                      <p className="text-xs font-medium text-slate-500 dark:text-slate-450">
                        {uploadResult.completedTask.isCompleted
                          ? 'Bonus poin misi berhasil didapatkan!'
                          : 'Sayang sekali, poin misi tidak didapat.'}
                      </p>
                    </div>
                  </div>
                )}

                {/* Tips */}
                <div className="space-y-4">
                  <div className="flex gap-3">
                    <Droplets className="size-5 text-[#10b981] shrink-0 mt-0.5" />
                    <div className="flex-1">
                      <p className="text-sm font-bold text-slate-800 dark:text-slate-100 mb-1">
                        Tips Pengelolaan
                      </p>
                      <p className="text-xs font-medium text-slate-500 dark:text-slate-400 leading-relaxed">
                        {uploadResult.aiResult?.tips ||
                          uploadResult.category?.handlingTips ||
                          'Panduan daur ulang standar berlaku untuk jenis sampah ini.'}
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <Trash2 className="size-5 text-[#10b981] shrink-0 mt-0.5" />
                    <div className="flex-1">
                      <p className="text-sm font-bold text-slate-800 dark:text-slate-100 mb-1">
                        Info
                      </p>
                      <p className="text-xs font-medium text-slate-500 dark:text-slate-400 leading-relaxed">
                        {uploadResult.completedTask?.isCompleted
                          ? 'Tugas kamu sudah selesai. Cek perkembangan misimu di tab Riwayat Misi.'
                          : 'Barang tidak sesuai. Silakan coba pindai barang yang tepat menggunakan tombol Scan AI.'}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="p-6 border-t border-slate-100 dark:border-slate-800">
              <button
                onClick={closeResultModal}
                className="w-full flex items-center justify-center gap-2 px-6 py-4 rounded-2xl bg-[#34d399] text-white font-bold text-sm shadow-lg shadow-[#34d399]/30 hover:bg-[#10b981] transition-all"
              >
                Mengerti
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
