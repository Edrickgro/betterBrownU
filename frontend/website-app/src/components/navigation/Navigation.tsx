import React, { useState } from 'react';
import { NavLink } from "react-router-dom";

function Navigation() {

    return (

        <div className="navigation">
            <nav className="navbar">
                <div>
                    <a href="https://www.brown.edu/">
                        <img className="brown-logo-img" src="brown-logo-white.png"/>
                    </a>
                </div>

                <div className="navbar-items">
                    <NavLink className="nav-link" to="/">
                        Home
                        <span className="sr-only">(current)</span>
                    </NavLink>

                    <NavLink className="nav-link" to="/calendar">
                        Calendar
                    </NavLink>

                    <NavLink className="nav-link" to="/campus-locations">
                        Campus Locations
                    </NavLink>

                    <NavLink className="nav-link" to="/account">
                        Account
                    </NavLink>
                </div>
            </nav>
        </div>
    );
}

export default Navigation;

/**
 <div className="Menu">
 <ul>
 <li><button className="menu-item-button" onClick={() => setDisplay("home")}><span>Home</span></button></li>
 <li><button className="menu-item-button" onClick={() => setDisplay("calendar")}><span>Calendar</span></button></li>
 <li><button className="menu-item-button" onClick={() => setDisplay("geolocator")}><span>Campus Locations</span></button></li>
 <li><button className="menu-item-button" onClick={() => {}}><span>Forums</span></button></li>
 <li><button className="menu-item-button" onClick={() => setDisplay("account")}><span>Account</span></button></li>
 </ul>
 </div>


 function changeDisplay(display: String) {


    const geolocator: HTMLElement | null = document.getElementById("geolocator")
    const calendar: HTMLElement | null = document.getElementById("calendar")

    const menuItemList: HTMLElement[] | undefined[] = [].slice.call(document.getElementsByClassName("menu-item"))

    if (!geolocator || !calendar || !menuItemList) {
        return;
    }
    console.log("changing display... " + display)


    menuItemList.map(item => {

        if (!item) {
            return;
        }
        if (item.id === display) {
            item.style.display = "block"
        } else {
            item.style.display = "none"
        }
    })
}



 const [display, setDisplay] = useState<String>("home")
 {changeDisplay(display)}
 */

/**<NavLink className="navbar-brand" to="/">
 Brown University
 </NavLink>


 <ul className="navbar-nav ml-auto">
 <li className="nav-item">
 <NavLink className="nav-link" to="/">
 Home
 <span className="sr-only">(current)</span>
 </NavLink>
 </li>
 <li className="nav-item">
 <NavLink className="nav-link" to="/calendar">
 <span>Calendar</span>
 </NavLink>
 </li>
 <li className="nav-item">
 <NavLink className="nav-link" to="/campuslocations">
 Campus Locations
 </NavLink>
 </li>
 <li className="nav-item">
 <NavLink className="nav-link" to="/account">
 Account
 </NavLink>
 </li>
 </ul>*/