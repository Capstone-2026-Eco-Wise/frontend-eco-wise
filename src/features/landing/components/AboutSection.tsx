import { Code2, BrainCircuit, LineChart } from "lucide-react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

export default function AboutSection() {
  return (
    <div id="tentang-kami" className="bg-[#f4f7fb] dark:bg-slate-950 w-full pt-24 pb-32">
      <div className="max-w-7xl mx-auto px-6 relative z-10 text-center">
        <h2 className="text-4xl md:text-5xl font-extrabold text-[#1e293b] dark:text-white mb-4">Tentang Kami</h2>
        <p className="text-slate-500 dark:text-slate-400 font-medium max-w-2xl mx-auto mb-16 leading-relaxed">
          Tiga pilar utama penggerak inovasi di balik Eco-Wise. Tim ahli yang berdedikasi membangun masa depan berkelanjutan melalui teknologi.
        </p>

        <div className="grid md:grid-cols-3 gap-8 text-left">
          <Card className="bg-white dark:bg-slate-900 border-none rounded-[32px] shadow-xl shadow-slate-200/40 hover:-translate-y-1 transition-all p-6">
            <CardHeader className="pb-4 px-0 pt-0">
              <div className="size-14 rounded-2xl bg-[#6ee7b7] flex items-center justify-center mb-6">
                <Code2 className="text-[#064e3b] size-7" />
              </div>
              <h3 className="text-2xl font-bold text-[#1e293b] dark:text-white">01. Fullstack</h3>
            </CardHeader>
            <CardContent className="px-0 pb-0">
              <p className="text-slate-500 dark:text-slate-400 text-[15px] font-medium leading-relaxed">
                Membangun antarmuka pengguna yang intuitif serta arsitektur backend yang tangguh untuk memastikan platform berjalan dengan cepat, aman, dan tanpa hambatan.
              </p>
            </CardContent>
          </Card>

          <Card className="bg-white dark:bg-slate-900 border-none rounded-[32px] shadow-xl shadow-slate-200/40 hover:-translate-y-1 transition-all p-6">
            <CardHeader className="pb-4 px-0 pt-0">
              <div className="size-14 rounded-2xl bg-[#69f0ae] flex items-center justify-center mb-6">
                <BrainCircuit className="text-[#064e3b] size-7" />
              </div>
              <h3 className="text-2xl font-bold text-[#1e293b] dark:text-white">02. AI Engineer</h3>
            </CardHeader>
            <CardContent className="px-0 pb-0">
              <p className="text-slate-500 dark:text-slate-400 text-[15px] font-medium leading-relaxed">
                Merancang, melatih, dan mengimplementasikan model jaringan saraf tiruan canggih untuk mengenali dan mengklasifikasikan berbagai material sampah dalam hitungan milidetik.
              </p>
            </CardContent>
          </Card>

          <Card className="bg-white dark:bg-slate-900 border-none rounded-[32px] shadow-xl shadow-slate-200/40 hover:-translate-y-1 transition-all p-6">
            <CardHeader className="pb-4 px-0 pt-0">
              <div className="size-14 rounded-2xl bg-[#22d3ee] flex items-center justify-center mb-6">
                <LineChart className="text-[#083344] size-7" />
              </div>
              <h3 className="text-2xl font-bold text-[#1e293b] dark:text-white">03. Data Science</h3>
            </CardHeader>
            <CardContent className="px-0 pb-0">
              <p className="text-slate-500 dark:text-slate-400 text-[15px] font-medium leading-relaxed">
                Menganalisis big data lingkungan untuk mengekstraksi wawasan berharga, mengukur indeks keberlanjutan, dan memodelkan dampak pengurangan emisi karbon.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
