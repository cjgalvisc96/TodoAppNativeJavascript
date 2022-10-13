import {Todo} from "../js/classes";
import {todoList} from "../index";

// HTML References
const divTodoList = document.querySelector(".todo-list");
const inputNewTodo = document.querySelector(".new-todo");
const btnDeleteCompleted = document.querySelector(".clear-completed");
const ulFilters = document.querySelector(".filters");
const anchorFilters = document.querySelectorAll(".filtro");
const strongPedings = document.querySelector("#pendings");

const updatePendings = ()=>{
    strongPedings.innerText = todoList.checkPendings();
}

export const createTodoHtml = (todo) => {
    const htmlTodo = `
    <li class="${(todo.completed)?'completed':''}" data-id="${todo.id}">
        <div class="view">
            <input class="toggle" type="checkbox" ${(todo.completed)?'checked':''}>
            <label>${todo.task}</label>
            <button class="destroy"></button>
        </div>
        <input class="edit" value="Create a TodoMVC template">
    </li>`;

    const todoDiv = document.createElement("div");
    todoDiv.innerHTML = htmlTodo;
    divTodoList.append(todoDiv.firstElementChild);

    updatePendings();
    return todoDiv.firstElementChild;
}



// Events
inputNewTodo.addEventListener("keyup", (event) => {
    // Press Enter
    if (event.keyCode === 13 && inputNewTodo.value.length > 0){
        const newTodo = new Todo(inputNewTodo.value);
        todoList.newTodo(newTodo);
        createTodoHtml(newTodo);
        inputNewTodo.value = "";
        updatePendings();
    }
});

divTodoList.addEventListener("click", (event) =>{
    const elementName = event.target.localName;// input, label, button
    const elementTodo = event.target.parentElement.parentElement;
    const todoId = elementTodo.getAttribute("data-id");

    if (elementName.includes("input")){ // Click in the check(mark completed)
        todoList.markCompleted(todoId);
        elementTodo.classList.toggle("completed");
    }else if(elementName.includes("button")){ // Click in the "X"(remove todo)
        todoList.deleteTodo(todoId);
        divTodoList.removeChild(elementTodo);
    }
    updatePendings();
});

btnDeleteCompleted.addEventListener("click", () => {
    todoList.deleteCompleted();
    for(let i=divTodoList.children.length -1; i>=0; i--){
        const element = divTodoList.children[i];
        if (element.classList.contains('completed')){
            divTodoList.removeChild(element);
        }
    }
    updatePendings();
});


ulFilters.addEventListener("click", (event) => {
    const filter  = event.target.text;
    if (!filter){return;}

    anchorFilters.forEach(elem => elem.classList.remove("selected"));
    event.target.classList.add("selected");

    for(const element of divTodoList.children){
        element.classList.remove("hidden");
        const completed = element.classList.contains("completed");

        switch(filter){
            case "Pendings":
                if (completed){
                    element.classList.add("hidden");
                }
                break;
            
            case "Completed":
                if(!completed){
                    element.classList.add("hidden");
                }
                break;
        }
    }
    updatePendings();
});
