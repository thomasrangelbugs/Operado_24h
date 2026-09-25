"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

/** Ponteiro estilo sistema (seta clássica), branco com contorno escuro. */
type AgentMousePointerProps = {
  pressed?: boolean;
  size?: number;
  className?: string;
};

export function AgentMousePointer({
  pressed = false,
  size = 32,
  className,
}: AgentMousePointerProps) {
  return (
    <motion.svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={cn(
        "overflow-visible drop-shadow-[0_2px_4px_rgba(0,0,0,0.85)]",
        className,
      )}
      animate={{ scale: pressed ? 0.9 : 1, y: pressed ? 1 : 0 }}
      transition={{ duration: 0.07, ease: "easeOut" }}
      style={{ transformOrigin: "4px 3px" }}
      aria-hidden="true"
    >
      <path
        d="M4.5 2.5L4.45 18.85L9.05 15.15L11.95 21.05L14.05 19.95L11.25 14.05L16.15 14.35L4.5 2.5Z"
        fill="#FFFFFF"
        stroke="#0A0A0A"
        strokeWidth="1.35"
        strokeLinejoin="round"
        strokeLinecap="round"
      />
    </motion.svg>
  );
}

/** Coordenadas do movimento = ponta da seta (hotspot). */
export const AGENT_CURSOR_HOTSPOT = { x: 4, y: 3 } as const;
