// Import the functions you need from the SDKs you need
import { Console } from "console";
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

function nextValidID(date: string) : number {
    const dateRef = ref(db, 'Dates/' + date);
    let numChildren : number = 0;
    onValue(dateRef, (dateSnapshot) => {
        // if the date does exist, id is number of children
        if (dateSnapshot.exists()) {
            dateSnapshot.forEach((eventSnapshot) => {
                numChildren++
            })
        }
    })
    return numChildren
}

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
function writeNewEvent(event: event, date: string) : void{
    const validID = nextValidID(date)
    const reference = ref(db, 'Dates/' + date + '/' + validID);

    set(reference, {
        eventName: event.eventName,
        startTime: event.startTime,
        endTime: event.endTime,
        info: event.info
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
    const swRef = ref(db, datesRef.key + "/" + "2022-04-29")
    const badRef = ref(db, datesRef.key + "/" + "bad_ref")
    // TODO: child() doesn't work? workaround
    let retDates : dateInfo[] = []
    // get all dates that have been added

    //TODO: figure out how to loop through the fucking keys
    // snapshot is of Dates
    onValue(datesRef, (dirSnapshot) => {
        console.log("Onvalue was called " + dirSnapshot.key)
        // iterate and add each to return list
        //iterating through dates
        dirSnapshot.forEach((dateSnapshot) => {
            //TODO: could be an error depending on how date directories work "'/' creates an additional layer"
            // console.log("child of child" + dateSnapshot.key) // TODO:
            // add each event to date's event list
            let dateEvents : event[] = [];
            dateSnapshot.forEach((eventSnapshot) => {
                console.log("event val: " + eventSnapshot.val())
                const currEvent = eventSnapshot.val();
                const newEvent = <event>({
                    startTime: currEvent.startTime,
                    endTime: currEvent.endTime,
                    eventName: currEvent.eventName,
                    info: currEvent.info
                });
                dateEvents.push(newEvent)
            })
            // create date, add eventList to it, add to dateList
            const newDate =  <dateInfo>({
                date: dateSnapshot.key,
                events: dateEvents
            })
            retDates.push(newDate)
        })
    });
    return retDates
}

// writeEvent("Spring Weekend", "18:30", "22:30", "Annual thing", "2022-04-29", "0");
// writeEvent("lunch", "12:00", "13:00", "food optional", "2022-04-29", "1");

// TODO: figure out what to export
export {getAllDates, writeNewEvent, getDateEvents}