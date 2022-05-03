import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
//import './App.css';
import App from './components/App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter as Router, Route, Routes} from "react-router-dom";
import Navigation from "./components/navigation/Navigation";
import Home from "./components/home/Home";
import Calendar from "./components/calendar/Calendar";
import Geolocator from "./components/geolocator/Geolocator";
import Account from "./components/account/Account";

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
    <Router>
        <Navigation/>
        <Routes>
            <Route path="/" element={<Home/>}/>
            <Route path="/calendar" element={<Calendar/>}/>
            <Route path="/campus-locations" element={<Geolocator/>}/>
            <Route path="/account" element={<Account/>}/>
        </Routes>
    </Router>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
