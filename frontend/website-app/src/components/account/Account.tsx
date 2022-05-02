import React, { useState } from 'react';
import {signInWithGoogle, signOutofAccount} from "../../firebase";
import "./account.css"

function Account() {

    return (
      <div className="menu-item" id="account">
          <h3>Account</h3>
          <h3>User: {localStorage.getItem("name")}</h3>
          <h3>Email: {localStorage.getItem("email")}</h3>
          <button onClick={signOutofAccount}>Sign Out</button>
      </div>


    );
}

export default Account;