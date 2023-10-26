"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const puppeteer = require("puppeteer");
console.log("Puppeteer started....");
(() => __awaiter(void 0, void 0, void 0, function* () {
    const browser = yield puppeteer.launch({
        headless: false,
        slowMo: 70,
    });
    const page = yield browser.newPage();
    yield page.goto("https://www.google.com/");
    yield page.waitForTimeout(1000);
    const searchSelector = 'textarea[title="Search"]';
    const resultSelector = '.BYM4Nd [role="text"]';
    yield page.waitForSelector(searchSelector);
    yield page.click(searchSelector, { clickCount: 1 });
    yield page.type(searchSelector, "chimera technologies");
    yield page.keyboard.press("Enter");
    yield page.waitForSelector(resultSelector);
    yield page.click(resultSelector, { clickCount: 1 });
    yield page.waitForTimeout(5000);
    yield page.screenshot({ path: "chimera.png" });
    yield page.pdf({ path: "chimera.pdf", format: "A4" });
    yield browser.close();
}))();
