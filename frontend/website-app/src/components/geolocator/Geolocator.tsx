import React, { useState, useEffect } from 'react';
import { initializeApp } from 'firebase/app';
import { getDatabase, onValue, ref, runTransaction } from "firebase/database";

// Location interface used to represent campus locations
interface Location {

    Name: string
    Search: string
    Longitude: number
    Latitude: number
    Occupancy: number
    Max: number
    Radius: number
}

// User's campus location
let userLocation: Location | null = null;

// Ratio used to determine how busy a campus location is
const occupancyRatio = [0.33, 0.66];

// Initialize Firebase app
const firebaseApp = initializeApp({
    apiKey: "AIzaSyDLBfzKNUMzRvsP_LeiRf31EJ-mJPVtf0o",
    authDomain: "cs32termproject.firebaseapp.com",
    projectId: "cs32termproject",
    storageBucket: "cs32termproject.appspot.com",
    messagingSenderId: "586091400920",
    appId: "1:586091400920:web:a8a56afdc0bee2fd3ad1ad",
    measurementId: "G-VP24Q6Q0E3"

});

// Connect to Firebase database
const db = getDatabase();

// Decrements the occupancy of a campus location by 1
function decrement(ID: string){
    const db = getDatabase();
    const distanceRef = ref(db, 'Locations/' + ID);

    runTransaction(distanceRef, (post) => {
        if(post.Occupancy === 0){
            return post;
        }
        post.Occupancy--;
        return post
    });
}

// Increments the occupancy of a campus location by 1
function increment(ID: string){
    const db = getDatabase();
    const distanceRef = ref(db, 'Locations/' + ID);

    runTransaction(distanceRef, (post) => {
        post.Occupancy++;
        return post
    });
}

// Converts Firebase database into a list of Locations and returns that list
function getJsonList(setDatabase: React.Dispatch<React.SetStateAction<Location[]>>) {

    const db = getDatabase();
    const distanceRef = ref(db, 'Locations/');
    let isInitial = true;

    //iteration method (Location interface)
    onValue(distanceRef, (snapshot) =>{
        console.log("ERROR CHECK: ONVALUE COMPLETE.")
        let list: Location[] = [];
        let json = snapshot.val();
        for(let i in json) {
            let jsonObject: Location = JSON.parse(JSON.stringify(json[i]));
            list.push(jsonObject);
        }
        setDatabase(list)

        if (isInitial) {
            console.log("ERROR CHECK: INITIAL GETJSON")
            geoFindMe(list);
            isInitial = false;
        }
    });
}

// Finds the exact coordinates of user
function geoFindMe(database: Location[] | null) {

    const status: HTMLElement | null = document.getElementById("status")
    //const mapLink: HTMLAnchorElement | null = document.getElementById("map-link") as HTMLAnchorElement;
    const mapLink: HTMLIFrameElement | null = document.getElementById("openstreetmap") as HTMLIFrameElement;
    const table: HTMLTableElement = document.getElementById("geolocator-table") as HTMLTableElement;
    const map: HTMLElement = document.getElementById("geolocator-map") as HTMLElement;

    //mapLink!.href = '';
    //mapLink!.textContent = '';

    function success(position: any) {
        table.style.display = "";
        map.style.display = "";
        console.log("ERROR CHECK: GETTING LOCATION")
        const latitude  = position.coords.latitude;
        const longitude = position.coords.longitude;

        console.log("ERROR CHECK: COORDS ARE... lat: " + latitude + " long: " + longitude)
        checkUserCoords(database, [longitude, latitude])

        status!.textContent = '';
        //mapLink!.href = `https://www.openstreetmap.org/#map=18/${latitude}/${longitude}`;
        //mapLink!.textContent = `Latitude: ${latitude} °, Longitude: ${longitude} °`;

        const longitudeTest = longitude - 0.00125588884355 + 0.00005;
        const latitudeTest = latitude - 0.00078782516225 + 0.00005;

        const latitude2 = latitudeTest + 0.00251054763794;
        const longitude2 = longitudeTest + 0.00157298212822;

        mapLink!.src = `https://www.openstreetmap.org/export/embed.html?bbox=${longitudeTest}%2C${latitudeTest}%2C${longitude2}%2C${latitude2}&amp;layer=mapnik`;
    }

    function error() {
        table.style.display = "none";
        map.style.display = "none";
        status!.textContent = 'Unable to retrieve your location';
        alert("Please allow location sharing.");
    }

    if(!navigator.geolocation) {
        console.log("WORK");
        status!.textContent = 'Geolocation is not supported by your browser';
    } else {
        let options = {
            enableHighAccuracy: false,
            timeout: 5000,
            maximumAge: 0
        };
        status!.textContent = 'Locating…';
        navigator.geolocation.getCurrentPosition(success, error, options);
    }

}

