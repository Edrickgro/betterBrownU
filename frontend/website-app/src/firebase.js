// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
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

const provider = new GoogleAuthProvider();
export let signedIn = false;
export const validIds = [];


export const signInWithGoogle = () => {
    signInWithPopup(auth, provider).then((result) => {
        const name = result.user.displayName;
        const email = result.user.email;
        signedIn = true;
        const token = result.user.uid;
        validIds.push(token);
        localStorage.setItem("name", name);
        localStorage.setItem("email", email);
    }).catch((error) => {
        console.log(error);
    });
}

export const signOutofAccount = () => {
    signOut(auth, provider).then(() => {
        // @ts-ignore
        const name = provider.displayName;
        const email = null;
        localStorage.setItem("name", name);
        localStorage.setItem("email", email);
        console.log("signed out")
    });
}