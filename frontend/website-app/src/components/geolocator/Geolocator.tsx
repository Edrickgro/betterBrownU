import React, {useState} from 'react';

interface Location {

    Name: string
    Search: string
    Longitude: number
    Latitude: number
    Occupancy: number
    Max: number
    Radius: number
}

const occupancyRatio = [0.33, 0.66];

function geoFindMe(setUserCoords: React.Dispatch<React.SetStateAction<number[] | null>>) {

    const status: HTMLElement | null = document.getElementById("status")
    const mapLink: HTMLAnchorElement | null = document.getElementById("map-link") as HTMLAnchorElement;

    mapLink!.href = '';
    mapLink!.textContent = '';

    function success(position: any) {
        const latitude  = position.coords.latitude;
        const longitude = position.coords.longitude;
        setUserCoords([longitude, latitude])

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

function checkUserCoords(database: Location[] | null,
                         userCoords: number[] | null,
                         userLocation: Location | null,
                         setUserLocation: React.Dispatch<React.SetStateAction<Location | null>>) {

    if (!database || !userCoords) {return;}
    let isInSomeLocation: boolean = false

    function isInRadius(radius: number, x1: number, y1: number, x2: number, y2: number) {

        let distance = Math.sqrt(Math.pow(x1 - x2, 2) + Math.pow(y1 - y2, 2));

        return (distance <= radius);
    }

    for (let location of database) {

        if (isInRadius(location.Radius, location.Longitude, location.Latitude, userCoords[0], userCoords[1])) {
            isInSomeLocation = true

            // If user was not in a campus location before
            if (!userLocation) {
                // TODO: increment location occupancy by one
                // TODO: update database and database state
                return;
            }

            // If user is in the same campus location as before
            if (location.Name === userLocation.Name) {return;}

            // If user moved from one campus location to another
            // TODO: subtract location occupancy by one
            setUserLocation(location)
        }
    }

    // If user was in a campus location but not any more
    if (!isInSomeLocation && userLocation) {
        // TODO: subtract location occupancy by one
        setUserLocation(null);
    }
}

function business(location: Location) {

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

function Geolocator() {

    var location1: Location = { Name:"Josiah's", Search:"Josiah's, Josiahs, Jo's, Jos, Joe, Joes, Joe's, Joao", Occupancy: 1, Longitude: 0, Latitude: 0, Max:100, Radius:0}
    var location2: Location = { Name:"Sharpe Refectory", Search:"Sharpe Refractory, Sharpe Refectory, Ratty", Occupancy:90, Longitude: 0, Latitude: 0,Max:100, Radius:0}
    var location3: Location = { Name:"Science Library", Search:"Sciences Library, SciLi, Sci-Li", Occupancy:100, Longitude: 0, Latitude: 0,Max: 100, Radius:0}
    var location4: Location = { Name:"Barus and Holly", Search:"Barus and Holly, Engineering Building, Engineering Lab", Occupancy:50, Longitude: 0, Latitude: 0,Max:100, Radius:0}

    /**["Josiah's", "Josiah's, Josiahs, Jo's, Jos, Joe, Joes, Joe's, Joao", "busy"],
     ["Sharpe Refectory", "Sharpe Refractory, Sharpe Refectory, Ratty", "a little busy"],
     ["Sciences Library", "Sciences Library, SciLi, Sci-Li", "not busy"],
     ["Barus and Holly", "Barus and Holly, Engineering Building, Engineering Lab","busy"],*/

    const [database, setDatabase] = useState<Location[] | null>([location1, location2, location3, location4])
    const [userCoords, setUserCoords] = useState<number[] | null>(null)
    const [userLocation, setUserLocation] = useState<Location | null>(null)

    // TODO: set database state
    //geoFindMe(setUserCoords)
    //checkUserCoords(database, userCoords, userLocation, setUserLocation)

    return (
        <div id="geolocator" className="menu-item">
            <h3>Campus Locations</h3>
            <button id="geolocatorButton" onClick={() => geoFindMe(setUserCoords)}>Find my location</button>
            <p id = "status"></p>
            <a id = "map-link" target="_blank"></a>

            <div>Search a location:</div>
            <input placeholder="Search a location!" id="geolocator-search-bar" onChange={() => displayTable()}/>

            <table>
                <thead className="table-header"></thead>
                <tbody className="table-body">
                {database?.map(
                    item =>
                        <tr className="table-row" id={item.Search}>
                            <td className="table-location">{item.Name}</td>
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
 */