# Luxselle Dashboard — Product Demo Video

Standalone [Remotion](https://remotion.dev) project that renders an animated product demo video for the Luxselle Supplier Engine (~65 seconds, 1920×1080).

## Quick start (see it locally)

```bash
git clone https://github.com/JackUCC/luxselle-demo-video.git
cd luxselle-demo-video
npm install
npm run dev
```

Then open **http://localhost:3000** in your browser. Remotion Studio will load; select the **LuxselleDemo** composition and use the timeline to scrub through the video.

To render the full video to a file:

```bash
npm run render
```

Output: `out/luxselle-demo.mp4`.

## Commands

| Command | Description |
|--------|-------------|
| `npm run dev` | Open Remotion Studio for live preview and scrubbing |
| `npm run render` | Render the full video to `out/luxselle-demo.mp4` |
| `npm run still` | Export a single frame (e.g. for thumbnails) |
| `npm run capture-screenshots` | Capture live app screenshots (dashboard dev server must be running) |
| `node scripts/create-placeholder-screenshots.mjs` | Create placeholder PNGs so render works without the dashboard |

## Screenshots

- **Placeholders:** Running `node scripts/create-placeholder-screenshots.mjs` creates placeholder images in `public/screenshots/` so you can render the video without the Luxselle app.
- **Live screenshots:** With the Luxselle dashboard running (`npm run dev` in the dashboard repo), run `npm run capture-screenshots` from this project. Screenshots are saved to `public/screenshots/`. Re-run `npm run render` to use them in the video.

## Structure

- `remotion/` — Entry point, root composition, scenes, shared components and lib
- `public/` — Static assets: `luxselle-logo.svg`, `fonts/`, `screenshots/`
- `out/` — Rendered output (e.g. `luxselle-demo.mp4`)

## Scene order

1. Intro — Logo and tagline  
2. Dashboard — Bento KPIs and highlights  
3. Price Check — Market analysis callouts  
4. Inventory — Product list and drawer  
5. Sourcing — Pipeline progress  
6. Invoices — Invoice/PDF highlight  
7. Sidecar — Split screen (supplier + panel)  
8. Outro — Feature grid, logo, CTA, fade to black  
