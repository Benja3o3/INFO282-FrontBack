import { Browser, Builder, WebDriver } from "selenium-webdriver";

async function loadTest(url, numUsers) {
    let startTime = 0;
    let endTime = 0;
    let totalTime = 0;
    const drivers = [];

    try {
        // Crear múltiples instancias de WebDriver
        for (let i = 0; i < numUsers; i++) {
            const driver = await new Builder().forBrowser(Browser.EDGE).build();
            drivers.push(driver);
        }

        // Iniciar la carga para todos los usuarios simultáneamente
        startTime = new Date().getTime();
        await Promise.all(
            drivers.map(async (driver, index) => {
                await driver.get(url);
                console.log(`Usuario ${index + 1} ha accedido a la página.`);
            })
        );
        endTime = new Date().getTime();
        totalTime = endTime - startTime;

        console.log(`Todos los usuarios han accedido a la página.`);
        console.log(
            `Tiempo total de carga para ${numUsers} usuarios: ${totalTime} ms`
        );
    } catch (error) {
        console.error("Error:", error);
    } finally {
        // Cerrar todas las instancias de WebDriver al finalizar
        for (const driver of drivers) {
            await driver.quit();
        }
    }
}

// URL de la página web a probar
const url = "http://localhost:4001";
// Número de usuarios simultáneos
const numUsers = 10;

// Ejecutar la prueba de carga
//loadTest(url, numUsers);


