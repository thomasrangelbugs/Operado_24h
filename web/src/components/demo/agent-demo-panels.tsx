"use client";

import Image from "next/image";
import { ChevronDown, ChevronUp, Minus, PanelLeft } from "lucide-react";
import { motion } from "framer-motion";
import {
  agentTourCopy,
  type AuditEvent,
  type AutonomyLevel,
  type DemoMode,
  type HeatPoint,
  type PlaybackSpeed,
  type StatusKey,
} from "@/data/agent-scroll-tour";
import { cn } from "@/lib/utils";

const panel =
  "border border-white/20 bg-[#121820] text-zinc-100 shadow-xl shadow-black/25";
const panelMuted = "text-zinc-300";
const chipIdle =
  "rounded-md border border-white/20 px-2.5 py-1 text-[10px] text-zinc-200 hover:bg-white/10";
const chipActive =
  "rounded-md border border-emerald-400/50 bg-emerald-500/20 px-2.5 py-1 text-[10px] text-emerald-100";

function MinimizeBtn({
  minimized,
  onToggle,
  label,
}: {
  minimized: boolean;
  onToggle: () => void;
  label: string;
}) {
  return (
    <button
      type="button"
      onClick={onToggle}
      className="inline-flex h-6 w-6 items-center justify-center rounded-md border border-white/20 text-zinc-200 hover:bg-white/10 hover:text-white"
      aria-label={
        minimized
          ? `${agentTourCopy.expand} ${label}`
          : `${agentTourCopy.minimize} ${label}`
      }
      title={minimized ? agentTourCopy.expand : agentTourCopy.minimize}
    >
      {minimized ? (
        <ChevronUp className="h-3.5 w-3.5" />
      ) : (
        <Minus className="h-3.5 w-3.5" />
      )}
    </button>
  );
}

type ControlBarProps = {
  status: StatusKey;
  mode: DemoMode;
  autonomy: AutonomyLevel;
  speed: PlaybackSpeed;
  sound: boolean;
  humanControl: boolean;
  teaching: boolean;
  minimized: boolean;
  onToggleMinimize: () => void;
  onMinimizeAll: () => void;
  onExpandAll: () => void;
  kpis: { actions: number; selects: number; evidence: number };
  onMode: (m: DemoMode) => void;
  onAutonomy: (a: AutonomyLevel) => void;
  onSpeed: (s: PlaybackSpeed) => void;
  onToggleSound: () => void;
  onTakeControl: () => void;
  onTeach: () => void;
  onDismiss: () => void;
  onRestart: () => void;
};

