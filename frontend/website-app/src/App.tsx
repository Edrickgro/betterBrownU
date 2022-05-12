import React from 'react';
import './App.css';
import Menu from "./components/navigation/Navigation";
import { NavLink } from "react-router-dom";
import Home from "./components/home/Home";
import Geolocator from "./components/geolocator/Geolocator";
import Calendar from "./components/calendar/Calendar";
import Account from "./components/account/Account";


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
