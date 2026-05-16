import { Users, Activity, CheckCircle, TrendingUp, AlertTriangle, ShieldCheck } from 'lucide-react';

export default function AdminBerandaView() {
  const statCards = [
    {
      title: 'Total Pengguna',
      value: '2,845',
      trend: '+12.5%',
      trendUp: true,
      icon: <Users className="size-6 text-blue-500" />,
      bg: 'bg-blue-50',
      border: 'border-blue-100',
    },
    {
      title: 'Sampah Terpindai',
      value: '14,290',
      trend: '+8.2%',
      trendUp: true,
      icon: <CheckCircle className="size-6 text-emerald-500" />,
      bg: 'bg-emerald-50',
      border: 'border-emerald-100',
    },
    {
      title: 'Aktivitas Harian',
      value: '845',
      trend: '-2.4%',
      trendUp: false,
      icon: <Activity className="size-6 text-amber-500" />,
      bg: 'bg-amber-50',
      border: 'border-amber-100',
    },
    {
      title: 'Keamanan Sistem',
      value: 'Optimal',
      trend: 'Aman',
      trendUp: true,
      icon: <ShieldCheck className="size-6 text-teal-500" />,
      bg: 'bg-teal-50',
      border: 'border-teal-100',
    },
  ];

  const recentActivities = [
    {
      id: 1,
      user: 'Budi Santoso',
      action: 'Memindai Botol Plastik',
      time: '2 menit yang lalu',
      status: 'success',
    },
    {
      id: 2,
      user: 'Siti Aminah',
      action: 'Mendaftar akun baru',
      time: '15 menit yang lalu',
      status: 'info',
    },
    {
      id: 3,
      user: 'Sistem',
      action: 'Peringatan load server tinggi',
      time: '1 jam yang lalu',
      status: 'warning',
    },
    {
      id: 4,
      user: 'Ahmad Faisal',
      action: 'Menukarkan 500 Poin Eco',
      time: '3 jam yang lalu',
      status: 'success',
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
                    ? 'bg-emerald-50 text-emerald-600'
                    : 'bg-rose-50 text-rose-600'
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

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Chart / Content Area */}
        <div className="lg:col-span-2 bg-white rounded-[32px] p-8 shadow-sm border border-slate-100 flex flex-col justify-center min-h-[400px]">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-bold text-[#1e293b]">
              Grafik Pemindaian (Minggu Ini)
            </h2>
            <button className="text-sm font-bold text-emerald-600 hover:text-emerald-700 transition-colors">
              Lihat Detail &rarr;
            </button>
          </div>
          <div className="flex-1 flex flex-col items-center justify-center border-2 border-dashed border-slate-100 rounded-2xl bg-slate-50 text-slate-400 font-medium">
            <Activity className="size-12 mb-3 text-slate-300" />
            <p>Area ini dapat diisi dengan Chart.js atau Recharts</p>
          </div>
        </div>

        {/* Recent Activities */}
        <div className="bg-white rounded-[32px] p-8 shadow-sm border border-slate-100">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-bold text-[#1e293b]">Aktivitas Sistem</h2>
          </div>
          <div className="space-y-6">
            {recentActivities.map((act) => (
              <div key={act.id} className="flex gap-4 group">
                <div className="relative mt-1">
                  <div
                    className={`size-3 rounded-full z-10 relative ${
                      act.status === 'success'
                        ? 'bg-emerald-500 shadow-emerald-500/50'
                        : act.status === 'warning'
                        ? 'bg-amber-500 shadow-amber-500/50'
                        : 'bg-blue-500 shadow-blue-500/50'
                    } shadow-md`}
                  />
                  {act.id !== recentActivities.length && (
                    <div className="absolute top-3 left-1.5 w-0.5 h-12 bg-slate-100 -translate-x-1/2" />
                  )}
                </div>
                <div>
                  <p className="text-sm font-bold text-[#1e293b] mb-0.5 group-hover:text-emerald-600 transition-colors">
                    {act.action}
                  </p>
                  <p className="text-xs font-medium text-slate-500">
                    Oleh <span className="text-slate-700">{act.user}</span> •{' '}
                    {act.time}
                  </p>
                </div>
              </div>
            ))}
          </div>
          <button className="w-full mt-8 py-3 rounded-xl bg-slate-50 text-slate-600 text-sm font-bold hover:bg-slate-100 transition-colors">
            Lihat Semua Log
          </button>
        </div>
      </div>
    </div>
  );
}
