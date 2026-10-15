import { useEffect, useState } from "react";
import type { Tier } from "../types";
import { TRADITIONAL_PHASES, phaseCost } from "../data/phases";
import { TRADITIONAL_META } from "../data/phaseMeta";
import { easeInOut } from "../lib/animations";
import { PhaseDetailCard, type PhaseDetailData } from "./PhaseDetailCard";
import "./TraditionalScreen.css";

interface Props {
  tier: Tier;
  n: number;
  onContinue: () => void;
}

const SVG_W = 440;
const SVG_LO = 15;
const SVG_PLOT = 431 - SVG_LO; // 416
const VIEWBOX_RIGHT = 431;

// Approximate text width in SVG units.
function estTextWidth(text: string, fontSize: number): number {
  return text.length * fontSize * 0.55;
}

export function TraditionalScreen({ tier, n, onContinue }: Props) {
  const phases = TRADITIONAL_PHASES.map((p) => ({
    ...p,
    cost: phaseCost(p.cf, tier.total),
  }));

  const [visiblePhases, setVisiblePhases] = useState(0);
  const [barWidths, setBarWidths] = useState<number[]>(
    () => new Array(phases.length).fill(0)
  );
  const [showCTA, setShowCTA] = useState(false);
  const [showTotalTime, setShowTotalTime] = useState(false);
  const [hoverIdx, setHoverIdx] = useState<number | null>(null);
  const [pinnedIdx, setPinnedIdx] = useState<number | null>(null);

  function togglePin(i: number) {
    setPinnedIdx((prev) => (prev === i ? null : i));
  }

  useEffect(() => {
    let phaseIdx = 0;
    let cancelled = false;
    const rafIds: number[] = [];
    const timeoutIds: number[] = [];

    function animateBarWidth(i: number, targetW: number, duration: number) {
      const t0 = performance.now();
      const tick = (now: number) => {
        if (cancelled) return;
        const p = Math.min((now - t0) / duration, 1);
        const w = targetW * easeInOut(p);
        setBarWidths((prev) => {
          if (prev[i] === w) return prev;
          const next = prev.slice();
          next[i] = w;
          return next;
        });
        if (p < 1) rafIds.push(requestAnimationFrame(tick));
      };
      rafIds.push(requestAnimationFrame(tick));
    }

    function startPhase(i: number) {
      setVisiblePhases(i + 1);
      const p = phases[i];
      const targetW = p.fd * SVG_PLOT;
      animateBarWidth(i, targetW, 600);
    }

    startPhase(phaseIdx);
    const id = window.setInterval(() => {
      phaseIdx += 1;
      if (phaseIdx >= phases.length) {
        window.clearInterval(id);
        timeoutIds.push(
          window.setTimeout(() => {
            setShowTotalTime(true);
            timeoutIds.push(window.setTimeout(() => setShowCTA(true), 400));
          }, 350)
        );
        return;
      }
      startPhase(phaseIdx);
    }, 700);

    return () => {
      cancelled = true;
      window.clearInterval(id);
      rafIds.forEach((r) => cancelAnimationFrame(r));
      timeoutIds.forEach((t) => window.clearTimeout(t));
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const tickStep = Math.max(1, Math.ceil(tier.weeks / 8));
  const ticks: number[] = [];
  for (let w = 0; w <= tier.weeks; w += tickStep) ticks.push(w);
  if (ticks[ticks.length - 1] !== tier.weeks) ticks.push(tier.weeks);

  // Detail-card target: hover wins as transient preview, then pinned phase
  // (sticky from a click), then auto-default to the most recently revealed
  // phase so the card fills during reveal and holds on the last phase
  // (Report & deck) afterward. The card is sized to fit the longest content
  // so swapping between phases only changes text + color, not card size.
  const activeIdx =
    hoverIdx ??
    pinnedIdx ??
    (visiblePhases > 0
      ? Math.min(visiblePhases - 1, phases.length - 1)
      : null);
  const activeDetail: PhaseDetailData | null =
    activeIdx !== null
      ? (() => {
          const p = phases[activeIdx];
          const meta = TRADITIONAL_META[p.sh];
          return {
            name: p.sh,
            duration: meta.duration(tier.weeks, p.fd),
            why: meta.why,
            data: meta.data,
            color: p.c,
          };
        })()
      : null;

  return (
    <section className="trad fu">
      <div className="trad__header">
        <span className="section-label">The traditional approach</span>
        <span className="trad__tag">
          {n} participants · {tier.label}
        </span>
      </div>

      <div className="trad__gantt">
        <svg
          viewBox={`0 0 ${SVG_W} 190`}
          preserveAspectRatio="xMidYMid meet"
          width="100%"
          style={{ overflow: "visible" }}
          role="img"
          aria-label="Traditional research timeline"
        >
          {/* Axis */}
          <line
            x1={SVG_LO}
            y1={80}
            x2={VIEWBOX_RIGHT}
            y2={80}
            stroke="var(--color-border)"
            strokeWidth={0.7}
          />
          {ticks.map((w, i) => {
            const x = SVG_LO + (w / tier.weeks) * SVG_PLOT;
            const isFirst = i === 0;
            const isLast = i === ticks.length - 1;
            const anchor = isFirst ? "start" : isLast ? "end" : "middle";
            return (
              <g key={w}>
                <line
                  x1={x}
                  y1={76}
                  x2={x}
                  y2={84}
                  stroke="var(--color-border)"
                  strokeWidth={0.7}
                />
                <text
                  x={x}
                  y={96}
                  textAnchor={anchor}
                  fontSize={9}
                  fill="var(--color-text-muted)"
                  letterSpacing="0.04em"
                >
                  {w === 0 ? "0" : `wk ${w}`}
                </text>
              </g>
            );
          })}

          {/* Phase bars */}
          {phases.map((p, i) => {
            if (i >= visiblePhases) return null;
            const barX = SVG_LO + p.fs * SVG_PLOT;
            const barW = p.fd * SVG_PLOT;
            const barY = p.row === "t" ? 28 : 112;
            const labelY = p.row === "t" ? 20 : 166;

            const nameW = estTextWidth(p.sh, 9.5);
            const overflowsRight =
              p.row === "t" && barX + nameW > VIEWBOX_RIGHT;
            const nameAnchor = overflowsRight ? "end" : "start";
            const nameX = overflowsRight ? barX + barW : barX;

            const isHovered = hoverIdx === i;
            const isPinned = pinnedIdx === i;
            return (
              <g
                key={p.sh}
                className={`trad__phase ${isHovered ? "is-hovered" : ""} ${
                  isPinned ? "is-pinned" : ""
                }`}
                onMouseEnter={() => setHoverIdx(i)}
                onMouseLeave={() => setHoverIdx(null)}
                onFocus={() => setHoverIdx(i)}
                onBlur={() => setHoverIdx(null)}
                onClick={() => togglePin(i)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    togglePin(i);
                  }
                }}
                tabIndex={0}
                role="button"
                aria-pressed={isPinned}
                aria-label={`${p.sh}${isPinned ? " (pinned)" : ""}`}
              >
                <rect
                  x={barX}
                  y={barY}
                  width={barWidths[i] ?? 0}
                  height={38}
                  rx={3}
                  fill={p.c}
                  opacity={isHovered ? 1 : 0.88}
                  style={{ transition: "opacity 0.15s ease" }}
                />
                <text
                  x={nameX}
                  y={labelY}
                  textAnchor={nameAnchor}
                  fontSize={9.5}
                  fill={p.c}
                  fontWeight={500}
                  className="trad__phase-name"
                >
                  {p.sh}
                </text>
                <line
                  x1={nameAnchor === "end" ? barX + barW : barX}
                  y1={p.row === "t" ? barY : barY + 38}
                  x2={nameAnchor === "end" ? barX + barW : barX}
                  y2={labelY + (p.row === "t" ? 4 : -10)}
                  stroke={p.c}
                  strokeWidth={0.6}
                  strokeDasharray="2 2"
                  opacity={0.55}
                />
              </g>
            );
          })}
        </svg>
      </div>

      <div className="trad__legend">
        {phases.map((p, i) => (
          <button
            type="button"
            key={p.sh}
            className={`trad__legend-item ${i < visiblePhases ? "" : "is-hidden"} ${
              hoverIdx === i ? "is-hovered" : ""
            } ${pinnedIdx === i ? "is-pinned" : ""}`}
            onMouseEnter={() => setHoverIdx(i)}
            onMouseLeave={() => setHoverIdx(null)}
            onFocus={() => setHoverIdx(i)}
            onBlur={() => setHoverIdx(null)}
            onClick={() => togglePin(i)}
            aria-pressed={pinnedIdx === i}
          >
            <span className="trad__legend-dot" style={{ background: p.c }} />
            <span className="trad__legend-name">{p.sh}</span>
          </button>
        ))}
      </div>

      <PhaseDetailCard
        detail={activeDetail}
        placeholder="Hover any phase or chip to see why it takes that long."
      />

      <div className="trad__footer">
        <div>
          <span className="section-label">Estimated time to Complete</span>
          <span className="trad__hero-num">
            {showTotalTime ? `${tier.weeks} weeks` : "…"}
          </span>
        </div>
      </div>

      {showCTA && (
        <div className="trad__cta-wrap fu">
          <button className="btn btn--primary" onClick={onContinue}>
            There's another way →
          </button>
        </div>
      )}
    </section>
  );
}
