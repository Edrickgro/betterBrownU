
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
                console.log(text);
            });
        });
    });


    await setTimeout(function(){driver.quit()}, 2000);



}

example();



