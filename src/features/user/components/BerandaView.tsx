import { Leaf, Award, Recycle, ScanLine, Upload, Loader2, Flame, Trophy, ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";
import { useEcoPoints } from "../hooks/useEcoPoints";
import { useScanHistory } from "../hooks/useScanHistory";
import { useDailyTasks } from "../hooks/useDailyTasks";
import { useLeaderboard } from "../hooks/useLeaderboard";
import { useSession } from "@/features/auth/hooks/useSession";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useState } from "react";
import { userTaskCompletionsService } from "@/services/userTaskCompletionsService";
import { toast } from "sonner";

export default function BerandaView() {
  const { pointsData, loading: pointsLoading, streak, refetch: refetchPoints } = useEcoPoints();
  const { history, loading: historyLoading, refetch: refetchHistory } = useScanHistory();
  const { tasks, loading: tasksLoading, refetch: refetchTasks } = useDailyTasks();
  const { leaderboard, loading: leaderboardLoading, refetch: refetchLeaderboard } = useLeaderboard();
  const { userData, refetchUser } = useSession();
  const [completingTaskId, setCompletingTaskId] = useState<string | null>(null);

  const handleUploadProof = async (taskId: string, e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      setCompletingTaskId(taskId);
      await userTaskCompletionsService.completeTask(taskId, file);
      toast.success("Bukti berhasil dikirim! Tugas berhasil diselesaikan.");
      
      // Refresh all user states dynamically without a full browser reload
      refetchPoints();
      refetchHistory();
      refetchTasks();
      refetchLeaderboard();
      refetchUser();
    } catch (err) {
      const error = err as {
        response?: { data?: { message?: string } };
        message?: string;
      };
      toast.error(
        error.response?.data?.message ||
        error.message ||
        "Gagal mengirim bukti tugas"
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
          {pointsData?.message || "Pantau kontribusi Anda untuk bumi yang lebih hijau."}
        </p>
      </div>

      {/* Stats row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white dark:bg-slate-900 rounded-[24px] p-6 shadow-sm border border-slate-100 dark:border-slate-800 flex items-center gap-4 hover:shadow-md transition-shadow">
          <div className="size-14 rounded-full bg-[#ecfdf5] dark:bg-emerald-950/30 flex items-center justify-center shrink-0">
            <Leaf className="size-6 text-[#10b981]" />
          </div>
          <div>
            <p className="text-sm font-bold text-slate-500 dark:text-slate-400 mb-1">Total Poin Eco</p>
            <p className="text-3xl font-extrabold text-[#1e293b] dark:text-white">
              {pointsLoading ? "..." : (pointsData?.totalPoints ?? 0).toLocaleString()}
            </p>
          </div>
        </div>

        <div className="bg-white dark:bg-slate-900 rounded-[24px] p-6 shadow-sm border border-slate-100 dark:border-slate-800 flex items-center gap-4 hover:shadow-md transition-shadow">
          <div className="size-14 rounded-full bg-[#eff6ff] dark:bg-blue-950/30 flex items-center justify-center shrink-0">
            <Recycle className="size-6 text-[#3b82f6]" />
          </div>
          <div>
            <p className="text-sm font-bold text-slate-500 dark:text-slate-400 mb-1">Barang Didaur Ulang</p>
            <p className="text-3xl font-extrabold text-[#1e293b] dark:text-white">
              {historyLoading ? "..." : (history?.length || 0).toLocaleString()}
            </p>
          </div>
        </div>

        <div className="bg-white dark:bg-slate-900 rounded-[24px] p-6 shadow-sm border border-slate-100 dark:border-slate-800 flex items-center gap-4 hover:shadow-md transition-shadow">
          <div className="size-14 rounded-full bg-[#fef2f2] dark:bg-red-950/30 flex items-center justify-center shrink-0">
            <Award className="size-6 text-[#ef4444]" />
          </div>
          <div>
            <p className="text-sm font-bold text-slate-500 dark:text-slate-400 mb-1">Misi Tersedia</p>
            <p className="text-3xl font-extrabold text-[#1e293b] dark:text-white">
              {tasksLoading ? "..." : (tasks?.length || 0).toLocaleString()}
            </p>
          </div>
        </div>

        <div className="bg-white dark:bg-slate-900 rounded-[24px] p-6 shadow-sm border border-slate-100 dark:border-slate-800 flex items-center gap-4 hover:shadow-md transition-shadow" title={pointsData?.message}>
          <div className={`size-14 rounded-full flex items-center justify-center shrink-0 ${streak?.isLit ? 'bg-[#fff7ed] dark:bg-orange-950/20' : 'bg-slate-50 dark:bg-slate-800/50'}`}>
            <Flame className={`size-6 ${streak?.flameColor}`} fill={streak?.isLit ? 'currentColor' : 'none'} />
          </div>
          <div>
            <p className="text-sm font-bold text-slate-500 dark:text-slate-400 mb-1">Streak Misi</p>
            <p className="text-3xl font-extrabold text-[#1e293b] dark:text-white">
              {pointsLoading ? "..." : (streak?.streakCount ?? 0)}
            </p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column: Misi Harian */}
        <div className="lg:col-span-2 bg-white dark:bg-slate-900 rounded-[32px] p-4 sm:p-6 md:p-8 shadow-sm border border-slate-100 dark:border-slate-800 h-fit">
          <h2 className="text-xl font-bold text-[#1e293b] dark:text-white mb-6">Misi Harian</h2>
          
          <div className="flex flex-col gap-4">
            {tasksLoading ? (
              <p className="text-slate-400 dark:text-slate-500 font-medium text-sm text-center py-10">Memuat misi...</p>
            ) : tasks.length === 0 ? (
              <p className="text-slate-400 dark:text-slate-500 font-medium text-sm text-center py-10">
                Belum ada misi hari ini.
              </p>
            ) : (
              tasks.map((task) => (
                <div
                  key={task.id}
                  className="p-4 sm:p-5 rounded-2xl bg-slate-50 dark:bg-slate-800/40 border border-slate-100 dark:border-slate-800 flex flex-col sm:flex-row justify-between sm:items-center gap-4 hover:bg-white dark:hover:bg-slate-800 hover:shadow-md transition-all group"
                >
                  <div className="flex items-start gap-4">
                    <div className="size-10 rounded-full bg-amber-100 dark:bg-amber-950/30 flex items-center justify-center shrink-0">
                      <Award className="size-5 text-amber-500" />
                    </div>
                    <div className="flex-1">
                      <div className="flex flex-wrap items-center gap-2 mb-1.5">
                        <h3 className="text-base font-bold text-slate-800 dark:text-slate-200 group-hover:text-emerald-600 transition-colors">
                          {task.taskName}
                        </h3>
                        {task.category && (
                          <span className="inline-flex items-center px-2 py-0.5 rounded-md text-[10px] font-bold bg-blue-50 dark:bg-blue-950/40 text-blue-600 dark:text-blue-400 border border-blue-100 dark:border-blue-900/40">
                            {task.category.categoryName}
                          </span>
                        )}
                      </div>
                      <p className="text-sm font-medium text-slate-500 dark:text-slate-450">
                        {task.description}
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex flex-wrap items-center justify-between sm:justify-end w-full sm:w-auto gap-3 shrink-0">
                    <span className="inline-flex items-center px-2.5 py-1 rounded-full text-[11px] sm:text-xs font-bold bg-amber-50 dark:bg-amber-950/40 text-amber-600 dark:text-amber-400 border border-amber-200 dark:border-amber-900/40">
                      +{task.pointReward} Poin
                    </span>
                    
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
                          completingTaskId === task.id ? "opacity-50 pointer-events-none" : ""
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
                        to="/dashboard/scan"
                        className="inline-flex items-center justify-center gap-1.5 px-3 py-2 sm:px-4 sm:py-2 rounded-xl bg-slate-900 dark:bg-slate-800 text-white dark:text-slate-100 text-xs sm:text-sm font-bold shadow-sm hover:bg-slate-800 dark:hover:bg-slate-700 transition-all"
                      >
                        <ScanLine className="size-4" />
                        Scan AI
                      </Link>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Right Column: Klasemen Top Poin */}
        <div className="bg-white dark:bg-slate-900 rounded-[32px] p-6 shadow-sm border border-slate-100 dark:border-slate-800 h-fit flex flex-col">
          <div className="flex items-center justify-between mb-5">
            <div className="flex items-center gap-2">
              <Trophy className="size-5 text-amber-500" />
              <h2 className="text-lg font-bold text-[#1e293b] dark:text-white">Klasemen Top</h2>
            </div>
            <Link
              to="/dashboard/leaderboard"
              className="text-xs font-bold text-emerald-600 dark:text-emerald-400 hover:text-emerald-700 dark:hover:text-emerald-350 flex items-center gap-0.5 hover:underline"
            >
              Lihat Detail
              <ChevronRight className="size-3.5" />
            </Link>
          </div>

          <div className="flex flex-col gap-3">
            {leaderboardLoading ? (
              <p className="text-slate-400 dark:text-slate-500 font-medium text-xs text-center py-6">Memuat klasemen...</p>
            ) : leaderboard.length === 0 ? (
              <p className="text-slate-400 dark:text-slate-500 font-medium text-xs text-center py-6">Belum ada data klasemen.</p>
            ) : (
              <>
                <div className="flex flex-col gap-2.5">
                  {leaderboard.slice(0, 3).map((entry, index) => {
                    const isMe = entry.username === userData?.data?.username;
                    const rankStyles = [
                      "bg-amber-50 dark:bg-amber-950/40 text-amber-600 dark:text-amber-400 border-amber-200 dark:border-amber-900/40", // 1st
                      "bg-slate-50 dark:bg-slate-800/40 text-slate-600 dark:text-slate-300 border-slate-200 dark:border-slate-700", // 2nd
                      "bg-orange-50 dark:bg-orange-950/40 text-orange-600 dark:text-orange-400 border-orange-200 dark:border-orange-900/40" // 3rd
                    ];
                    return (
                      <div
                        key={entry.userId}
                        className={`flex items-center justify-between p-2.5 rounded-xl border transition-all ${
                          isMe
                            ? "bg-emerald-50/70 dark:bg-emerald-950/20 border-emerald-200 dark:border-emerald-900/40 shadow-sm"
                            : "bg-slate-50/50 dark:bg-slate-800/20 border-slate-100 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800/50"
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <span className={`size-6 rounded-full border flex items-center justify-center text-xs font-extrabold shrink-0 ${rankStyles[index] || "bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400 border-slate-200 dark:border-slate-700"}`}>
                            {index + 1}
                          </span>
                          <Avatar className="size-8 shrink-0">
                            <AvatarImage src={entry.avatarUrl || undefined} />
                            <AvatarFallback className="text-[10px] font-extrabold bg-slate-100 dark:bg-slate-850 text-slate-600 dark:text-slate-400">
                              {entry.username.slice(0, 2).toUpperCase()}
                            </AvatarFallback>
                          </Avatar>
                          <div className="truncate max-w-[100px] sm:max-w-[150px] lg:max-w-[90px]">
                            <p className={`text-sm font-bold truncate ${isMe ? "text-emerald-900 dark:text-emerald-400" : "text-slate-800 dark:text-slate-200"}`}>
                              {isMe ? "Anda" : entry.fullName}
                            </p>
                            <p className="text-[10px] text-slate-400 dark:text-slate-550 font-medium truncate">@{entry.username}</p>
                          </div>
                        </div>
                        <span className={`text-xs font-extrabold ${isMe ? "text-emerald-700 dark:text-emerald-400" : "text-slate-600 dark:text-slate-350"}`}>
                          {entry.totalPoints} Poin
                        </span>
                      </div>
                    );
                  })}
                </div>

                {/* Posisi Anda */}
                {(() => {
                  const myRank = leaderboard.findIndex(entry => entry.username === userData?.data?.username) + 1;
                  const myEntry = leaderboard[myRank - 1];
                  return myRank > 0 ? (
                    <div className="mt-4 flex items-center justify-between bg-emerald-500/5 dark:bg-emerald-500/10 p-3 rounded-xl border border-emerald-500/10 dark:border-emerald-500/20">
                      <div className="flex flex-col">
                        <span className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider mb-1">Posisi Anda</span>
                        <span className="inline-flex items-center px-2 py-0.5 rounded-md text-xs font-extrabold bg-emerald-100 dark:bg-emerald-950/50 text-emerald-800 dark:text-emerald-400 w-fit">
                          Peringkat #{myRank}
                        </span>
                      </div>
                      <span className="text-sm font-extrabold text-emerald-700 dark:text-emerald-400">{myEntry?.totalPoints ?? 0} Poin</span>
                    </div>
                  ) : (
                    <div className="mt-4 pt-4 border-t border-slate-100 dark:border-slate-800 text-center">
                      <p className="text-[10px] font-medium text-slate-400 dark:text-slate-500">Belum masuk klasemen. Selesaikan misi pertama Anda!</p>
                    </div>
                  );
                })()}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