/*
* Displays appropriate entries in the campus locations table when the search bar
* has an input.
*/
function displaySearch() {

    // Get HTML element corresponding to the search bar
    const searchBar: HTMLInputElement | null = document.getElementById("geolocator-search-bar") as HTMLInputElement

    // Get list of HTML elements corresponding to each row in the campus locations table
    const geolocatorList: HTMLElement[] | undefined[] = [].slice.call(document.getElementsByClassName("table-row"))

    // Check if either searchBar or geolocatorList is undefined or null
    if (!searchBar || !geolocatorList) {return;}

    // For each row, show or hide the row according to whether its search names
    // are included in the search bar input.
    geolocatorList.map(row => {
        if (!row) {return;}
        if (!row.id.toLowerCase().includes(searchBar.value.toLowerCase())) {
            row.style.display = "none"
        } else {
            row.style.display = ""
        }
    })
}

/*
* Determines if a user is in a campus location and modifies the occupancy of
* the corresponding campus location accordingly.
*/
function checkUserCoords(database: Location[] | null, userCoords: number[] | null) {

    // Check if database or userCoords is undefined or null
    if (!database || !userCoords) {return;}

    // Boolean corresponding to if the user is in a campus location
    let isInSomeLocation: boolean = false

    // Helper method that converts degrees to radians
    function toRadians(coord: number) {

        return coord * Math.PI / 180;
    }

    /*
    * Finds the distance between two coordinates and determines if the user's
    * coordinates in the location's predetermined radius.
    * Some code used from:
    * https://www.geeksforgeeks.org/program-distance-two-points-earth/
    */
    function isInRadius(radius: number, lon1: number, lat1: number, lon2: number, lat2: number): boolean {

        // Convert coordinates to radians
        lon1 =  toRadians(lon1);
        lon2 = toRadians(lon2);
        lat1 = toRadians(lat1);
        lat2 = toRadians(lat2);

        // Haversine formula
        let dlon = lon2 - lon1;
        let dlat = lat2 - lat1;
        let a = Math.pow(Math.sin(dlat / 2), 2)
            + Math.cos(lat1) * Math.cos(lat2)
            * Math.pow(Math.sin(dlon / 2),2);
        let c = 2 * Math.asin(Math.sqrt(a));

        // Radius of earth in kilometers
        let r = 6371;

        // Calculate the result in feet
        let distance = c * r * 3280.84

        // Return a boolean according to if the distance is less than or equal
        // to the given radius of a campus location
        return (distance <= radius);
    }

    /*
     * For each campus location, determine if the user's coordinates are within
     * a campus location
     */
    for (let location of database) {

        if (isInRadius(location.Radius, location.Longitude, location.Latitude, userCoords[0], userCoords[1])) {
            isInSomeLocation = true

            if (!userLocation) {
                // If user was not in a campus location before
                increment(location.Name)
                console.log("ERROR CHECK: location is..." + location.Name)
            } else if (location.Name !== userLocation.Name) {
                // If user moved from one campus location to another
                decrement(userLocation.Name)
                increment(location.Name)
            }

            // Set userLocation to the user's current location
            userLocation = location
            break;
        }
    }

    // If user was in a campus location but not any more
    if (!isInSomeLocation && userLocation) {
        decrement(userLocation.Name)
        userLocation = null
    }
}

// Determines how busy a campus location is
function findBusiness(location: Location): string {

    const maxArray = occupancyRatio.map(x => x*location.Max)
    const occupancy = location.Occupancy

    if (occupancy <= maxArray[0]) {
        return "not busy";
    } else if (occupancy <= maxArray[1]) {
        return "a little busy";
    } else {
        return "busy";
    }
}

