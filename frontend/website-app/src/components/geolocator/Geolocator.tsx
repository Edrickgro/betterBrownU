import React, {useState} from 'react';
import {Simulate} from "react-dom/test-utils";

type Location = {

    name: string
    search: string
    coordinates: number[]
    occupancy: number //TODO: change this
    maxOccupancy: number
    radius: number
}

const occupancyRatio = 0.5;

function geoFindMe() {

    const status: HTMLElement | null = document.getElementById("status")
    const mapLink: HTMLAnchorElement | null = document.getElementById("map-link") as HTMLAnchorElement;

    mapLink!.href = '';
    mapLink!.textContent = '';

    function success(position: any) {
        const latitude  = position.coords.latitude;
        const longitude = position.coords.longitude;

        status!.textContent = '';
        mapLink!.href = `https://www.openstreetmap.org/#map=18/${latitude}/${longitude}`;
        mapLink!.textContent = `Latitude: ${latitude} °, Longitude: ${longitude} °`;
    }

    function error() {
        status!.textContent = 'Unable to retrieve your location';
    }

    if(!navigator.geolocation) {
        console.log("WORK");
        status!.textContent = 'Geolocation is not supported by your browser';
    } else {
        status!.textContent = 'Locating…';
        navigator.geolocation.getCurrentPosition(success, error);
    }

}

function displayTable() {

    const searchBar: HTMLInputElement | null = document.getElementById("geolocator-search-bar") as HTMLInputElement
    const geolocatorList: HTMLElement[] | undefined[] = [].slice.call(document.getElementsByClassName("table-row"))

    if (!searchBar || !geolocatorList) {return;}

    geolocatorList.map(row => {
        if (!row) {return;}
        if (!row.id.toLowerCase().includes(searchBar.value.toLowerCase())) {
            row.style.display = "none"
        } else {
            row.style.display = ""
        }
    })

}

function getDatabase(setDatabase: React.Dispatch<React.SetStateAction<string[][] | null>>) {
    fetch("http://localhost:4567/table", {
        method: 'GET',
        headers: {
            "Access-Control-Allow-Origin": "*"
        }
    })
        .then((response: Response) => response.json())
        .then((db: string[][]) => {
            setDatabase(db)
        })
        .catch((error: any) => console.error("ERROR:", error))
}





function isInRadius(radius: number, coords1: number[], coords2: number[]) {

    let x1 = coords1[0];
    let y1 = coords1[1];
    let x2 = coords2[0];
    let y2 = coords2[1];

    let distance = Math.sqrt(Math.pow(x1 - x2, 2) + Math.pow(y1 - y2, 2));

    return (distance <= radius);
}

function iterateDatabase(database: Location[], userCoords: number[]) {

    for (let location of database) {

        if (isInRadius(location.radius, location.coordinates, userCoords)) {
            //TODO: increment location occupancy by one
        }
    }

}

function business(location: Location) {

    if (location.occupancy <= location.maxOccupancy*occupancyRatio) {
        return "not busy"
    } else {
        return "busy"
    }
}

function Geolocator() {

    var location1: Location = { name:"Josiah's", search:"Josiah's, Josiahs, Jo's, Jos, Joe, Joes, Joe's, Joao", occupancy: 1, coordinates:[0,0], maxOccupancy:100, radius:0}
    var location2: Location = { name:"Sharpe Refectory", search:"Sharpe Refractory, Sharpe Refectory, Ratty", occupancy:90, coordinates:[0,0], maxOccupancy:100, radius:0}
    var location3: Location = { name:"Science Library", search:"Sciences Library, SciLi, Sci-Li", occupancy:100, coordinates:[0,0], maxOccupancy:100, radius:0}
    var location4: Location = { name:"Barus and Holly", search:"Barus and Holly, Engineering Building, Engineering Lab", occupancy:0, coordinates:[0,0], maxOccupancy:100, radius:0}

    /**["Josiah's", "Josiah's, Josiahs, Jo's, Jos, Joe, Joes, Joe's, Joao", "busy"],
     ["Sharpe Refectory", "Sharpe Refractory, Sharpe Refectory, Ratty", "a little busy"],
     ["Sciences Library", "Sciences Library, SciLi, Sci-Li", "not busy"],
     ["Barus and Holly", "Barus and Holly, Engineering Building, Engineering Lab","busy"],*/

    const [database, setDatabase] = useState<Location[] | null>([location1, location2, location3, location4])

    //getDatabase(setGeolocatorDatabase)

    return (
        <div id="geolocator" className="menu-item">
            <h3>Geolocator</h3>
            <button id="geolocatorButton" onClick={() => geoFindMe()}>Find my location</button>
            <p id = "status"></p>
            <a id = "map-link" target="_blank"></a>

            <div>Search a location:</div>
            <input placeholder="Search a location!" id="geolocator-search-bar" onChange={() => displayTable()}/>

            <table>
                <thead id="header"></thead>
                <tbody id="body">
                {database?.map(
                    item =>
                        <tr className="table-row" id={item.search}>
                            <td className="table-location">{item.name}</td>
                            <td className={"table-" + business(item)}>{business(item)}</td>
                        </tr>)}
                </tbody>
            </table>
        </div>
    );
}

export default Geolocator;

/**
 {geolocatorDatabase?.map(item =>
                <div className="geolocator-location" id={item[1]}>
                {item[0] + ": " + item[2]}
                </div>)}
 */