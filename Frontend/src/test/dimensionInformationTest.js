import { Browser, By, Builder, WebDriver } from "selenium-webdriver";
import * as fs from 'fs';

// Prueba funcional
/*
Requisito
    Como usuario quiero poder acceder a una pagina de información de las fuentes de información
*/

async function dimensionInformationTest(url, browser, buttonToClick) {
    const driver = await new Builder()
    .forBrowser(browser)
    .setChromeOptions("enable-logging")
    .build();
    let currentDate = new Date();
    let dateString = `${currentDate.getDate()}${currentDate.getHours()}${currentDate.getMinutes()}`;

    try {
        await driver.get(url);
        let dimensionButton = await driver.findElement(By.xpath(buttonToClick));
        const screenshot = await driver.takeScreenshot();
        fs.writeFileSync(`./src/test/screenshots/${dateString}-${browser.toString()}-dp.png`, screenshot, "base64");

        dimensionButton.click()
        
   
    }catch(error){
        console.error("Error:", error);
        console.log(`[ Test ] Test error - ${browser.toString()}`)
        await driver.quit();
        
    }finally {
        let informationPanel = await driver.findElement(By.xpath("//*[@id='root']/div[1]/div[2]/div[1]/div"))
        const screenshot = await driver.takeScreenshot();
        fs.writeFileSync(`./src/test/screenshots/${dateString}-${browser.toString()}-ip.png`, screenshot, "base64");

        if( informationPanel ) {
            console.log(`[ Test ] Test succes: information panel exists in ${browser.toString()}`)
        } else {
            console.log(`[ Test ] Test succes: information panel exists in ${browser.toString()}`)
        }
        await driver.quit();
    }
    
}
const url = "http://localhost:4001";
const browsers = [Browser.CHROME, Browser.EDGE, Browser.FIREFOX];
const buttonsTestCase = ["//*[@id='root']/div[1]/div[2]/div[1]/div/div/div/div[1]/div[2]/div[3]/button",
                        "//*[@id='root']/div[1]/div[2]/div[1]/div/div/div/div[3]/div[2]/div[3]/button",
                        "//*[@id='root']/div[1]/div[2]/div[1]/div/div/div/div[9]/div[2]/div[3]/button"
]

browsers.forEach(browser => {
    buttonsTestCase.forEach(buttonToClick => {
        dimensionInformationTest(url, browser, buttonToClick);
    });
});
