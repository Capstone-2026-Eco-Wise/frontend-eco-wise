import {
  Users,
  Activity,
  CheckCircle,
  ShieldCheck,
  Tag,
  ToggleRight,
  ToggleLeft,
  CheckCircle2,
  XCircle,
  UserCheck,
  Folder,
} from "lucide-react";
import { Link } from "react-router-dom";
import useAdminStats from "../hooks/useAdminStats";
import useAdminFAQs from "../hooks/useAdminFAQs";
import useAdminDailyTasks from "../hooks/useAdminDailyTasks";

export default function AdminBerandaView() {
  const { stats, loading, error } = useAdminStats();
  const { faqs, loading: faqsLoading } = useAdminFAQs();
  const { tasks, loading: tasksLoading } = useAdminDailyTasks();

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4">
        {/* Lingkaran Animasi */}
        <div className="relative flex items-center justify-center">
          <div className="absolute size-16 rounded-full border-4 border-emerald-100 animate-ping opacity-75"></div>
          <div className="relative size-16 rounded-full border-4 border-slate-100 border-t-emerald-500 animate-spin"></div>
          {/* Ikon di tengah lingkaran */}
          <ShieldCheck className="absolute size-6 text-emerald-500 animate-pulse" />
        </div>

        {/* Teks Animasi */}
        <div className="text-center space-y-1">
          <h3 className="text-lg font-bold text-slate-700 animate-pulse">
            Memuat Data...
          </h3>
          <p className="text-sm font-medium text-slate-400">
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

  const statCards = [
    {
      title: "Total Pengguna",
      value: stats.totalUsers,
      trend: "Lihat Detail →",
      icon: <Users className="size-6 text-blue-500" />,
      bg: "bg-blue-50 dark:bg-blue-950/30",
      border: "border-blue-100 dark:border-blue-900/30",
      linkTo: "/admin/user",
    },
    {
      title: "Total Admin",
      value: stats.totalAdmins,
      trend: "Lihat Detail →",
      icon: <UserCheck className="size-6 text-indigo-500" />,
      bg: "bg-indigo-50 dark:bg-indigo-950/30",
      border: "border-indigo-100 dark:border-indigo-900/30",
      linkTo: "/admin/user",
    },
    {
      title: "Kategori Sampah",
      value: stats.totalWasteCategories,
      trend: "Lihat Detail →",
      icon: <Folder className="size-6 text-rose-500" />,
      bg: "bg-rose-50 dark:bg-rose-950/30",
      border: "border-rose-100 dark:border-rose-900/30",
      linkTo: "/admin/kategori",
    },
    {
      title: "Total Misi Harian",
      value: stats.totalDailyTasks,
      trend: "Lihat Detail →",
      icon: <CheckCircle className="size-6 text-emerald-500" />,
      bg: "bg-emerald-50 dark:bg-emerald-950/30",
      border: "border-emerald-100 dark:border-emerald-900/30",
      linkTo: "/admin/daily-tasks",
    },
    {
      title: "Total Pemindaian",
      value: stats.totalScans,
      trend: "Real-time",
      icon: <Activity className="size-6 text-amber-500" />,
      bg: "bg-amber-50 dark:bg-amber-950/30",
      border: "border-amber-100 dark:border-amber-900/30",
    },
    {
      title: "Total Poin Dibagikan",
      value: stats.totalPoints,
      trend: "Real-time",
      icon: <ShieldCheck className="size-6 text-teal-500" />,
      bg: "bg-teal-50 dark:bg-teal-950/30",
      border: "border-teal-100 dark:border-teal-900/30",
    },
  ];



  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="mb-8">
        <h1 className="text-4xl font-extrabold text-[#1e293b] dark:text-white mb-2 tracking-tight">
          Beranda Admin
        </h1>
        <p className="text-slate-500 dark:text-slate-400 font-medium text-base">
          Pantau statistik dan kesehatan platform EcoWise secara real-time.
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {statCards.map((stat, index) => {
          const CardContent = (
            <>
              <div className="flex justify-between items-start">
                <div
                  className={`size-12 rounded-2xl ${stat.bg} ${stat.border} border flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform`}
                >
                  {stat.icon}
                </div>
                <div
                  className={`flex items-center gap-1 text-[10px] font-extrabold px-2.5 py-1 rounded-full ${
                    stat.linkTo
                      ? "bg-emerald-50 dark:bg-emerald-950/30 text-emerald-600 dark:text-emerald-450 group-hover:bg-emerald-600 dark:group-hover:bg-emerald-500 group-hover:text-white transition-all"
                      : "bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400"
                  }`}
                >
                  {stat.trend}
                </div>
              </div>
              <div>
                <p className="text-sm font-bold text-slate-500 dark:text-slate-400 mb-1">
                  {stat.title}
                </p>
                <h3 className="text-3xl font-extrabold text-[#1e293b] dark:text-white">
                  {stat.value.toLocaleString()}
                </h3>
              </div>
            </>
          );

          if (stat.linkTo) {
            return (
              <Link
                key={index}
                to={stat.linkTo}
                className="bg-white dark:bg-slate-900 rounded-[24px] p-6 shadow-sm border border-slate-100 dark:border-slate-800 flex flex-col gap-4 hover:shadow-lg dark:hover:bg-slate-800/80 hover:-translate-y-1 transition-all group cursor-pointer text-left"
              >
                {CardContent}
              </Link>
            );
          }

          return (
            <div
              key={index}
              className="bg-white dark:bg-slate-900 rounded-[24px] p-6 shadow-sm border border-slate-100 dark:border-slate-800 flex flex-col gap-4 hover:shadow-md transition-all text-left"
            >
              {CardContent}
            </div>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Review Manajemen FAQ */}
        <div className="bg-white dark:bg-slate-900 rounded-[32px] p-8 shadow-sm border border-slate-100 dark:border-slate-800 flex flex-col h-full">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-bold text-[#1e293b] dark:text-white">
              Review Manajemen FAQ
            </h2>
            <Link
              to="/admin/faq"
              className="text-sm font-bold text-emerald-600 dark:text-emerald-400 hover:text-emerald-700 dark:hover:text-emerald-300 transition-colors"
            >
              Lihat Detail &rarr;
            </Link>
          </div>
          <div className="flex-1 flex flex-col gap-4">
            {faqsLoading ? (
              <p className="text-slate-400 dark:text-slate-500 font-medium text-sm text-center py-10">
                Memuat FAQ...
              </p>
            ) : faqs.length === 0 ? (
              <p className="text-slate-400 dark:text-slate-500 font-medium text-sm text-center py-10">
                Belum ada FAQ yang dibuat.
              </p>
            ) : (
              faqs.slice(0, 3).map((faq) => (
                <div
                  key={faq.id}
                  className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/40 border border-slate-100 dark:border-slate-800 flex flex-col gap-2"
                >
                  <div className="flex justify-between items-start gap-4">
                    <p className="text-sm font-bold text-slate-800 dark:text-slate-200 line-clamp-1">
                      {faq.question}
                    </p>
                    <span className="shrink-0 inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-[10px] font-bold bg-blue-50 dark:bg-blue-950/40 text-blue-600 dark:text-blue-400 border border-blue-100 dark:border-blue-900/40">
                      <Tag className="size-3" />
                      {faq.category}
                    </span>
                  </div>
                  <p className="text-xs font-medium text-slate-500 dark:text-slate-450 line-clamp-2">
                    {faq.answer}
                  </p>
                  <div
                    className={`mt-1 inline-flex items-center gap-1 text-xs font-bold ${faq.isActive ? "text-emerald-600 dark:text-emerald-400" : "text-slate-400 dark:text-slate-500"}`}
                  >
                    {faq.isActive ? (
                      <>
                        <ToggleRight className="size-4" /> Aktif
                      </>
                    ) : (
                      <>
                        <ToggleLeft className="size-4" /> Nonaktif
                      </>
                    )}
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Review Daily Task */}
        <div className="bg-white dark:bg-slate-900 rounded-[32px] p-8 shadow-sm border border-slate-100 dark:border-slate-800 flex flex-col h-full">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-bold text-[#1e293b] dark:text-white">
              Review Daily Task
            </h2>
            <Link
              to="/admin/daily-tasks"
              className="text-sm font-bold text-emerald-600 dark:text-emerald-400 hover:text-emerald-700 dark:hover:text-emerald-300 transition-colors"
            >
              Kelola Task &rarr;
            </Link>
          </div>
          <div className="flex-1 flex flex-col gap-4">
            {tasksLoading ? (
              <p className="text-slate-400 dark:text-slate-500 font-medium text-sm text-center py-10">
                Memuat Task...
              </p>
            ) : tasks.length === 0 ? (
              <p className="text-slate-400 dark:text-slate-500 font-medium text-sm text-center py-10">
                Belum ada task yang dibuat.
              </p>
            ) : (
              tasks.slice(0, 3).map((task) => (
                <div
                  key={task.id}
                  className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/40 border border-slate-100 dark:border-slate-800 flex flex-col gap-2"
                >
                  <div className="flex justify-between items-start gap-4">
                    <p className="text-sm font-bold text-slate-800 dark:text-slate-200">
                      {task.taskName}
                    </p>
                    <span className="shrink-0 inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-amber-50 dark:bg-amber-950/40 text-amber-600 dark:text-amber-400 border border-amber-100 dark:border-amber-900/40">
                      ⭐ {task.pointReward} poin
                    </span>
                  </div>
                  <div
                    className={`mt-1 inline-flex items-center gap-1 text-xs font-bold ${task.isActive ? "text-emerald-600 dark:text-emerald-400" : "text-slate-400 dark:text-slate-500"}`}
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
                  </div>
                </div>
              ))
            )}

            <div className="mt-4 p-4 rounded-2xl bg-emerald-50 dark:bg-emerald-950/20 border border-emerald-100 dark:border-emerald-900/30 flex items-start gap-3">
              <div className="p-2 bg-emerald-100 dark:bg-emerald-900/40 rounded-lg text-emerald-600 dark:text-emerald-400">
                <ShieldCheck className="size-5" />
              </div>
              <div>
                <p className="text-sm font-bold text-emerald-800 dark:text-emerald-450">
                  Tampilan Pengguna
                </p>
                <p className="text-xs font-medium text-emerald-600/80 dark:text-emerald-400/80 mt-0.5">
                  Pengguna akan melihat tugas aktif di atas pada dashboard
                  mereka setiap harinya untuk mendapatkan poin.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
