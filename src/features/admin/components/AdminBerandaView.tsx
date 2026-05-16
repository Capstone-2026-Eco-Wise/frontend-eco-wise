import {
  Users,
  Activity,
  CheckCircle,
  TrendingUp,
  ShieldCheck,
  Tag,
  ToggleRight,
  ToggleLeft,
  CheckCircle2,
  XCircle,
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
      title: "Total FAQ",
      value: stats.totalFaqs,
      trend: "Live data",
      trendUp: true,
      icon: <Users className="size-6 text-blue-500" />,
      bg: "bg-blue-50",
      border: "border-blue-100",
    },
    {
      title: "Daily Task Aktif",
      value: stats.totalActiveTasks,
      trend: "Live data",
      trendUp: true,
      icon: <CheckCircle className="size-6 text-emerald-500" />,
      bg: "bg-emerald-50",
      border: "border-emerald-100",
    },
    {
      title: "Total Pemindaian",
      value: stats.totalScans,
      trend: "Live data",
      trendUp: true,
      icon: <Activity className="size-6 text-amber-500" />,
      bg: "bg-amber-50",
      border: "border-amber-100",
    },
    {
      title: "Total Poin Dibagikan",
      value: stats.ecoPoints,
      trend: "Live data",
      trendUp: true,
      icon: <ShieldCheck className="size-6 text-teal-500" />,
      bg: "bg-teal-50",
      border: "border-teal-100",
    },
  ];



  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="mb-8">
        <h1 className="text-4xl font-extrabold text-[#1e293b] mb-2 tracking-tight">
          Beranda Admin
        </h1>
        <p className="text-slate-500 font-medium text-base">
          Pantau statistik dan kesehatan platform EcoWise secara real-time.
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {statCards.map((stat, index) => (
          <div
            key={index}
            className="bg-white rounded-[24px] p-6 shadow-sm border border-slate-100 flex flex-col gap-4 hover:shadow-lg hover:-translate-y-1 transition-all group"
          >
            <div className="flex justify-between items-start">
              <div
                className={`size-12 rounded-2xl ${stat.bg} ${stat.border} border flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform`}
              >
                {stat.icon}
              </div>
              <div
                className={`flex items-center gap-1 text-xs font-bold px-2.5 py-1 rounded-full ${
                  stat.trendUp
                    ? "bg-emerald-50 text-emerald-600"
                    : "bg-rose-50 text-rose-600"
                }`}
              >
                {stat.trendUp ? (
                  <TrendingUp className="size-3" />
                ) : (
                  <TrendingUp className="size-3 rotate-180" />
                )}
                {stat.trend}
              </div>
            </div>
            <div>
              <p className="text-sm font-bold text-slate-500 mb-1">
                {stat.title}
              </p>
              <h3 className="text-3xl font-extrabold text-[#1e293b]">
                {stat.value}
              </h3>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Review Manajemen FAQ */}
        <div className="bg-white rounded-[32px] p-8 shadow-sm border border-slate-100 flex flex-col h-full">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-bold text-[#1e293b]">
              Review Manajemen FAQ
            </h2>
            <Link
              to="/admin/faq"
              className="text-sm font-bold text-emerald-600 hover:text-emerald-700 transition-colors"
            >
              Lihat Detail &rarr;
            </Link>
          </div>
          <div className="flex-1 flex flex-col gap-4">
            {faqsLoading ? (
              <p className="text-slate-400 font-medium text-sm text-center py-10">
                Memuat FAQ...
              </p>
            ) : faqs.length === 0 ? (
              <p className="text-slate-400 font-medium text-sm text-center py-10">
                Belum ada FAQ yang dibuat.
              </p>
            ) : (
              faqs.slice(0, 3).map((faq) => (
                <div
                  key={faq.id}
                  className="p-4 rounded-2xl bg-slate-50 border border-slate-100 flex flex-col gap-2"
                >
                  <div className="flex justify-between items-start gap-4">
                    <p className="text-sm font-bold text-slate-800 line-clamp-1">
                      {faq.question}
                    </p>
                    <span className="shrink-0 inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-[10px] font-bold bg-blue-50 text-blue-600 border border-blue-100">
                      <Tag className="size-3" />
                      {faq.category}
                    </span>
                  </div>
                  <p className="text-xs font-medium text-slate-500 line-clamp-2">
                    {faq.answer}
                  </p>
                  <div
                    className={`mt-1 inline-flex items-center gap-1 text-xs font-bold ${faq.isActive ? "text-emerald-600" : "text-slate-400"}`}
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
        <div className="bg-white rounded-[32px] p-8 shadow-sm border border-slate-100 flex flex-col h-full">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-bold text-[#1e293b]">
              Review Daily Task
            </h2>
            <Link
              to="/admin/daily-tasks"
              className="text-sm font-bold text-emerald-600 hover:text-emerald-700 transition-colors"
            >
              Kelola Task &rarr;
            </Link>
          </div>
          <div className="flex-1 flex flex-col gap-4">
            {tasksLoading ? (
              <p className="text-slate-400 font-medium text-sm text-center py-10">
                Memuat Task...
              </p>
            ) : tasks.length === 0 ? (
              <p className="text-slate-400 font-medium text-sm text-center py-10">
                Belum ada task yang dibuat.
              </p>
            ) : (
              tasks.slice(0, 3).map((task) => (
                <div
                  key={task.id}
                  className="p-4 rounded-2xl bg-slate-50 border border-slate-100 flex flex-col gap-2"
                >
                  <div className="flex justify-between items-start gap-4">
                    <p className="text-sm font-bold text-slate-800">
                      {task.taskName}
                    </p>
                    <span className="shrink-0 inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-amber-50 text-amber-600 border border-amber-100">
                      ⭐ {task.pointReward} poin
                    </span>
                  </div>
                  <div
                    className={`mt-1 inline-flex items-center gap-1 text-xs font-bold ${task.isActive ? "text-emerald-600" : "text-slate-400"}`}
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

            <div className="mt-4 p-4 rounded-2xl bg-emerald-50 border border-emerald-100 flex items-start gap-3">
              <div className="p-2 bg-emerald-100 rounded-lg text-emerald-600">
                <ShieldCheck className="size-5" />
              </div>
              <div>
                <p className="text-sm font-bold text-emerald-800">
                  Tampilan Pengguna
                </p>
                <p className="text-xs font-medium text-emerald-600/80 mt-0.5">
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
