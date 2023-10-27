const Puppeteer = require("puppeteer");
const url = "https://www.google.com/";
test("checking the title", async () => {
  const title: String = "Google";

  const browser = await Puppeteer.launch({
    args: ["--start-maximized"],
    headless: false,
    slowMo: 70,
  });
  const page = await browser.newPage();
  await page.goto(url);
  await page.setViewport({ width: 1360, height: 1080 });
  //   await page.waitForTimeout(1000);
  const pageTitle = await page.title();
  expect(title).toBe(pageTitle);
  await browser.close();
}, 25000);

test("should select the search element", async () => {
  const browser = await Puppeteer.launch({
    args: ["--start-maximized"],
    headless: false,
    slowMo: 70,
  });
  const searchSelector = 'textarea[title="Search"]';

  const page = await browser.newPage();
  await page.goto(url);
  await page.setViewport({ width: 1360, height: 1080 });
  await page.waitForTimeout(2000);
  expect(page.waitForSelector(searchSelector)).toBeTruthy();
  await page.waitForTimeout(2000);
  await browser.close();
}, 25000);

test("Google search and redirection", async () => {
  const browser = await Puppeteer.launch({
    args: ["--start-maximized"],
    headless: false,
    slowMo: 70,
  });
  const searchSelector = 'textarea[title="Search"]';
  const page = await browser.newPage();
  await page.goto(url);
  await page.setViewport({ width: 1360, height: 1080 });
  await page.waitForTimeout(2000);
  expect(page.waitForSelector(searchSelector)).toBeTruthy();
  await page.waitForTimeout(2000);
  await page.click(searchSelector, { clickCount: 1 });
  await page.type(searchSelector, "chimera technologies");
  await page.keyboard.press("Enter");
  await page.waitForTimeout(2000);
  const redirectedUrl = await page.url();
  expect(redirectedUrl).not.toBe(url);
  await browser.close();
}, 25000);

