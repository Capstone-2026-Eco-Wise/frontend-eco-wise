import { useState } from "react";
import { Plus, Minus } from "lucide-react";
import { cn } from "@/lib/utils";
import { useFAQs } from "@/features/landing/hooks/useFAQs";

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const [activeCategory, setActiveCategory] = useState<string>("Semua");
  const { faqs, loading, error } = useFAQs();

  // Ambil semua kategori yang unik dari data FAQ
  const categories = [
    "Semua",
    ...Array.from(new Set(faqs.map((faq) => faq.category))),
  ];

  // Filter data berdasarkan kategori aktif
  const filteredFaqs =
    activeCategory === "Semua"
      ? faqs
      : faqs.filter((faq) => faq.category === activeCategory);

  return (
    <div id="faq" className="bg-white dark:bg-slate-950 w-full pt-16 pb-32">
      <div className="max-w-3xl mx-auto px-6 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-extrabold text-[#1e293b] dark:text-white mb-4">
            FAQ
          </h2>
          <p className="text-slate-500 dark:text-slate-400 font-medium">
            Pertanyaan yang sering diajukan seputar Eco-Wise.
          </p>
        </div>

        <div className="space-y-4">
          {loading && (
            <p className="text-center text-slate-400 py-8">Memuat FAQ...</p>
          )}
          {error && <p className="text-center text-red-500 py-8">{error}</p>}

          {/* Kategori Tabs */}
          {!loading && !error && categories.length > 1 && (
            <div className="flex flex-wrap justify-center gap-2 mb-10">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => {
                    setActiveCategory(cat);
                    setOpenIndex(null);
                  }}
                  className={cn(
                    "px-5 py-2.5 rounded-full text-sm font-bold transition-all",
                    activeCategory === cat
                      ? "bg-[#059669] text-white shadow-md shadow-[#059669]/20"
                      : "bg-slate-100 dark:bg-slate-800 text-slate-500 hover:bg-slate-200 dark:hover:bg-slate-700",
                  )}
                >
                  {cat}
                </button>
              ))}
            </div>
          )}

          {filteredFaqs.length === 0 && !loading && !error && (
            <div className="text-center py-10 bg-slate-50 dark:bg-slate-900/50 rounded-2xl border border-slate-100 dark:border-slate-800">
              <p className="text-slate-500 font-medium">
                Belum ada FAQ untuk kategori ini.
              </p>
            </div>
          )}

          {filteredFaqs.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <div
                key={faq.id}
                className={cn(
                  "border border-slate-200 dark:border-slate-800 rounded-2xl overflow-hidden transition-all duration-300",
                  isOpen
                    ? "bg-[#f4f7fb] dark:bg-slate-900 shadow-md shadow-blue-900/5 border-transparent"
                    : "bg-white dark:bg-slate-950 hover:bg-slate-50 dark:hover:bg-slate-900/50",
                )}
              >
                <button
                  onClick={() => setOpenIndex(isOpen ? null : index)}
                  className="w-full flex items-center justify-between p-6 text-left focus:outline-none"
                >
                  <span className="text-lg font-bold text-[#1e293b] dark:text-white pr-8">
                    {faq.question}
                  </span>
                  <div
                    className={cn(
                      "size-8 rounded-full flex items-center justify-center shrink-0 transition-colors duration-300",
                      isOpen
                        ? "bg-[#059669] text-white rotate-180"
                        : "bg-slate-100 dark:bg-slate-800 text-slate-500",
                    )}
                  >
                    {isOpen ? (
                      <Minus className="size-4" />
                    ) : (
                      <Plus className="size-4" />
                    )}
                  </div>
                </button>
                <div
                  className={cn(
                    "grid transition-all duration-300 ease-in-out",
                    isOpen
                      ? "grid-rows-[1fr] opacity-100 pb-6"
                      : "grid-rows-[0fr] opacity-0",
                  )}
                >
                  <div className="overflow-hidden">
                    <p className="px-6 text-slate-500 dark:text-slate-400 leading-relaxed font-medium">
                      {faq.answer}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
