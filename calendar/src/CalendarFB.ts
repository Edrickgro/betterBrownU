// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getDatabase, ref, set, onValue} from 'firebase/database';

// TODO: Add SDKs for Firebase products that you want to use
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

// Structure of dates and events as defined in calendar.tsx
type dateInfo = {
  date : string;
  // each date has many events
  events : event[];
}
type event = {
  eventName : string;
  startTime : string;
  endTime : string;
  info : string;
}

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getDatabase();

/**
 * Put an event into the database 
 * 
 * TODO: modify to just take a date object?
 * @param eventName 
 * @param startTime 
 * @param endTime 
 * @param info 
 * @param date 
 * @param eventID 
 */
function writeEvent(eventName : string, startTime : string, endTime : string, info: string, date: string, eventID: string) : void{ 
  const reference = ref(db, 'Dates/' + date + '/' + eventID);

  set(reference, {
    eventName: eventName,
    startTime: startTime,
    endTime: endTime,
    info: info
  })
}

/**
 * Given a string for a date, get all of the events for the date
 * @returns a list of event objects
 */
function getDateEvents(date : string) : event[] {
    const eventsRef = ref(db, 'Dates/' + date)
    let retEvents : event[] = []
    // get the events at this date
    onValue(eventsRef, (snapshot) => {
      // iterate and add each to return list
      snapshot.forEach((childSnapshot) => {
        const currEvent = childSnapshot.val();
        retEvents.push(currEvent.val);
      })  
    });
    return retEvents
}

/**
 * Get all of the dates that have been added to the database.
 * @returns a list of dateInfo objects
 */
function getAllDates() : dateInfo[] { 
  const datesRef = ref(db, 'Dates/')
  let retDates : dateInfo[] = []
  // get all dates that have been added
  onValue(datesRef, (snapshot) => {
    // iterate and add each to return list
    snapshot.forEach((childSnapshot) => {
      //TODO: could be an error depending on how date directories work "'/' creates an additional layer"
      const currEvent = childSnapshot.val();
      retDates.push(currEvent.val);
    })  
  });
  return retDates
}

writeEvent("Spring Weekend", "18:30", "22:30", "Annual thing", "2022-04-29", "0");
writeEvent("lunch", "12:00", "13:00", "food optional", "2022-04-29", "1");

// TODO: figure out what to export
export {}