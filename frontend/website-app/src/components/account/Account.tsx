import React, { useState } from 'react';
import {signInWithGoogle} from "../../firebase";
import "./account.css"

function Account() {

    return (
      <div className="menu-item" id="account">
          <h3>Account</h3>
          <button onClick={ signInWithGoogle }>Sign In With Google</button>
          <h1>{localStorage.getItem("name")}</h1>
          <h1>{localStorage.getItem("email")}</h1>
      </div>


    );
}

export default Account;