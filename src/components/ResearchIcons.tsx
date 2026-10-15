// Small animated SVG icons used to label individual research steps.
// Each icon is sized 16x16 and renders in --color-brand by default.
import "./ResearchIcons.css";

interface IconProps {
  active?: boolean;
}

// Vertical bar chart that rises and falls — used for "creating chart" steps.
export function IconChart({ active = false }: IconProps) {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      aria-hidden="true"
      className={`ricon ricon--chart ${active ? "ricon--active" : ""}`}
    >
      <rect x="2" y="9" width="2.4" height="5" rx="0.5" className="ricon__bar ricon__bar--0" />
      <rect x="6.8" y="5" width="2.4" height="9" rx="0.5" className="ricon__bar ricon__bar--1" />
      <rect x="11.6" y="7" width="2.4" height="7" rx="0.5" className="ricon__bar ricon__bar--2" />
    </svg>
  );
}

// Eight-dot constellation that pulses around a ring — for "cross-referencing".
export function IconCluster({ active = false }: IconProps) {
  const dots: Array<[number, number, number]> = [
    [8, 1.6, 1.4],
    [12.4, 3.6, 1.0],
    [14.4, 8, 1.4],
    [12.4, 12.4, 1.0],
    [8, 14.4, 1.4],
    [3.6, 12.4, 1.0],
    [1.6, 8, 1.4],
    [3.6, 3.6, 1.0],
  ];
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      aria-hidden="true"
      className={`ricon ricon--cluster ${active ? "ricon--active" : ""}`}
    >
      {dots.map(([x, y, r], i) => (
        <circle
          key={i}
          cx={x}
          cy={y}
          r={r}
          className={`ricon__dot ricon__dot--${i}`}
        />
      ))}
    </svg>
  );
}

// Six-petal flower — for "looking at responses".
export function IconFlower({ active = false }: IconProps) {
  const petals = [0, 60, 120, 180, 240, 300];
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      aria-hidden="true"
      className={`ricon ricon--flower ${active ? "ricon--active" : ""}`}
    >
      <g transform="translate(8 8)">
        {petals.map((deg, i) => (
          <circle
            key={i}
            cx="0"
            cy="-4.4"
            r="2.4"
            transform={`rotate(${deg})`}
            className={`ricon__petal ricon__petal--${i}`}
          />
        ))}
        <circle cx="0" cy="0" r="1.6" className="ricon__core" />
      </g>
    </svg>
  );
}

// Three stacked dot-pairs — for "researching".
export function IconStack({ active = false }: IconProps) {
  const pairs: Array<[number, number]> = [
    [4, 4],
    [9, 4.5],
    [5.5, 9],
    [11, 9.5],
    [4.5, 13],
    [9, 12.8],
  ];
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      aria-hidden="true"
      className={`ricon ricon--stack ${active ? "ricon--active" : ""}`}
    >
      {pairs.map(([x, y], i) => (
        <circle
          key={i}
          cx={x}
          cy={y}
          r="1.5"
          className={`ricon__bead ricon__bead--${i}`}
        />
      ))}
    </svg>
  );
}

// Down-chevron used for completed/collapsed steps.
export function IconChevron() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      aria-hidden="true"
      className="ricon ricon--chevron"
    >
      <path
        d="M4 6 L8 10 L12 6"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
    </svg>
  );
}

// Animated brushstroke / squiggle that sits below the active row.
export function Squiggle() {
  return (
    <svg
      width="34"
      height="14"
      viewBox="0 0 34 14"
      aria-hidden="true"
      className="ricon-squiggle"
    >
      <path
        d="M2 7 Q 6 1, 11 7 T 21 7 T 32 7"
        stroke="var(--color-brand)"
        strokeWidth="3"
        strokeLinecap="round"
        fill="none"
      />
    </svg>
  );
}

export type IconKind = "chart" | "cluster" | "flower" | "stack";

export function StepIcon({ kind, active }: { kind: IconKind; active?: boolean }) {
  switch (kind) {
    case "chart":
      return <IconChart active={active} />;
    case "cluster":
      return <IconCluster active={active} />;
    case "flower":
      return <IconFlower active={active} />;
    case "stack":
      return <IconStack active={active} />;
  }
}
