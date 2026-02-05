import puppeteer from 'puppeteer';

// Breathing Protocol Helper: Random 2-6s delay
const stagger = async (label) => {
  const delay = Math.floor(Math.random() * 4000) + 2000; // 2000-6000ms
  console.log(`[Stagger] Pausing for ${delay}ms (${label})...`);
  await new Promise(r => setTimeout(r, delay));
};

(async () => {
  console.log("Starting QA Check...");
  try {
    const browser = await puppeteer.launch({
      headless: true,
      args: ['--no-sandbox', '--disable-setuid-sandbox']
    });
    const page = await browser.newPage();
    
    await stagger("Initial Launch");

    console.log("Navigating to Dashboard...");
    await page.goto('http://localhost:3000', { waitUntil: 'networkidle0' });

    await stagger("Post-Navigation");

    console.log("Checking page content...");
    const content = await page.content();
    const title = await page.title();
    console.log(`Title: ${title}`);

    // Check for React root mount (Next.js usually populates body directly or #__next)
    // We'll check if the page has significant content or the specific __next div
    const hasContent = await page.$eval('body', el => el.innerText.length > 50);
    
    if (hasContent) {
      console.log("PASS: Page content rendered successfully.");
    } else {
      console.log("FAIL: Page appears empty.");
      console.log("Snippet:", content.substring(0, 500));
    }

    // Screenshot
    await page.screenshot({ path: 'qa-result.png' });
    console.log("Screenshot saved to qa-result.png");

    await browser.close();
    console.log("QA Complete.");
  } catch (error) {
    console.error("QA CRITICAL FAIL:", error);
    process.exit(1);
  }
})();
