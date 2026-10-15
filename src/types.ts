export interface Tier {
  max: number;
  label: string;
  weeks: number;
  total: number;
  ltime: string;
  lnote: string;
  lcost: number;
  axisH: number;
  axisTicks: string[];
}

export interface Phase {
  sh: string;
  fs: number;
  fd: number;
  row: "t" | "b";
  cf: number;
  c: string;
}

export interface ComputedPhase extends Phase {
  sw: number;
  dw: number;
  cost: number;
}

export interface ListenPhase {
  sh: string;
  start: number;
  end: number;
  c: string;
}

export interface CaseStudy {
  co: string;
  tag: string;
  use: string;
  // Anonymized one-liner for privacy-respecting surfaces (no company names).
  anonUse: string;
  trad: string;
  q: string;
  who: string;
  // Word/phrase keys used for keyword-scoring against a research prompt.
  // Each entry is matched as a whole word/phrase (case-insensitive, with \b
  // word boundaries) — not as an unbounded substring.
  keys: string[];
  // Anonymized study-detail fields used by the "similar studies" panel.
  // Numbers are illustrative — calibrated against Listen's public claims.
  n: number;
  languages: number;
  methodology: string;
  listenTime: string;
  tradTime: string;
  impact: string;
  matchReasons: string[];
}

export type ScreenName = "input" | "processing" | "traditional" | "reveal";
