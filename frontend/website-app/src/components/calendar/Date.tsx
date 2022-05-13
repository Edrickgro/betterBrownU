import React from "react"
import Event from "./Event";


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

function DateElement (info : dateInfo) {
    function generate_events() {
        let eventObjects = [];
        for (let i = 0; i < info.events.length; i++) {
            eventObjects.push(
                <Event date = {info.date} eventID = {info.events[i].eventID}
                       eventName={info.events[i].eventName}
                       startTime={info.events[i].startTime}
                       endTime={info.events[i].endTime}
                       info={info.events[i].info}
                />);
        }
        return eventObjects;
    }
    return (
        <div className={"date-row"}>
            <h3 className={"date-header-date"}>{(new Date(info.date)).toLocaleString(undefined,{
                weekday: 'long',
                year: 'numeric',
                month: 'long',
                day: 'numeric'
            })}</h3>
            <div className={"dates"}>
                {generate_events()}
            </div>
        </div>
    )
}

export default DateElement