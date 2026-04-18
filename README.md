# ZAP — Watch Prototype

Live React preview of the ZAP watch app prototype. Built from Figma file `U2wgsC4FY4U3fcAqdNztIC`.

## Stack

- React 18 + Vite
- Framer Motion 11 (animations)
- Lucide React (icons)

## What's inside

- **Vocal Coach Workflow** — Listening → Coaching → Processing → Results → Done (7-second auto walk-through).
- **Squishy Mic Button** — Press-and-hold with amber glow and the 1.15 → 0.95 → 1.0 bounce.

## Run locally

```bash
npm install
npm run dev
```

Then open http://localhost:5173.

## Build

```bash
npm run build
```

Outputs a static site to `dist/`. This is what Vercel deploys.

## Deploy

This project is set up for zero-config deployment on [Vercel](https://vercel.com). Connect the GitHub repo → import → deploy. Vercel detects Vite automatically and uses `npm run build` + `dist/` out of the box.