export function AgentControlBar({
  status,
  mode,
  autonomy,
  speed,
  sound,
  humanControl,
  teaching,
  minimized,
  onToggleMinimize,
  onMinimizeAll,
  onExpandAll,
  kpis,
  onMode,
  onAutonomy,
  onSpeed,
  onToggleSound,
  onTakeControl,
  onTeach,
  onDismiss,
  onRestart,
}: ControlBarProps) {
  if (minimized) {
    return (
      <div
        data-agent-ui
        className={cn(
          "fixed bottom-3 left-3 z-[89] flex items-center gap-2 rounded-lg px-3 py-1.5 text-[11px]",
          panel,
        )}
      >
        <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-400" />
        <span className={cn("max-w-[160px] truncate", panelMuted)}>
          {agentTourCopy.status[status]}
        </span>
        <button
          type="button"
          onClick={onToggleMinimize}
          className={chipIdle}
        >
          {agentTourCopy.expand}
        </button>
      </div>
    );
  }

  return (
    <div
      data-agent-ui
      className={cn(
        "fixed bottom-3 left-3 z-[89] flex max-w-[min(100vw-1.5rem,560px)] flex-col gap-2 rounded-xl p-3 text-[11px]",
        panel,
      )}
    >
      <div className="flex flex-wrap items-center gap-2">
        <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-400" />
        <span className="font-medium text-white">{agentTourCopy.badge}</span>
        <span className="text-zinc-500">·</span>
        <span className={cn("truncate", panelMuted)}>
          {agentTourCopy.status[status]}
        </span>
        <span className="ml-auto font-mono text-[10px] text-emerald-300">
          ações {kpis.actions} · sel. {kpis.selects} · evid. {kpis.evidence}
        </span>
        <MinimizeBtn
          minimized={false}
          onToggle={onToggleMinimize}
          label="controles"
        />
      </div>

      <div className="flex flex-wrap gap-1.5">
        {(["chatbot", "rpa", "digital"] as DemoMode[]).map((m) => (
          <button
            key={m}
            type="button"
            onClick={() => onMode(m)}
            className={mode === m ? chipActive : chipIdle}
            title={agentTourCopy.modes[m].blurb}
          >
            {agentTourCopy.modes[m].name}
          </button>
        ))}
      </div>

      <div className="flex flex-wrap items-center gap-1.5">
        <span className={panelMuted}>{agentTourCopy.autonomyLabel}</span>
        {([0, 1, 2, 3] as AutonomyLevel[]).map((a) => (
          <button
            key={a}
            type="button"
            onClick={() => onAutonomy(a)}
            className={cn(
              "rounded-md border px-2 py-0.5 font-mono text-[10px]",
              autonomy === a
                ? "border-emerald-400/50 bg-emerald-500/20 text-emerald-100"
                : "border-white/20 text-zinc-200 hover:bg-white/10",
            )}
            title={agentTourCopy.autonomy[a]}
          >
            N{a}
          </button>
        ))}
        <span className="mx-1 text-zinc-500">|</span>
        <span className={panelMuted}>{agentTourCopy.speedLabel}</span>
        {([0.5, 1, 2] as PlaybackSpeed[]).map((s) => (
          <button
            key={s}
            type="button"
            onClick={() => onSpeed(s)}
            className={cn(
              "rounded-md border px-2 py-0.5 font-mono text-[10px]",
              speed === s
                ? "border-white/40 bg-white/15 text-white"
                : "border-white/20 text-zinc-200 hover:bg-white/10",
            )}
          >
            {s}x
          </button>
        ))}
      </div>

      <div className="flex flex-wrap gap-1.5">
        <button
          type="button"
          onClick={onTakeControl}
          className="rounded-md border border-amber-400/40 bg-amber-500/20 px-2.5 py-1 text-[10px] text-amber-100"
        >
          {humanControl
            ? agentTourCopy.returnControl
            : agentTourCopy.takeControl}
        </button>
        <button
          type="button"
          onClick={onTeach}
          className={cn(
            "rounded-md border px-2.5 py-1 text-[10px]",
            teaching
              ? "border-rose-400/50 bg-rose-500/20 text-rose-100"
              : chipIdle,
          )}
        >
          {teaching ? agentTourCopy.teachStop : agentTourCopy.teachStart}
        </button>
        <button type="button" onClick={onToggleSound} className={chipIdle}>
          {sound ? agentTourCopy.soundOn : agentTourCopy.soundOff}
        </button>
        <button type="button" onClick={onMinimizeAll} className={chipIdle}>
          {agentTourCopy.minimizeAll}
        </button>
        <button type="button" onClick={onExpandAll} className={chipIdle}>
          {agentTourCopy.expandAll}
        </button>
        <button type="button" onClick={onRestart} className={chipIdle}>
          {agentTourCopy.restart}
        </button>
        <button type="button" onClick={onDismiss} className={chipIdle}>
          {agentTourCopy.dismiss}
        </button>
      </div>
    </div>
  );
}