// Function to add our give data into cache
function addDataIntoCache(cacheName: string, url: string, response: string) {
    // Converting our response into Actual Response form
    const data = new Response(JSON.stringify(response));

    if ('caches' in window) {
        // Opening given cache and putting our data into it
        caches.open(cacheName).then((cache) => {
            cache.put(url, data);
            alert('Data Added into cache!')
        });
    }
};

/*
* Main functional component of Geolocator.tsx.
* Initiates the database state and returns the HTML code for the Campus
* Locations page.
*/
function Geolocator() {

    console.log("ERROR CHECK: RENDER")

    const [database, setDatabase] = useState<Location[]>([])
    // Our state to store fetched cache data

    useEffect(() => {
        console.log("ERROR CHECK: useEffect 1")
        getJsonList(setDatabase)
        setInterval(() => geoFindMe(database), 600000) // 10 minutes
    }, []);

    // Function to get all cache data
    async function getAllCacheData() {
        var url = 'https://localhost:3000'

        // List of all caches present in browser
        var names = await caches.keys()

        let cacheDataArray: any[] = []

        // Iterating over the list of caches
        for (const name of names) {

            // Opening that particular cache
            const cacheStorage = await caches.open(name);

            // Fetching that particular cache data
            const cachedResponse = await cacheStorage.match(url);
            if (!cachedResponse) {
                console.log("ERROR CHECK: no cache")
                continue;
            }
            var data = await cachedResponse.json()

            // Pushing fetched data into our cacheDataArray
            cacheDataArray.push(data)
            //setCacheData(cacheDataArray.join(', '))
            console.log("ERROR CHECK: get cache... " + name + " " + cacheDataArray.join(', '))
        }
    };

    return (
        <main id="geolocatorMain">
            <section className="glassGeolocatorTable">
                <div id="geolocator" className="menu-item">
                    <h3 className="geoInlineBlock1" id="geoCampusLoc">Campus Locations</h3>
                    <button className="geoInlineBlock1" id="geolocator-load" onClick={() => {
                        geoFindMe(database)
                        console.log("ERROR CHECK: refresh")
                    }}>Click to Reload</button>
                    <button onClick={() => addDataIntoCache("MyCache", "https://localhost:3000", "check 1")}>hello cache!</button>
                    <button onClick={() => addDataIntoCache("UrmomCache", "https://localhost:3000", "hello")}>ur mom cache!</button>
                    <button onClick={() => getAllCacheData()}>get cache!</button>
                    <p id = "status"></p>

                    <div>
                        <h6 className="geoInlineBlock2">Search a location:</h6>
                        <input className="geoInlineBlock2" placeholder="Search a location!" id="geolocator-search-bar" onChange={() => displaySearch()}/>
                    </div>

                    <table id="geolocator-table">
                        <thead className="table-header" id="geolocator-table-header"></thead>
                        <tbody id="geolocator-table-body" className="table-body">
                            {database?.map(
                                item =>
                                    <tr className="table-row" id={"table-row-" + item.Search}>
                                        <td className="table-location" id={"table-name-" + item.Name}>{item.Name}</td>
                                        <td className={"table-" + findBusiness(item)} id={"table-business-" + item.Name}>{findBusiness(item)}</td>
                                        <td id={"table-occupancy-" + item.Name}>{item.Occupancy}</td>
                                    </tr>)}
                        </tbody>
                    </table>
                </div>
            </section>

            <section className = "glassGeolocatorMap" id="geolocator-map">
                <iframe id = "openstreetmap" src=''></iframe>
            </section>
        </main>
    );
}

export default Geolocator;

/**
 * <p id = "status"></p>
 <a id = "map-link" target="_blank"></a>
 *
 *
 <button onClick={() => increment("Andrews Commons")}>increment andrews</button>

 {database?.map(
                        item =>
                            <tr className="table-row" id={item.Search}>
                                <td className="table-location">{item.Name}</td>
                                <td className={"table-" + findBusiness(item)}>{findBusiness(item)}</td>
                                <td>{item.Occupancy}</td>
                            </tr>)}
 */