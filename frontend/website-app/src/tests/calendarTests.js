// Import the functions you need from the SDKs you need
import { Console } from "console";
import { initializeApp } from "firebase/app";
import { getDatabase, ref, set, onValue} from 'firebase/database';
import {getAllDates, getDateEvents, deleteEvent} from "../website-app/src/components/calendar/CalendarFB";


// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyDLBfzKNUMzRvsP_LeiRf31EJ-mJPVtf0o",
    authDomain: "cs32termproject.firebaseapp.com",
    projectId: "cs32termproject",
    storageBucket: "cs32termproject.appspot.com",
    messagingSenderId: "586091400920",
    appId: "1:586091400920:web:a8a56afdc0bee2fd3ad1ad",
    measurementId: "G-VP24Q6Q0E3"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getDatabase();

// Selenium stuff 
const {Builder, By, Key, util, WebElement} = require('selenium-webdriver');
const chrome = require('selenium-webdriver/chrome');
const chromedriver = require('chromedriver');

chrome.setDefaultService(new chrome.ServiceBuilder(chromedriver.path).build());

// keep track of everything in the backend 
let firebaseEventList = []
let seleniumEventList = []

/**
 * Helper method for comparing the events stored in the calendar vs the events in database
 */
function arraysEqual() { 
  // Initialize the maps (Didn't want to go through each function and change it to use the maps)
  let firebaseMap = new Map()
  firebaseEventList.forEach(function(eventString) {
    if (firebaseMap.has(eventString)) { 
      firebaseMap.set(eventString, firebaseMap.get(eventString) + 1)
    } 
    else { 
      firebaseMap.set(eventString, 1)
    }
  })
  let seleniumMap = new Map()
  seleniumEventList.forEach(function(eventString) {
    if (seleniumMap.has(eventString)) { 
      seleniumMap.set(eventString, seleniumMap.get(eventString) + 1)
    } 
    else { 
      seleniumMap.set(eventString, 1)
    }
  })
  // go through the keys and make sure values match
  for (const key of firebaseMap.keys()) { 
    if (firebaseMap.get(key) != seleniumMap.get(key)) {
      Console.log("Failed: Event " + key + " has different values in firebase and selenium maps")
      return
    }
  }
  // same for selenium map
  for (const key of seleniumMap.keys()) { 
    if (firebaseMap.get(key) != seleniumMap.get(key)) {
      Console.log("Failed: Event " + key + " has different values in firebase and selenium maps")
      return
    }
  }
}



/**
 * Hit the load button and make sure that the calendar is in a valid state. 
 * 
 * Valid state includes: 
 *  - Every date element has a header and events
 *  - Every event element contains title, start time, end time, and info
 */
 async function calendarLoadIsValid() {

  let driver = await new Builder().forBrowser("chrome").build();
  await driver.get("https://cs32termproject.web.app/");


  Console.log("--- Test Valid Display ---------------------")
   driver.findElements(By.className("menu-item calendar")).then(function(elements){
          elements.forEach(function (element) {
              element.getText().then(function(text){
                  if(text === "CALENDAR"){
                    // double click because of bug
                      element.click();
                      driver.wait(1000);
                      element.click(); 
                    // Now look at all the dates
                    const dates =  await driver.findElements(By.className("date-row"))
                    // Should only be one date header per element
                    if (await dates.findElements(By.className("date-header-date")).length != 1) { 
                      // test failure
                      Console.log("Failed: A date object is missing header")
                      return
                    }
                    // verify format, and add all events to a single list
                    validDatesAndEvents(dates)

                    // check the firebase directly to make sure that the display matches up
                    const allDates = getAllDates()
                    allDates.forEach(processDateInfo)
                    arraysEqual()
                  }
              });
          });
      })

  console.log("--- Valid Display Complete ---------------------")
  await setTimeout(function(){driver.quit()}, 2000);
}



/**
 * Helper function converting a db dateInfo object to string for comaprison with calendar
 * @param {*} dateInfo 
 */
function processDateInfo(dateInfo) { 
  // TODO: use dateString if we can parse the date format correctly 
  const dateString = dateInfo.date
 const eventList = dateInfo.events
  eventList.forEach(function(event) { 
    const eventString = event.eventName + event.startTime + event.endTime + event.info
    firebaseEventList.push(eventString)
  })
}

/**
 * Takes a promise of a Date object and verifies that it is correct. 
 * Will print to console if there is an error and will not print if there is not
 * 
 * @param - dates - webElement[]
 */
function validDatesAndEvents(dates) {
  // Should only be one date header per element
  if (dates.findElements(By.className("date-header-date")).length != 1) { 
    // test failure
    console.log("Incorrect date-header")
    return
  }
  dates.forEach((function(date) {
  // Should have at least one element 
  const events = await date.findElements(By.className("event-item"))
  // all dates should have at least one event
  if (events.length < 1) { 
    // test failure 
    console.log("Date with no events")
    return
  }
  // check validity of each event
  const dateTitle  = date.getText
  events.forEach((function(event) {
    validEvent(event, dateTitle)
    }))
  }))
}

/**
 * Given an event, make sure it appears in the correct UI format
 * @param {*} event 
 * @param {*} dateTitle 
 * @returns 
 */
