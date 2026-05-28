import { useLeaderboard } from '../hooks/useLeaderboard';
import { Award, Trophy, Users, Shield, RefreshCw, Flame } from 'lucide-react';

export default function LeaderboardView() {
  const { leaderboard, type, setType, loading, error } = useLeaderboard();

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4">
        <div className="relative flex items-center justify-center">
          <div className="absolute size-16 rounded-full border-4 border-emerald-100 animate-ping opacity-75"></div>
          <div className="relative size-16 rounded-full border-4 border-slate-100 border-t-emerald-500 animate-spin"></div>
          <Trophy className="absolute size-6 text-emerald-500 animate-pulse" />
        </div>
        <div className="text-center space-y-1">
          <h3 className="text-lg font-bold text-slate-700 animate-pulse">
            Memuat Klasemen...
          </h3>
          <p className="text-sm font-medium text-slate-400">
            Menghitung poin kontribusi terbaik
          </p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4">
        <div className="size-16 rounded-full bg-rose-50 border-2 border-rose-100 flex items-center justify-center">
          <Award className="size-8 text-rose-500" />
        </div>
        <div className="text-center space-y-1">
          <h3 className="text-lg font-bold text-slate-700">
            Gagal Memuat Klasemen
          </h3>
          <p className="text-sm font-medium text-slate-400">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="mt-2 inline-flex items-center gap-2 px-4 py-2 bg-rose-500 text-white rounded-lg hover:bg-rose-600 transition-colors shadow-sm text-sm font-medium"
          >
            <RefreshCw className="size-4" /> Coba Lagi
          </button>
        </div>
      </div>
    );
  }

  // Pisahkan top 3 podium dengan baris klasemen lainnya
  const topThree = leaderboard.slice(0, 3);
  const remaining = leaderboard.slice(3);

  // Helper untuk mendapatkan gaya top 3 podium
  const getPodiumStyle = (index: number) => {
    switch (index) {
      case 0: // Juara 1
        return {
          order: 'sm:order-2',
          cardBg: 'bg-gradient-to-b from-amber-50 to-white dark:from-amber-950/20 dark:to-slate-900/60 border-amber-200 dark:border-amber-900/30 shadow-amber-100/50 dark:shadow-none scale-105 z-10',
          badgeColor: 'bg-amber-500 text-white shadow-amber-200',
          medalColor: 'text-amber-500',
          rank: 1,
        };
      case 1: // Juara 2
        return {
          order: 'sm:order-1',
          cardBg: 'bg-gradient-to-b from-slate-50 to-white dark:from-slate-800/40 dark:to-slate-900/60 border-slate-200 dark:border-slate-800 shadow-slate-100/50 dark:shadow-none',
          badgeColor: 'bg-slate-400 text-white shadow-slate-200',
          medalColor: 'text-slate-400',
          rank: 2,
        };
      case 2: // Juara 3
        return {
          order: 'sm:order-3',
          cardBg: 'bg-gradient-to-b from-orange-50 to-white dark:from-orange-950/20 dark:to-slate-900/60 border-orange-200 dark:border-orange-900/30 shadow-orange-100/50 dark:shadow-none',
          badgeColor: 'bg-orange-600 text-white shadow-orange-200',
          medalColor: 'text-orange-600',
          rank: 3,
        };
      default:
        return {
          order: '',
          cardBg: 'bg-white dark:bg-slate-900 border-slate-100 dark:border-slate-800',
          badgeColor: 'bg-slate-500',
          medalColor: 'text-slate-400',
          rank: index + 1,
        };
    }
  };

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
        <div>
          <h1 className="text-4xl font-extrabold text-[#1e293b] dark:text-white mb-2 tracking-tight">
            Papan Peringkat Eco
          </h1>
          <p className="text-slate-500 dark:text-slate-400 font-medium text-base">
            Apresiasi kontribusi terbaik para pejuang bumi hijau EcoWise.
          </p>
        </div>

        {/* Tab Switcher */}
        <div className="flex bg-slate-100 dark:bg-slate-800 p-1 rounded-2xl w-full md:w-fit shrink-0">
          <button
            onClick={() => setType('point')}
            className={`flex-1 md:flex-initial px-5 py-2 rounded-xl font-bold text-xs sm:text-sm transition-all flex items-center justify-center gap-2 ${
              type === 'point'
                ? 'bg-white dark:bg-slate-700 text-[#10b981] dark:text-emerald-450 shadow-sm'
                : 'text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200'
            }`}
          >
            <Shield className="size-4" />
            Total Poin
          </button>
          <button
            onClick={() => setType('streak')}
            className={`flex-1 md:flex-initial px-5 py-2 rounded-xl font-bold text-xs sm:text-sm transition-all flex items-center justify-center gap-2 ${
              type === 'streak'
                ? 'bg-white dark:bg-slate-700 text-[#10b981] dark:text-emerald-450 shadow-sm'
                : 'text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200'
            }`}
          >
            <Flame className="size-4" />
            Streak Harian
          </button>
        </div>
      </div>

      {leaderboard.length === 0 ? (
        <div className="bg-white rounded-[32px] p-12 text-center border border-slate-100 shadow-sm">
          <Users className="size-16 text-slate-300 mx-auto mb-4" />
          <h3 className="text-lg font-bold text-slate-700 mb-1">
            Klasemen Masih Kosong
          </h3>
          <p className="text-slate-400 font-medium text-sm">
            Jadilah yang pertama untuk memindai sampah dan menyelesaikan misi hari ini!
          </p>
        </div>
      ) : (
        <>
          {/* Podium Top 3 */}
          {topThree.length > 0 && (
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 items-end pt-4 max-w-4xl mx-auto">
              {topThree.map((user, index) => {
                const style = getPodiumStyle(index);
                return (
                  <div
                    key={user.userId}
                    className={`rounded-[28px] border p-6 flex flex-col items-center text-center gap-4 shadow-xl hover:shadow-2xl transition-all hover:-translate-y-1 ${style.cardBg} ${style.order}`}
                  >
                    <div className="relative">
                      <div className="size-20 rounded-full border-4 border-white dark:border-slate-800 bg-slate-100 dark:bg-slate-800 overflow-hidden shadow-md flex items-center justify-center">
                        {user.avatarUrl ? (
                          <img
                            src={user.avatarUrl}
                            alt={user.fullName}
                            className="size-full object-cover"
                          />
                        ) : (
                          <Users className="size-8 text-slate-400" />
                        )}
                      </div>
                      <span
                        className={`absolute -bottom-2 -right-2 size-8 rounded-full border-2 border-white dark:border-slate-800 flex items-center justify-center text-sm font-extrabold shadow-md ${style.badgeColor}`}
                      >
                        {style.rank}
                      </span>
                    </div>

                    <div>
                      <h4 className="font-extrabold text-[#1e293b] dark:text-white line-clamp-1">
                        {user.fullName}
                      </h4>
                      <p className="text-xs font-semibold text-slate-400 dark:text-slate-550 mt-0.5">
                        @{user.username}
                      </p>
                    </div>

                    <div className="flex items-center gap-1.5 px-4 py-1.5 bg-slate-100 dark:bg-slate-800/80 rounded-full">
                      {type === 'point' ? (
                        <>
                          <Shield className="size-4 text-emerald-500 shrink-0" />
                          <span className="text-sm font-extrabold text-slate-700 dark:text-slate-300">
                            {user.totalPoints.toLocaleString()}{' '}
                            <span className="text-xs font-medium text-slate-500 dark:text-slate-400">
                              Poin
                            </span>
                          </span>
                        </>
                      ) : (
                        <>
                          <Flame className="size-4 text-orange-500 shrink-0" fill="currentColor" />
                          <span className="text-sm font-extrabold text-slate-700 dark:text-slate-300">
                            {(user.currentStreak ?? 0).toLocaleString()}{' '}
                            <span className="text-xs font-medium text-slate-500 dark:text-slate-400">
                              Streak
                            </span>
                          </span>
                        </>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          {/* Ranking Table Ranks 4+ */}
          {remaining.length > 0 && (
            <div className="bg-white dark:bg-slate-900 rounded-[32px] shadow-sm border border-slate-100 dark:border-slate-800 overflow-hidden max-w-4xl mx-auto">
              <div className="px-8 py-5 border-b border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/30">
                <h3 className="text-lg font-bold text-[#1e293b] dark:text-white">
                  Peringkat Lainnya
                </h3>
              </div>
              <div className="divide-y divide-slate-100 dark:divide-slate-800">
                {remaining.map((user) => (
                  <div
                    key={user.userId}
                    className="flex items-center justify-between px-8 py-4 hover:bg-slate-50/50 dark:hover:bg-slate-800/30 transition-colors"
                  >
                    <div className="flex items-center gap-4">
                      {/* Rank Number */}
                      <span className="w-6 text-slate-400 dark:text-slate-500 font-extrabold text-sm text-center">
                        {user.rank}
                      </span>

                      {/* Avatar */}
                      <div className="size-10 rounded-full bg-slate-100 dark:bg-slate-800 overflow-hidden flex items-center justify-center shrink-0 border border-slate-200 dark:border-slate-700">
                        {user.avatarUrl ? (
                          <img
                            src={user.avatarUrl}
                            alt={user.fullName}
                            className="size-full object-cover"
                          />
                        ) : (
                          <Users className="size-5 text-slate-400" />
                        )}
                      </div>

                      {/* Name */}
                      <div>
                        <h4 className="text-sm font-bold text-slate-800 dark:text-slate-200">
                          {user.fullName}
                        </h4>
                        <p className="text-xs font-medium text-slate-400 dark:text-slate-500">
                          @{user.username}
                        </p>
                      </div>
                    </div>

                    {/* Points or Streak */}
                    <div className="flex items-center gap-1.5">
                      {type === 'point' ? (
                        <>
                          <Shield className="size-4 text-emerald-500 shrink-0" />
                          <span className="text-sm font-extrabold text-slate-800 dark:text-slate-200">
                            {user.totalPoints.toLocaleString()}{' '}
                            <span className="text-xs font-medium text-slate-400 dark:text-slate-500">
                              Poin
                            </span>
                          </span>
                        </>
                      ) : (
                        <>
                          <Flame className="size-4 text-orange-500 shrink-0" fill="currentColor" />
                          <span className="text-sm font-extrabold text-slate-800 dark:text-slate-200">
                            {(user.currentStreak ?? 0).toLocaleString()}{' '}
                            <span className="text-xs font-medium text-slate-400 dark:text-slate-500">
                              Streak
                            </span>
                          </span>
                        </>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
}
