# Listen — Smart Estimator

A product prototype for [Listen Labs](https://listenlabs.ai): describe a research question, pick a sample size, and see what traditional research would cost in time and money versus running it on Listen.

## Flow
1. **Input** — type (or dictate) a research prompt and choose the number of interviews
2. **Processing** — animated breakdown of the study
3. **Traditional** — phase-by-phase timeline of the conventional approach (recruiting, scheduling, interviewing, analysis)
4. **Reveal** — Listen's time-to-decision, savings, and similar case studies

Supporting docs: `listen_labs_roi_techspec.pdf`, `actively_ai_deep_dive.pdf`.

## Stack
React 18 · TypeScript · Vite

## Run locally
```bash
npm install
npm run dev        # http://localhost:5173
npm run build      # type-check + production build to dist/
```

## Deploy
Vercel (Vite preset). Pushes to `main` deploy to production.
