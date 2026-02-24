const fs = require('fs');
const path = require('path');
const { chromium } = require('playwright');

const url = 'http://127.0.0.1:8000';
const outDir = path.join(__dirname, '..', 'screenshots');
const viewports = [
  { name: 'mobile-360', width: 360, height: 800 },
  { name: 'mobile-420', width: 420, height: 900 },
  { name: 'tablet-768', width: 768, height: 1024 },
  { name: 'desktop-1024', width: 1024, height: 768 },
  { name: 'desktop-1366', width: 1366, height: 768 }
];

(async () => {
  if (!fs.existsSync(outDir)) fs.mkdirSync(outDir);

  const browser = await chromium.launch();
  const context = await browser.newContext({ viewport: null });
  const page = await context.newPage();

  for (const vp of viewports) {
    console.log(`Capturing ${vp.name} (${vp.width}x${vp.height})`);
    await page.setViewportSize({ width: vp.width, height: vp.height });
    await page.goto(url, { waitUntil: 'networkidle' });
    // give JS a moment to run (menu toggles etc.)
    await page.waitForTimeout(500);
    const file = path.join(outDir, `${vp.name}.png`);
    await page.screenshot({ path: file, fullPage: true });
  }

  await browser.close();
  console.log('Screenshots saved to', outDir);
})();
