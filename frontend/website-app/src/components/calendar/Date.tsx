import React from "react"
import Event from "./Event";


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

function Date (info : dateInfo) {
    function generate_events() {
        let eventObjects = [];
        for (let i = 0; i < info.events.length; i++) {
            eventObjects.push(
                <Event eventName={info.events[i].eventName}
                       startTime={info.events[i].startTime}
                       endTime={info.events[i].endTime}
                       info={info.events[i].info}
                />);
        }
        return eventObjects;
    }
    return (
        <div className={"date-row"}>
            <h3 className={"date-header-date"}>Date: {info.date}</h3>
            <div className={"dates"}>
                {generate_events()}
            </div>
        </div>
    )
}

export default Date