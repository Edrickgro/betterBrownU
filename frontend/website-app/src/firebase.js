// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getDatabase} from "firebase/database";
import { getAuth, GoogleAuthProvider, signInWithPopup, signOut } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyDLBfzKNUMzRvsP_LeiRf31EJ-mJPVtf0o",
    authDomain: "cs32termproject.firebaseapp.com",
    databaseURL: "https://cs32termproject-default-rtdb.firebaseio.com",
    projectId: "cs32termproject",
    storageBucket: "cs32termproject.appspot.com",
    messagingSenderId: "586091400920",
    appId: "1:586091400920:web:a8a56afdc0bee2fd3ad1ad",
    measurementId: "G-VP24Q6Q0E3"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth(app);
export const db = getDatabase();

const provider = new GoogleAuthProvider();
export let signedIn = false;
export const validIds = [];
let name = null;
let email = null;
let profilePic = null;


/**
 * This function is used whne you want to sign in. Using google auth it
 * fetches the users name, email and profile pic. It stores them in a local
 * storage, so it can be accessed by the account page
 */
export const signInWithGoogle = () => {
    signInWithPopup(auth, provider).then((result) => {
        name = result.user.displayName;
        email = result.user.email;
        profilePic = result.user.photoURL;
        signedIn = true;

        //to be used for associating account with events
        const token = result.user.uid;
        validIds.push(token);

        //store user information to be accessed by the account page
        localStorage.setItem("name", name);
        localStorage.setItem("email", email);
        localStorage.setItem("profilePic", profilePic)
    }).catch((error) => {
        console.log(error);
    });
}

/**
 * This function is used when you want a sign out to occur.
 * It resets the values stored in the local storage so that
 * it is no longer accessible.
 */
export const signOutofAccount = () => {
    signOut(auth, provider).then(() => {
        // @ts-ignore
        name = "";
        email = "";
        profilePic = "";
        signedIn = false;
        localStorage.setItem("name", name);
        localStorage.setItem("email", email);
        localStorage.setItem("profilePic", profilePic);
        console.log("signed out")
    });
}
