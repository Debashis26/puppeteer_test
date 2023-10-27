import * as Puppeteer from "puppeteer";
const url = "https://www.google.com/";

describe("Testing Google Search Bar", () => {
  let browser: Puppeteer.Browser;
  let page: Puppeteer.Page;

  beforeAll(async () => {
    browser = await Puppeteer.launch({
      args: ["--start-maximized"],
      headless: false,
      slowMo: 70,
    });
    page = await browser.newPage();
    await page.goto(url);
    await page.waitForTimeout(1000);
    await page.setViewport({ width: 1360, height: 1080 });
    await page.waitForTimeout(1000);
  }, 30000);

  afterAll(async () => {
    await browser.close();
  });

  test("Checking the title", async () => {
    const title = "Google";
    const pageTitle = await page.title();
    expect(title).toBe(pageTitle);
  }, 25000);

  test("Should select the search element", async () => {
    const searchSelector = 'textarea[title="Search"]';
    expect(page.waitForSelector(searchSelector)).toBeTruthy();
  }, 25000);

  test("should search and redirection", async () => {
    const searchSelector = 'textarea[title="Search"]';
    await page.waitForTimeout(2000);
    await page.waitForSelector(searchSelector);
    await page.click(searchSelector, { clickCount: 1 });
    await page.type(searchSelector, "chimera technologies");
    await page.keyboard.press("Enter");
    await page.waitForTimeout(2000);
    const redirectedUrl = await page.url();
    expect(redirectedUrl).not.toBe(url);
    await browser.close();
  }, 25000);
});
