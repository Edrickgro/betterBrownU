import React, { useState } from 'react';
import {signOutofAccount} from "../../firebase";

function Account() {


    // @ts-ignore
    return (
      <div className="menu-item" id="account">
          <h3>Account</h3>

          <img src={"" + localStorage.getItem("profilePic")}/>
          <h3>User: {localStorage.getItem("name")}</h3>
          <h3>Email: {localStorage.getItem("email")}</h3>
          <button onClick={signOutofAccount}>Sign Out</button>
      </div>
    );
}

export default Account;