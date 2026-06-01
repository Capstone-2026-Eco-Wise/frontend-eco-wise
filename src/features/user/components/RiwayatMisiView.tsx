import { Calendar, CheckCircle2, Loader2, Info, XCircle } from 'lucide-react';
import { useState } from 'react';
import { useUserTaskCompletions } from '../hooks/useUserTaskCompletions';
import { type UserTaskCompletionHistory } from '@/services/userTaskCompletionsService';
import UserTaskCompletionDetailModal from './UserTaskCompletionDetailModal';

export default function RiwayatMisiView() {
  const { history, loading } = useUserTaskCompletions();
  const [selectedCompletion, setSelectedCompletion] =
    useState<UserTaskCompletionHistory | null>(null);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px] gap-4">
        <Loader2 className="size-8 text-[#10b981] animate-spin" />
        <p className="text-slate-500 font-medium">Memuat riwayat misi...</p>
      </div>
    );
  }

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="mb-8">
        <h1 className="text-4xl font-extrabold text-[#1e293b] dark:text-white mb-2 tracking-tight">
          Riwayat Misi
        </h1>
        <p className="text-slate-500 dark:text-slate-400 font-medium text-base">
          Daftar misi yang telah Anda coba selesaikan dan poin yang diperoleh.
        </p>
      </div>

      <div className="bg-white dark:bg-slate-900 rounded-[32px] shadow-sm border border-slate-100 dark:border-slate-800 overflow-hidden">
        <div className="p-8">
          <div className="space-y-4">
            {history.length > 0 ? (
              history.map((item) => (
                <div
                  key={item.id}
                  onClick={() => setSelectedCompletion(item)}
                  className="flex flex-col sm:flex-row sm:items-center justify-between p-4 rounded-2xl border border-slate-100 dark:border-slate-800 hover:border-[#10b981]/30 hover:bg-[#10b981]/5 dark:hover:bg-[#10b981]/10 transition-all cursor-pointer group hover:-translate-y-0.5 hover:shadow-md hover:shadow-[#10b981]/5"
                >
                  <div className="flex items-center gap-4 mb-4 sm:mb-0">
                    <div
                      className={`size-12 rounded-full flex items-center justify-center shrink-0 transition-colors ${item.isCompleted ? 'bg-[#ecfdf5] dark:bg-emerald-950/30' : 'bg-rose-50 dark:bg-rose-950/30'}`}
                    >
                      {item.isCompleted ? (
                        <CheckCircle2 className="size-5 text-[#10b981]" />
                      ) : (
                        <XCircle className="size-5 text-rose-500" />
                      )}
                    </div>
                    <div>
                      <h4 className="text-base font-bold text-[#1e293b] dark:text-white mb-1 truncate max-w-[200px] sm:max-w-xs group-hover:text-[#10b981] transition-colors">
                        {item.task.taskName}
                      </h4>
                      <div className="flex items-center gap-1.5 text-xs font-medium text-slate-500 dark:text-slate-400">
                        <Calendar className="size-3.5" />
                        {new Date(item.completedAt).toLocaleDateString(
                          'id-ID',
                          {
                            day: 'numeric',
                            month: 'long',
                            year: 'numeric',
                          },
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center sm:justify-end gap-4">
                    <div className="text-left sm:text-right">
                      <p
                        className={`text-sm font-extrabold ${item.isCompleted ? 'text-[#10b981] dark:text-emerald-450' : 'text-slate-500 dark:text-slate-400'}`}
                      >
                        +{item.pointAwarded} Poin
                      </p>
                      <p
                        className={`text-xs font-medium ${item.isCompleted ? 'text-[#10b981]/70 dark:text-emerald-500/70' : 'text-rose-500/70 dark:text-rose-400/70'}`}
                      >
                        {item.isCompleted ? 'Berhasil' : 'Gagal'}
                      </p>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center py-12">
                <div className="size-16 rounded-full bg-slate-50 dark:bg-slate-800 flex items-center justify-center mx-auto mb-4">
                  <Info className="size-8 text-slate-300 dark:text-slate-600" />
                </div>
                <h3 className="text-lg font-bold text-slate-800 dark:text-slate-200 mb-1">
                  Belum Ada Riwayat Misi
                </h3>
                <p className="text-slate-500 dark:text-slate-450">
                  Mulai kerjakan misi harianmu untuk mendapatkan bonus poin!
                </p>
              </div>
            )}
          </div>
        </div>
      </div>

      <UserTaskCompletionDetailModal
        completion={selectedCompletion}
        onClose={() => setSelectedCompletion(null)}
      />
    </div>
  );
}
