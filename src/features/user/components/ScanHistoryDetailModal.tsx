import {
  getScanHistoryById,
  type ScanHistoryDetail,
} from '@/services/scanHistoryService';
import {
  Calendar,
  Camera,
  CheckCircle2,
  Droplets,
  Leaf,
  Loader2,
  X,
} from 'lucide-react';
import { useEffect, useState } from 'react';

interface Props {
  historyId: string | null;
  onClose: () => void;
}

export default function ScanHistoryDetailModal({ historyId, onClose }: Props) {
  const [detail, setDetail] = useState<ScanHistoryDetail | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  console.log(detail);

  useEffect(() => {
    if (!historyId) {
      setDetail(null);
      return;
    }

    const fetchDetail = async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await getScanHistoryById(historyId);
        setDetail(data);
      } catch (err: unknown) {
        const error = err as any;
        setError(
          error.response?.data?.message || 'Gagal memuat detail riwayat.',
        );
      } finally {
        setLoading(false);
      }
    };

    fetchDetail();
  }, [historyId]);

  if (!historyId) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-300"
        onClick={onClose}
      />

      {/* Modal Content */}
      <div className="relative w-full max-w-2xl bg-white dark:bg-slate-900 rounded-[32px] shadow-2xl overflow-hidden flex flex-col max-h-[90vh] animate-in zoom-in-95 duration-300 border border-slate-100 dark:border-slate-800">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-slate-100 dark:border-slate-800">
          <h2 className="text-xl font-extrabold text-[#1e293b] dark:text-white">
            Detail Pemindaian
          </h2>
          <button
            onClick={onClose}
            className="size-10 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-500 hover:text-slate-800 dark:hover:text-slate-200 transition-colors"
          >
            <X className="size-5" />
          </button>
        </div>

        {/* Body */}
        <div className="overflow-y-auto flex-1 p-6 sm:p-8 custom-scrollbar">
          {loading ? (
            <div className="flex flex-col items-center justify-center py-20 gap-4">
              <Loader2 className="size-8 text-[#10b981] animate-spin" />
              <p className="text-slate-500 font-medium">
                Memuat detail riwayat...
              </p>
            </div>
          ) : error ? (
            <div className="text-center py-12">
              <p className="text-red-500 font-medium mb-4">{error}</p>
              <button
                onClick={onClose}
                className="px-6 py-2.5 rounded-full bg-slate-100 dark:bg-slate-800 font-bold text-sm"
              >
                Kembali
              </button>
            </div>
          ) : detail ? (
            <div className="space-y-8">
              {/* Image & Main Info Area */}
              <div className="flex flex-col sm:flex-row gap-6">
                <div className="w-full sm:w-[240px] shrink-0 rounded-2xl overflow-hidden bg-slate-100 dark:bg-slate-800 relative aspect-square sm:aspect-auto sm:h-[240px]">
                  {detail.imageUrl ? (
                    <img
                      src={detail.imageUrl}
                      alt="Scanned Item"
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex flex-col items-center justify-center text-slate-400">
                      <Camera className="size-8 mb-2 opacity-50" />
                      <span className="text-xs font-medium">
                        Tidak ada gambar
                      </span>
                    </div>
                  )}
                  <div className="absolute top-3 right-3 px-2.5 py-1 rounded-full bg-black/60 backdrop-blur-md text-white text-[10px] font-extrabold tracking-wider flex items-center gap-1.5">
                    <CheckCircle2 className="size-3 text-[#10b981]" />
                    AI VERIFIED
                  </div>
                </div>

                <div className="flex-1 flex flex-col justify-center">
                  <div
                    className="inline-flex items-center px-3 py-1 rounded-full text-[10px] font-extrabold tracking-widest mb-4 uppercase"
                    style={{
                      backgroundColor: `${detail.category?.colorHex || '#10b981'}15`,
                      color: detail.category?.colorHex || '#10b981',
                    }}
                  >
                    Kategori: {detail.category?.categoryCode || 'UNKNOWN'}
                  </div>

                  <h3 className="text-3xl font-extrabold text-slate-800 dark:text-white mb-2 leading-tight">
                    {detail.category?.categoryName || 'Teridentifikasi'}
                  </h3>

                  <div className="flex items-center gap-2 text-sm font-medium text-slate-500 dark:text-slate-400 mb-6">
                    <Calendar className="size-4" />
                    {new Date(detail.scannedAt).toLocaleDateString('id-ID', {
                      weekday: 'long',
                      day: 'numeric',
                      month: 'long',
                      year: 'numeric',
                      hour: '2-digit',
                      minute: '2-digit',
                    })}
                  </div>

                  <div className="flex gap-4">
                    <div className="bg-[#eff6ff] dark:bg-blue-950/30 rounded-2xl p-4 flex-1">
                      <p className="text-xs font-bold text-slate-500 dark:text-slate-400 mb-1">
                        Poin Diperoleh
                      </p>
                      <p className="text-xl font-extrabold text-[#10b981]">
                        +{detail.pointEarned}{' '}
                        <span className="text-sm font-bold text-slate-800 dark:text-slate-200">
                          Eco
                        </span>
                      </p>
                    </div>
                    <div className="bg-slate-50 dark:bg-slate-800/50 rounded-2xl p-4 flex-1">
                      <p className="text-xs font-bold text-slate-500 dark:text-slate-400 mb-1">
                        Akurasi AI
                      </p>
                      <p className="text-xl font-extrabold text-slate-800 dark:text-slate-200">
                        {(detail.confidenceScore * 100).toFixed(1)}%
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Tips & Details */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="bg-slate-50 dark:bg-slate-800/50 rounded-2xl p-6 border border-slate-100 dark:border-slate-700/50">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="size-8 rounded-full bg-blue-100 dark:bg-blue-900/50 flex items-center justify-center">
                      <Leaf className="size-4 text-blue-600 dark:text-blue-400" />
                    </div>
                    <h4 className="text-sm font-bold text-slate-800 dark:text-slate-200">
                      Tentang Sampah Ini
                    </h4>
                  </div>
                  <p className="text-sm font-medium text-slate-500 dark:text-slate-400 leading-relaxed">
                    {detail.category?.description ||
                      'Tidak ada deskripsi tersedia.'}
                  </p>
                </div>

                <div className="bg-emerald-50 dark:bg-emerald-950/20 rounded-2xl p-6 border border-emerald-100 dark:border-emerald-900/30">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="size-8 rounded-full bg-emerald-100 dark:bg-emerald-900/50 flex items-center justify-center">
                      <Droplets className="size-4 text-[#10b981]" />
                    </div>
                    <h4 className="text-sm font-bold text-emerald-800 dark:text-emerald-300">
                      Tips Pengelolaan
                    </h4>
                  </div>
                  <p className="text-sm font-medium text-emerald-700/80 dark:text-emerald-400/80 leading-relaxed">
                    {detail.category?.handlingTips ||
                      'Panduan daur ulang standar berlaku untuk jenis sampah ini.'}
                  </p>
                </div>
              </div>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
}
