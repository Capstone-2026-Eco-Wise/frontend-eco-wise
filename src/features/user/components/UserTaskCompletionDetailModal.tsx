import { type UserTaskCompletionHistory } from '@/services/userTaskCompletionsService';
import {
  Award,
  Calendar,
  CheckCircle2,
  FileText,
  Info,
  Target,
  X,
  XCircle,
} from 'lucide-react';

interface Props {
  completion: UserTaskCompletionHistory | null;
  onClose: () => void;
}

export default function UserTaskCompletionDetailModal({
  completion,
  onClose,
}: Props) {
  if (!completion) return null;

  const { task, pointAwarded, isCompleted, completedAt } = completion;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-300"
        onClick={onClose}
      />

      {/* Modal Content */}
      <div className="relative w-full max-w-2xl bg-white dark:bg-slate-900 rounded-[32px] shadow-2xl overflow-hidden flex flex-col max-h-[90vh] animate-in zoom-in-95 duration-300 border border-slate-100 dark:border-slate-800">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-slate-100 dark:border-slate-800">
          <h2 className="text-xl font-extrabold text-[#1e293b] dark:text-white">
            Detail Riwayat Misi
          </h2>
          <button
            onClick={onClose}
            className="size-10 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-500 hover:text-slate-800 dark:hover:text-slate-200 transition-colors"
          >
            <X className="size-5" />
          </button>
        </div>

        {/* Body */}
        <div className="overflow-y-auto flex-1 p-6 sm:p-8 custom-scrollbar">
          <div className="space-y-8">
            {/* Status Header Banner */}
            <div className="flex flex-col sm:flex-row gap-6 items-start sm:items-center">
              <div
                className={`size-16 rounded-full flex items-center justify-center shrink-0 shadow-lg ${
                  isCompleted
                    ? 'bg-emerald-500/10 text-emerald-500 dark:bg-emerald-500/20 shadow-emerald-500/5'
                    : 'bg-rose-500/10 text-rose-500 dark:bg-rose-500/20 shadow-rose-500/5'
                }`}
              >
                {isCompleted ? (
                  <CheckCircle2 className="size-8" />
                ) : (
                  <XCircle className="size-8" />
                )}
              </div>

              <div className="flex-1">
                <div
                  className="inline-flex items-center px-3 py-1 rounded-full text-[10px] font-extrabold tracking-widest mb-3 uppercase"
                  style={{
                    backgroundColor: `${task.category?.colorHex || '#10b981'}15`,
                    color: task.category?.colorHex || '#10b981',
                  }}
                >
                  Target Misi: {task.category?.categoryName || 'Semua'}
                </div>

                <h3 className="text-2xl font-extrabold text-slate-800 dark:text-white mb-2 leading-tight">
                  {task.taskName}
                </h3>

                <div className="flex items-center gap-2 text-sm font-medium text-slate-500 dark:text-slate-400">
                  <Calendar className="size-4" />
                  {new Date(completedAt).toLocaleDateString('id-ID', {
                    weekday: 'long',
                    day: 'numeric',
                    month: 'long',
                    year: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit',
                  })}
                </div>
              </div>
            </div>

            {/* Metrics cards */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div
                className={`rounded-2xl p-5 border flex flex-col justify-between ${
                  isCompleted
                    ? 'bg-emerald-50/50 border-emerald-100 dark:bg-emerald-950/20 dark:border-emerald-900/30'
                    : 'bg-rose-50/30 border-rose-100/50 dark:bg-rose-950/10 dark:border-rose-900/20'
                }`}
              >
                <p className="text-xs font-bold text-slate-500 dark:text-slate-400 mb-1">
                  Status Misi
                </p>
                <p
                  className={`text-lg font-black ${
                    isCompleted
                      ? 'text-emerald-600 dark:text-emerald-400'
                      : 'text-rose-500'
                  }`}
                >
                  {isCompleted ? 'BERHASIL' : 'GAGAL'}
                </p>
              </div>

              <div className="bg-[#eff6ff] dark:bg-blue-950/30 rounded-2xl p-5 border border-blue-100/50 dark:border-blue-900/20 flex flex-col justify-between">
                <p className="text-xs font-bold text-slate-500 dark:text-slate-400 mb-1">
                  Poin Diperoleh
                </p>
                <p className="text-xl font-extrabold text-[#10b981]">
                  +{pointAwarded}{' '}
                  <span className="text-xs font-bold text-slate-800 dark:text-slate-200">
                    Eco
                  </span>
                </p>
              </div>

              <div className="bg-slate-50 dark:bg-slate-800/50 rounded-2xl p-5 border border-slate-100 dark:border-slate-800 flex flex-col justify-between">
                <p className="text-xs font-bold text-slate-500 dark:text-slate-400 mb-1">
                  Bonus Misi
                </p>
                <p className="text-lg font-extrabold text-slate-800 dark:text-white">
                  {task.pointReward}{' '}
                  <span className="text-xs font-bold text-slate-500 dark:text-slate-400">
                    Poin
                  </span>
                </p>
              </div>
            </div>

            {/* Information cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="bg-slate-50 dark:bg-slate-800/50 rounded-2xl p-6 border border-slate-100 dark:border-slate-800">
                <div className="flex items-center gap-3 mb-3">
                  <div className="size-8 rounded-full bg-blue-100 dark:bg-blue-900/50 flex items-center justify-center">
                    <FileText className="size-4 text-blue-600 dark:text-blue-400" />
                  </div>
                  <h4 className="text-sm font-bold text-slate-800 dark:text-slate-200">
                    Deskripsi Misi
                  </h4>
                </div>
                <p className="text-sm font-medium text-slate-500 dark:text-slate-400 leading-relaxed">
                  {task.description || 'Tidak ada deskripsi misi.'}
                </p>
              </div>

              <div
                className={`rounded-2xl p-6 border ${
                  isCompleted
                    ? 'bg-emerald-50/50 border-emerald-100 dark:bg-emerald-950/10 dark:border-emerald-900/20'
                    : 'bg-rose-50/30 border-rose-100/50 dark:bg-rose-950/10 dark:border-rose-900/20'
                }`}
              >
                <div className="flex items-center gap-3 mb-3">
                  <div
                    className={`size-8 rounded-full flex items-center justify-center ${
                      isCompleted
                        ? 'bg-emerald-100 dark:bg-emerald-900/50'
                        : 'bg-rose-100 dark:bg-rose-900/50'
                    }`}
                  >
                    {isCompleted ? (
                      <Award className="size-4 text-emerald-600 dark:text-emerald-450" />
                    ) : (
                      <Info className="size-4 text-rose-500" />
                    )}
                  </div>
                  <h4
                    className={`text-sm font-bold ${
                      isCompleted
                        ? 'text-emerald-800 dark:text-emerald-300'
                        : 'text-rose-800 dark:text-rose-350'
                    }`}
                  >
                    Status Kelayakan
                  </h4>
                </div>
                <p
                  className={`text-sm font-medium leading-relaxed ${
                    isCompleted
                      ? 'text-emerald-700/80 dark:text-emerald-400/80'
                      : 'text-rose-700/85 dark:text-rose-405/85'
                  }`}
                >
                  {isCompleted
                    ? 'Hebat! Anda berhasil menyelesaikan misi ini dengan mengunggah sampah yang cocok dengan kategori target.'
                    : 'Misi tidak terselesaikan. Kategori sampah yang Anda unggah/pindai tidak cocok dengan kategori target misi ini.'}
                </p>
              </div>
            </div>

            {/* Target Category Details */}
            {task.category && (
              <div className="bg-slate-50 dark:bg-slate-800/50 rounded-2xl p-6 border border-slate-100 dark:border-slate-800">
                <div className="flex items-center gap-3 mb-3">
                  <div className="size-8 rounded-full bg-amber-100 dark:bg-amber-900/50 flex items-center justify-center">
                    <Target className="size-4 text-amber-600 dark:text-amber-400" />
                  </div>
                  <h4 className="text-sm font-bold text-slate-800 dark:text-slate-200">
                    Kategori Target: {task.category.categoryName}
                  </h4>
                </div>
                <div className="space-y-2 text-sm font-medium text-slate-500 dark:text-slate-400 leading-relaxed">
                  <p>
                    Misi ini mewajibkan Anda untuk mengunggah atau memindai sampah dengan jenis{' '}
                    <span className="font-bold text-slate-700 dark:text-slate-300">
                      {task.category.categoryName} ({task.category.categoryCode})
                    </span>
                    .
                  </p>
                  <p>
                    Dapatkan bonus poin misi sebesar{' '}
                    <span className="font-bold text-[#10b981]">
                      {task.pointReward} poin
                    </span>{' '}
                    setelah berhasil mencocokkannya dengan benar.
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
