import { Browser, Builder, By } from "selenium-webdriver";
import fs from "fs";
import path from "path";

/* Requisito funciona: Como usuario quiero exportar los datos en un archiv kml */

async function exportData(url, browser, downloadsPath) {
  let driver = await new Builder().forBrowser(browser).build();

  try {
    await driver.get(url);
    await driver.sleep(2000);
    // console.log("Test: ");
    const exportButton = await driver.findElement(
      By.className("bg-buttonblue")
    );
    await exportButton.click();

    await driver.sleep(5000);

    const files = await fs.promises.readdir(downloadsPath);

    if (files.includes("allData.kml")) {
      console.log(`El archivo se descargó correctamente en ${downloadsPath}`);
      console.log("✅ La prueba se ha completado con éxito");
    } else {
      console.log(
        "Error durante el test: El archivo no se descargó correctamente."
      );
    }
  } catch (error) {
      console.error(`Error durante el test en el navegador: ${browser}`);
  } finally {
      await driver.quit();
  }
}

const url = "http://localhost:4001/";
const browsers = [Browser.CHROME];
// const browsers = [Browser.CHROME, Browser.FIREFOX, Browser.EDGE];

const downloadsPath = "/home/jhano/Descargas";

browsers.forEach(browser => {
  exportData(url, browser, downloadsPath);
});


