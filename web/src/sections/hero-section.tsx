import { brand } from "@/data/brand";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { DesktopAgentMock } from "@/components/hero/desktop-agent-mock";

export function HeroSection() {
  return (
    <section
      id="inicio"
      className="hero-atmosphere relative overflow-hidden scroll-mt-24"
    >
      <div className="mx-auto grid min-h-[calc(100svh-4rem)] max-w-6xl items-center gap-10 px-4 py-12 sm:px-6 lg:grid-cols-12 lg:gap-12 lg:px-8 lg:py-16">
        <div className="space-y-6 lg:col-span-5">
          <p className="font-display text-sm font-bold uppercase tracking-[0.2em] text-accent">
            {brand.productName}
          </p>
          <h1 className="font-display text-balance text-4xl font-bold tracking-tight text-ink sm:text-5xl lg:text-[3.25rem] lg:leading-[1.08]">
            {brand.hero.title}
          </h1>
          <p className="max-w-md text-pretty text-lg leading-relaxed text-ink-muted">
            {brand.hero.subtitle}
          </p>
          <div className="flex flex-col gap-3 sm:flex-row">
            <a
              href={brand.hero.ctaPrimary.href}
              className={cn(buttonVariants({ size: "lg" }))}
            >
              {brand.hero.ctaPrimary.label}
            </a>
            <a
              href={brand.hero.ctaSecondary.href}
              className={cn(
                buttonVariants({ variant: "secondary", size: "lg" }),
              )}
            >
              {brand.hero.ctaSecondary.label}
            </a>
          </div>
        </div>

        <div
          className="relative lg:col-span-7"
          data-agent-focus="hero-mock"
        >
          <div className="absolute -inset-x-6 -inset-y-4 bg-navy/5 lg:-inset-x-10 lg:-inset-y-8" />
          <div className="relative">
            <DesktopAgentMock />
          </div>
        </div>
      </div>
    </section>
  );
}
