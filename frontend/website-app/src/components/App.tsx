import React from 'react';
import '../App.css';
import Menu from "./navigation/Navigation";
import { NavLink } from "react-router-dom";
import Home from "./home/Home";
import Geolocator from "./geolocator/Geolocator";
import Calendar from "./calendar/Calendar";
import Account from "./account/Account";


function App() {
  return (
    <div className="App">


      <header className="App-header">
          <div>
              <a href="https://www.brown.edu/">
                  <img className="brown-logo-img" src="brown-logo-white.png"/>
              </a>
              <Menu/>
          </div>
      </header>
    </div>
  );
}

export default App;

/*
<div className="header-title">unify</div>

    <Home/>
      <Geolocator/>
      <Calendar/>
      <Account/>
 */
