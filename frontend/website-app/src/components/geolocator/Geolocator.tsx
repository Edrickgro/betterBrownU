import React, {useState} from 'react';

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

function Geolocator() {

    const [geolocatorDatabase, setGeolocatorDatabase] = useState<string[][] | null>([
        ["Josiah's", "Josiah's, Josiahs, Jo's, Jos, Joe, Joes, Joe's, Joao", "busy"],
        ["Sharpe Refractory", "Sharpe Refractory, Ratty","a little busy"],
        ["Sciences Library", "Sciences Library, SciLi, Sci-Li", "not busy"],
        ["Barus and Holly", "Barus and Holly, Engineering Building, Engineering Lab","busy"],
    ])

    //getDatabase(setGeolocatorDatabase)

    return (
        <div id="geolocator" className="menu-item">
            <h3>Geolocator</h3>
            <button id="geolocatorButton" onClick={() => geoFindMe()}>Find my location</button>
            <p id = "status"></p>
            <a id = "map-link" target="_blank"></a>

            <div>Search a location:</div>
            <input placeholder="Search a location!" id="geolocator-search-bar" onChange={() => displayTable()}/>

            <table className="center">
                <thead id="header"></thead>
                <tbody id="body">
                {geolocatorDatabase?.map(
                    item =>
                        <tr className="table-row" id={item[1]}>
                            <td className="table-location">{item[0]}</td>
                            <td className={"table-" + item[2]}>{item[2]}</td>
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