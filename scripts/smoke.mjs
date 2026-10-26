// Smoke test + screenshots at phone and desktop sizes. Usage: npm run build && npm run e2e
import { createRequire } from 'node:module';
// Uses the machine's Playwright (globally installed) so the repo stays light.
const { chromium } = createRequire(import.meta.url)('playwright');
import { spawn } from 'node:child_process';
import { mkdirSync } from 'node:fs';

const PORT = 4179;
const server = spawn('npx', ['vite', 'preview', '--port', String(PORT), '--strictPort'], { stdio: 'ignore' });
await new Promise((r) => setTimeout(r, 2500));
mkdirSync('shots', { recursive: true });

const browser = await chromium.launch({ args: ['--use-gl=swiftshader', '--enable-unsafe-swiftshader'] });
let failed = 0;
const check = (ok, msg) => { console.log(`${ok ? '✓' : '✗'} ${msg}`); if (!ok) failed++; };

for (const [name, viewport] of [['phone', { width: 400, height: 860 }], ['desktop', { width: 1440, height: 900 }]]) {
  const page = await browser.newPage({ viewport, deviceScaleFactor: name === 'phone' ? 2 : 1 });
  const errors = [];
  page.on('pageerror', (e) => errors.push(e.message));
  page.on('console', (m) => m.type() === 'error' && errors.push(m.text()));
  await page.goto(`http://localhost:${PORT}/`);
  await page.waitForTimeout(800);
  check(await page.getByRole('dialog').isVisible(), `${name}: concept modal on first visit`);
  await page.screenshot({ path: `shots/${name}-0-modal.png` });
  await page.getByRole('button', { name: 'I understand, explore the demo' }).click();
  await page.waitForTimeout(1500);
  check(await page.locator('.concept-badge').isVisible(), `${name}: badge visible`);
  check((await page.locator('h1').innerText()).includes('Hot & Spicy'), `${name}: starts on Hot & Spicy`);
  await page.screenshot({ path: `shots/${name}-1-hero.png` });

  await page.keyboard.press('ArrowRight');
  await page.waitForTimeout(1200);
  check((await page.locator('h1').innerText()) === 'Fried', `${name}: arrow key rotates the wheel`);
  await page.screenshot({ path: `shots/${name}-2-fried.png` });

  await page.getByRole('radio', { name: 'Cups' }).click();
  await page.waitForTimeout(1500);
  check((await page.locator('h1').innerText()).startsWith('Cup'), `${name}: switch shows cups`);
  await page.screenshot({ path: `shots/${name}-3-cup.png` });

  await page.locator('#ring-jumbo-vegetable').click();
  await page.waitForTimeout(1500);
  check((await page.locator('h1').innerText()) === 'Jumbo Cup Vegetable', `${name}: tapping a neighbour rotates to it`);
  await page.screenshot({ path: `shots/${name}-4-cup-next.png` });

  await page.screenshot({ path: `shots/${name}-5-full.png`, fullPage: true });
  await page.goto(`http://localhost:${PORT}/#/about`);
  await page.waitForTimeout(500);
  check(await page.getByText('We focused on the homepage.').isVisible(), `${name}: other pages show coming soon`);
  check(errors.length === 0, `${name}: no console errors ${errors.join(' | ')}`);
  await page.close();
}
await browser.close();
server.kill();
process.exit(failed ? 1 : 0);
