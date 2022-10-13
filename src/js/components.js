import {Todo} from "../js/classes";
import {todoList} from "../index";

// HTML References
const divTodoList = document.querySelector(".todo-list");
const inputNewTodo = document.querySelector(".new-todo");

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

    return todoDiv.firstElementChild;
}


// Events
inputNewTodo.addEventListener("keyup", (event) => {
    // Press Enter
    if (event.keyCode === 13 && inputNewTodo.value.length > 0){
        const newTodo = new Todo(inputNewTodo.value);
        todoList.newTodo(newTodo);
        console.log(todoList);
        createTodoHtml(newTodo);
        inputNewTodo.value = "";
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
});
