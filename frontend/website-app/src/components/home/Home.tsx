import React, { useState } from 'react';
import { signInWithGoogle} from "../../firebase";
import '../home/button.css'

function Home() {

    return (
        <div className="menu-item" id="home">
            <h3>Home</h3>
            <div>Welcome to the Better BrownU Website! Please sign in with your Brown email to get started.</div>
            <button className={"login-with-google-btn"} onClick={ signInWithGoogle }>Sign In With Google</button>
            <div>Go to the calendar to see all the exciting
            events Brown has to offer or go to the campus location page to see how busy campus
            locations are.
            </div>

        </div>
    );
}

export default Home;