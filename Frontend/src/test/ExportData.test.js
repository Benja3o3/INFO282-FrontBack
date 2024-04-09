import { Browser, Builder, By } from "selenium-webdriver";
import * as fs from "fs";

/* Requisito funciona: Como usuario quiero exportar los datos en un archivo kml */

async function exportData(url, browser, downloadsPath) {
  let driver = await new Builder().forBrowser(browser).build();
  // Maximizar la ventana del navegador para asegurar la captura de pantalla completa
  await driver.manage().window().maximize();

  let currentDate = new Date();
  let dateString = `${currentDate.getDate()}-${currentDate.getHours()}:${currentDate.getMinutes()}`;
  try {
    await driver.get(url);
    await driver.sleep(2000);

    // Hacer clic en el botón de exportación
    const exportButton = await driver.findElement(
      By.className("bg-buttonblue")
    );
    await exportButton.click();

    // Esperar hasta que se complete la descarga (ajustar este tiempo según sea necesario)
    await driver.sleep(5000);

    // Tomar una captura de pantalla
    const screenshot = await driver.takeScreenshot();

    // Verificar si el archivo se ha descargado correctamente
    const files = await fs.promises.readdir(downloadsPath);
    fs.writeFileSync(
      `./src/test/screenshots/${dateString}-${browser.toString()}-ExportData1.png`,
      screenshot,
      "base64"
    );

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
    // Guardar la captura de pantalla en un archivo
    fs.writeFileSync(
      `./src/test/screenshots/${dateString}-${browser.toString()}-ExportData2.png`,
      screenshot,
      "base64"
    );
    await driver.quit();
  }
}

const url = "http://localhost:4001/";
const browser = Browser.CHROME;
const downloadsPath = "/Users/felipeprietoortiz/Downloads";

exportData(url, browser, downloadsPath);
