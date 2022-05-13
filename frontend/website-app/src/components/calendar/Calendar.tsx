import React, {useState} from 'react'
import DateElement from "./Date"
import EventAdder from "./EventAdder"
import {getAllDates} from "./CalendarFB";
import "./Calendar.css"

//TODO is there a way to have this be a global type so I don't have to reimport
type event = {
    eventID : number;
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
    const [dateList, setDateList] = useState<{[date: string] : dateInfo}>()


    function load_data () {
        setDateList(getAllDates());
    }

    function getCalendarInfo() : {[date : string] : dateInfo}{
        let dateInfoList : {[date : string] : dateInfo} = getAllDates()
        return dateInfoList;
    }

    /**
     * Generate the date row objects based on what is gotten from the state.
     */
    function generateDates() {
        if (dateList === undefined) {
            return <p className={"date-error-message"}>Dates have not been generated yet. Click button above to load.</p>
        } else {
            console.log(dateList)
            let dates = [];
            for (let dateName in dateList) {
                console.log(dateName)
                dates.push(<DateElement date={dateList[dateName].date} events={dateList[dateName].events}/>);
            }
            return dates;
        }
    }

    return (
        <div className="menu-item calendar" onLoad={load_data}>
            <h3>Calendar</h3>
            <EventAdder/>
            <button onClick={load_data}>Click to (re)load!</button>
            <div id={"date-list"}>
                {generateDates()}
            </div>
        </div>
    )
}

export default Calendar