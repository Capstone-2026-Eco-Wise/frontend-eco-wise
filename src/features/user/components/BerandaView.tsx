import { Leaf, Award, Recycle, ScanLine } from "lucide-react";
import { Link } from "react-router-dom";
import { useEcoPoints } from "../hooks/useEcoPoints";
import { useScanHistory } from "../hooks/useScanHistory";
import { useDailyTasks } from "../hooks/useDailyTasks";

export default function BerandaView() {
  const { pointsData, loading: pointsLoading } = useEcoPoints();
  const { history, loading: historyLoading } = useScanHistory();
  const { tasks, loading: tasksLoading } = useDailyTasks();

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="mb-8">
        <h1 className="text-4xl font-extrabold text-[#1e293b] mb-2 tracking-tight">
          Ringkasan Dampak
        </h1>
        <p className="text-slate-500 font-medium text-base">
          {pointsData?.message || "Pantau kontribusi Anda untuk bumi yang lebih hijau."}
        </p>
      </div>

      {/* Stats row */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        <div className="bg-white rounded-[24px] p-6 shadow-sm border border-slate-100 flex items-center gap-4 hover:shadow-md transition-shadow">
          <div className="size-14 rounded-full bg-[#ecfdf5] flex items-center justify-center shrink-0">
            <Leaf className="size-6 text-[#10b981]" />
          </div>
          <div>
            <p className="text-sm font-bold text-slate-500 mb-1">Total Poin Eco</p>
            <p className="text-3xl font-extrabold text-[#1e293b]">
              {pointsLoading ? "..." : (pointsData?.totalPoints ?? 0).toLocaleString()}
            </p>
          </div>
        </div>

        <div className="bg-white rounded-[24px] p-6 shadow-sm border border-slate-100 flex items-center gap-4 hover:shadow-md transition-shadow">
          <div className="size-14 rounded-full bg-[#eff6ff] flex items-center justify-center shrink-0">
            <Recycle className="size-6 text-[#3b82f6]" />
          </div>
          <div>
            <p className="text-sm font-bold text-slate-500 mb-1">Barang Didaur Ulang</p>
            <p className="text-3xl font-extrabold text-[#1e293b]">
              {historyLoading ? "..." : (history?.length || 0).toLocaleString()}
            </p>
          </div>
        </div>

        <div className="bg-white rounded-[24px] p-6 shadow-sm border border-slate-100 flex items-center gap-4 hover:shadow-md transition-shadow">
          <div className="size-14 rounded-full bg-[#fef2f2] flex items-center justify-center shrink-0">
            <Award className="size-6 text-[#ef4444]" />
          </div>
          <div>
            <p className="text-sm font-bold text-slate-500 mb-1">Misi Tersedia</p>
            <p className="text-3xl font-extrabold text-[#1e293b]">
              {tasksLoading ? "..." : (tasks?.length || 0).toLocaleString()}
            </p>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-[32px] p-8 shadow-sm border border-slate-100">
        <h2 className="text-xl font-bold text-[#1e293b] mb-6">Misi Harian</h2>
        
        <div className="flex flex-col gap-4">
          {tasksLoading ? (
            <p className="text-slate-400 font-medium text-sm text-center py-10">Memuat misi...</p>
          ) : tasks.length === 0 ? (
            <p className="text-slate-400 font-medium text-sm text-center py-10">
              Belum ada misi hari ini.
            </p>
          ) : (
            tasks.map((task) => (
              <div
                key={task.id}
                className="p-5 rounded-2xl bg-slate-50 border border-slate-100 flex flex-col sm:flex-row justify-between sm:items-center gap-4 hover:bg-white hover:shadow-md transition-all group"
              >
                <div className="flex items-start gap-4">
                  <div className="size-10 rounded-full bg-amber-100 flex items-center justify-center shrink-0">
                    <Award className="size-5 text-amber-500" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="text-base font-bold text-slate-800 group-hover:text-emerald-600 transition-colors">
                        {task.taskName}
                      </h3>
                      {task.category && (
                        <span className="inline-flex items-center px-2 py-0.5 rounded-md text-[10px] font-bold bg-blue-50 text-blue-600 border border-blue-100">
                          {task.category.categoryName}
                        </span>
                      )}
                    </div>
                    <p className="text-sm font-medium text-slate-500">
                      {task.description}
                    </p>
                  </div>
                </div>
                
                <div className="flex items-center justify-between sm:justify-end w-full sm:w-auto gap-4 shrink-0">
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold bg-amber-50 text-amber-600 border border-amber-200">
                    +{task.pointReward} Poin
                  </span>
                  
                  <Link
                    to="/dashboard/scan"
                    className="flex items-center justify-center gap-2 px-4 py-2 rounded-xl bg-slate-900 text-white text-sm font-bold shadow-sm hover:bg-emerald-600 hover:shadow-emerald-500/20 transition-all"
                  >
                    <ScanLine className="size-4" />
                    Scan
                  </Link>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
