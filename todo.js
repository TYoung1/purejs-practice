const todoForm = document.querySelector(".js-todoForm"),
todoInput = todoForm.querySelector("input"),
todoList = document.querySelector(".js-todoList");
const TODOS_LS = "todos"



let todos = [];

function deleteTodo(event){
    const btn = event.target;
    const liDel = btn.parentNode;
    todoList.removeChild(liDel);
    const cleanTodos = todos.filter(function(todo){
        return todo.id !== parseInt(liDel.id);
    });
    todos = cleanTodos
    saveTodos();
}

function saveTodos(){
    localStorage.setItem(TODOS_LS,JSON.stringify(todos))
}

function paintTodo(text){
    const li = document.createElement("li"); 
    const deleteBtn = document.createElement("button");
    const span = document.createElement("span");
    const newId = todos.length + 1;
    deleteBtn.innerHTML = "❌"
    span.innerText = text;
    deleteBtn.addEventListener("click",deleteTodo);
    li.appendChild(span);
    li.appendChild(deleteBtn);
    li.id = newId;
    todoList.appendChild(li);
    const todoObj = {
        text:text,
        id: newId
    };
    todos.push(todoObj);
    saveTodos();
}

function handleSubmit(event){
    event.preventDefault();
    const currentValue = todoInput.value;
    paintTodo(currentValue);
    todoInput.value="";
}
 

function loadTodos(){
    const loadedTodos = localStorage.getItem(TODOS_LS);
    if(loadedTodos !== null){
        const parsedTodos = JSON.parse(loadedTodos);
        parsedTodos.forEach(function(todo){
             paintTodo(todo.text);
        })
    }
}

function init(){
    loadTodos();
    todoForm.addEventListener("submit",handleSubmit);
}
init();