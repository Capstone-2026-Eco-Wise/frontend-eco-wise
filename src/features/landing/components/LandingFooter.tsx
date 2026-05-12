import { Globe, Share2 } from "lucide-react";
import { Link } from "react-router-dom";

export default function LandingFooter() {
  return (
    <footer className="bg-[#0f4a38] text-emerald-50/80 pt-16 pb-16 w-full">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-10">
        <div className="lg:col-span-2">
          <h3 className="text-white text-xl font-bold mb-5">Eco-Wise</h3>
          <p className="text-[13px] leading-relaxed mb-6 opacity-75 max-w-sm">
            Platform ekologi presisi yang berdedikasi untuk mempercepat transisi
            menuju planet bebas sampah melalui kecerdasan buatan.
          </p>
          <div className="flex items-center gap-3">
            <button className="size-9 rounded-full bg-white/5 flex items-center justify-center hover:bg-white/10 transition-colors border border-white/10">
              <Globe className="size-4 text-emerald-400" />
            </button>
            <button className="size-9 rounded-full bg-white/5 flex items-center justify-center hover:bg-white/10 transition-colors border border-white/10">
              <Share2 className="size-4 text-emerald-400" />
            </button>
          </div>
        </div>

        <div className="flex flex-col gap-4">
          <h4 className="text-[#34d399] font-bold text-[13px] mb-1">
            Protokol
          </h4>
          <Link
            to="#"
            className="text-[13px] opacity-80 hover:opacity-100 hover:text-white transition-colors"
          >
            Metodologi
          </Link>
          <Link
            to="#"
            className="text-[13px] opacity-80 hover:opacity-100 hover:text-white transition-colors"
          >
            Indeks Keberlanjutan Global
          </Link>
          <Link
            to="#"
            className="text-[13px] opacity-80 hover:opacity-100 hover:text-white transition-colors"
          >
            Akses API
          </Link>
        </div>

        <div className="flex flex-col gap-4">
          <h4 className="text-[#34d399] font-bold text-[13px] mb-1">Legal</h4>
          <Link
            to="#"
            className="text-[13px] opacity-80 hover:opacity-100 hover:text-white transition-colors"
          >
            Kebijakan Privasi
          </Link>
          <Link
            to="#"
            className="text-[13px] opacity-80 hover:opacity-100 hover:text-white transition-colors"
          >
            Ketentuan Layanan
          </Link>
          <Link
            to="#"
            className="text-[13px] opacity-80 hover:opacity-100 hover:text-white transition-colors"
          >
            Protokol Cookie
          </Link>
        </div>

        <div className="flex flex-col gap-4">
          <h4 className="text-[#34d399] font-bold text-[13px] mb-1">
            Dukungan
          </h4>
          <Link
            to="#"
            className="text-[13px] opacity-80 hover:opacity-100 hover:text-white transition-colors"
          >
            Hubungi Bantuan
          </Link>
          <Link
            to="#"
            className="text-[13px] opacity-80 hover:opacity-100 hover:text-white transition-colors"
          >
            Whitepaper
          </Link>
        </div>

        <div className="lg:col-span-1 text-[13px] opacity-75">
          <p className="leading-relaxed">
            © 2026 Eco-Wise AI. Ekologi Presisi untuk Planet yang Hidup.
          </p>
        </div>
      </div>
    </footer>
  );
}