export function AgentNarrator({
  text,
  minimized,
  onToggleMinimize,
}: {
  text: string;
  minimized: boolean;
  onToggleMinimize: () => void;
}) {
  if (minimized) {
    return (
      <button
        type="button"
        data-agent-ui
        onClick={onToggleMinimize}
        className={cn(
          "fixed top-[4.5rem] left-1/2 z-[88] -translate-x-1/2 rounded-lg px-3 py-1 text-[10px] text-zinc-200 hover:text-white",
          panel,
        )}
      >
        Narrador · {agentTourCopy.expand}
      </button>
    );
  }

  return (
    <motion.div
      data-agent-ui
      key={text}
      className={cn(
        "fixed top-[4.5rem] left-1/2 z-[88] flex max-w-lg -translate-x-1/2 items-start gap-2 rounded-xl px-3 py-2 text-center text-xs text-zinc-100",
        panel,
      )}
      initial={{ opacity: 0, y: -8 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <p className="flex-1 px-1 leading-relaxed">{text}</p>
      <MinimizeBtn
        minimized={false}
        onToggle={onToggleMinimize}
        label="narrador"
      />
    </motion.div>
  );
}

export function AgentAuditPanel({
  events,
  minimized,
  onToggleMinimize,
}: {
  events: AuditEvent[];
  minimized: boolean;
  onToggleMinimize: () => void;
}) {
  if (minimized) {
    return (
      <button
        type="button"
        data-agent-ui
        onClick={onToggleMinimize}
        className={cn(
          "fixed top-20 right-3 z-[88] hidden items-center gap-2 rounded-lg px-3 py-1.5 text-[10px] text-zinc-200 hover:text-white lg:flex",
          panel,
        )}
      >
        {agentTourCopy.auditTitle} · {agentTourCopy.expand}
      </button>
    );
  }

  return (
    <div
      data-agent-ui
      className={cn(
        "fixed top-20 right-3 z-[88] hidden w-[260px] overflow-hidden rounded-xl lg:block",
        panel,
      )}
    >
      <div className="flex items-center justify-between border-b border-white/15 px-3 py-2">
        <p className="text-[11px] font-medium text-white">
          {agentTourCopy.auditTitle}
        </p>
        <MinimizeBtn
          minimized={false}
          onToggle={onToggleMinimize}
          label="auditoria"
        />
      </div>
      <ul className="max-h-56 space-y-1.5 overflow-y-auto p-2 font-mono text-[10px]">
        {events.length === 0 ? (
          <li className="px-1 py-2 text-zinc-400">Aguardando ações…</li>
        ) : (
          events.map((e) => (
            <li
              key={e.id}
              className="flex gap-2 rounded-md bg-white/5 px-2 py-1.5"
            >
              <span className="shrink-0 text-zinc-400">{e.time}</span>
              <span
                className={cn(
                  "text-zinc-100",
                  e.kind === "success" && "text-emerald-300",
                  e.kind === "warn" && "text-amber-300",
                  e.kind === "error" && "text-rose-300",
                )}
              >
                {e.label}
              </span>
            </li>
          ))
        )}
      </ul>
    </div>
  );
}

export function AgentViewportPanel({
  label,
  cursorX,
  cursorY,
  minimized,
  onToggleMinimize,
}: {
  label: string;
  cursorX: number;
  cursorY: number;
  minimized: boolean;
  onToggleMinimize: () => void;
}) {
  const px = clampPct(
    (cursorX / (typeof window !== "undefined" ? window.innerWidth : 1)) * 100,
  );
  const py = clampPct(
    (cursorY / (typeof window !== "undefined" ? window.innerHeight : 1)) * 100,
  );

  if (minimized) {
    return (
      <button
        type="button"
        data-agent-ui
        onClick={onToggleMinimize}
        className={cn(
          "fixed top-20 left-3 z-[88] hidden items-center gap-2 rounded-lg px-3 py-1.5 text-[10px] text-zinc-200 hover:text-white xl:flex",
          panel,
        )}
      >
        <PanelLeft className="h-3 w-3" />
        Viewport · {agentTourCopy.expand}
      </button>
    );
  }

  return (
    <div
      data-agent-ui
      className={cn(
        "fixed top-20 left-3 z-[88] hidden w-[200px] overflow-hidden rounded-xl xl:block",
        panel,
      )}
    >
      <div className="flex items-center justify-between border-b border-white/15 px-3 py-2">
        <p className="text-[11px] font-medium text-white">
          {agentTourCopy.viewportTitle}
        </p>
        <MinimizeBtn
          minimized={false}
          onToggle={onToggleMinimize}
          label="viewport"
        />
      </div>
      <div className="relative m-2 h-28 overflow-hidden rounded-lg border border-dashed border-white/20 bg-[#0a0e14]">
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.06)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.06)_1px,transparent_1px)] bg-[size:12px_12px]" />
        <div
          className="absolute h-8 w-16 rounded border border-emerald-400/50 bg-emerald-500/20"
          style={{
            left: `${Math.max(8, px - 12)}%`,
            top: `${Math.max(8, py - 10)}%`,
          }}
        />
        <div
          className="absolute h-2 w-2 rounded-sm bg-emerald-300"
          style={{ left: `${px}%`, top: `${py}%` }}
        />
      </div>
      <p className="truncate px-3 pb-2 text-[10px] text-zinc-300">{label}</p>
    </div>
  );
}

