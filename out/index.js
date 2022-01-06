"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = require("fs");
const posix_1 = require("path/posix");
const puppeteer = require("puppeteer");
const dataDir = (0, posix_1.resolve)(__dirname, "../data");
fetchData().then((data) => {
    saveData("webbFlightData", data.flightData);
    saveData("webbDeployments", data.deploymentStateArray);
});
////////////////////////////////////////////////////////////////////////////////
/////////////////////////////// HELPER FUNCTIONS ///////////////////////////////
////////////////////////////////////////////////////////////////////////////////
/**
 * Fetches current James Webb data from the NASA status page.
 */
async function fetchData() {
    const browser = await puppeteer.launch({
        args: ["--disable-gpu", "--disable-dev-shm-usage", "--disable-setuid-sandbox", "--no-first-run", "--no-sandbox"],
    });
    const page = await browser.newPage();
    await page.goto("https://www.jwst.nasa.gov/content/webbLaunch/whereIsWebb.html");
    await page.waitForFunction(() => { var _a, _b, _c; return !!((_b = (_a = window.data) === null || _a === void 0 ? void 0 : _a.flightData) === null || _b === void 0 ? void 0 : _b.length) && !!((_c = window.deploymentStateArray) === null || _c === void 0 ? void 0 : _c.length); });
    const flightData = await page.evaluate(() => window.data.flightData);
    const deploymentStateArray = await page.evaluate(() => window.deploymentStateArray);
    await browser.close();
    return { flightData, deploymentStateArray };
}
/**
 * Saves data to file.
 */
function saveData(name, data) {
    (0, fs_1.writeFile)((0, posix_1.join)(dataDir, `${name}.json`), JSON.stringify(data, null, 2), (err) => {
        if (err)
            console.error(err);
        else
            console.info(`Saved ${name}`);
    });
}
