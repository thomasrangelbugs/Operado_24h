"use client";

import { motion, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";

type SectionShellProps = {
  id?: string;
  className?: string;
  children: React.ReactNode;
  variant?: "default" | "muted" | "accent";
};

export function SectionShell({
  id,
  className,
  children,
  variant = "default",
}: SectionShellProps) {
  const reduceMotion = useReducedMotion();

  return (
    <motion.section
      id={id}
      className={cn(
        "relative scroll-mt-24 py-16 md:py-20 lg:py-24",
        variant === "muted" && "bg-paper-muted",
        variant === "accent" && "bg-accent-soft/70",
        className,
      )}
      initial={reduceMotion ? false : { opacity: 0, y: 20 }}
      whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.45, ease: "easeOut" }}
    >
      <div className="mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8">
        {children}
      </div>
    </motion.section>
  );
}
