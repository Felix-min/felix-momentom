const body = document.querySelector(".container"),
    locationName = document.querySelector(".pic-location-name");

const IMG_NUMBER = 6;

function getLocationName(imageNumber) {
    if(imageNumber === 0) {
        locationName.innerText = "Easter Island, Chile"
    } else if(imageNumber === 1){
        locationName.innerText = "Newcastle Tyne Bridge, UK"
    } else if(imageNumber === 2) {
        locationName.innerText = "Troms, Norway"
    } else if(imageNumber === 3) {
        locationName.innerText = "Tokyo Tower, Japan"
    } else if(imageNumber === 4) {
        locationName.innerText = "Westminster & Big ban, UK"
    } else {
        locationName.innerText = "Yosemite National Park, USA"
    }
}

function paintImage(imageNumber) {
    const image = new Image();
    image.src = `images/${imageNumber + 1}.jpg`
    getLocationName(imageNumber);
    image.classList.add("bg-image");
    body.prepend(image);
}

function getRandom() {
    const number = Math.floor(Math.random() * IMG_NUMBER);
    return number;
}

function init() {
    const randomNumber = getRandom(); 
    paintImage(randomNumber);
}

init();