function validEvent(event, dateTitle) { 
  // make sure each event has correct things
  const titleWrapped = await event.findElements(By.className("event-item-title"));
  const startTimeWrapped = await event.findElements(By.className("event-item-start-time"));
  const endTimeWrapped = await event.findElements(By.className("event-item-end-time")); 
  const infoWrapped = await event.findElements(By.className("event-item-info"));
  if (infoWrapped.length != 1
    || startTimeWrapped.length != 1
    || endTimeWrapped.length != 1
    || titleWrapped.length != 1) { 
    // test fail 
    console.log("Invalid Event Format")
    return
  }
  // Record the event so that we can compare to db
  else { 
    // TODO dateParser so that we can add the date text and make sure each event is marked as having the right date
    const eventString =  await titleWrapped[0].getText() + await startTimeWrapped[0].getText() + await endTimeWrapped[0].getText() + await infoWrapped[0].getText()
    seleniumEventList.push(eventString)
  }
}

/**
 * Adding a calendar element, quitting, and then loading again to make sure the change is persistent. 
 * 
 * All of the parameters are strings that a user would type
 * @param {*} month 
 * @param {*} day 
 * @param {*} year 
 * @param {*} title 
 * @param {*} startTime 
 * @param {*} endTime 
 * @param {*} info 
 */
async function addEventAndCheckDB(month, day, year, title, startTime, endTime, info) {

  let driver = await new Builder().forBrowser("chrome").build();
  await driver.get("https://cs32termproject.web.app/");


  Console.log("--- Test Add Event ---------------------")
   driver.findElements(By.className("menu-item calendar")).then(function(elements){
          elements.forEach(function (element) {
              element.getText().then(function(text){
                  if(text === "CALENDAR"){
                    let reloadButton = null
                    // get the load button 
                    const buttons = await driver.findElements(By.css(button))
                    for (let button of buttons) { 
                      buttonText = await button.getText()
                      if (buttonText === "Click to (re)load!") {
                      // double click because of bug
                      button.click();
                      driver.wait(500);
                      button.click(); 
                      reloadButton = button

                      }
                      else if (buttonText === "Add an Event") { 
                        button.click(); 
                      }
                    }
                    // adding event after
                    addEventSelenium(driver, month + day + year, title, startTime, endTime, info)
                    
                    // Need to check the actual database to make sure its stored
                    dateText  = year + "-" + month + "-" + day 
                    // read from firebase
                    const eventList = getDateEvents(dateText)
                    const dbEvent = eventList[eventList.length-1]
                    // TODO: time conversion? more stuff should be checked here 
                    if (dbEvent.eventName != title || dbEvent.info != info) { 
                      Console.log("Failed: event "  + eventList[eventList.length-1] + "not in db")
                    }
                    else {
                    // cleanup after adding the new event from db
                    deleteEvent(dbEvent.eventID, dateText)
                    }
                  }
              });
          });
      })

  console.log("--- Add Event  Complete ---------------------")
  await setTimeout(function(){driver.quit()}, 2000);
}

/**
 *  Helper method to add an event
 * @param {*} driver - the driver that selenium is running.
 * @param {*} date 
 * @param {*} title 
 * @param {*} startTime 
 * @param {*} endTime 
 * @param {*} info 
 */
function addEventSelenium(driver, date, title, startTime, endTime, info) { 
    const formElement = await driver.findElement(By.className("event-adder-form"))
    const inputField = await formElement.findElement(By.css("input"))
    // click the first Date option and type the rest
    inputField.click();
    driver.actions().sendKeys(date, Key.ENTER, Key.TAB, 
      title, Key.TAB, 
      startTime, Key.TAB, 
      endTime, Key.TAB, 
      info).perform();

    await formElement.findElement(By.css("button")).click();
  }

/**
 * Test to make sure that adding an early event appears at the top of the page when it is reloaded and 
 * deleting that event will remove it from the page. 
 */
async function seleniumAddAndDelete() {

    let driver = await new Builder().forBrowser("chrome").build();
    await driver.get("https://cs32termproject.web.app/");
  
  
    Console.log("--- Test Selenium Add + Delete ---------------------")
     driver.findElements(By.className("menu-item calendar")).then(function(elements){
            elements.forEach(function (element) {
                element.getText().then(function(text){
                    if(text === "CALENDAR"){
                      let reloadButton = null
                      // get the load button 
                      const buttons = await driver.findElements(By.css(button))
                      for (let button of buttons) { 
                        buttonText = await button.getText()
                        // use the loadbutton to see events
                        if (buttonText === "Click to (re)load!") {
                        // double click because of bug
                        button.click();
                        driver.wait(500);
                        button.click(); 
                        reloadButton = button
                        }
                        // use the add event to pull up a menu
                        else if (buttonText === "Add an Event") { 
                          button.click(); 
                        }
                      }
                      // adding event after
                      const month = "11"; const day = "11"; const year = "2011";
                      const title = "I wish to pass"
                      const info  = "just let me graduate"
                      addEventSelenium(driver, month + day + year, title, "1111", "1112", info)
                      // reload
                      reloadButton.click();
                      // now it should be the first one
                      const firstEvent = driver.findElement(By.className("event-item"))
                      if (await firstEvent.findElements(By.className("event-item-title")) != title 
                          || await firstEvent.findElements(By.className("event-item-info")) != info
                        ) { 
                          Console.log("Test Failed: could not see event on page after add")
                          return 
                      }
                      // Now Delete the event
                      await firstEvent.findElement(By.className("event-delete-button")).click();
                      // Now Reload again and check if gone
                      reloadButton.click();
                      if (await firstEvent.findElements(By.className("event-item-title")) == title 
                          && await firstEvent.findElements(By.className("event-item-info")) == info
                        ) { 
                          Console.log("Test Failed: could not see event on page after add")
                          return 
                      }
                    }
                });
            });
        })
  
    console.log("--- Selenium Add And Delete Complete ---------------------")
    await setTimeout(function(){driver.quit()}, 2000);
  }
calendarLoadIsValid()
seleniumAddAndDelete()