function clampPct(n: number) {
  return Math.min(88, Math.max(8, n));
}

export function AgentHeatmapOverlay({
  points,
  visible,
  onClose,
}: {
  points: HeatPoint[];
  visible: boolean;
  onClose: () => void;
}) {
  if (!visible) return null;
  return (
    <div
      data-agent-ui
      className="fixed inset-0 z-[95] flex items-center justify-center bg-black/70 p-4"
    >
      <div className={cn("w-full max-w-xl rounded-xl p-4", panel)}>
        <div className="mb-3 flex items-center justify-between">
          <p className="text-sm font-medium text-white">
            {agentTourCopy.heatmapTitle}
          </p>
          <button
            type="button"
            onClick={onClose}
            className="rounded-lg border border-white/20 px-2 py-1 text-xs text-zinc-200 hover:bg-white/10"
          >
            Fechar
          </button>
        </div>
        <div className="relative h-64 overflow-hidden rounded-xl border border-white/15 bg-[#0a0e14]">
          {points.map((p, i) => (
            <span
              key={`${p.t}-${i}`}
              className="absolute h-8 w-8 -translate-x-1/2 -translate-y-1/2 rounded-full bg-emerald-400/30 blur-[3px]"
              style={{
                left: `${(p.x / (typeof window !== "undefined" ? window.innerWidth : 1)) * 100}%`,
                top: `${(p.y / (typeof window !== "undefined" ? window.innerHeight : 1)) * 100}%`,
                opacity: 0.25 + (i / Math.max(points.length, 1)) * 0.45,
              }}
            />
          ))}
        </div>
        <p className="mt-2 text-xs text-zinc-300">
          Pontos onde o agente passou o cursor nesta sessão de simulação.
        </p>
      </div>
    </div>
  );
}

export function AgentVmOverlay({ visible }: { visible: boolean }) {
  if (!visible) return null;
  return (
    <motion.div
      data-agent-ui
      className="pointer-events-none fixed inset-x-0 top-16 z-[87] flex justify-center"
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
    >
      <div className="rounded-lg border border-emerald-400/40 bg-[#121820] px-4 py-2 font-mono text-[11px] text-emerald-200 shadow-xl shadow-black/25">
        {agentTourCopy.vmOverlay}
      </div>
    </motion.div>
  );
}

export function AgentApprovalModal({
  open,
  onApprove,
  onDeny,
}: {
  open: boolean;
  onApprove: () => void;
  onDeny: () => void;
}) {
  if (!open) return null;
  return (
    <div
      data-agent-ui
      className="fixed inset-0 z-[96] flex items-center justify-center bg-black/55 p-4"
    >
      <div className="w-full max-w-sm rounded-xl border border-amber-400/40 bg-[#121820] p-5 shadow-2xl shadow-black/40">
        <p className="text-sm font-medium text-amber-100">
          {agentTourCopy.approvalAsk}
        </p>
        <p className="mt-2 text-xs text-zinc-300">
          Nível 1: o agente prepara a ação e espera confirmação humana.
        </p>
        <div className="mt-4 flex gap-2">
          <button
            type="button"
            onClick={onApprove}
            className="flex-1 rounded-lg bg-emerald-500/25 py-2 text-sm text-emerald-100"
          >
            {agentTourCopy.approve}
          </button>
          <button
            type="button"
            onClick={onDeny}
            className="flex-1 rounded-lg border border-white/20 py-2 text-sm text-zinc-200"
          >
            {agentTourCopy.deny}
          </button>
        </div>
      </div>
    </div>
  );
}

