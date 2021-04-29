const form = document.querySelector(".js-form"), 
    input = form.querySelector("input"),
    greeting = document.querySelector('.js-greetings');


const User_Name = "currentUser",
    SHOWING_ON = "showing";

    
function saveName(text) {
    localStorage.setItem(User_Name, text);
}

function paintGreeting(text) {
    form.classList.remove(SHOWING_ON);
    greeting.classList.add(SHOWING_ON);
    greeting.innerText = `Hello ${text}`;
}

function handleSubmit(event) {
    event.preventDefault();
    const currentValue = input.value;
    //console.log(currentValue);
    paintGreeting(currentValue);
    saveName(currentValue);
}

function askForName() {
    form.classList.add(SHOWING_ON);
    form.addEventListener("submit", handleSubmit);
}

function loadName() {
    const currentUser = localStorage.getItem(User_Name);
    if(currentUser === null) {
        askForName();
    } else {
        paintGreeting(currentUser);
    }
}

function init() {
    loadName();
    //localStorage.setItem("name", input);
    //input.innerText = localStorage.getItem("name");
}

init();