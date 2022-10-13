import "./styles.css";
import {createTodoHtml} from "./js/components";
import {Todo, TodoList} from "./js/classes";

const todo = new Todo("Learn Javascript");

export const todoList = new TodoList();

todoList.newTodo(todo);

console.log(todoList);

createTodoHtml(todo);