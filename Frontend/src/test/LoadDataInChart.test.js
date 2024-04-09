import { Browser, Builder, By, until } from "selenium-webdriver";
import * as fs from "fs";

/* Requisito no funcional: Tiempo que tarda en cargar los datos de un grafico*/

async function loadDataGraph(url, browser) {
  let driver = new Builder().forBrowser(browser).build();
  // Maximizar la ventana del navegador para asegurar la captura de pantalla completa
  await driver.manage().window().maximize();

  let currentDate = new Date();
  let dateString = `${currentDate.getDate()}-${currentDate.getHours()}:${currentDate.getMinutes()}`;
  try {
    // Navegar a la página donde se encuentra el mapa

    await driver.get(url);
    const startTime = Date.now();
    // Tomar una captura de pantalla
    const screenshot = await driver.takeScreenshot();

    // Guardar la captura de pantalla en un archivo
    fs.writeFileSync(
      `./src/test/screenshots/${dateString}-${browser.toString()}-LoadDataInChart1.png`,
      screenshot,
      "base64"
    );

    // Seleccionar la región haciendo clic en ella
    const exportButton = await driver.findElement(By.className("rounded-lg"));
    await exportButton.click();

    await driver.wait(until.elementLocated(By.css("canvas")), 10000); // Tiempo máximo de espera: 10 segundos
    // Tiempo máximo de espera: 10 segundos

    const endTime = Date.now();
    const tiempoDeCarga = endTime - startTime;

    console.log(
      `El gráfico se cargó en ${tiempoDeCarga} milisegundos, al apretar el botón.`
    );
    // Realizar otras acciones o aserciones según sea necesario
    console.log(
      `✅ La prueba se ha completado con éxito en el navegador: ${browser}`
    );
  } catch (error) {
    console.error(`Error durante el test en el navegador: ${browser}`);
  } finally {
    await driver.sleep(2000);
    const screenshot = await driver.takeScreenshot();
    // Guardar la captura de pantalla en un archivo
    fs.writeFileSync(
      `./src/test/screenshots/${dateString}-${browser.toString()}-LoadDataInChart2.png`,
      screenshot,
      "base64"
    );
    // Asegurarse de cerrar el navegador después de la prueba, independientemente de si pasa o falla
    await driver.quit();
  }
}

const url = "http://localhost:4001/";
const browsers = [Browser.CHROME];
// const browsers = [Browser.CHROME, Browser.FIREFOX, Browser.EDGE];
browsers.forEach((browser) => {
  loadDataGraph(url, browser);
});
