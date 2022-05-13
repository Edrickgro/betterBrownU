import React, {useState} from 'react'
import AdderInput from "./AdderInput";
import Event from "./Event";
import {writeNewEvent} from "./CalendarFB";
import {Toaster} from "react-hot-toast";

function EventAdder(props: any) {
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
                eventID: 0, //will get overwritten
                eventName : newEventName,
                startTime : newEventStart,
                endTime : newEventEnd,
                info: eventInfo
            }
            writeNewEvent(newEvent, dateName);
        }
    }

    return  <div className={"event-adder"}>
                <Toaster/>
                <button onClick={()=>setShowForm(!showForm)}>Add an Event</button>
                <div className={"event-adder-form-wrapper"}>
                    {showForm ? <div className={"event-adder-form"}>
                        <AdderInput label={"Date:"} change={setDate} type={"date"}/>
                        <AdderInput label={"Event Name:"} change={setEventName} type={"text"}/>
                        <AdderInput label={"Start Time:"} change={setEventStart} type={"time"}/>
                        <AdderInput label={"End Time:"} change={setEventEnd} type={"time"}/>
                        <AdderInput label={"Extra Info/Description:"} change={setEventInfo} type={"text"}/>
                        <button onClick={()=>{
                            sendEventToBackend();
                            setShowForm(false);
                        }}>Add Event!</button>
                    </div> : null}
                </div>
            </div>
}

export default EventAdder;