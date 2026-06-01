import { Trophy, ChevronRight, Shield, Flame } from "lucide-react";
import { Link } from "react-router-dom";
import { useLeaderboard } from "@/features/user/hooks/useLeaderboard";
import { useSession } from "@/features/auth/hooks/useSession";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface LeaderboardWidgetProps {
  showDetailsLink?: boolean;
}

export default function LeaderboardWidget({ showDetailsLink = true }: LeaderboardWidgetProps) {
  const { leaderboard, loading: leaderboardLoading, type, setType } = useLeaderboard();
  const { userData } = useSession();

  return (
    <div className="bg-white dark:bg-slate-900 rounded-[32px] p-6 shadow-sm border border-slate-100 dark:border-slate-800 h-full flex flex-col">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Trophy className="size-5 text-amber-500" />
          <h2 className="text-lg font-bold text-[#1e293b] dark:text-white">Klasemen Top</h2>
        </div>
        {showDetailsLink && userData?.data?.role === "user" && (
          <Link
            to="/dashboard/leaderboard"
            className="text-xs font-bold text-emerald-600 dark:text-emerald-400 hover:text-emerald-700 dark:hover:text-emerald-350 flex items-center gap-0.5 hover:underline"
          >
            Lihat Detail
            <ChevronRight className="size-3.5" />
          </Link>
        )}
      </div>

      {/* Mini Toggle Switch */}
      <div className="flex bg-slate-50 dark:bg-slate-800/50 p-1 rounded-xl mb-4 text-[11px] font-bold border border-slate-100/50 dark:border-slate-800">
        <button
          onClick={() => setType('point')}
          className={`flex-1 py-1.5 rounded-lg transition-all flex items-center justify-center gap-1.5 ${
            type === 'point'
              ? 'bg-white dark:bg-slate-700 text-[#10b981] dark:text-emerald-450 shadow-sm'
              : 'text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200'
          }`}
        >
          <Shield className="size-3.5" />
          Poin
        </button>
        <button
          onClick={() => setType('streak')}
          className={`flex-1 py-1.5 rounded-lg transition-all flex items-center justify-center gap-1.5 ${
            type === 'streak'
              ? 'bg-white dark:bg-slate-700 text-[#10b981] dark:text-emerald-450 shadow-sm'
              : 'text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200'
          }`}
        >
          <Flame className="size-3.5" />
          Streak
        </button>
      </div>

      <div className="flex flex-col gap-3 flex-1">
        {leaderboardLoading ? (
          <p className="text-slate-400 dark:text-slate-500 font-medium text-xs text-center py-6">Memuat klasemen...</p>
        ) : leaderboard.length === 0 ? (
          <p className="text-slate-400 dark:text-slate-500 font-medium text-xs text-center py-6">Belum ada data klasemen.</p>
        ) : (
          <>
            <div className="flex flex-col gap-2.5">
              {leaderboard.slice(0, 5).map((entry, index) => {
                const isMe = userData?.data ? entry.username === userData.data.username : false;
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
                    <span className={`text-xs font-extrabold ${isMe ? "text-emerald-700 dark:text-emerald-450" : "text-slate-600 dark:text-slate-355"}`}>
                      {type === 'point' ? (
                        `${entry.totalPoints.toLocaleString()} Poin`
                      ) : (
                        <span className="flex items-center gap-0.5">
                          <Flame className="size-3 text-orange-500" fill="currentColor" />
                          {entry.currentStreak} Streak
                        </span>
                      )}
                    </span>
                  </div>
                );
              })}
            </div>

            {/* Posisi Anda - Hanya tampil untuk role user */}
            {userData?.data?.role === "user" && (() => {
              const myRank = leaderboard.findIndex(entry => entry.username === userData?.data?.username) + 1;
              const myEntry = leaderboard[myRank - 1];
              return myRank > 0 ? (
                <div className="mt-auto pt-4 flex items-center justify-between bg-emerald-500/5 dark:bg-emerald-500/10 p-3 rounded-xl border border-emerald-500/10 dark:border-emerald-500/20">
                  <div className="flex flex-col">
                    <span className="text-[10px] font-bold text-slate-400 dark:text-slate-550 uppercase tracking-wider mb-1">Posisi Anda</span>
                    <span className="inline-flex items-center px-2 py-0.5 rounded-md text-xs font-extrabold bg-emerald-100 dark:bg-emerald-950/50 text-emerald-800 dark:text-emerald-400 w-fit">
                      Peringkat #{myRank}
                    </span>
                  </div>
                  <span className="text-sm font-extrabold text-emerald-700 dark:text-emerald-400">
                    {type === 'point' ? (
                      `${myEntry?.totalPoints ?? 0} Poin`
                    ) : (
                      <span className="flex items-center gap-0.5 justify-end">
                        <Flame className="size-3.5 text-orange-500 inline" fill="currentColor" />
                        {myEntry?.currentStreak ?? 0} Streak
                      </span>
                    )}
                  </span>
                </div>
              ) : (
                <div className="mt-auto pt-4 border-t border-slate-100 dark:border-slate-800 text-center">
                  <p className="text-[10px] font-medium text-slate-400 dark:text-slate-500">Belum masuk klasemen. Selesaikan misi pertama Anda!</p>
                </div>
              );
            })()}
          </>
        )}
      </div>
    </div>
  );
}
