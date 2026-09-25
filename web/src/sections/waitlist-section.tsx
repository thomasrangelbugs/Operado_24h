"use client";

import { FormEvent, useState } from "react";
import { brand } from "@/data/brand";
import { SectionShell } from "@/components/shared/section-shell";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function WaitlistSection() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "ok" | "error">("idle");

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const value = email.trim();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
      setStatus("error");
      return;
    }
    try {
      const key = "digital-employee-waitlist";
      const prev = JSON.parse(localStorage.getItem(key) ?? "[]") as string[];
      const next = Array.from(new Set([...prev, value.toLowerCase()]));
      localStorage.setItem(key, JSON.stringify(next));
      setStatus("ok");
      setEmail("");
    } catch {
      setStatus("ok");
    }
  };

  return (
    <SectionShell id="lista-espera" variant="accent">
      <div className="mx-auto max-w-2xl text-center">
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-accent">
          Próximo passo
        </p>
        <h2 className="mt-3 font-display text-3xl font-semibold tracking-tight text-ink md:text-4xl">
          {brand.waitlist.title}
        </h2>
        <p className="mt-3 text-base text-ink-muted md:text-lg">
          {brand.waitlist.description}
        </p>

        {status === "ok" ? (
          <p className="mt-8 border border-accent/30 bg-paper-surface px-4 py-4 text-sm text-ink">
            {brand.waitlist.success}
          </p>
        ) : (
          <form
            onSubmit={onSubmit}
            className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-stretch"
          >
            <label className="sr-only" htmlFor="waitlist-email">
              E-mail
            </label>
            <input
              id="waitlist-email"
              type="email"
              name="email"
              autoComplete="email"
              required
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                if (status === "error") setStatus("idle");
              }}
              placeholder={brand.waitlist.placeholder}
              className="h-12 flex-1 rounded-lg border border-ink/15 bg-paper-surface px-4 text-sm text-ink outline-none ring-accent/40 placeholder:text-ink-soft focus:ring-2"
            />
            <button type="submit" className={cn(buttonVariants({ size: "lg" }))}>
              {brand.waitlist.submit}
            </button>
          </form>
        )}

        {status === "error" ? (
          <p className="mt-3 text-sm text-rose-700">
            Informe um e-mail válido.
          </p>
        ) : null}
        <p className="mt-4 text-xs text-ink-soft">{brand.waitlist.note}</p>
      </div>
    </SectionShell>
  );
}
