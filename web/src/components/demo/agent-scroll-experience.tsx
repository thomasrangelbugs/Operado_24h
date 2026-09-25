"use client";

import {
  useCallback,
  useEffect,
  useRef,
  useState,
  useSyncExternalStore,
} from "react";
import { animate, motion, useMotionValue, useReducedMotion } from "framer-motion";
import {
  AGENT_TOUR_STORAGE_KEY,
  agentTourCopy,
  type AuditEvent,
  type AutonomyLevel,
  type DemoMode,
  type HeatPoint,
  type PlaybackSpeed,
  type StatusKey,
} from "@/data/agent-scroll-tour";
import { agentSounds } from "@/lib/agent-demo-sound";
import {
  clamp,
  collectTargets,
  nowStamp,
  pointOn,
  randomBetween,
  speakText,
  wait,
} from "@/lib/agent-demo-utils";
import { AgentMousePointer } from "@/components/demo/agent-mouse-pointer";
import {
  AgentApprovalModal,
  AgentAuditPanel,
  AgentControlBar,
  AgentErrorPopup,
  AgentEvidenceCard,
  AgentHeatmapOverlay,
  AgentNarrator,
  AgentNotePad,
  AgentPanelsDock,
  AgentTeachBanner,
  AgentViewportPanel,
  AgentVmOverlay,
} from "@/components/demo/agent-demo-panels";
import { cn } from "@/lib/utils";
import {
  AGENT_DEMO_START_EVENT,
  AGENT_DEMO_STOP_EVENT,
  stopAgentDemo,
} from "@/lib/agent-demo-bus";

type ClickPulse = { x: number; y: number; key: number };

function subscribeNoop() {
  return () => {};
}

function getTourEligible() {
  if (typeof window === "undefined") return false;
  const finePointer = window.matchMedia("(pointer: fine)").matches;
  const wide = window.matchMedia("(min-width: 768px)").matches;
  return finePointer && wide;
}

