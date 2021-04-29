const toDoForm = document.querySelector('.todo-form'),
    toDoInput = toDoForm.querySelector('input'),
    pendingLists= document.querySelector('.pending-task-lists'),
    finishedLists= document.querySelector('.finished-task-lists');

const TODOS_LIST = 'toDos';
let toDos = [];
const TODOSDONE_LIST = 'toDosDone';
let toDosDone = [];

function saveToDosDone() {
    localStorage.setItem(TODOSDONE_LIST, JSON.stringify(toDosDone));
}

function deleteToDosDone(event) {
    const btn = event.target;
    const li = btn.parentNode;
    finishedLists.removeChild(li);
    const cleanToDosDone = toDosDone.filter(function(toDoDone) { //filter
        return toDoDone.id !== parseInt(li.id);
    });

    console.log(cleanToDosDone);
    toDosDone = cleanToDosDone;
    saveToDosDone();
}

function deleteToDos(event) {
    const btn = event.target;
    const li = btn.parentNode;
    pendingLists.removeChild(li);

    const cleanToDos = toDos.filter(function(toDo) {
        return toDo.id !== parseInt(li.id);
    });

    console.log(cleanToDos);
    toDos = cleanToDos;
    saveToDos();
}

function saveToDos() {
    localStorage.setItem(TODOS_LIST, JSON.stringify(toDos));
}

function backToDos(event) {
    deleteToDosDone(event);
    console.log(event, event.target.parentNode);
    let text = event.target.parentNode.innerText;
    console.log(text);
    const liTextLength = text.length - 3;
    text = text.slice(0, liTextLength)
    updatePending(text);
}

function updateDone(text) {
    const newId = toDosDone.length + 1;
    const doneLi = document.createElement('li');
    doneLi.innerText = text;

    finishedLists.appendChild(doneLi);
    doneLi.id = newId;
    const deleteBtn = document.createElement('span');
    deleteBtn.innerText = '❌';
    deleteBtn.classList.add('pending');
    deleteBtn.addEventListener('click', deleteToDosDone);

    const doneBtn = document.createElement('span');
    doneBtn.innerText = '🔙';
    doneBtn.classList.add('done');
    doneBtn.addEventListener('click', backToDos);
    doneLi.appendChild(deleteBtn);
    doneLi.appendChild(doneBtn);

    const toDoDoneOjt = {
        text: text,
        id: newId,
    };
    toDosDone.push(toDoDoneOjt);
    saveToDosDone();
}

function updateDoneToDo(event) {
    deleteToDos(event);
    console.log(event, event.target.parentNode);
    let text = event.target.parentNode.innerText;
    const liTextLength = text.length - 2;
    text = text.slice(0, liTextLength)
    updateDone(text);
}

function updatePending(text) {
    toDoInput.value = "";
    const newId = toDos.length + 1;
    const pendingLi = document.createElement('li');
    pendingLi.innerText = text;
    pendingLists.appendChild(pendingLi);
    pendingLi.id = newId;

    const deleteBtn = document.createElement('span');
    deleteBtn.innerText = '❌';
    deleteBtn.classList.add('pending');
    deleteBtn.addEventListener('click', deleteToDos);

    const doneBtn = document.createElement('span');
    doneBtn.innerText = '✅';
    doneBtn.classList.add('done');
    doneBtn.addEventListener('click', updateDoneToDo);
    pendingLi.appendChild(deleteBtn);
    pendingLi.appendChild(doneBtn);

    const toDoOjt = {
        text: text,
        id: newId,
    };

    toDos.push(toDoOjt);
    saveToDos();
}

function handleSubmit(event) {
    event.preventDefault();
    const inputText = toDoInput.value;
    updatePending(inputText);
}

function loadToDos() {
    const loadedToDos = localStorage.getItem(TODOS_LIST);

    if(loadedToDos !== null) {
        const parsedToDos = JSON.parse(loadedToDos);
        parsedToDos.forEach(function(element) {
            updatePending(element.text);
        });
    }
}

function loadToDosDone() {
    const loadedToDosDone = localStorage.getItem(TODOSDONE_LIST);

    if(loadedToDosDone !== null) {
        const parsedToDosDone = JSON.parse(loadedToDosDone);
        parsedToDosDone.forEach(function(element) {
            updateDone(element.text);
        });
    }
}

function init() {
    loadToDos();
    loadToDosDone();
    toDoForm.addEventListener('submit', handleSubmit);
}

init();