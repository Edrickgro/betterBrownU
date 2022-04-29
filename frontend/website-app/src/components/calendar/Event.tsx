import React from "react";

type event = {
    eventName : string;
    startTime : string;
    endTime : string;
    info : string;
}

function Event (info : event) {
    return (
        <div className={"event-item"}>
            <p className={"event-item-info"}>{info.eventName}</p>
            <p className={"event-item-start-time"}>Start time: {info.startTime}</p>
            <p className={"event-item-end-time"}>End time: {info.endTime}</p>
            <p className={"event-item-info"}>Info: {info.info}</p>
        </div>
    );
}

export default Event;