export function AgentScrollExperience() {
  const reduceMotion = useReducedMotion();
  const cx = useMotionValue(400);
  const cy = useMotionValue(180);

  const [session, setSession] = useState(0);
  const [userStarted, setUserStarted] = useState(false);
  const [dismissed, setDismissed] = useState(false);
  const eligible = useSyncExternalStore(subscribeNoop, getTourEligible, () => false);

  const [mode, setMode] = useState<DemoMode>("digital");
  const [autonomy, setAutonomy] = useState<AutonomyLevel>(2);
  const [speed, setSpeed] = useState<PlaybackSpeed>(1);
  const [sound, setSound] = useState(false);
  const [voice, setVoice] = useState(false);

  const [cursorVisible, setCursorVisible] = useState(false);
  const [cursorPressed, setCursorPressed] = useState(false);
  const [clickPulse, setClickPulse] = useState<ClickPulse | null>(null);
  const [selection, setSelection] = useState<DOMRect | null>(null);
  const [status, setStatus] = useState<StatusKey>("idle");
  const [narrator, setNarrator] = useState<string>(agentTourCopy.narratorFallback);

  const [note, setNote] = useState({ x: 0, y: 0, text: "", open: false });
  const [evidence, setEvidence] = useState({ x: 0, y: 0, visible: false });
  const [audit, setAudit] = useState<AuditEvent[]>([]);
  const [heat, setHeat] = useState<HeatPoint[]>([]);
  const [showHeatmap, setShowHeatmap] = useState(false);
  const [vmFlash, setVmFlash] = useState(false);

  const [panelMin, setPanelMin] = useState({
    controls: false,
    audit: false,
    viewport: false,
    narrator: false,
  });

  const [humanControl, setHumanControl] = useState(false);
  const [teaching, setTeaching] = useState(false);
  const [teachDone, setTeachDone] = useState(false);
  const [approvalOpen, setApprovalOpen] = useState(false);
  const [errorPopup, setErrorPopup] = useState(false);
  const [recovering, setRecovering] = useState(false);

  const [kpis, setKpis] = useState({ actions: 0, selects: 0, evidence: 0 });
  const [viewLabel, setViewLabel] = useState("viewport");
  const [cursorPos, setCursorPos] = useState({ x: 400, y: 180 });

  const [chatOpen, setChatOpen] = useState(false);
  const [chatClosing, setChatClosing] = useState(false);
  const [chatTyped, setChatTyped] = useState("");

  const abortRef = useRef(false);
  const startedRef = useRef(false);
  const actionCountRef = useRef(0);
  const typedIndexRef = useRef(0);
  const lastScrollY = useRef(0);
  const scrollDir = useRef<"down" | "up">("down");
  const chatCloseRef = useRef<HTMLButtonElement>(null);
  const highlightRef = useRef<HTMLElement | null>(null);
  const approvalResolver = useRef<((ok: boolean) => void) | null>(null);
  const modeRef = useRef(mode);
  const autonomyRef = useRef(autonomy);
  const speedRef = useRef(speed);
  const soundRef = useRef(sound);
  const humanRef = useRef(humanControl);
  const teachingRef = useRef(teaching);

  useEffect(() => {
    modeRef.current = mode;
    autonomyRef.current = autonomy;
    speedRef.current = speed;
    soundRef.current = sound;
    humanRef.current = humanControl;
    teachingRef.current = teaching;
  }, [mode, autonomy, speed, sound, humanControl, teaching]);

  const active =
    userStarted && eligible && !dismissed && !reduceMotion && !showHeatmap;

  const scaledWait = useCallback(async (ms: number) => {
    await wait(ms / speedRef.current);
  }, []);

  const play = useCallback((fn: () => void) => {
    if (soundRef.current) fn();
  }, []);

  const pushAudit = useCallback((label: string, kind: AuditEvent["kind"] = "info") => {
    setAudit((prev) =>
      [{ id: `${Date.now()}-${Math.random()}`, time: nowStamp(), label, kind }, ...prev].slice(
        0,
        40,
      ),
    );
  }, []);

  const setNarration = useCallback(
    (key: StatusKey) => {
      const text = agentTourCopy.narrations[key];
      setNarrator(text);
      setStatus(key);
    },
    [],
  );

  const recordHeat = useCallback((x: number, y: number) => {
    setHeat((prev) => [...prev.slice(-120), { x, y, t: Date.now() }]);
    setCursorPos({ x, y });
  }, []);

  const dismiss = useCallback(() => {
    abortRef.current = true;
    sessionStorage.setItem(AGENT_TOUR_STORAGE_KEY, "1");
    setDismissed(true);
    setUserStarted(false);
    setCursorVisible(false);
    setChatOpen(false);
    setShowHeatmap(false);
    setNote((n) => ({ ...n, open: false }));
    setEvidence((e) => ({ ...e, visible: false }));
    if (highlightRef.current) {
      highlightRef.current.classList.remove("agent-focus-ring");
      delete highlightRef.current.dataset.agentPressed;
    }
    stopAgentDemo();
  }, []);

  const restart = useCallback(() => {
    abortRef.current = true;
    sessionStorage.removeItem(AGENT_TOUR_STORAGE_KEY);
    setDismissed(false);
    setUserStarted(true);
    setShowHeatmap(false);
    setChatOpen(false);
    setAudit([]);
    setHeat([]);
    setKpis({ actions: 0, selects: 0, evidence: 0 });
    setPanelMin({
      controls: false,
      audit: false,
      viewport: false,
      narrator: false,
    });
    setTeachDone(false);
    setTeaching(false);
    setHumanControl(false);
    startedRef.current = false;
    actionCountRef.current = 0;
    setSession((s) => s + 1);
  }, []);

  // Só inicia quando o menu dispara o evento (ou restart interno)
  useEffect(() => {
    const onStart = () => {
      if (!getTourEligible() || reduceMotion) {
        stopAgentDemo();
        return;
      }
      restart();
    };
    const onStop = () => {
      abortRef.current = true;
      setDismissed(true);
      setUserStarted(false);
      setCursorVisible(false);
      setChatOpen(false);
      setShowHeatmap(false);
      setNote((n) => ({ ...n, open: false }));
      setEvidence((e) => ({ ...e, visible: false }));
    };
    window.addEventListener(AGENT_DEMO_START_EVENT, onStart);
    window.addEventListener(AGENT_DEMO_STOP_EVENT, onStop);
    return () => {
      window.removeEventListener(AGENT_DEMO_START_EVENT, onStart);
      window.removeEventListener(AGENT_DEMO_STOP_EVENT, onStop);
    };
  }, [reduceMotion, restart]);

  useEffect(() => {
    if (typeof window === "undefined") return;
    cx.set(window.innerWidth * 0.55);
    cy.set(180);
  }, [cx, cy]);

  // Controle humano: arrastar cursor com o mouse real
  useEffect(() => {
    if (!humanControl) return;
    const onMove = (e: MouseEvent) => {
      cx.set(e.clientX);
      cy.set(e.clientY);
      recordHeat(e.clientX, e.clientY);
    };
    const onClick = (e: MouseEvent) => {
      setClickPulse({ x: e.clientX, y: e.clientY, key: Date.now() });
      play(agentSounds.click);
      pushAudit("Clique humano", "info");
      setKpis((k) => ({ ...k, actions: k.actions + 1 }));
    };
    window.addEventListener("mousemove", onMove);
    window.addEventListener("click", onClick);
    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("click", onClick);
    };
  }, [humanControl, cx, cy, pushAudit, recordHeat, play]);

  // Ensino por demonstração
  useEffect(() => {
    if (!teaching) return;
    const onMove = (e: MouseEvent) => recordHeat(e.clientX, e.clientY);
    const onClick = () => {
      pushAudit("Passo demonstrado (clique)", "info");
      setKpis((k) => ({ ...k, actions: k.actions + 1 }));
    };
    window.addEventListener("mousemove", onMove);
    window.addEventListener("click", onClick);
    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("click", onClick);
    };
  }, [teaching, pushAudit, recordHeat]);

  useEffect(() => {
    if (!active || startedRef.current) return;
    startedRef.current = true;
    abortRef.current = false;
    actionCountRef.current = 0;

    const clearHighlight = () => {
      if (highlightRef.current) {
        highlightRef.current.classList.remove("agent-focus-ring");
        delete highlightRef.current.dataset.agentPressed;
        highlightRef.current = null;
      }
    };

    const setHighlight = (el: HTMLElement | null) => {
      clearHighlight();
      highlightRef.current = el;
      if (el) {
        el.classList.add("agent-focus-ring");
        setViewLabel(el.tagName.toLowerCase() + (el.id ? `#${el.id}` : ""));
      }
    };

    const moveCursorTo = async (x: number, y: number, quick = false) => {
      if (abortRef.current || humanRef.current) return;
      setCursorVisible(true);
      const opts = quick
        ? { type: "spring" as const, stiffness: 150, damping: 22, mass: 0.4 }
        : { type: "spring" as const, stiffness: 52, damping: 13, mass: 0.72 };
      const anims = [animate(cx, x, opts), animate(cy, y, opts)];
      const unsubX = cx.on("change", (v) => recordHeat(v, cy.get()));
      await Promise.all(anims);
      unsubX();
      recordHeat(x, y);
    };

    const doClick = async (x: number, y: number, el?: HTMLElement | null) => {
      setNarration("click");
      setCursorPressed(true);
      setClickPulse({ x, y, key: Date.now() });
      play(agentSounds.click);
      if (el) el.dataset.agentPressed = "true";
      await scaledWait(110);
      setCursorPressed(false);
      await scaledWait(140);
      if (el) delete el.dataset.agentPressed;
      pushAudit("Clique executado", "success");
      setKpis((k) => ({ ...k, actions: k.actions + 1 }));
    };

    const maybeApprove = async () => {
      if (autonomyRef.current !== 1) return true;
      if (modeRef.current !== "digital") return true;
      setNarration("approve");
      setApprovalOpen(true);
      pushAudit("Aguardando aprovação humana", "warn");
      const ok = await new Promise<boolean>((resolve) => {
        approvalResolver.current = resolve;
      });
      setApprovalOpen(false);
      pushAudit(ok ? "Ação aprovada" : "Ação negada", ok ? "success" : "warn");
      return ok;
    };

    const actionObserve = async (el: HTMLElement) => {
      setNarration("observe");
      setHighlight(el);
      const { x, y } = pointOn(el);
      await moveCursorTo(x, y);
      pushAudit("Sugestão: inspecionar elemento (N0)", "info");
      await scaledWait(500);
    };

    const actionHover = async (el: HTMLElement) => {
      setNarration("hover");
      setHighlight(el);
      const a = pointOn(el, 0.2, 0.3);
      const b = pointOn(el, 0.8, 0.6);
      await moveCursorTo(a.x, a.y);
      await scaledWait(160);
      await moveCursorTo(b.x, b.y);
      pushAudit("Elemento inspecionado", "info");
      await scaledWait(randomBetween(240, 500));
    };

    const actionClick = async (el: HTMLElement) => {
      if (autonomyRef.current === 0) {
        await actionObserve(el);
        return;
      }
      const ok = await maybeApprove();
      if (!ok) return;
      setHighlight(el);
      const { x, y } = pointOn(el, randomBetween(0.3, 0.75), randomBetween(0.25, 0.65));
      await moveCursorTo(x, y);
      await doClick(x, y, el);
      await scaledWait(randomBetween(140, 320));
    };

    const actionSelect = async (el: HTMLElement) => {
      if (autonomyRef.current === 0) {
        await actionObserve(el);
        return;
      }
      setNarration("select");
      setHighlight(el);
      play(agentSounds.select);
      const r = el.getBoundingClientRect();
      const startX = clamp(r.left + 8, 20, window.innerWidth - 20);
      const endX = clamp(
        r.left + Math.min(r.width * 0.88, r.width - 8),
        20,
        window.innerWidth - 20,
      );
      const y = clamp(r.top + Math.min(r.height * 0.4, 26), 80, window.innerHeight - 40);
      await moveCursorTo(startX, y);
      setCursorPressed(true);
      setSelection(DOMRect.fromRect({ x: startX, y: y - 10, width: 4, height: 24 }));
      await animate(cx, endX, { type: "spring", stiffness: 88, damping: 18, mass: 0.5 });
      setSelection(
        DOMRect.fromRect({
          x: startX,
          y: Math.max(r.top, y - 12),
          width: Math.max(24, endX - startX),
          height: Math.min(r.height, 36),
        }),
      );
      await scaledWait(randomBetween(380, 700));
      setCursorPressed(false);
      setSelection(null);
      pushAudit("Texto selecionado", "info");
      setKpis((k) => ({ ...k, selects: k.selects + 1, actions: k.actions + 1 }));
    };

    const actionWander = async () => {
      setNarration("wander");
      setHighlight(null);
      const yMid = window.innerHeight * randomBetween(0.25, 0.75);
      const left = randomBetween(40, window.innerWidth * 0.3);
      const right = randomBetween(window.innerWidth * 0.65, window.innerWidth - 40);
      await moveCursorTo(left, yMid);
      await scaledWait(80);
      await moveCursorTo(right, yMid + randomBetween(-40, 40));
    };

    const actionType = async () => {
      if (autonomyRef.current === 0) return;
      const ok = await maybeApprove();
      if (!ok) return;
      setNarration("type");
      const snippet =
        agentTourCopy.typingSnippets[
          typedIndexRef.current % agentTourCopy.typingSnippets.length
        ]!;
      typedIndexRef.current += 1;
      const padX = clamp(window.innerWidth * 0.55, 240, window.innerWidth - 340);
      const padY = clamp(window.innerHeight * 0.52, 140, window.innerHeight - 210);
      setNote({ x: padX, y: padY, text: "", open: true });
      await scaledWait(80);
      await moveCursorTo(padX + 36, padY + 52);
      await doClick(padX + 36, padY + 52);
      for (let i = 0; i <= snippet.length; i++) {
        if (abortRef.current) return;
        setNote((n) => ({ ...n, text: snippet.slice(0, i) }));
        play(agentSounds.type);
        await scaledWait(14 + Math.random() * 22);
      }
      pushAudit("Nota operacional digitada", "success");
      await scaledWait(500);
      setNote((n) => ({ ...n, open: false }));
    };

    const actionDropEvidence = async () => {
      if (autonomyRef.current === 0) return;
      setNarration("drop");
      play(agentSounds.drop);
      const x = clamp(window.innerWidth * 0.6, 180, window.innerWidth - 270);
      const y = clamp(window.innerHeight * 0.2, 90, window.innerHeight - 300);
      await moveCursorTo(x + 70, y + 36);
      setEvidence({ x, y, visible: true });
      await doClick(x + 70, y + 36);
      pushAudit("Evidência ROBOT_OK.png anexada", "success");
      setKpis((k) => ({ ...k, evidence: k.evidence + 1 }));
      await scaledWait(1400);
      await moveCursorTo(x + 210, y + 12);
      await doClick(x + 210, y + 12);
      setEvidence((e) => ({ ...e, visible: false }));
    };

    const actionErrorRecover = async () => {
      setNarration("error");
      play(agentSounds.error);
      setErrorPopup(true);
      pushAudit("Popup inesperado detectado", "error");
      await scaledWait(700);
      setRecovering(true);
      setNarration("recover");
      pushAudit("Tentando caminho alternativo", "warn");
      await actionWander();
      await scaledWait(400);
      setErrorPopup(false);
      setRecovering(false);
      pushAudit("Recuperação concluída", "success");
      play(agentSounds.done);
    };

    const actionChatbotOnly = async () => {
      setNarration("observe");
      pushAudit("Chatbot: apenas resposta textual (sem UI)", "info");
      const padX = clamp(window.innerWidth * 0.6, 240, window.innerWidth - 340);
      const padY = clamp(window.innerHeight * 0.35, 120, window.innerHeight - 200);
      setNote({
        x: padX,
        y: padY,
        text: "",
        open: true,
      });
      const msg = "Sou um chatbot: posso explicar, mas não opero o computador.";
      for (let i = 0; i <= msg.length; i++) {
        setNote((n) => ({ ...n, text: msg.slice(0, i) }));
        await scaledWait(12);
      }
      await scaledWait(900);
      setNote((n) => ({ ...n, open: false }));
    };

    const actionRpaRigid = async () => {
      setNarration("click");
      pushAudit("RPA: sequência fixa de coordenadas", "warn");
      const points = [
        [window.innerWidth * 0.3, window.innerHeight * 0.4],
        [window.innerWidth * 0.5, window.innerHeight * 0.45],
        [window.innerWidth * 0.7, window.innerHeight * 0.5],
      ] as const;
      for (const [x, y] of points) {
        await moveCursorTo(x, y, true);
        await doClick(x, y);
        await scaledWait(200);
      }
      if (Math.random() < 0.45) {
        pushAudit("RPA falhou: seletor/coordenada inválida", "error");
        play(agentSounds.error);
        await scaledWait(600);
      }
    };

    const pickAction = async () => {
      while (humanRef.current || teachingRef.current) {
        if (abortRef.current) return;
        await scaledWait(200);
      }

      if (modeRef.current === "chatbot") {
        await actionChatbotOnly();
        return;
      }
      if (modeRef.current === "rpa") {
        await actionRpaRigid();
        return;
      }

      const targets = collectTargets();
      const n = actionCountRef.current;

      if (n === 2) {
        setVmFlash(true);
        pushAudit("Sessão Windows / VM isolada", "info");
        await scaledWait(1800);
        setVmFlash(false);
      }
      if (n > 0 && n % 8 === 0) {
        await actionErrorRecover();
        return;
      }
      if (n > 0 && n % 5 === 0) {
        await actionType();
        return;
      }
      if (n > 0 && n % 9 === 0) {
        await actionDropEvidence();
        return;
      }
      if (targets.length === 0 || Math.random() < 0.18) {
        await actionWander();
        return;
      }

      const pool = targets.slice(0, Math.min(targets.length, 10));
      const el = pool[Math.floor(Math.random() * pool.length)]!;
      const roll = Math.random();
      if (autonomyRef.current === 0) await actionObserve(el);
      else if (roll < 0.3) await actionHover(el);
      else if (roll < 0.58) await actionClick(el);
      else if (roll < 0.86) await actionSelect(el);
      else await actionWander();
    };

    const runChatFinale = async () => {
      setChatOpen(true);
      setChatClosing(false);
      setChatTyped("");
      setNarration("type");
      await scaledWait(280);
      const full = agentTourCopy.chatMessage;
      speakText(full, soundRef.current || voice);
      for (let i = 0; i <= full.length; i++) {
        if (abortRef.current) return;
        setChatTyped(full.slice(0, i));
        play(agentSounds.type);
        await scaledWait(12 + Math.random() * 14);
      }
      await scaledWait(400);
      const closeBtn = chatCloseRef.current;
      if (closeBtn) {
        const r = closeBtn.getBoundingClientRect();
        await moveCursorTo(r.left + r.width / 2, r.top + r.height / 2);
        await doClick(r.left + r.width / 2, r.top + r.height / 2);
      }
      setChatClosing(true);
      play(agentSounds.done);
      await scaledWait(350);
      setChatOpen(false);
      setCursorVisible(false);
      setShowHeatmap(true);
      pushAudit("Simulação concluída", "success");
    };

    const onScroll = () => {
      const y = window.scrollY;
      if (Math.abs(y - lastScrollY.current) > 6) {
        scrollDir.current = y > lastScrollY.current ? "down" : "up";
        lastScrollY.current = y;
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    lastScrollY.current = window.scrollY;

    const run = async () => {
      setCursorVisible(true);
      pushAudit("Agente online — sessão iniciada", "success");
      await moveCursorTo(window.innerWidth * 0.48, window.innerHeight * 0.32);
      await scaledWait(300);

      while (!abortRef.current && actionCountRef.current < 30) {
        if (!humanRef.current && !teachingRef.current) {
          const viewY =
            window.innerHeight * (scrollDir.current === "down" ? 0.38 : 0.58);
          const attachX = window.innerWidth * randomBetween(0.18, 0.82);
          await moveCursorTo(attachX, viewY, true);
          await scaledWait(50);
          await pickAction();
          actionCountRef.current += 1;
        }
        await scaledWait(randomBetween(100, 260));
      }

      if (!abortRef.current) await runChatFinale();
    };

    void run();

    return () => {
      abortRef.current = true;
      window.removeEventListener("scroll", onScroll);
      clearHighlight();
      startedRef.current = false;
    };
    // session força novo loop no restart
  }, [
    active,
    session,
    cx,
    cy,
    play,
    pushAudit,
    recordHeat,
    scaledWait,
    setNarration,
    voice,
  ]);

  const onApprove = () => approvalResolver.current?.(true);
  const onDeny = () => approvalResolver.current?.(false);

  const toggleTeach = () => {
    if (teaching) {
      setTeaching(false);
      setTeachDone(true);
      pushAudit("Skill v1.0 VALIDATED", "success");
      play(agentSounds.done);
      window.setTimeout(() => setTeachDone(false), 2500);
    } else {
      abortRef.current = false;
      setTeaching(true);
      setHumanControl(false);
      setCursorVisible(true);
      setStatus("teach");
      setNarrator(agentTourCopy.narrations.teach);
      pushAudit("Gravação de skill iniciada", "info");
    }
  };

  if ((!active && !chatOpen && !showHeatmap) || reduceMotion) {
    return null;
  }

  return (
    <>
      {cursorVisible ? (
        <motion.div
          data-agent-ui
          className="pointer-events-none fixed z-[88] will-change-transform"
          style={{ left: cx, top: cy }}
          aria-hidden="true"
        >
          <AgentMousePointer pressed={cursorPressed} size={34} />
        </motion.div>
      ) : null}

      {clickPulse ? (
        <motion.span
          key={clickPulse.key}
          data-agent-ui
          className="pointer-events-none fixed z-[87] h-8 w-8 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-emerald-500"
          style={{ left: clickPulse.x, top: clickPulse.y }}
          initial={{ scale: 0.4, opacity: 0.9 }}
          animate={{ scale: 2.2, opacity: 0 }}
          transition={{ duration: 0.45 }}
          onAnimationComplete={() => setClickPulse(null)}
        />
      ) : null}

      {selection ? (
        <motion.div
          data-agent-ui
          className="pointer-events-none fixed z-[86] rounded-sm bg-emerald-400/35 ring-1 ring-emerald-700/50"
          style={{
            left: selection.left,
            top: selection.top,
            width: selection.width,
            height: selection.height,
          }}
        />
      ) : null}

      <AgentNotePad open={note.open} x={note.x} y={note.y} text={note.text} />
      <AgentEvidenceCard x={evidence.x} y={evidence.y} visible={evidence.visible} />
      <AgentNarrator
        text={narrator}
        minimized={panelMin.narrator}
        onToggleMinimize={() =>
          setPanelMin((p) => ({ ...p, narrator: !p.narrator }))
        }
      />
      <AgentAuditPanel
        events={audit}
        minimized={panelMin.audit}
        onToggleMinimize={() => setPanelMin((p) => ({ ...p, audit: !p.audit }))}
      />
      <AgentViewportPanel
        label={viewLabel}
        cursorX={cursorPos.x}
        cursorY={cursorPos.y}
        minimized={panelMin.viewport}
        onToggleMinimize={() =>
          setPanelMin((p) => ({ ...p, viewport: !p.viewport }))
        }
      />
      <AgentVmOverlay visible={vmFlash} />
      <AgentErrorPopup visible={errorPopup} recovering={recovering} />
      <AgentTeachBanner teaching={teaching} done={teachDone} />
      <AgentApprovalModal open={approvalOpen} onApprove={onApprove} onDeny={onDeny} />
      <AgentHeatmapOverlay
        points={heat}
        visible={showHeatmap}
        onClose={() => {
          setShowHeatmap(false);
          setDismissed(true);
          setUserStarted(false);
          sessionStorage.setItem(AGENT_TOUR_STORAGE_KEY, "1");
          stopAgentDemo();
        }}
      />

      <AgentPanelsDock
        visible={
          (active || humanControl || teaching) &&
          panelMin.controls &&
          panelMin.audit &&
          panelMin.viewport &&
          panelMin.narrator
        }
        onExpandAll={() =>
          setPanelMin({
            controls: false,
            audit: false,
            viewport: false,
            narrator: false,
          })
        }
      />

      {(active || humanControl || teaching) && (
        <AgentControlBar
          status={status}
          mode={mode}
          autonomy={autonomy}
          speed={speed}
          sound={sound}
          humanControl={humanControl}
          teaching={teaching}
          minimized={panelMin.controls}
          onToggleMinimize={() =>
            setPanelMin((p) => ({ ...p, controls: !p.controls }))
          }
          onMinimizeAll={() =>
            setPanelMin({
              controls: true,
              audit: true,
              viewport: true,
              narrator: true,
            })
          }
          onExpandAll={() =>
            setPanelMin({
              controls: false,
              audit: false,
              viewport: false,
              narrator: false,
            })
          }
          kpis={kpis}
          onMode={setMode}
          onAutonomy={setAutonomy}
          onSpeed={setSpeed}
          onToggleSound={() => {
            setSound((s) => !s);
            setVoice((v) => !v);
          }}
          onTakeControl={() => {
            setHumanControl((h) => {
              const next = !h;
              if (next) {
                setStatus("human");
                setNarrator(agentTourCopy.narrations.human);
                pushAudit("Humano assumiu o controle", "warn");
              } else {
                pushAudit("Controle devolvido ao agente", "success");
              }
              return next;
            });
            setTeaching(false);
            setCursorVisible(true);
          }}
          onTeach={toggleTeach}
          onDismiss={dismiss}
          onRestart={restart}
        />
      )}

      {chatOpen ? (
        <div data-agent-ui className="fixed bottom-4 right-4 z-[90] sm:bottom-6 sm:right-6">
          <motion.div
            className={cn(
              "w-[min(100vw-2rem,340px)] overflow-hidden rounded-xl border border-white/20 bg-[#121820] text-zinc-100 shadow-xl shadow-black/25",
              chatClosing && "pointer-events-none",
            )}
            initial={{ opacity: 0, y: 16 }}
            animate={
              chatClosing ? { opacity: 0, y: 24 } : { opacity: 1, y: 0 }
            }
            role="dialog"
            aria-label={agentTourCopy.chatTitle}
          >
            <div className="flex items-center justify-between border-b border-white/15 px-3 py-2.5">
              <div>
                <p className="text-sm font-medium text-white">{agentTourCopy.chatTitle}</p>
                <p className="text-[10px] text-emerald-300">{agentTourCopy.chatStatus}</p>
              </div>
              <button
                ref={chatCloseRef}
                type="button"
                className="flex h-7 w-7 items-center justify-center rounded-lg border border-white/20 text-zinc-200 hover:bg-white/10"
                aria-label={agentTourCopy.chatCloseLabel}
                tabIndex={-1}
              >
                ×
              </button>
            </div>
            <div className="space-y-2 p-3">
              <div className="rounded-lg rounded-tl-sm border border-white/15 bg-white/5 px-3 py-2 text-sm text-zinc-100">
                {chatTyped}
                <span className="ml-0.5 inline-block h-4 w-0.5 animate-pulse bg-emerald-400 align-middle" />
              </div>
            </div>
          </motion.div>
        </div>
      ) : null}
    </>
  );
}
