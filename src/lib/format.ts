export function fmtMoney(n: number): string {
  return "$" + n.toLocaleString("en-US");
}

export function fmtH(h: number): string {
  if (h === 0) return "now";
  if (h < 1) return Math.round(h * 60) + "min";
  if (h >= 24) {
    const days = Math.round((h / 24) * 10) / 10;
    if (days === Math.round(days)) return Math.round(days) + "d";
    return days + "d";
  }
  const hours = Math.round(h * 10) / 10;
  if (hours === Math.round(hours)) return Math.round(hours) + "hr";
  return hours + "hr";
}
