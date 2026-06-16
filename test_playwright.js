const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();

  // Log all console messages
  page.on('console', msg => console.log(`[PAGE LOG] ${msg.type()}: ${msg.text()}`));
  
  // Log uncaught page errors
  page.on('pageerror', exception => {
    console.log(`[PAGE ERROR] Uncaught exception: "${exception}"`);
  });

  // Log failed requests (like 404s or 500s)
  page.on('requestfailed', request => {
    console.log(`[REQUEST FAILED] ${request.url()} - ${request.failure()?.errorText}`);
  });

  try {
    console.log('Navigating to https://princelucky.vercel.app ...');
    await page.goto('https://princelucky.vercel.app', { waitUntil: 'networkidle', timeout: 30000 });
    console.log('Page loaded successfully. Waiting 5 seconds to catch delayed errors...');
    await page.waitForTimeout(5000);
  } catch (err) {
    console.log(`[NAVIGATION ERROR] ${err.message}`);
  } finally {
    await browser.close();
  }
})();
