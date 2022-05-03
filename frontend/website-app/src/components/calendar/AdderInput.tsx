import React from "react"

function AdderInput(props: any) {
    return <div className={"adder-input"}>
                <label>{props.label}</label>
                <input type="text" onChange={event => {props.change(event.target.value)}}></input>
            </div>
}

export default AdderInput;