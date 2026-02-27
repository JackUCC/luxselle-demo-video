#!/usr/bin/env node
/**
 * Create placeholder PNG screenshots so Remotion render succeeds without running the dashboard.
 * Run: node scripts/create-placeholder-screenshots.mjs
 */

import sharp from 'sharp';
import { mkdir, writeFile } from 'fs/promises';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const outDir = join(__dirname, '..', 'public', 'screenshots');

const names = ['dashboard', 'pricecheck', 'inventory', 'sourcing', 'invoices', 'sidecar'];

async function main() {
  await mkdir(outDir, { recursive: true });
  const width = 1920;
  const height = 1080;
  const svg = `
    <svg width="${width}" height="${height}">
      <rect width="100%" height="100%" fill="#FAF9F7"/>
      <text x="50%" y="50%" font-family="Inter, sans-serif" font-size="32" fill="#4A5568" text-anchor="middle" dy=".3em">%LABEL%</text>
      <text x="50%" y="55%" font-family="Inter, sans-serif" font-size="18" fill="#8A8A8A" text-anchor="middle" dy=".3em">Run npm run capture-screenshots for live app screenshots</text>
    </svg>
  `;
  for (const name of names) {
    const label = name.charAt(0).toUpperCase() + name.slice(1).replace(/([A-Z])/g, ' $1').trim();
    const buf = await sharp(Buffer.from(svg.replace('%LABEL%', label)))
      .png()
      .toBuffer();
    await writeFile(join(outDir, `${name}.png`), buf);
    console.log(`Created ${name}.png`);
  }
  console.log('Placeholder screenshots ready in public/screenshots/');
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
