import { Browser, Builder, WebDriver } from "selenium-webdriver";
import assert from "assert";
const GREEN_COLOR = "\x1b[32m";

async function loadTest(url, numUsers, maxResponseTime) {
    let startTime = 0;
    let endTime = 0;
    let totalTime = 0;
    const drivers = [];

    try {
        for (let i = 0; i < numUsers; i++) {
            const driver = await new Builder().forBrowser(Browser.EDGE).build();
            drivers.push(driver);
        }
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
        assert.ok(
            totalTime < maxResponseTime,
            `El tiempo de respuesta excedió ${maxResponseTime} ms.`
        );
        console.log(`${GREEN_COLOR}Passed\x1b[0m`);
    } catch (error) {
        console.error("Error:", error);
    } finally {
        for (const driver of drivers) {
            await driver.quit();
        }
    }
}

const url = "http://localhost:4001";
const numUsers = 5;
const maxResponseTimeSeconds = 10;
loadTest(url, numUsers, maxResponseTimeSeconds * 1000);