export function AgentErrorPopup({
  visible,
  recovering,
}: {
  visible: boolean;
  recovering: boolean;
}) {
  if (!visible) return null;
  return (
    <motion.div
      data-agent-ui
      className="fixed left-1/2 top-1/3 z-[90] w-[280px] -translate-x-1/2 rounded-xl border border-rose-400/50 bg-[#1a1014] p-4 shadow-2xl shadow-black/40"
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
    >
      <p className="text-sm font-medium text-rose-100">
        {agentTourCopy.errorPopup}
      </p>
      <p className="mt-2 text-xs text-zinc-300">
        {recovering
          ? agentTourCopy.recoverAlt
          : "Aguardando análise do agente…"}
      </p>
    </motion.div>
  );
}

export function AgentTeachBanner({
  teaching,
  done,
}: {
  teaching: boolean;
  done: boolean;
}) {
  if (!teaching && !done) return null;
  return (
    <div
      data-agent-ui
      className={cn(
        "fixed bottom-36 left-1/2 z-[88] -translate-x-1/2 rounded-lg px-4 py-2 text-xs text-zinc-100",
        panel,
      )}
    >
      {done ? (
        <span className="text-emerald-300">{agentTourCopy.teachDone}</span>
      ) : (
        <span className="flex items-center gap-2">
          <span className="h-2 w-2 animate-pulse rounded-full bg-rose-400" />
          Gravando demonstração — mova o mouse e clique
        </span>
      )}
    </div>
  );
}

export function AgentEvidenceCard({
  x,
  y,
  visible,
}: {
  x: number;
  y: number;
  visible: boolean;
}) {
  if (!visible) return null;
  return (
    <motion.div
      data-agent-ui
      className={cn(
        "fixed z-[85] w-[220px] overflow-hidden rounded-xl",
        panel,
      )}
      style={{ left: x, top: y }}
      initial={{ opacity: 0, scale: 0.9, rotate: -2 }}
      animate={{ opacity: 1, scale: 1, rotate: 0 }}
    >
      <div className="flex items-center justify-between border-b border-white/15 px-2 py-1.5">
        <span className="font-mono text-[10px] text-zinc-300">
          {agentTourCopy.evidenceCaption}
        </span>
        <span className="text-xs text-zinc-400">×</span>
      </div>
      <Image
        src="/demo/robot-thumbs-up.png"
        alt="Robô digital fazendo joinha"
        width={220}
        height={220}
        className="h-auto w-full object-cover"
      />
    </motion.div>
  );
}

export function AgentNotePad({
  open,
  x,
  y,
  text,
}: {
  open: boolean;
  x: number;
  y: number;
  text: string;
}) {
  if (!open) return null;
  return (
    <motion.div
      data-agent-ui
      className={cn(
        "fixed z-[85] w-[300px] overflow-hidden rounded-xl border-emerald-400/40",
        panel,
      )}
      style={{ left: x, top: y }}
      initial={{ opacity: 0, scale: 0.94 }}
      animate={{ opacity: 1, scale: 1 }}
    >
      <div className="border-b border-white/15 px-3 py-2 text-[11px] font-medium text-emerald-200">
        {agentTourCopy.noteLabel}
      </div>
      <div className="min-h-[72px] px-3 py-2 font-mono text-xs text-zinc-100">
        {text}
      </div>
    </motion.div>
  );
}

export function AgentPanelsDock({
  visible,
  onExpandAll,
}: {
  visible: boolean;
  onExpandAll: () => void;
}) {
  if (!visible) return null;
  return (
    <button
      type="button"
      data-agent-ui
      onClick={onExpandAll}
      className={cn(
        "fixed bottom-3 right-3 z-[89] flex items-center gap-2 rounded-lg px-3 py-1.5 text-[11px] text-zinc-100 hover:bg-white/10",
        panel,
      )}
    >
      <ChevronDown className="h-3.5 w-3.5" />
      {agentTourCopy.panelsDock} · {agentTourCopy.expandAll}
    </button>
  );
}
