const form = document.querySelector(".js-form"), 
    input = form.querySelector("input"),
    greeting = document.querySelector('.js-greetings');


const User_Name = "currentUser",
    SHOWING_ON = "showing";

let greetingText = 'Hello';
    
function saveName(text) {
    localStorage.setItem(User_Name, text);
}

function getTime(){
    const date = new Date();
    const time = date.getHours;
    //console.log(time);

    if(time >= 4 && time <= 10) {
        greetingText = 'Good Morning'
    } else if(time<= 17) {
        greetingText = 'Good Afternoon'
    } else if(time <= 20) {
        greetingText = 'Good Evening'
    } else {
        greetingText = 'Good Night'
    }
}

function paintGreeting(text) {
    form.classList.remove(SHOWING_ON);
    greeting.classList.add(SHOWING_ON);
    getTime();
    greeting.innerText = `${greetingText}, ${text}`;
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