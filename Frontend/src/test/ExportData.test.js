import { Browser, Builder, By } from "selenium-webdriver";
import * as fs from "fs";

/* Requisito funciona: Como usuario quiero exportar los datos en un archiv kml */

async function exportData(url, browser, downloadsPath) {
  let driver = await new Builder().forBrowser(browser).build();
  await driver.manage().window().maximize();
  let currentDate = new Date();
  let dateString = `${currentDate.getDate()}-${currentDate.getHours()}:${currentDate.getMinutes()}`;

  try {
    await driver.get(url);
    await driver.sleep(2000);
    // console.log("Test: ");
    const exportButton = await driver.findElement(
      By.className("bg-buttonblue")
    );
    await exportButton.click();
    const screenshot = await driver.takeScreenshot();
    fs.writeFileSync(
      `./src/test/screenshots/${dateString}-${browser.toString()}-ExportData1.png`,
      screenshot,
      "base64"
    );
    await driver.sleep(5000);

    const files = await fs.promises.readdir(downloadsPath);

    if (files.includes("allData.kml")) {
      console.log(`El archivo se descargó correctamente en ${downloadsPath}`);
      console.log(
        `✅ La prueba se ha completado con éxito en el navegador: ${browser}`
      );
    } else {
      console.log(
        "Error durante el test: El archivo no se descargó correctamente."
      );
    }
  } catch (error) {
    console.error(`Error durante el test en el navegador: ${browser}`);
  } finally {
    await driver.sleep(2000);
    const screenshot = await driver.takeScreenshot();
    fs.writeFileSync(
      `./src/test/screenshots/${dateString}-${browser.toString()}-ExportData1.png`,
      screenshot,
      "base64"
    );
    await driver.quit();
  }
}

const url = "http://localhost:4001/";
const browsers = [Browser.CHROME];
// const browsers = [Browser.CHROME, Browser.FIREFOX, Browser.EDGE];

const downloadsPath = "/Users/felipeprietoortiz/Downloads";

browsers.forEach((browser) => {
  exportData(url, browser, downloadsPath);
});
