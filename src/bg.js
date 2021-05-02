const body = document.querySelector(".container");

const IMG_NUMBER = 3;

function handleImgLoad() {

}

function paintImage(imageNumber) {
    const image = new Image();
    image.src = `images/${imageNumber + 1}.jpg`
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