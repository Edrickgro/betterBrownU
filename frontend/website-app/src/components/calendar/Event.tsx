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
            <button className={"event-delete-button"} onClick={() => {deleteEvent(info.eventID, info.date)}}>Delete</button>
            <p className={"event-item-title"}>{info.eventName}</p>
            <p className={"event-item-time"}>From {info.startTime} to {info.endTime}</p>
            { (info.info!=null&&info.info!="") ?
                <p className={"event-item-info"}>Info: {info.info}</p> : null
            }
        </div>
    );
}

export default Event;