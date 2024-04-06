import { Browser, By, Builder, WebDriver } from "selenium-webdriver";

// Prueba funcional
/*
Requisito
    Como usuario quiero poder acceder a una pagina de información de las fuentes de información
*/

async function dimensionInformationTest(url) {
    const driver = await new Builder()
    .forBrowser(Browser.CHROME)
    .setChromeOptions("enable-logging")
    .build();

    try {
        await driver.get(url);
        let button = await driver.findElement(By.xpath("//*[@id='root']/div[1]/div[2]/div[1]/div/div/div/div[1]/div[2]/div[3]/button"));
        button.click()
   
    }catch(error){
        console.error("Error:", error);
    }finally {
        setTimeout(async () => {
            await driver.quit();
            console.log("Test completado");
        }, 2000); // Delay de 3 segundos
    }
    
}
const url = "http://localhost:4001";

dimensionInformationTest(url);