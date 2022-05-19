import React, {useState} from 'react'
import AdderInput from "./AdderInput";
import {writeNewEvent} from "./CalendarFB";
import {toast, Toaster} from "react-hot-toast";

function EventAdder(props: any) {
    const [showForm, setShowForm] = useState(false);
    const [dateName, setDate] = useState("");
    const [newEventName, setEventName] = useState("");
    const [newEventStart, setEventStart] = useState("");
    const [newEventEnd, setEventEnd] = useState("");
    const [eventInfo, setEventInfo] = useState("");

    function sendEventToBackend() : boolean {
        if (dateName==="" || newEventName==="" || newEventStart==="" || newEventEnd ==="") {
            toast.error("a necessary field is empty");
            return false;
        } else {
            let newEvent = {
                eventID: 0, //will get overwritten
                eventName : newEventName,
                startTime : newEventStart,
                endTime : newEventEnd,
                info: eventInfo
            }
            if (Date.parse(dateName + " " + newEventStart) < Date.parse(dateName + " " + newEventEnd)) {
                return writeNewEvent(newEvent, dateName);
            } else {
                toast.error("Start time needs to be after end time")
                return false;
            }
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
                            if (sendEventToBackend()) {
                                setShowForm(false);
                            }
                        }}>Add Event!</button>
                    </div> : null}
                </div>
            </div>
}

export default EventAdder;