const weather = document.querySelector('.felix-weather');

const API_KEY = '78789b85104f423a10f9af91e9565f5e'; //openweathermap.org
const COORDS = 'coords';

function paintWeather(cityName, cityTemp){
    weather.innerText = cityName + " - " + cityTemp;
}

function getWeather(lat, lon) {
    fetch(
        `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`
    ).then(function(response){
        return response.json();
    })
    .then(function(json){
        paintWeather(json.name, json.main.temp);
    });
}

function saveCoords(coordsObj) {
    localStorage.setItem(COORDS, JSON.stringify(coordsObj));
}

function handleGeoSuccess(position) {
    console.log(position);
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;
    const coordsObj = {
        latitude,
        longitude
    };
    saveCoords(coordsObj);
    getWeather(latitude, longitude);
}

function handleGeoError() {
    console.log('cant access geo location')
}

function askForCoords() {
    navigator.geolocation.getCurrentPosition(handleGeoSuccess, handleGeoError);
}

function loadCoords() {
    const loadedCords = localStorage.getItem(COORDS);
    if(loadedCords === null) {
        askForCoords();
    } else {
        const parseCords = JSON.parse(loadedCords);
        getWeather(parseCords.latitude, parseCords.longitude);
        
    }
}

function init() {
    loadCoords();
}

init();