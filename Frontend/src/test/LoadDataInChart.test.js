import { Builder, By, until } from "selenium-webdriver";

async function runTest() {
  let driver = new Builder().forBrowser("chrome").build();
  try {
    // Navegar a la página donde se encuentra el mapa
    await driver.get("http://192.168.1.16:4001/");

    // Realizar zoom al nivel de país
    const zoomInButton = await driver.findElement(
      By.className("leaflet-control-zoom-in")
    );

    await driver.sleep(2000);
    await zoomInButton.click(); // Puedes repetir este paso si es necesario aumentar el zoom
    /* 
    // Esperar a que la región esté completamente cargada
    await driver.wait(
      until.elementLocated(
        By.xpath("//*[@id='map']/div[1]/div[2]/svg/g/path[11]")
      ),
      5000
    );

    // Seleccionar la región haciendo clic en ella
    const regionElement = await driver.findElement(
      By.xpath("//*[@id='map']/div[1]/div[2]/svg/g/path[11]")
    );
    await regionElement.click();
 */
    // Esperar un tiempo para que se carguen los datos (ajusta este tiempo según sea necesario)
    await driver.sleep(5000);

    // Realizar otras acciones o aserciones según sea necesario
  } catch (error) {
    console.error("Error durante la prueba:", error);
    throw error;
  } finally {
    // Asegurarse de cerrar el navegador después de la prueba, independientemente de si pasa o falla
    await driver.quit();
  }
}

runTest();
