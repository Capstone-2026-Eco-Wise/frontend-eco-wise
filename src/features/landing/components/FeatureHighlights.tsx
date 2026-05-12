import { Scan, TrendingDown, Award } from "lucide-react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

export default function FeatureHighlights() {
  return (
    <div id="fitur" className="bg-[#eff6ff] w-full pt-20 pb-32">
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="flex flex-col md:flex-row justify-between items-end mb-12">
          <div className="max-w-xl">
            <h2 className="text-4xl font-extrabold text-[#1e293b] dark:text-white mb-4">Keunggulan</h2>
            <p className="text-slate-500 dark:text-slate-400 font-medium">
              Solusi cerdas yang kami tawarkan untuk membantu Anda mewujudkan gaya hidup berkelanjutan dan ramah lingkungan.
            </p>
          </div>
          <div className="mt-6 md:mt-0">
            <div className="inline-flex items-center px-4 py-2 rounded-lg bg-white dark:bg-slate-800 text-[#059669] dark:text-emerald-400 font-bold text-xs shadow-sm">
              Fitur Utama
            </div>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          <Card className="bg-white dark:bg-slate-900 border-none rounded-3xl shadow-xl shadow-blue-900/5 hover:-translate-y-1 transition-all p-4">
            <CardHeader className="pb-4">
              <div className="size-14 rounded-2xl bg-emerald-100 dark:bg-emerald-500/20 flex items-center justify-center mb-4">
                <Scan className="text-[#059669] dark:text-emerald-400 size-7" />
              </div>
              <h3 className="text-2xl font-bold text-[#1e293b] dark:text-white">Klasifikasi Sampah AI</h3>
            </CardHeader>
            <CardContent>
              <p className="text-slate-500 dark:text-slate-400 text-sm font-medium leading-relaxed">
                Identifikasi jenis material sampah secara instan dan akurat menggunakan teknologi kecerdasan buatan untuk daur ulang yang tepat sasaran.
              </p>
            </CardContent>
          </Card>

          <Card className="bg-white dark:bg-slate-900 border-none rounded-3xl shadow-xl shadow-blue-900/5 hover:-translate-y-1 transition-all p-4">
            <CardHeader className="pb-4">
              <div className="size-14 rounded-2xl bg-blue-100 dark:bg-blue-500/20 flex items-center justify-center mb-4">
                <TrendingDown className="text-blue-600 dark:text-blue-400 size-7" />
              </div>
              <h3 className="text-2xl font-bold text-[#1e293b] dark:text-white">Lacak Jejak Karbon</h3>
            </CardHeader>
            <CardContent>
              <p className="text-slate-500 dark:text-slate-400 text-sm font-medium leading-relaxed">
                Pantau langsung dampak lingkungan harian Anda dengan analisis data yang jelas dan hitung seberapa besar emisi karbon yang Anda kurangi.
              </p>
            </CardContent>
          </Card>

          <Card className="bg-white dark:bg-slate-900 border-none rounded-3xl shadow-xl shadow-blue-900/5 hover:-translate-y-1 transition-all p-4">
            <CardHeader className="pb-4">
              <div className="size-14 rounded-2xl bg-amber-100 dark:bg-amber-500/20 flex items-center justify-center mb-4">
                <Award className="text-amber-600 dark:text-amber-400 size-7" />
              </div>
              <h3 className="text-2xl font-bold text-[#1e293b] dark:text-white">Misi & Penghargaan</h3>
            </CardHeader>
            <CardContent>
              <p className="text-slate-500 dark:text-slate-400 text-sm font-medium leading-relaxed">
                Selesaikan berbagai misi ramah lingkungan, tingkatkan kontribusi Anda, dan dapatkan Eco-Credits sebagai bentuk apresiasi komunitas.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
