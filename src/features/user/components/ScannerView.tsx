import {
  AlertCircle,
  Camera,
  CheckCircle2,
  Droplets,
  Image as ImageIcon,
  Leaf,
  Loader2,
  Recycle,
  Trash2,
  Upload,
} from 'lucide-react';
import { useScanner } from '../hooks/useScanner';

export default function ScannerView() {
  const {
    previewUrl,
    isScanning,
    scanResult,
    error,
    fileInputRef,
    videoRef,
    isCameraActive,
    handleFileChange,
    handleUpload,
    resetScanner,
    startCamera,
    stopCamera,
    capturePhoto,
  } = useScanner();

  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="mb-8">
        <h1 className="text-4xl font-extrabold text-[#1e293b] dark:text-white mb-2 tracking-tight">
          Identifikasi Sampah
        </h1>
        <p className="text-slate-500 dark:text-slate-400 font-medium text-base">
          Gunakan Laboratorium AI kami untuk mengklasifikasikan barang secara
          instan.
        </p>
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Left Panel: Upload / Camera Area */}
        <div className="flex-1 bg-white dark:bg-slate-900 rounded-[32px] p-10 flex flex-col items-center justify-center border-2 border-dashed border-slate-200 dark:border-slate-800 hover:border-[#10b981]/50 dark:hover:border-emerald-500/50 transition-colors group min-h-[500px] overflow-hidden relative">
          {isScanning && (
            <div className="absolute inset-0 bg-slate-950/75 backdrop-blur-xs flex flex-col items-center justify-center z-20 rounded-[30px] animate-in fade-in duration-300">
              <div className="relative flex items-center justify-center size-20">
                <div className="absolute inset-0 rounded-full border-4 border-emerald-500/20 animate-ping opacity-75"></div>
                <div className="absolute inset-0 rounded-full border-4 border-transparent border-t-emerald-400 animate-spin"></div>
                <Recycle className="size-8 text-emerald-400 relative z-10 animate-pulse" />
              </div>
              <p className="mt-4 text-white text-sm font-bold tracking-wide animate-pulse">
                AI sedang menganalisis gambar...
              </p>
            </div>
          )}

          {isCameraActive ? (
            <div className="relative w-full h-full flex flex-col items-center">
              <video
                ref={videoRef}
                autoPlay
                playsInline
                className="max-h-[350px] w-full rounded-2xl object-cover shadow-lg mb-6 bg-slate-950"
              />
              <div className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto">
                <button
                  onClick={capturePhoto}
                  className="flex items-center justify-center gap-2 px-8 py-3.5 rounded-full bg-linear-to-r from-orange-500 to-amber-500 text-white font-bold text-sm shadow-lg shadow-orange-500/20 hover:shadow-orange-500/40 hover:-translate-y-0.5 transition-all w-full"
                >
                  <Camera className="size-4" />
                  Tangkap Foto
                </button>
                <button
                  onClick={stopCamera}
                  className="flex items-center justify-center gap-2 px-8 py-3.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-bold text-sm hover:bg-slate-200 dark:hover:bg-slate-700 transition-all w-full"
                >
                  Batal
                </button>
              </div>
            </div>
          ) : previewUrl ? (
            <div className="relative w-full h-full flex flex-col items-center">
              <img
                src={previewUrl}
                alt="Preview"
                className="max-h-[350px] rounded-2xl object-cover shadow-lg mb-6"
              />
              <button
                onClick={resetScanner}
                className="absolute top-0 right-0 p-2 bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm rounded-full text-red-500 hover:bg-red-50 dark:hover:bg-red-950/25 transition-colors shadow-sm"
              >
                <Trash2 className="size-5" />
              </button>
            </div>
          ) : (
            <>
              <div className="size-20 rounded-full bg-[#eff6ff] dark:bg-blue-950/30 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <Camera className="size-8 text-[#064e3b] dark:text-emerald-400" />
              </div>
              <h3 className="text-xl font-bold text-[#1e293b] dark:text-white mb-3">
                Ambil Foto atau Unggah
              </h3>
              <p className="text-slate-500 dark:text-slate-400 text-center text-sm font-medium max-w-sm mb-10 leading-relaxed">
                Pilih gambar sampah yang ingin kamu identifikasi. AI kami akan
                menentukan jenisnya secara otomatis.
              </p>
            </>
          )}

          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileChange}
            accept="image/*"
            className="hidden"
          />

          <div className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto">
            {!previewUrl && !isCameraActive && (
              <>
                <button
                  onClick={startCamera}
                  className="flex items-center justify-center gap-2 px-6 py-3.5 rounded-full bg-linear-to-r from-[#10b981] to-[#34d399] text-white font-bold text-sm shadow-lg shadow-emerald-500/20 hover:shadow-emerald-500/40 hover:-translate-y-0.5 transition-all w-full sm:w-auto"
                >
                  <Camera className="size-4" />
                  Gunakan Kamera
                </button>
                <button
                  onClick={() => fileInputRef.current?.click()}
                  className="flex items-center justify-center gap-2 px-6 py-3.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-bold text-sm hover:bg-slate-200 dark:hover:bg-slate-700 transition-all w-full sm:w-auto border border-slate-200 dark:border-slate-700"
                >
                  <Upload className="size-4" />
                  Unggah Berkas
                </button>
              </>
            )}

            {previewUrl && (
              <button
                onClick={handleUpload}
                disabled={isScanning}
                className="flex items-center justify-center gap-2 px-10 py-4 rounded-full bg-[#1e293b] dark:bg-slate-800 text-white dark:text-slate-100 font-bold text-sm shadow-xl hover:bg-slate-800 dark:hover:bg-slate-700 disabled:bg-slate-400 dark:disabled:bg-slate-800 transition-all w-full"
              >
                {isScanning ? (
                  <>
                    <Loader2 className="size-4 animate-spin" />
                    Sedang Memproses...
                  </>
                ) : (
                  <>
                    <CheckCircle2 className="size-4" />
                    Mulai Identifikasi
                  </>
                )}
              </button>
            )}
          </div>
          {error && (
            <div className="mt-6 w-full animate-in fade-in zoom-in-95 duration-300">
              <div className="bg-rose-50 dark:bg-rose-950/30 border border-rose-200 dark:border-rose-900/50 rounded-2xl p-4 flex gap-3 shadow-sm shadow-rose-100 dark:shadow-none">
                <div className="size-10 rounded-full bg-rose-100 dark:bg-rose-900/50 flex items-center justify-center shrink-0">
                  <AlertCircle className="size-5 text-rose-600 dark:text-rose-400" />
                </div>
                <div className="flex-1 pt-0.5">
                  <h4 className="text-sm font-bold text-rose-800 dark:text-rose-300 mb-1">
                    Ups, Terjadi Kesalahan!
                  </h4>
                  <p className="text-sm font-medium text-rose-600/90 dark:text-rose-400/90 leading-relaxed">
                    {error}
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Right Panel: Scan Result */}
        <div
          className={`w-full lg:w-[420px] shrink-0 bg-white dark:bg-slate-900 rounded-[32px] shadow-xl shadow-slate-200/50 dark:shadow-none p-8 border border-slate-100 dark:border-slate-800 flex flex-col relative overflow-hidden transition-all duration-700 ${!scanResult ? 'opacity-50 grayscale-[0.5]' : 'opacity-100'}`}
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
                onClick={resetScanner}
                className="w-full flex items-center justify-center gap-2 px-6 py-4 rounded-2xl bg-[#34d399] text-white font-bold text-sm shadow-lg shadow-[#34d399]/30 hover:bg-[#10b981] transition-all relative z-10"
              >
                Scan Barang Lain &rarr;
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
