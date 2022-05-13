// Import the functions you need from the SDKs you need
import { Console } from "console";
import { initializeApp } from "firebase/app";
import { getDatabase, ref, set, onValue, remove} from 'firebase/database';
import 'materialize-css';
import {toast} from "react-hot-toast";


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
    eventID : number
    eventName : string;
    startTime : string;
    endTime : string;
    info : string;
}

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getDatabase();

/**
 * Get the next valid unique ID for a certain date. Loops through all the events on a particular date and adds
 * one to the highest ID found
 * @param date = the date that the particular event will be on
 */
function nextValidID(date: string) : number {
    const dateRef = ref(db, 'Dates/' + date);
    let highestID : number = 0;
    onValue(dateRef, (dateSnapshot) => {
        // if the date does exist, id is number of children
        if (dateSnapshot.exists()) {
            dateSnapshot.forEach(e => {
                console.log(parseInt(e.val().eventID))
                if (parseInt(e.val().eventID) <= highestID) {
                    highestID = parseInt(e.val().eventID)+1
                }
            })
        }
    })
    return highestID
}

/**
 * Put an event into the database
 *
 * TODO: modify to just take a date object
 * @param event = an event object storing the information to pass to the Firebase database
 */
function writeNewEvent(event: event, date: string) : void{
    const validID = nextValidID(date)
    console.log("validID: " + validID)
    const reference = ref(db, 'Dates/' + date + '/' + validID);

    set(reference, {
        eventID: validID,
        eventName: event.eventName,
        startTime: event.startTime,
        endTime: event.endTime,
        info: event.info
    }).then(() => {toast("\""+event.eventName + "\" added to the calendar!")}).catch((error) => {
        console.log(error);
        toast.error("There was an error submitting your event");

    })
}

/**
 * Remove the event from the database. TODO: then refresh
 * @param eventID: the ID of the event to be deleted
 * @param date: the date for the event
 */
function deleteEvent(eventID: number, date: string) : void {
    const reference = ref(db, 'Dates/' + date + '/' + eventID);
    console.log("delete: " + reference);
    remove(reference)
        .catch(()=>{toast.error("There was an error removing the event")})
        .then(()=>{toast.success("Event deleted!")})
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
function getAllDates() : {[date : string] : dateInfo} {
    const datesRef = ref(db, 'Dates/')
    // TODO: child() doesn't work? shitty workaround
    let retDates : {[date: string] : dateInfo} = {}
    // get all dates that have been added

    //TODO: figure out how to loop through the fucking keys
    // snapshot is of Dates
    onValue(datesRef, (dirSnapshot) => {
        // console.log("Onvalue was called " + dirSnapshot.key)
        // iterate and add each to return list
        //iterating through dates
        dirSnapshot.forEach((dateSnapshot) => {
            //TODO: could be an error depending on how date directories work "'/' creates an additional layer"
            // console.log("child of child" + dateSnapshot.key) // TODO:
            // add each event to date's event list
            let dateEvents : event[] = [];
            dateSnapshot.forEach((eventSnapshot) => {
                // console.log("event val: " + eventSnapshot.val())
                const currEvent = eventSnapshot.val();
                const newEvent = <event>({
                    eventID: currEvent.eventID,
                    startTime: currEvent.startTime,
                    endTime: currEvent.endTime,
                    eventName: currEvent.eventName,
                    info: currEvent.info
                });
                dateEvents.push(newEvent)
            })
            let dateName : string = ""+dateSnapshot.key
            // create date, add eventList to it, add to dateList
            const newDate =  <dateInfo>({
                date: dateName,
                events: dateEvents
            })
            retDates[dateName] = newDate
            // retDates.push(newDate)
        })
    });

    return retDates
}

export {getAllDates, writeNewEvent, deleteEvent}