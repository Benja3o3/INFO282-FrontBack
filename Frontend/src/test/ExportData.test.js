import { Builder, By } from "selenium-webdriver";
import fs from "fs";
import path from "path";

async function runTest() {
  let driver = await new Builder().forBrowser("chrome").build();

  try {
    await driver.get("http://192.168.1.16:4001/");
    await driver.sleep(2000);

    const exportButton = await driver.findElement(
      By.className("bg-buttonblue")
    );
    await exportButton.click();

    await driver.sleep(5000);

    const downloadsPath = path.join("/Users", "felipeprietoortiz", "Downloads");
    const files = await fs.promises.readdir(downloadsPath);

    if (files.includes("allData.kml")) {
      console.log("Test exitoso: Se ha descargado el archivo correctamente.");
    } else {
      console.log(
        "Error durante el test: El archivo no se descargó correctamente."
      );
    }
  } catch (error) {
    console.error("Error durante el test:", error);
  } finally {
    await driver.quit();
  }
}

runTest();

/* Requisito funciona: Como usuario quiero exportar los datos en un archiv kml */
