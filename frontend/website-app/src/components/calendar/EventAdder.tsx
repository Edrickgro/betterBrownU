import React, {useState} from 'react'
import AdderInput from "./AdderInput";
import Event from "./Event";
import {writeNewEvent} from "./CalendarFB";

function EventAdder() {
    const [dateName, setDate] = useState("");
    const [newEventName, setEventName] = useState("");
    const [newEventStart, setEventStart] = useState("");
    const [newEventEnd, setEventEnd] = useState("");
    const [eventInfo, setEventInfo] = useState("");

    function sendEventToBackend() {
        if (dateName==="" || newEventName==="" || newEventStart==="" || newEventEnd ==="") {
            console.log("a necessary field is empty");
        } else {
            let newEvent = {
                eventName : newEventName,
                startTime : newEventStart,
                endTime : newEventEnd,
                info: eventInfo
            }
            writeNewEvent(newEvent, dateName);
        }
    }

    return  <div className={"event-adder"}>
                <button onClick={sendEventToBackend}>Add Event!</button>
                <div id={"event-adder-form"}>
                    <AdderInput label={"Date (yyyy-mm-dd):"} change={setDate}/>
                    <AdderInput label={"Event Name:"} change={setEventName}/>
                    <AdderInput label={"Start Time:"} change={setEventStart}/>
                    <AdderInput label={"End Time:"} change={setEventEnd}/>
                    <AdderInput label={"Extra Info/Description:"} change={setEventInfo}/>
                </div>
            </div>
}

export default EventAdder;