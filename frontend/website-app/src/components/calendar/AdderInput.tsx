import React from "react"

type adderProps = {
    type: string,
    label: string,
    change: Function,
}

function AdderInput(props: adderProps) {
    return <div className={"adder-input"}>
                <label>{props.label}</label>
                <input type={props.type} onChange={event => {props.change(event.target.value)}}></input>
            </div>
}

export default AdderInput;