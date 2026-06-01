import LeaderboardWidget from "@/components/common/LeaderboardWidget";

export default function LeaderboardSection() {
  return (
    <section className="py-20 bg-slate-50 dark:bg-slate-900/50">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-extrabold text-[#1e293b] dark:text-white mb-4">
            Klasemen Pahlawan Bumi
          </h2>
          <p className="text-slate-600 dark:text-slate-400 max-w-2xl mx-auto text-lg">
            Lihat siapa saja yang berkontribusi paling besar dalam menjaga lingkungan kita. Bergabunglah dan jadilah bagian dari perubahan!
          </p>
        </div>
        <div className="max-w-3xl mx-auto">
          <LeaderboardWidget showDetailsLink={false} />
        </div>
      </div>
    </section>
  );
}
