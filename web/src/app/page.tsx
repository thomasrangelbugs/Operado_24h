import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";
import { ScrollProgress } from "@/components/layout/page-chrome";
import { AgentScrollExperience } from "@/components/demo/agent-scroll-experience";
import { BarrierSection } from "@/sections/barrier-section";
import { BodyModulesSection } from "@/sections/body-modules-section";
import { ClosingSection } from "@/sections/closing-section";
import { ConceptSection } from "@/sections/concept-section";
import { ExamplesSection } from "@/sections/examples-section";
import { FaqSection } from "@/sections/faq-section";
import { HeroSection } from "@/sections/hero-section";
import { HowItWorksSection } from "@/sections/how-it-works-section";
import { OperationsSection } from "@/sections/operations-section";
import { RoadmapSection } from "@/sections/roadmap-section";
import { SecuritySection } from "@/sections/security-section";
import { TechnicalDepthSection } from "@/sections/technical-depth-section";
import { WaitlistSection } from "@/sections/waitlist-section";

export default function HomePage() {
  return (
    <>
      <ScrollProgress />
      <SiteHeader />
      <AgentScrollExperience />
      <main className="flex-1">
        <HeroSection />
        <ConceptSection />
        <BarrierSection />
        <HowItWorksSection />
        <BodyModulesSection />
        <ExamplesSection />
        <SecuritySection />
        <OperationsSection />
        <TechnicalDepthSection />
        <RoadmapSection />
        <FaqSection />
        <WaitlistSection />
        <ClosingSection />
      </main>
      <SiteFooter />
    </>
  );
}
