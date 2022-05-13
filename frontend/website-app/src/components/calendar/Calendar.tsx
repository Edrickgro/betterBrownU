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


    /**
     *
     */
    function load_data () {
        let dateInfoList : {[date : string] : dateInfo} = getAllDates()
        setDateList(dateInfoList);
        // incorporateRSSFeed();
    }

    /**
     * Pulls froms the specified RSS feed to add it to the list.
     * @param currentInfo The current dictionary of dates
     */
    function incorporateRSSFeed() : void {
        const RSS_URL : string = "https://events.brown.edu/live/rss/events/header/All%20Events";
        fetch(RSS_URL).then(response => response.text())
            .then(str => new window.DOMParser().parseFromString(str, "text/xml"))
            .then(data => {
            const items = data.querySelectorAll("item");
            console.log(data)
            items.forEach(el => {
                let titleObject = el.querySelector("title")
                let dateObject = el.querySelector("pubDate")
                let eventTitle : string = "";
                let pubDate : string = "";
                let dateAbbreviated : string = ""
                let dateRaw : Date;
                if (titleObject != null) {
                    eventTitle = titleObject.innerHTML
                }
                if (dateObject != null) {
                    pubDate = dateObject.innerHTML
                    dateRaw = new Date(pubDate)
                    dateAbbreviated = dateRaw.toISOString().split('T')[0]
                }

                const newEvent = {
                    eventID: -1,
                    startTime: "0:01",
                    endTime: "11:59",
                    eventName: eventTitle,
                    info: "Event through Brown University Portal"
                };
                if (dateList) {
                    if (dateList[dateAbbreviated]) {
                        dateList[dateAbbreviated].events.push(newEvent)
                    }
                    console.log(dateList[dateAbbreviated])
                }
            })
        })
    }

    /**
     * Generate the date row objects based on what is gotten from the state.
     */
    function generateDates() {
        if (dateList === undefined) {
            return <p className={"date-error-message"}>Dates have not been generated yet. Click button above to load.</p>
        } else {
            let dates = [];
            for (let dateName in dateList) {
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