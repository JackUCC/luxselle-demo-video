export const LUXSELLE_DEMO_FPS = 30;
export const LUXSELLE_DEMO_DURATION_FRAMES = 1950; // ~65 seconds

export const SCENE_FRAMES = {
  intro: { start: 0, end: 150 },
  dashboard: { start: 150, end: 450 },
  priceCheck: { start: 450, end: 810 },
  inventory: { start: 810, end: 1110 },
  sourcing: { start: 1110, end: 1350 },
  invoices: { start: 1350, end: 1560 },
  sidecar: { start: 1560, end: 1800 },
  outro: { start: 1800, end: 1950 },
} as const;
