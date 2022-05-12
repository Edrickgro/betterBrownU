import React, {useState} from 'react'
import AdderInput from "./AdderInput";
import Event from "./Event";
import {writeNewEvent} from "./CalendarFB";

function EventAdder() {
    const [showForm, setShowForm] = useState(false);
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
                <button onClick={()=>setShowForm(!showForm)}>Show adder menu</button>
        {showForm ? <div id={"event-adder-form"}>
            <button onClick={sendEventToBackend}>Add Event!</button>
            <AdderInput label={"Date (yyyy-mm-dd):"} change={setDate}/>
            <AdderInput label={"Event Name:"} change={setEventName}/>
            <AdderInput label={"Start Time:"} change={setEventStart}/>
            <AdderInput label={"End Time:"} change={setEventEnd}/>
            <AdderInput label={"Extra Info/Description:"} change={setEventInfo}/>
        </div> : null}
            </div>
}

export default EventAdder;