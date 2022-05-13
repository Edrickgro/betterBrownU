const {Builder, By, Key, util} = require('selenium-webdriver');
const chrome = require('selenium-webdriver/chrome');
const chromedriver = require('chromedriver');

chrome.setDefaultService(new chrome.ServiceBuilder(chromedriver.path).build());



async function example(){
    let driver = await new Builder().forBrowser("chrome").build();
    await driver.get("https://cs32termproject.web.app/");


     driver.findElements(By.className("nav-link")).then(function(elements){
            elements.forEach(function (element) {
                element.getText().then(function(text){
                    if(text === "CAMPUS LOCATIONS"){
                        console.log("text~");
                        element.click();
                    }
                });
            });
        })

//    await setTimeout(function(){
//        driver.findElement(By.name("geolocator-search-bar")).sendKeys("Sharpe");
//    }, 2000);

    await setTimeout(function(){driver.quit()}, 2000);



}

example();
