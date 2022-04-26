import React from 'react';
import '../App.css';
import Menu from "./Menu";
import Home from "./Home";
import Geolocator from "./Geolocator";
import Calendar from "./Calendar";
import Account from "./Account";


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

      <Home/>
      <Geolocator/>
      <Calendar/>
      <Account/>
    </div>
  );
}

export default App;

/*
<div className="header-title">unify</div>
 */
