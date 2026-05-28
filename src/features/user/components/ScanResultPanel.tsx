import { AlertCircle, CheckCircle2, Droplets, Image as ImageIcon, Leaf, Recycle, Trash2 } from 'lucide-react';
import { type ScanResultResponse } from '@/services/scanHistoryService';

interface ScanResultPanelProps {
  scanResult: ScanResultResponse | null;
  onAction: () => void;
  actionText?: string;
  className?: string;
}

export default function ScanResultPanel({
  scanResult,
  onAction,
  actionText = "Scan Barang Lain \u2192",
  className = "",
}: ScanResultPanelProps) {
  return (
    <div
      className={`w-full bg-white dark:bg-slate-900 rounded-[32px] shadow-xl shadow-slate-200/50 dark:shadow-none p-8 border border-slate-100 dark:border-slate-800 flex flex-col relative overflow-hidden transition-all duration-700 ${!scanResult ? 'opacity-50 grayscale-[0.5]' : 'opacity-100'} ${className}`}
    >
      <div className="absolute top-0 right-0 w-32 h-32 bg-[#10b981]/5 rounded-full blur-2xl pointer-events-none" />

      <div className="flex items-center justify-between mb-6 relative z-10">
        <span className="text-xs font-bold text-[#10b981] dark:text-emerald-400 tracking-wider">
          {scanResult?.completedTask ? 'STATUS MISI' : 'HASIL PEMINDAIAN'}
        </span>
        {scanResult && (
          <div
            className={`size-5 rounded-full flex items-center justify-center ${scanResult.completedTask?.isCompleted === false ? 'bg-rose-500' : 'bg-[#10b981]'}`}
          >
            {scanResult.completedTask?.isCompleted === false ? (
              <AlertCircle className="size-4 text-white" />
            ) : (
              <CheckCircle2 className="size-4 text-white" />
            )}
          </div>
        )}
      </div>

      {!scanResult ? (
        <div className="flex-1 flex flex-col items-center justify-center text-center py-20">
          <div className="size-16 rounded-3xl bg-slate-50 dark:bg-slate-800 flex items-center justify-center mb-4">
            <ImageIcon className="size-8 text-slate-300 dark:text-slate-600" />
          </div>
          <p className="text-slate-400 dark:text-slate-500 font-medium text-sm">
            Upload gambar untuk melihat hasil analisis AI
          </p>
        </div>
      ) : (
        <>
          <div className="mb-6 relative z-10">
            <div
              className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-extrabold tracking-widest mb-4 uppercase ${scanResult.completedTask?.isCompleted === false ? 'bg-rose-100 dark:bg-rose-950/40 text-rose-600 dark:text-rose-400' : 'bg-[#ccfbf1] dark:bg-teal-950/40 text-[#0f766e] dark:text-teal-400'}`}
            >
              {scanResult.completedTask ? (
                <>
                  {scanResult.completedTask.isCompleted
                    ? 'MISI BERHASIL'
                    : 'MISI GAGAL'}
                </>
              ) : (
                <>
                  <Recycle className="size-3.5" />
                  ID:{' '}
                  {scanResult.scanHistory?.categoryId?.split('_')[0] ||
                    'UNKNOWN'}
                </>
              )}
            </div>

            <h2 className="text-[36px] font-extrabold leading-tight mb-3">
              <span className="text-transparent bg-clip-text bg-linear-to-r from-emerald-600 to-teal-500 dark:from-emerald-400 dark:to-teal-300 drop-shadow-sm">
                {scanResult.aiResult?.labelAi.split('_').join(' ')}
              </span>
            </h2>

            <p className="text-slate-500 dark:text-slate-400 text-sm font-medium">
              Tingkat kepercayaan:{' '}
              <span className="font-bold text-emerald-600 dark:text-emerald-400">
                {(
                  Number(scanResult.scanHistory?.confidenceScore || 0) * 100
                ).toFixed(1)}
                %
              </span>
            </p>
          </div>

          {scanResult.completedTask && (
            <div
              className={`rounded-2xl p-4 flex items-center gap-4 mb-8 relative z-10 ${scanResult.completedTask?.isCompleted === false ? 'bg-rose-50 dark:bg-rose-950/30' : 'bg-[#eff6ff] dark:bg-blue-950/30'}`}
            >
              <div
                className={`size-10 rounded-full flex items-center justify-center shrink-0 shadow-sm ${scanResult.completedTask?.isCompleted === false ? 'bg-white dark:bg-slate-800' : 'bg-white dark:bg-slate-800'}`}
              >
                <Leaf
                  className={`size-5 ${scanResult.completedTask?.isCompleted === false ? 'text-rose-500' : 'text-[#10b981]'}`}
                />
              </div>
              <div>
                <p
                  className={`text-sm font-extrabold ${scanResult.completedTask?.isCompleted === false ? 'text-rose-800 dark:text-rose-200' : 'text-slate-800 dark:text-slate-200'}`}
                >
                  +{scanResult.completedTask.pointAwarded} Poin Eco
                </p>
                <p className="text-xs font-medium text-slate-500 dark:text-slate-450">
                  {scanResult.completedTask.isCompleted
                    ? 'Bonus poin misi berhasil didapatkan!'
                    : 'Sayang sekali, poin misi tidak didapat.'}
                </p>
              </div>
            </div>
          )}

          <div className="mb-8 flex-1 relative z-10">
            <h4 className="text-sm font-bold text-slate-800 dark:text-slate-200 mb-5">
              Langkah Selanjutnya
            </h4>
            <div className="space-y-5">
              <div className="flex gap-4">
                <Droplets className="size-5 text-[#10b981] shrink-0 mt-0.5" />
                <div className="flex-1">
                  <p className="text-sm font-bold text-slate-800 dark:text-slate-100 mb-1">
                    Tips Pengelolaan
                  </p>
                  <p className="text-xs font-medium text-slate-500 dark:text-slate-400 leading-relaxed pr-4">
                    {scanResult.completedTask 
                      ? (scanResult.aiResult?.tips || scanResult.category?.handlingTips || 'Panduan daur ulang standar berlaku untuk jenis sampah ini.') 
                      : (scanResult.category?.handlingTips || 'Panduan daur ulang standar berlaku untuk jenis sampah ini.')}
                  </p>
                </div>
              </div>
              <div className="flex gap-4">
                <Trash2 className="size-5 text-[#10b981] shrink-0 mt-0.5" />
                <div>
                  <p className="text-sm font-bold text-slate-800 dark:text-slate-100 mb-1">
                    {scanResult.completedTask
                      ? 'Kembali ke Dashboard'
                      : 'Cek Riwayat'}
                  </p>
                  <p className="text-xs font-medium text-slate-500 dark:text-slate-400 leading-relaxed pr-4">
                    {scanResult.completedTask
                      ? scanResult.completedTask.isCompleted
                        ? 'Tugas kamu sudah selesai. Silakan cek perkembangan misimu di Dashboard.'
                        : 'Barang tidak sesuai dengan kategori tugas. Silakan coba pindai barang yang tepat.'
                      : 'Barang ini sudah tercatat otomatis di tab Riwayat kamu. Pastikan membuang sampah pada tempat yang sesuai dengan kategorinya.'}
                  </p>
                </div>
              </div>
            </div>
          </div>

          <button
            onClick={onAction}
            className="w-full flex items-center justify-center gap-2 px-6 py-4 rounded-2xl bg-[#34d399] text-white font-bold text-sm shadow-lg shadow-[#34d399]/30 hover:bg-[#10b981] transition-all relative z-10"
          >
            {actionText}
          </button>
        </>
      )}
    </div>
  );
}
