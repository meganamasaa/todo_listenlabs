export function easeInOut(p: number): number {
  return p < 0.5 ? 2 * p * p : -1 + (4 - 2 * p) * p;
}

export function animN(
  from: number,
  to: number,
  duration: number,
  onUpdate: (v: number) => void,
  onComplete?: () => void
): () => void {
  const t0 = performance.now();
  let raf = 0;
  let cancelled = false;
  const tick = (now: number) => {
    if (cancelled) return;
    const p = Math.min((now - t0) / duration, 1);
    onUpdate(Math.round(from + (to - from) * easeInOut(p)));
    if (p < 1) {
      raf = requestAnimationFrame(tick);
    } else if (onComplete) {
      onComplete();
    }
  };
  raf = requestAnimationFrame(tick);
  return () => {
    cancelled = true;
    cancelAnimationFrame(raf);
  };
}

export function animW(
  el: SVGRectElement,
  targetWidth: number,
  duration = 520
): () => void {
  const startWidth = parseFloat(el.getAttribute("width") || "0");
  const t0 = performance.now();
  let raf = 0;
  let cancelled = false;
  const tick = (now: number) => {
    if (cancelled) return;
    const p = Math.min((now - t0) / duration, 1);
    const w = startWidth + (targetWidth - startWidth) * easeInOut(p);
    el.setAttribute("width", w.toFixed(1));
    if (p < 1) raf = requestAnimationFrame(tick);
  };
  raf = requestAnimationFrame(tick);
  return () => {
    cancelled = true;
    cancelAnimationFrame(raf);
  };
}
