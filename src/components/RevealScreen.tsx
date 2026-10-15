import { useEffect, useState } from "react";
import type { Tier } from "../types";
import { LISTEN_PHASES } from "../data/phases";
import { CASE_STUDIES, matchCaseStudy } from "../data/caseStudies";
import { matchFacets, parsePromptEntities } from "../data/promptFacets";
import { CLUSTER_OUTCOMES } from "../data/studyIndex";
import { matchedKeys, scoreKeys } from "../lib/keywordMatch";
import { MethodologyFooter } from "./MethodologyFooter";
import { SimilarStudies } from "./SimilarStudies";
import {
  ResearchSteps,
  type LeaderboardEntry,
  type ResearchStep,
} from "./ResearchSteps";
import { TimeToDecision } from "./TimeToDecision";
import "./RevealScreen.css";

interface Props {
  tier: Tier;
  prompt: string;
  n: number;
  onReset: () => void;
}

const SVG_W = 440;
const SVG_LO = 20;
const SVG_PLOT = 420 - SVG_LO; // 400
const VIEWBOX_RIGHT = 420;

export function RevealScreen({ tier, prompt, n, onReset }: Props) {
  const [phase, setPhase] = useState<"rag" | "result">("rag");

  return (
    <section className="reveal fu">
      <div className="reveal__header">
        <span className="section-label">With Listen</span>
        <span className="reveal__tag">
          {n} participants · {tier.ltime}
        </span>
      </div>
      {phase === "rag" ? (
        <RagSearch
          prompt={prompt}
          onDone={() => setPhase("result")}
        />
      ) : (
        <ListenResult
          tier={tier}
          prompt={prompt}
          onReset={onReset}
        />
      )}
    </section>
  );
}

// Fixed display set for the similarity-score leaderboard. The winner is
// always promoted to the top of the leaderboard; these names rotate into
// the remaining 3 slots. Stable runners-up means the leaderboard never
// reveals which clusters are *missing* from Listen's index.
const LEADERBOARD_RUNNERS_UP = [
  "Technology",
  "Food & Beverage",
  "Retail",
  "Fintech",
];

function buildLeaderboard(
  prompt: string,
  winnerTag: string,
): LeaderboardEntry[] {
  const tags = [
    winnerTag,
    ...LEADERBOARD_RUNNERS_UP.filter((t) => t !== winnerTag),
  ].slice(0, 4);
  const rawScores = tags.map((tag) => {
    const cs = CASE_STUDIES.find((c) => c.tag === tag);
    return cs ? scoreKeys(prompt, cs.keys) : 0;
  });
  const maxRaw = Math.max(...rawScores, 1);
  return tags
    .map((label, i) => ({
      label,
      // Normalize to a 0.20–0.95 range so even unrelated clusters read
      // as "scored against" rather than "ignored".
      score: 0.2 + 0.75 * (rawScores[i] / maxRaw),
    }))
    .sort((a, b) => b.score - a.score);
}

