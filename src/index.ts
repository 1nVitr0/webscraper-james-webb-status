import { writeFile } from "fs";
import { join, resolve } from "path/posix";
import * as puppeteer from "puppeteer";
import { WebbGlobals } from "./types";

declare global {
  interface Window extends WebbGlobals {}
}

const dataDir = resolve(__dirname, "../data");

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

  await page.waitForFunction(() => !!window.data?.flightData?.length && !!window.deploymentStateArray?.length);
  const flightData = await page.evaluate(() => window.data.flightData);
  const deploymentStateArray = await page.evaluate(() => window.deploymentStateArray);

  await browser.close();

  return { flightData, deploymentStateArray };
}

/**
 * Saves data to file.
 */
function saveData<T>(name: string, data: T) {
  writeFile(join(dataDir, `${name}.json`), JSON.stringify(data, null, 2), (err) => {
    if (err) console.error(err);
    else console.info(`Saved ${name}`);
  });
}
