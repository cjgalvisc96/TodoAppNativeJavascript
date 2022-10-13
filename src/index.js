import "./styles.css";
import {TodoList} from "./js/classes";
import {createTodoHtml} from "./js/components";

export const todoList = new TodoList();
//  todoList.todoList.forEach(todo => createTodoHtml(todo));
todoList.todoList.forEach(createTodoHtml); // work only for "ONE" element

console.log(todoList.todoList);