import React, { useState } from 'react';

function changeDisplay(display: String) {


    const geolocator: HTMLElement | null = document.getElementById("geolocator")
    const calendar: HTMLElement | null = document.getElementById("calendar")

    const menuItemList: HTMLElement[] | undefined[] = [].slice.call(document.getElementsByClassName("menu-item"))

    if (!geolocator || !calendar || !menuItemList) {return;}
    console.log("changing display... " + display)



    menuItemList.map(item => {

        if (!item) {return;}
        if (item.id === display) {
            item.style.display = "block"
        } else {
            item.style.display = "none"
        }
    })
}

function Menu() {

    const [display, setDisplay] = useState<String>("home")
    {changeDisplay(display)}
    return (

        <div className="Menu">
            <ul>
                <li><button className="menu-item-button" onClick={() => setDisplay("home")}><span>Home</span></button></li>
                <li><button className="menu-item-button" onClick={() => setDisplay("calendar")}><span>Calendar</span></button></li>
                <li><button className="menu-item-button" onClick={() => setDisplay("geolocator")}><span>Campus Locations</span></button></li>
                <li><button className="menu-item-button" onClick={() => {}}><span>Forums</span></button></li>
                <li><button className="menu-item-button" onClick={() => setDisplay("account")}><span>Account</span></button></li>
            </ul>
        </div>
    );
}

export default Menu;