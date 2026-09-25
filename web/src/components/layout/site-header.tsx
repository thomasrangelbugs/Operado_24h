"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Menu, Play, Square, X } from "lucide-react";
import { brand } from "@/data/brand";
import { mainNav } from "@/data/navigation";
import { agentTourCopy } from "@/data/agent-scroll-tour";
import { buttonVariants } from "@/components/ui/button";
import {
  AGENT_DEMO_STOP_EVENT,
  startAgentDemo,
  stopAgentDemo,
} from "@/lib/agent-demo-bus";
import { cn } from "@/lib/utils";

function canRunDemo() {
  if (typeof window === "undefined") return false;
  return (
    window.matchMedia("(pointer: fine)").matches &&
    window.matchMedia("(min-width: 768px)").matches
  );
}

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const [demoRunning, setDemoRunning] = useState(false);
  const [demoAvailable, setDemoAvailable] = useState(false);

  useEffect(() => {
    const sync = () => setDemoAvailable(canRunDemo());
    sync();
    window.addEventListener("resize", sync);
    return () => window.removeEventListener("resize", sync);
  }, []);

  useEffect(() => {
    const onStop = () => setDemoRunning(false);
    window.addEventListener(AGENT_DEMO_STOP_EVENT, onStop);
    return () => window.removeEventListener(AGENT_DEMO_STOP_EVENT, onStop);
  }, []);

  const handleDemoClick = () => {
    if (demoRunning) {
      stopAgentDemo();
      setDemoRunning(false);
      setOpen(false);
      return;
    }
    if (!canRunDemo()) return;
    setDemoRunning(true);
    startAgentDemo();
    setOpen(false);
  };

  return (
    <header className="sticky top-0 z-50 border-b border-ink/15 bg-paper-surface/95 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-3 px-4 sm:px-6 lg:px-8">
        <Link href="#inicio" className="group flex shrink-0 flex-col leading-tight">
          <span className="font-display text-base font-bold tracking-tight text-ink">
            {brand.productName}
          </span>
          <span className="text-[11px] text-ink-soft group-hover:text-ink-muted">
            {brand.productTagline}
          </span>
        </Link>

        <nav
          className="hidden items-center gap-5 md:flex"
          aria-label="Principal"
        >
          {mainNav.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="text-sm text-ink-muted transition hover:text-ink"
            >
              {item.label}
            </a>
          ))}
        </nav>

        <div className="hidden items-center gap-2 md:flex">
          {demoAvailable ? (
            <button
              type="button"
              onClick={handleDemoClick}
              className={cn(
                "inline-flex h-9 items-center gap-1.5 rounded-lg px-4 text-xs font-semibold transition",
                demoRunning
                  ? "border border-rose-300 bg-rose-50 text-rose-800 hover:bg-rose-100"
                  : "bg-navy text-white hover:bg-ink",
              )}
            >
              {demoRunning ? (
                <>
                  <Square className="h-3 w-3 fill-current" />
                  {agentTourCopy.menuStop}
                </>
              ) : (
                <>
                  <Play className="h-3.5 w-3.5 fill-current" />
                  {agentTourCopy.menuStart}
                </>
              )}
            </button>
          ) : null}
          <a
            href={brand.hero.ctaSecondary.href}
            className={cn(buttonVariants({ size: "sm" }))}
          >
            Lista
          </a>
        </div>

        <button
          type="button"
          className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-ink/10 md:hidden"
          aria-label={open ? "Fechar menu" : "Abrir menu"}
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      <div
        className={cn(
          "border-t border-ink/10 md:hidden",
          open ? "block" : "hidden",
        )}
      >
        <nav className="flex flex-col gap-1 px-4 py-3" aria-label="Mobile">
          {mainNav.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="rounded-lg px-3 py-2 text-sm text-ink hover:bg-paper-muted"
              onClick={() => setOpen(false)}
            >
              {item.label}
            </a>
          ))}
          <a
            href={brand.hero.ctaSecondary.href}
            className={cn(buttonVariants({ size: "sm" }), "mt-2 w-full")}
            onClick={() => setOpen(false)}
          >
            {brand.hero.ctaSecondary.label}
          </a>
        </nav>
      </div>
    </header>
  );
}
