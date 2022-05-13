const {Builder, By, Key, util} = require('selenium-webdriver');
const chrome = require('selenium-webdriver/chrome');
const chromedriver = require('chromedriver');
//import Geolocator from "./website-app/src/components/geolocator/Geolocator";

chrome.setDefaultService(new chrome.ServiceBuilder(chromedriver.path).build());




async function runTestSuite(){
    let driver = await new Builder().forBrowser("chrome").build();
    await driver.get("https://cs32termproject.web.app/");

    const actions = driver.actions();

    const kb = actions.keyboard();
    const mouse = actions.mouse();




    /**
        TEST: navigating to the "campus locations" link
    **/
     driver.findElements(By.className("nav-link")).then(function(elements){
            elements.forEach(function (element) {
                element.getText().then(function(text){
                    if(text === "CAMPUS LOCATIONS"){
                        try{
                             console.log("NAV LINK TEST...");
                             element.click();
                             console.log("NAV LINK PASSED!")
                        }
                        catch{
                           console.log("NAV LINK ERROR");
                        }

                    }
                });
            });
        });


   //TEST: Search bar accurate results
     setTimeout(function(){
        driver.findElement(By.id("geolocator-search-bar")).then(
        function(element){
                const places = ["Andrews", "Barbour", "Bear", "Engineer", "John",
                "Jos", "List", "Nelson", "Olney", "Orwig", "Rock", "Science", "Sharpe",
                "Student", "Verney"];
                setTimeout(async function(){
                for(let i = 0; i < places.length; i++){
                    try{
                    console.log("SEARCH BAR TEST: trying " + places[i] + " ...")
                    await element.sendKeys(places[i]);
                    await element.clear();
                    console.log("SEARCH BAR TEST: " + places[i] + " is valid");
                    }
                    catch{
                        console.log("SEARCH BAR TEST ERROR @ " + places[i]);
                    }


                }

                },300);


        });
    }, 100);


    //TEST: All links within page belong there and are valid"

   const links = {
        "https://www.brown.edu/": 1,
        "https://cs32termproject.web.app/": 2,
        "https://cs32termproject.web.app/calendar": 3,
        "https://cs32termproject.web.app/campus-locations": 4,
        "https://cs32termproject.web.app/account": 5
   };
   setTimeout(function(){

        driver.findElements(By.tagName("a")).then(function(elements){

            elements.forEach(function (element) {
                element.getAttribute("href").then(function(text){
                    if((text in links)){
                        console.log("LINK VERIFICATION TEST: " + text + " is valid");
                    }else{
                        console.log("LINK VERIFICATION TEST: " + test + " is NOT VALID!");
                    }
                });
            });

        });

   }, 400)

/** Test: Reload button works **/
   setTimeout(function(){
    driver.findElement(By.id("geolocator-load")).then(function(element){
        console.log("RELOAD BUTTON TEST...");
        try{
           setTimeout(function(){
              element.click();
           },500)
           setTimeout(function(){
              element.click();
           }, 800)
            console.log("RELOAD BUTTON TEST PASSED");
        }
        catch{
            console.log("RELOAD BUTTON TEST FAILED");
        }

    });

   }, 1300);


    setTimeout(function(){
        driver.findElement(By.id("openstreetmap")).then(function(element){
            element.getAttribute("src").then(function(source){
                if(source != "" && source != null){
                    console.log("MAP LINK TEST...VALID");
                }

            });
        });

    }, 1600);

    setTimeout(function(){
        driver.findElements(By.className("nav-link")).then(function(elements){
                    elements.forEach(function (element) {
                        element.getText().then(function(text){
                            console.log(text);
                            if(text === "CALENDAR"){

                                try{
                                     console.log("NAV LINK TEST...");

                                     element.click();
                                     console.log("NAV LINK PASSED!")
                                }
                                catch{
                                   console.log("NAV LINK ERROR");
                                }

                            }
                        });
                    });
                });
    },3000)


}

runTestSuite();
