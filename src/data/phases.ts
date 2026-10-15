import type { Phase, ListenPhase } from "../types";

export const TRADITIONAL_PHASES: Phase[] = [
  { sh: "Screener & guide", row: "t", cf: 0.08, fs: 0.0, fd: 0.125, c: "#378ADD" },
  { sh: "Recruit participants", row: "b", cf: 0.2, fs: 0.125, fd: 0.25, c: "#D85A30" },
  { sh: "Schedule interviews", row: "t", cf: 0.04, fs: 0.375, fd: 0.1, c: "#EF9F27" },
  { sh: "In-depth interviews", row: "b", cf: 0.32, fs: 0.475, fd: 0.188, c: "#7F77DD" },
  { sh: "Transcription", row: "t", cf: 0.12, fs: 0.663, fd: 0.113, c: "#1D9E75" },
  { sh: "Analysis & synthesis", row: "b", cf: 0.16, fs: 0.775, fd: 0.113, c: "#D4537E" },
  { sh: "Report & deck", row: "t", cf: 0.08, fs: 0.888, fd: 0.113, c: "#639922" },
];

export const LISTEN_PHASES: ListenPhase[] = [
  { sh: "Guide", start: 0.0, end: 0.05, c: "#dde6ff" },
  { sh: "Recruit", start: 0.05, end: 0.15, c: "#94adff" },
  { sh: "Interviews", start: 0.15, end: 0.65, c: "#4d6dfb" },
  { sh: "Analysis", start: 0.65, end: 1.0, c: "#1e4dff" },
];

export const FREED_BUDGET_COLOR = "#16a37b";

export function phaseCost(cf: number, total: number): number {
  return Math.round((cf * total) / 500) * 500;
}
