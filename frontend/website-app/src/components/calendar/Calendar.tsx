import React, {useState} from 'react'
import Date from "./Date"
import {signedIn, signInWithGoogle, validIds} from "../../firebase";

//TODO is there a way to have this be a global type so I don't have to reimport
type event = {
    eventName : string;
    startTime : string;
    endTime : string;
    info : string;
}

type dateInfo = {
    date : string;
    events : event[];
}

/**
 * Returns the construction of a full calendar app div object, in theory containing rows of dates and the events
 * contained within each.
 * @constructor
 */
function Calendar () {
    const [dateList, setDateList] = useState<dateInfo[]>()
    /**
     * TODO REPLACE THIS FUNCTION WITH BACKEND STUFF WHEN READY.
     * Currently filled with/returning fake dates.
     */

    function load_data () {

        if(signedIn) {
            setDateList(getCalendarInfo());
        }else {
            signInWithGoogle();
        }


    }

    function getCalendarInfo() : dateInfo[]{
        let event1 =  {
            eventName: "sport1",
            startTime: "8:00am",
            endTime: "10:00am",
            info: "it's behind the OMAC"
        }
        let event2 = {
            eventName: "sport2",
            startTime: "5:00pm",
            endTime: "7:30pm",
            info: "brown school spirit rah rah"
        }
        let event3 = {
            eventName: "acapella",
            startTime: "9:00pm",
            endTime: "11:00pm",
            info: "we have so many acapella troupes at this school"
        }
        let event4 = {
            eventName: "concert",
            startTime: "3:00pm",
            endTime: "7:00pm",
            info: "I feel like we have more theaters than we use"
        }
        let event5 = {
            eventName: "Bill Clinton Speaking??",
            startTime: "5pm",
            endTime: "6pm",
            info: "located somewhere in watson"
        }

        let eventList1 : event[] = [event1, event2]
        let eventList2 : event[] = [event3, event4]
        let eventList3 : event[] = [event5]

        let date1 : dateInfo = {date: "10/31/2001", events: eventList1}
        let date2 : dateInfo = {date: "2/13/2002", events: eventList2}
        let date3 : dateInfo = {date: "6/14/2002", events: eventList3}

        let fakeDatesArr : dateInfo[] = [date1, date2, date3];

        return fakeDatesArr;
    }

    /**
     * Generate the date row objects based on what is gotten from the state.
     */
    function generateDates() {
        if (dateList === undefined) {
            return <p>Dates have not been generated yet</p>
        } else {
            let dates = [];
            for (let i = 0; i<dateList.length; i++) {
                dates.push(<Date date={dateList[i].date} events={dateList[i].events}/>);
            }
            return dates;
        }
    }

    return (
        <div className={"calendar"}>
            <h3>Calendar</h3>
            <button onClick={load_data}>Click to load!</button>
            <div id={"date-list"}>
                {generateDates()}
            </div>
        </div>
    )
}

export default Calendar