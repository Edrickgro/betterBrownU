"use strict";
function geoFindMe() {
    const status = document.getElementById("status");
    const mapLink = document.getElementById("map-link");
    mapLink.href = '';
    mapLink.textContent = '';
    function success(position) {
        const latitude = position.coords.latitude;
        const longitude = position.coords.longitude;
        status.textContent = '';
        mapLink.href = `https://www.openstreetmap.org/#map=18/${latitude}/${longitude}`;
        mapLink.textContent = `Latitude: ${latitude} °, Longitude: ${longitude} °`;
    }
    function error() {
        status.textContent = 'Unable to retrieve your location';
    }
    if (!navigator.geolocation) {
        console.log("WORK");
        status.textContent = 'Geolocation is not supported by your browser';
    }
    else {
        status.textContent = 'Locating…';
        navigator.geolocation.getCurrentPosition(success, error);
    }
}
document.querySelector('#find-me').addEventListener('click', geoFindMe);
