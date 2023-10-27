const puppeteer = require("puppeteer");

(async () => {
  const browser = await puppeteer.launch({
    args: ['--start-maximized'],
    headless: false,
    slowMo: 70,
  });
  const page = await browser.newPage();
  await page.goto("https://www.google.com/");
  await page.setViewport({ width: 1360, height: 1080 });
  await page.waitForTimeout(2000);

  const searchSelector = 'textarea[title="Search"]';
  const resultSelector = '.BYM4Nd [role="text"]';

  await page.waitForSelector(searchSelector);
  await page.waitForTimeout(2000)
  await page.click(searchSelector, { clickCount: 1 });

  await page.type(searchSelector, "chimera technologies");

  await page.keyboard.press("Enter");

  await page.waitForSelector(resultSelector);
  await page.click(resultSelector, { clickCount: 1 });
  await page.waitForTimeout(5000);

  await page.screenshot({ path: "chimera.png" });
  await page.pdf({ path: "chimera.pdf", format: "A4" });
  await browser.close();
})();
