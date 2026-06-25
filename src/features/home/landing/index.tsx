import LandingCta from "./LandingCta";
import LandingFaq from "./LandingFaq";
import LandingFeatures from "./LandingFeatures";
import LandingFooter from "./LandingFooter";
import LandingGuide from "./LandingGuide";
import LandingHero from "./LandingHero";
import LandingHowItWorks from "./LandingHowItWorks";
import LandingNav from "./LandingNav";
import LandingStats from "./LandingStats";
import LandingTestimonials from "./LandingTestimonials";

export default function LandingPage() {
  return (
    <div className="relative min-h-screen overflow-hidden bg-slate-50 font-plex text-slate-900 antialiased dark:bg-slate-950 dark:text-slate-50">
      <div
        className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[42rem] bg-[radial-gradient(circle_at_top,rgba(37,99,235,0.14),transparent_42%),radial-gradient(circle_at_80%_20%,rgba(16,185,129,0.10),transparent_24%)]"
        aria-hidden="true"
      />
      <LandingNav />
      <main className="relative overflow-hidden">
        <LandingHero />
        <LandingStats />
        <LandingFeatures />
        <LandingHowItWorks />
        <LandingGuide />
        <LandingTestimonials />
        <LandingFaq />
        <LandingCta />
      </main>
      <LandingFooter />
    </div>
  );
}
