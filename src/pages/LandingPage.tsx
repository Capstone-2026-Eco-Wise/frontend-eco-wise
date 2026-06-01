import LandingNavbar from "../features/landing/components/LandingNavbar";
import HeroSection from "../features/landing/components/HeroSection";
import FeatureHighlights from "../features/landing/components/FeatureHighlights";
import AboutSection from "../features/landing/components/AboutSection";
import LeaderboardSection from "../features/landing/components/LeaderboardSection";
import FAQSection from "../features/landing/components/FAQSection";
import CTASection from "../features/landing/components/CTASection";
import LandingFooter from "../features/landing/components/LandingFooter";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-white dark:bg-slate-950 font-sans selection:bg-emerald-200">
      <LandingNavbar />

      <main className="relative overflow-hidden w-full">
        {/* Background Gradients */}
        <div className="absolute top-0 right-0 w-[600px] h-[600px] rounded-full bg-blue-50/50 dark:bg-slate-900/50 blur-[100px] pointer-events-none -z-10" />

        <HeroSection />
        <FeatureHighlights />
        <AboutSection />
        <LeaderboardSection />
        <FAQSection />
        <CTASection />
      </main>

      <LandingFooter />
    </div>
  );
}
