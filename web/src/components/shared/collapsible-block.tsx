"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

type CollapsibleBlockProps = {
  title: string;
  summary?: string;
  children: React.ReactNode;
  defaultOpen?: boolean;
  className?: string;
  /** When true, always expanded on md+ screens */
  expandOnDesktop?: boolean;
};

export function CollapsibleBlock({
  title,
  summary,
  children,
  defaultOpen = false,
  className,
  expandOnDesktop = true,
}: CollapsibleBlockProps) {
  const [open, setOpen] = useState(defaultOpen);

  return (
    <div className={cn("border-t border-ink/10", className)}>
      <button
        type="button"
        className={cn(
          "flex w-full items-start justify-between gap-4 py-4 text-left",
          expandOnDesktop && "md:pointer-events-none",
        )}
        aria-expanded={open}
        onClick={() => setOpen((v) => !v)}
      >
        <span>
          <span className="block font-display text-base font-semibold text-ink">
            {title}
          </span>
          {summary ? (
            <span className="mt-1 block text-sm text-ink-muted">{summary}</span>
          ) : null}
        </span>
        <ChevronDown
          className={cn(
            "mt-1 h-5 w-5 shrink-0 text-ink-soft transition",
            open && "rotate-180",
            expandOnDesktop && "md:hidden",
          )}
        />
      </button>
      <div
        className={cn(
          "pb-6",
          open ? "block" : "hidden",
          expandOnDesktop && "md:block",
        )}
      >
        {children}
      </div>
    </div>
  );
}
