import React from "react";
import {deleteEvent} from './CalendarFB'

type event = {
    date : string;
    eventID : number
    eventName : string;
    startTime : string;
    endTime : string;
    info : string;
}

function Event (info : event) {
    return (
        <div className={"event-item"}>
            <button onClick={() => {deleteEvent(info.eventID, info.date)}}>Delete</button>
            <p className={"event-item-info"}>{info.eventName}</p>
            <p className={"event-item-start-time"}>Start time: {info.startTime}</p>
            <p className={"event-item-end-time"}>End time: {info.endTime}</p>
            <p className={"event-item-info"}>Info: {info.info}</p>
        </div>
    );
}

export default Event;