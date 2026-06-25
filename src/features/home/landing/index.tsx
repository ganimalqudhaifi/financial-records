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
    <div className="min-h-screen bg-white font-plex text-slate-900 antialiased">
      <LandingNav />
      <main>
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
