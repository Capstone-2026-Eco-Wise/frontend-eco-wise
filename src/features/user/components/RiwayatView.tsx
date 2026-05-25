import { Calendar, Trash2, CheckCircle2, Loader2, Info } from "lucide-react";
import { useScanHistory } from "../hooks/useScanHistory";

export default function RiwayatView() {
  const { history, loading } = useScanHistory();

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px] gap-4">
        <Loader2 className="size-8 text-[#10b981] animate-spin" />
        <p className="text-slate-500 font-medium">Memuat riwayat scan...</p>
      </div>
    );
  }

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="mb-8">
        <h1 className="text-4xl font-extrabold text-[#1e293b] dark:text-white mb-2 tracking-tight">
          Riwayat Pemindaian
        </h1>
        <p className="text-slate-500 dark:text-slate-400 font-medium text-base">
          Daftar barang yang telah Anda pindai dan poin yang diperoleh.
        </p>
      </div>

      <div className="bg-white dark:bg-slate-900 rounded-[32px] shadow-sm border border-slate-100 dark:border-slate-800 overflow-hidden">
        <div className="p-8">
          <div className="space-y-4">
            {history.length > 0 ? (
              history.map((item) => (
                <div key={item.id} className="flex items-center justify-between p-4 rounded-2xl border border-slate-100 dark:border-slate-800 hover:border-[#10b981]/30 hover:bg-[#10b981]/5 dark:hover:bg-[#10b981]/10 transition-colors group">
                  <div className="flex items-center gap-4">
                    <div className="size-12 rounded-full bg-[#f4f7fb] dark:bg-slate-800 group-hover:bg-white dark:group-hover:bg-slate-700 flex items-center justify-center shrink-0 transition-colors">
                      <Trash2 className="size-5 text-slate-400 group-hover:text-[#10b981] transition-colors" />
                    </div>
                    <div>
                      <h4 className="text-base font-bold text-[#1e293b] dark:text-white mb-1 truncate max-w-[150px] sm:max-w-xs">
                        {/* Untuk sementara pakai ID Kategori jika nama belum ada */}
                        Sampah Terpindai
                      </h4>
                      <div className="flex items-center gap-1.5 text-xs font-medium text-slate-500 dark:text-slate-400">
                        <Calendar className="size-3.5" />
                        {new Date(item.scannedAt).toLocaleDateString("id-ID", {
                          day: "numeric",
                          month: "long",
                          year: "numeric"
                        })}
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-4">
                    <div className="text-right">
                      <p className="text-sm font-extrabold text-[#10b981] dark:text-emerald-450">+{item.pointEarned} Poin</p>
                      <p className="text-xs font-medium text-slate-400 dark:text-slate-500">Selesai</p>
                    </div>
                    <div className="size-8 rounded-full bg-[#ecfdf5] dark:bg-emerald-950/30 hidden items-center justify-center sm:flex">
                      <CheckCircle2 className="size-4 text-[#10b981]" />
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center py-12">
                <div className="size-16 rounded-full bg-slate-50 dark:bg-slate-800 flex items-center justify-center mx-auto mb-4">
                  <Info className="size-8 text-slate-300 dark:text-slate-600" />
                </div>
                <h3 className="text-lg font-bold text-slate-800 dark:text-slate-200 mb-1">Belum Ada Riwayat</h3>
                <p className="text-slate-500 dark:text-slate-450">Mulai memindai sampah untuk mendapatkan poin pertamamu!</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
