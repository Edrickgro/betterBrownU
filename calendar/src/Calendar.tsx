import React, {useState} from 'react'
import Date from "./Date"
import {getAllDates, writeNewEvent} from './CalendarFB'

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

    function load_data () {
        setDateList(getCalendarInfo());
    }

    //TODO: figure out how to write a customizeable event
    function default_event () { 
      let event1 =  {
        eventName: "sport1",
        startTime: "8:00am",
        endTime: "10:00am",
        info: "it's behind the OMAC"
    }
    writeNewEvent(event1, "2022-05-01")
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


        // getAllDates()
        let dateInfoList : dateInfo[] = getAllDates()
        let fakeDatesArr : dateInfo[] 

        // hardcoded events
        // let eventList1 : event[] = [event1, event2]
        // let eventList2 : event[] = [event3, event4]
        // let eventList3 : event[] = [event5]
        // let date1 : dateInfo = {date: "10/31/2001", events: eventList1}
        // let date2 : dateInfo = {date: "2/13/2002", events: eventList2}
        // let date3 : dateInfo = {date: "6/14/2002", events: eventList3}
        
        // fakeDatesArr = [date1, date2, date3];

        fakeDatesArr = dateInfoList
        // TODO: weird bug
        // Whenever I use the dateInfo[] that my getAllDates returns, then I have to click twice to see the events
        // However, whenever the fakeDates that are hardcoded are used, only one click is needed
        // LIST has size 0 until the second button click (even if function is called twice in the code)
        console.log("dateInfoList is not empty: " + (dateInfoList.length != 0))
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
            <button onClick={load_data}>Click to load!</button>
            <button onClick={default_event}>Click to add default event</button>
            <div id={"date-list"}>
                {generateDates()}
            </div>
        </div>
    )
}

export default Calendar