#!/usr/bin/env node
/**
 * Capture screenshots of the Luxselle Dashboard for the demo video.
 * Run with the dashboard dev server up: npm run dev (in luxselle-dashboard), then:
 *   npm run capture-screenshots
 * Base URL defaults to http://localhost:5173; set DASHBOARD_URL to override.
 */

import { chromium } from 'playwright';
import { mkdir } from 'fs/promises';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const outDir = join(__dirname, '..', 'public', 'screenshots');
const baseUrl = process.env.DASHBOARD_URL || 'http://localhost:5173';

const pages = [
  { path: '/', name: 'dashboard' },
  { path: '/buy-box', name: 'pricecheck' },
  { path: '/inventory', name: 'inventory' },
  { path: '/sourcing', name: 'sourcing' },
  { path: '/invoices', name: 'invoices' },
  { path: '/?mode=sidecar', name: 'sidecar' },
];

async function main() {
  await mkdir(outDir, { recursive: true });
  const browser = await chromium.launch();
  const context = await browser.newContext({ viewport: { width: 1920, height: 1080 } });

  for (const { path, name } of pages) {
    const url = baseUrl + path;
    const page = await context.newPage();
    try {
      await page.goto(url, { waitUntil: 'networkidle', timeout: 15000 });
      await page.waitForTimeout(1000);
      await page.screenshot({ path: join(outDir, `${name}.png`), type: 'png' });
      console.log(`Captured ${name}.png`);
    } catch (err) {
      console.warn(`Skipped ${name}: ${err.message}`);
    }
    await page.close();
  }

  await context.close();
  await browser.close();
  console.log('Done. Screenshots in public/screenshots/');
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