function RagSearch({
  prompt,
  onDone,
}: {
  prompt: string;
  onDone: () => void;
}) {
  const top = matchCaseStudy(prompt);
  const facets = matchFacets(prompt);
  const entities = parsePromptEntities(prompt);
  const industryChips = matchedKeys(prompt, top.keys).slice(0, 4);
  const roleChips = facets.role?.matched ?? [];
  const useCaseChips = facets.useCase?.matched ?? [];
  const leaderboard = buildLeaderboard(prompt, top.tag);

  // Confidence: dominance of winner over runner-up, mapped to a 70–100 range
  // so even close calls read as workable.
  const confidence = (() => {
    const w = leaderboard[0]?.score ?? 0;
    const r = leaderboard[1]?.score ?? 0;
    return Math.round((0.7 + (w - r) * 0.4) * 100);
  })();

  // Entity chips from parsed prompt structure.
  const entityChips: string[] = [];
  if (entities.brand) entityChips.push(`brand: ${entities.brand}`);
  if (entities.scope) entityChips.push(entities.scope);
  if (entities.audience) entityChips.push(`audience: ${entities.audience}`);

  // Prior-outcome chips for the matched cluster.
  const outcome = CLUSTER_OUTCOMES[top.tag];
  const outcomeChips = outcome ? [outcome.shipRate, outcome.themes] : [];

  const steps: ResearchStep[] = [
    { label: "Parsing prompt structure", icon: "chart", chips: entityChips },
    { label: "Detecting your role", icon: "stack", chips: roleChips },
    { label: "Mapping your industry", icon: "cluster", chips: industryChips },
    { label: "Identifying use case", icon: "flower", chips: useCaseChips },
    {
      label: "Scoring the corpus",
      icon: "chart",
      leaderboard,
    },
    {
      label: `Prior outcomes in ${top.tag}`,
      icon: "stack",
      chips: outcomeChips,
    },
    {
      label: `Closest match: ${top.tag}`,
      icon: "cluster",
      chips: [`confidence: ${confidence}%`],
    },
  ];

  const [activeIdx, setActiveIdx] = useState(0);
  const [fadingOut, setFadingOut] = useState(false);

  useEffect(() => {
    // Per-step dwell — slower than ProcessingScreen so each piece of analysis
    // lands deliberately. Scoring step gets the longest hold so the score
    // leaderboard climb is genuinely watchable.
    // Order: parse, role, industry, use case, scoring, prior outcomes, closest match.
    const STEP_DURATIONS = [950, 850, 1000, 850, 2100, 1100, 950];
    let cancelled = false;
    const timeouts: number[] = [];
    let i = 0;

    function advance() {
      if (cancelled) return;
      i += 1;
      if (i >= steps.length) {
        timeouts.push(window.setTimeout(() => setFadingOut(true), 500));
        timeouts.push(window.setTimeout(onDone, 1000));
        return;
      }
      setActiveIdx(i);
      timeouts.push(
        window.setTimeout(advance, STEP_DURATIONS[i] ?? 700)
      );
    }

    timeouts.push(window.setTimeout(advance, STEP_DURATIONS[0]));

    return () => {
      cancelled = true;
      timeouts.forEach((t) => window.clearTimeout(t));
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className={`rag-scan ${fadingOut ? "is-fading" : ""}`}>
      <span className="section-label">Searching the index</span>
      <ResearchSteps
        steps={steps}
        activeIdx={activeIdx}
        windowSize={steps.length}
      />
    </div>
  );
}

function ListenResult({
  tier,
  prompt,
  onReset,
}: {
  tier: Tier;
  prompt: string;
  onReset: () => void;
}) {
  const [showCaseStudy, setShowCaseStudy] = useState(false);
  const costDifference = tier.total - tier.lcost;

  useEffect(() => {
    const timeouts: number[] = [];
    timeouts.push(window.setTimeout(() => setShowCaseStudy(true), 700));
    return () => {
      timeouts.forEach((t) => window.clearTimeout(t));
    };
  }, []);

  return (
    <div className="result fu">
      <TimeToDecision tier={tier} />

      <div className="result__gantt">
        <WeeksScaleGantt tier={tier} />
      </div>

      {showCaseStudy && <SimilarStudies prompt={prompt} />}

      <div className="result__cta">
        <a
          className="btn btn--primary"
          href="https://listenlabs.ai/book-my-demo"
          target="_blank"
          rel="noreferrer noopener"
        >
          Book a demo →
        </a>
        <button className="btn btn--ghost" onClick={onReset}>
          Try another study size
        </button>
      </div>

      <MethodologyFooter costDifference={costDifference} />
    </div>
  );
}

/* --- Weeks-scale Gantt: traditional timeline with Listen's tiny finish bar --- */
function WeeksScaleGantt({ tier }: { tier: Tier }) {
  const totalWeeks = tier.weeks;
  const listenWeeks = tier.axisH / 168; // 24h × 7d
  const listenPlotEnd = SVG_LO + (listenWeeks / totalWeeks) * SVG_PLOT;

  const tickStep = Math.max(1, Math.ceil(totalWeeks / 8));
  const ticks: number[] = [];
  for (let w = 0; w <= totalWeeks; w += tickStep) ticks.push(w);
  if (ticks[ticks.length - 1] !== totalWeeks) ticks.push(totalWeeks);

  // Visual amplification: at 1.79% the bars are imperceptible. Enforce a
  // minimum total visual width so the user can still see the four phases —
  // but keep it small enough that the contrast against the 8-week timeline
  // remains the dominant story.
  const minTotalPx = 24;
  const naturalEnd = listenPlotEnd - SVG_LO;
  const ampScale = naturalEnd < minTotalPx ? minTotalPx / naturalEnd : 1;
  const drawnEnd = SVG_LO + naturalEnd * ampScale;

  return (
    <div
      className="weeks-gantt"
      role="img"
      aria-label={`Listen finishes in ${tier.ltime} on a ${totalWeeks}-week traditional timeline`}
    >
      <svg
        viewBox={`0 0 ${SVG_W} 138`}
        preserveAspectRatio="xMidYMid meet"
        width="100%"
      >
        {/* Saved-time wash from Listen finish to end of timeline */}
        <rect
          x={drawnEnd}
          y={56}
          width={VIEWBOX_RIGHT - drawnEnd}
          height={40}
          fill="var(--color-freed-soft)"
          opacity={0.7}
          className="weeks-gantt__saved fu"
        />

        {/* Stacked Listen phase slivers */}
        {LISTEN_PHASES.map((p) => {
          const segX = SVG_LO + p.start * naturalEnd * ampScale;
          const segW = (p.end - p.start) * naturalEnd * ampScale;
          return (
            <rect
              key={p.sh}
              x={segX}
              y={56}
              width={segW}
              height={40}
              fill={p.c}
              opacity={0.95}
              className="weeks-gantt__sliver fu"
            />
          );
        })}

        {/* Axis */}
        <line
          x1={SVG_LO}
          y1={96}
          x2={VIEWBOX_RIGHT}
          y2={96}
          stroke="var(--color-border)"
          strokeWidth={0.7}
        />
        {ticks.map((w) => {
          const x = SVG_LO + (w / totalWeeks) * SVG_PLOT;
          return (
            <g key={w}>
              <line
                x1={x}
                y1={92}
                x2={x}
                y2={100}
                stroke="var(--color-border)"
                strokeWidth={0.7}
              />
              <text
                x={x}
                y={113}
                textAnchor="middle"
                fontSize={9}
                fill="var(--color-text-muted)"
                letterSpacing="0.04em"
              >
                {w === 0 ? "0" : `wk ${w}`}
              </text>
            </g>
          );
        })}

        {/* Vertical "Listen finishes" line */}
        <line
          x1={drawnEnd}
          y1={36}
          x2={drawnEnd}
          y2={100}
          stroke="var(--color-brand)"
          strokeWidth={1.2}
          strokeDasharray="3 3"
          className="weeks-gantt__finish fu"
        />

        {/* Listen-finishes callout */}
        <text
          x={drawnEnd + 6}
          y={32}
          fontSize={10}
          fontWeight={600}
          fill="var(--color-brand)"
          className="weeks-gantt__callout fu"
        >
          Listen finishes · {tier.ltime}
        </text>

        {/* Time-saved callout, centered in the saved-time strip */}
        <text
          x={(drawnEnd + VIEWBOX_RIGHT) / 2}
          y={80}
          textAnchor="middle"
          fontSize={10}
          fontWeight={500}
          fill="var(--color-freed)"
          className="weeks-gantt__saved-label fu"
        >
          Time you don't have to spend
        </text>
      </svg>
    </div>
  );
}
