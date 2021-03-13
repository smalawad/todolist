// Selectors
const todoInput = document.querySelector(".todo-input");
const todoButton = document.querySelector(".todo-button");
const todoList = document.querySelector(".todo-list");
const filterOption = document.querySelector(".filter-todo");

// flag to load or add todos
var createTodoFlag;

// events
document.addEventListener("DOMContentLoaded", getTodos);
todoButton.addEventListener("click", addTodo);
todoList.addEventListener("click", deleteCheck);
filterOption.addEventListener("click", filterTodo);


// functions

function createTodoTags (todo) {

    // Todo DIV
    const todoDiv = document.createElement("div");
    todoDiv.classList.add("todo");
    // Create LI
    const newTodo = document.createElement('li');
    // newTodo.innerText = todoInput.value;
    newTodo.classList.add("todo-item");
    todoDiv.appendChild(newTodo);
    console.log(createTodoFlag);

    if(createTodoFlag) {
        newTodo.innerText = todoInput.value;

        // SAVE to local storage
        saveLocalTodos(todoInput.value);
    } else {
        newTodo.innerText = todo;
    }

    // CHECK MARK BUTTON
    const completedButton = document.createElement("button");
    completedButton.innerHTML = '<i class="fas fa-check"></i>';
    completedButton.classList.add("complete-btn");
    todoDiv.appendChild(completedButton);
    // CHECK TRASH BUTTON
    const trashButton = document.createElement("button");
    trashButton.innerHTML = '<i class="fas fa-trash"></i>';
    trashButton.classList.add("delete-btn");
    todoDiv.appendChild(trashButton);

    // APPEND TO LIST (ul)
    todoList.appendChild(todoDiv);
    
}
function addTodo(event) {
    // prevent form from submitting
    event.preventDefault();

    // set the flag to add new todo.
    createTodoFlag = 1;
    
    createTodoTags(event);
    // // Todo DIV
    // const todoDiv = document.createElement("div");
    // todoDiv.classList.add("todo");
    // // Create LI
    // const newTodo = document.createElement('li');
    // newTodo.innerText = todoInput.value;
    // newTodo.classList.add("todo-item");
    // todoDiv.appendChild(newTodo);

    // // SAVE to local storage
    // saveLocalTodos(todoInput.value);

    // // CHECK MARK BUTTON
    // const completedButton = document.createElement("button");
    // completedButton.innerHTML = '<i class="fas fa-check"></i>';
    // completedButton.classList.add("complete-btn");
    // todoDiv.appendChild(completedButton);
    // // CHECK TRASH BUTTON
    // const trashButton = document.createElement("button");
    // trashButton.innerHTML = '<i class="fas fa-trash"></i>';
    // trashButton.classList.add("delete-btn");
    // todoDiv.appendChild(trashButton);

    // // APPEND TO LIST (ul)
    // todoList.appendChild(todoDiv);

    // Clear todo INPUT Value
    todoInput.value = "";

}

function deleteCheck(e) {
    const item = e.target;

    // Delete TODO
    if (item.classList[0] === 'delete-btn') {
        const todo = item.parentElement;

        // Animation
        todo.classList.add("fall");
        // remove from localstorage
        removeLocalTodos(todo);
        todo.addEventListener("transitionend", function () {
            todo.remove();
        });

    }

    // CHECK mark
    if (item.classList[0] === "complete-btn") {
        const todo = item.parentElement;
        todo.classList.toggle("completed");
    }
}

function filterTodo(e) {
    const todos = todoList.childNodes;
    // console.log(todos);
    todos.forEach(function todo() {
        switch (e.target.value) {
            case "all":
                todo.style.display = "flex";
                break;
            case "completed":
                console.log(todo);
                // if(todo.classList.contains("completed")) {
                //     // todo.style.display = "flex";
                //     console.log(todo);
                // }else {
                //     todo.style.display = "none";
                // }
                break;
            case "uncompleted":
                console.log(todo);
                // if(!todo.classList.contains("completed")) {
                //     todo.style.display = "flex";
                // }else {
                //     todo.style.display = "none";
                // }
                break;
        }
    });
}

function saveLocalTodos(todo) {
    // CHECK already have things in there?
    let todos;
    if (localStorage.getItem("todos") === null) {
        todos = [];
    } else {
        todos = JSON.parse(localStorage.getItem("todos"));
    }

    todos.push(todo);
    localStorage.setItem("todos", JSON.stringify(todos));
}

function getTodos() {
    let todos;

    if (localStorage.getItem("todos") == null) {
        todos = [];
    } else {
        todos = JSON.parse(localStorage.getItem("todos"));
    }
 
    // set flag to get tods from local storage
    createTodoFlag = 0;

    todos.forEach(function (todo) {

        // -------------------------- start adding HTML child element -----------------
            createTodoTags(todo);
        // console.log(todo);
        // const todoDiv = document.createElement("div");
        // todoDiv.classList.add("todo");
        // // Create LI
        // const newTodo = document.createElement('li');
        // newTodo.innerText = todo;
        // newTodo.classList.add("todo-item");
        // todoDiv.appendChild(newTodo);

        // // CHECK MARK BUTTON
        // const completedButton = document.createElement("button");
        // completedButton.innerHTML = '<i class="fas fa-check"></i>';
        // completedButton.classList.add("complete-btn");
        // todoDiv.appendChild(completedButton);
        // // CHECK TRASH BUTTON
        // const trashButton = document.createElement("button");
        // trashButton.innerHTML = '<i class="fas fa-trash"></i>';
        // trashButton.classList.add("delete-btn");
        // todoDiv.appendChild(trashButton);

        // // APPEND TO LIST (ul)
        // todoList.appendChild(todoDiv);
        // -------------------------- END adding HTML child elements ---------------------
    });

}

function removeLocalTodos(todo) {
    // CHECK -- DO I already have thing in there?
    let todos;
    if (localStorage.getItem("todos") === null) {
        todos = [];
    } else {
        todos = JSON.parse(localStorage.getItem("todos"));
    }
    // loadTodo(todos);
    const todoIndex = todo.children[0].innerText;
    todos.splice(todos.indexOf(todoIndex), 1);
    localStorage.setItem("todos", JSON.stringify(todos));

}