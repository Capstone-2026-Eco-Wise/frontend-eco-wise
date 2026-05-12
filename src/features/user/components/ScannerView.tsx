import {
  Camera,
  Upload,
  CheckCircle2,
  Droplets,
  Trash2,
  Leaf,
  Recycle,
  Loader2,
  Image as ImageIcon,
} from "lucide-react";
import { useScanner } from "../hooks/useScanner";

export default function ScannerView() {
  const {
    previewUrl,
    isScanning,
    scanResult,
    error,
    fileInputRef,
    handleFileChange,
    handleUpload,
    resetScanner,
    openCamera
  } = useScanner();

  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="mb-8">
        <h1 className="text-4xl font-extrabold text-[#1e293b] mb-2 tracking-tight">
          Identifikasi Sampah
        </h1>
        <p className="text-slate-500 font-medium text-base">
          Gunakan Laboratorium AI kami untuk mengklasifikasikan barang secara
          instan.
        </p>
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Left Panel: Upload Area */}
        <div className="flex-1 bg-white rounded-[32px] p-10 flex flex-col items-center justify-center border-2 border-dashed border-slate-200 hover:border-[#10b981]/50 transition-colors group min-h-[500px] overflow-hidden">
          {previewUrl ? (
            <div className="relative w-full h-full flex flex-col items-center">
              <img
                src={previewUrl}
                alt="Preview"
                className="max-h-[350px] rounded-2xl object-cover shadow-lg mb-6"
              />
              <button
                onClick={resetScanner}
                className="absolute top-0 right-0 p-2 bg-white/80 backdrop-blur-sm rounded-full text-red-500 hover:bg-red-50 transition-colors shadow-sm"
              >
                <Trash2 className="size-5" />
              </button>
            </div>
          ) : (
            <>
              <div className="size-20 rounded-full bg-[#eff6ff] flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <Camera className="size-8 text-[#064e3b]" />
              </div>
              <h3 className="text-xl font-bold text-[#1e293b] mb-3">
                Ambil Foto atau Unggah
              </h3>
              <p className="text-slate-500 text-center text-sm font-medium max-w-sm mb-10 leading-relaxed">
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
            {!previewUrl ? (
              <button
                onClick={openCamera}
                className="flex items-center justify-center gap-2 px-8 py-3.5 rounded-full bg-linear-to-r from-[#10b981] to-[#34d399] text-white font-bold text-sm shadow-lg shadow-emerald-500/20 hover:shadow-emerald-500/40 hover:-translate-y-0.5 transition-all w-full"
              >
                <Upload className="size-4" />
                Pilih Gambar
              </button>
            ) : (
              <button
                onClick={handleUpload}
                disabled={isScanning}
                className="flex items-center justify-center gap-2 px-10 py-4 rounded-full bg-[#1e293b] text-white font-bold text-sm shadow-xl hover:bg-slate-800 disabled:bg-slate-400 transition-all w-full"
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
            <p className="mt-4 text-sm font-medium text-red-500 text-center">{error}</p>
          )}
        </div>

        {/* Right Panel: Scan Result */}
        <div
          className={`w-full lg:w-[420px] shrink-0 bg-white rounded-[32px] shadow-xl shadow-slate-200/50 p-8 border border-slate-100 flex flex-col relative overflow-hidden transition-all duration-700 ${!scanResult ? "opacity-50 grayscale-[0.5]" : "opacity-100"}`}
        >
          <div className="absolute top-0 right-0 w-32 h-32 bg-[#10b981]/5 rounded-full blur-2xl pointer-events-none" />

          <div className="flex items-center justify-between mb-6 relative z-10">
            <span className="text-xs font-bold text-[#10b981] tracking-wider">
              HASIL PEMINDAIAN
            </span>
            {scanResult && (
              <div className="size-5 rounded-full bg-[#10b981] flex items-center justify-center">
                <CheckCircle2 className="size-4 text-white" />
              </div>
            )}
          </div>

          {!scanResult ? (
            <div className="flex-1 flex flex-col items-center justify-center text-center py-20">
              <div className="size-16 rounded-3xl bg-slate-50 flex items-center justify-center mb-4">
                <ImageIcon className="size-8 text-slate-300" />
              </div>
              <p className="text-slate-400 font-medium text-sm">
                Upload gambar untuk melihat hasil analisis AI
              </p>
            </div>
          ) : (
            <>
              <div className="mb-6 relative z-10">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#ccfbf1] text-[#0f766e] text-[10px] font-extrabold tracking-widest mb-4 uppercase">
                  <Recycle className="size-3.5" />
                  ID: {scanResult.categoryId.split("-")[0]}
                </div>
                <h2 className="text-[40px] font-extrabold text-[#1e293b] leading-tight mb-2">
                  Teridentifikasi
                </h2>
                <p className="text-slate-500 text-sm font-medium">
                  Tingkat kepercayaan:{" "}
                  {(Number(scanResult.confidenceScore) * 100).toFixed(1)}%
                </p>
              </div>

              <div className="bg-[#eff6ff] rounded-2xl p-4 flex items-center gap-4 mb-8 relative z-10">
                <div className="size-10 rounded-full bg-white flex items-center justify-center shrink-0 shadow-sm">
                  <Leaf className="size-5 text-[#10b981]" />
                </div>
                <div>
                  <p className="text-sm font-extrabold text-slate-800">
                    +{scanResult.pointEarned} Poin Eco
                  </p>
                  <p className="text-xs font-medium text-slate-500">
                    Berhasil masuk ke riwayatmu!
                  </p>
                </div>
              </div>

              <div className="mb-8 flex-1 relative z-10">
                <h4 className="text-sm font-bold text-slate-800 mb-5">
                  Langkah Selanjutnya
                </h4>
                <div className="space-y-5">
                  <div className="flex gap-4">
                    <Droplets className="size-5 text-[#10b981] shrink-0 mt-0.5" />
                    <div>
                      <p className="text-sm font-bold text-slate-800 mb-1">
                        Cek Riwayat
                      </p>
                      <p className="text-xs font-medium text-slate-500 leading-relaxed pr-4">
                        Barang ini sudah tercatat otomatis di tab Riwayat kamu.
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <Trash2 className="size-5 text-[#10b981] shrink-0 mt-0.5" />
                    <div>
                      <p className="text-sm font-bold text-slate-800 mb-1">
                        Buang dengan Benar
                      </p>
                      <p className="text-xs font-medium text-slate-500 leading-relaxed pr-4">
                        Pastikan sampah dibuang ke tempat yang sesuai dengan
                        kategorinya.
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
