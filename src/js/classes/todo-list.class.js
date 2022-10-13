import {Todo} from "./todo.class";

export class TodoList{
    constructor(){
        this.loadInLocalStorage();
    }

    newTodo(todo){
        this.todoList.push(todo);
        this.saveInLocalStorage();
    }

    deleteTodo(id){
        this.todoList =  this.todoList.filter(todo => todo.id != id);
        this.saveInLocalStorage();
    }

    markCompleted(id){
        for(const todo of this.todoList){
            if(todo.id === parseInt(id)){
                todo.completed = !todo.completed;
                this.saveInLocalStorage();
                break;
            }
        }
    }

    deleteCompleted(){
        this.todoList =  this.todoList.filter(todo => !todo.completed);
        this.saveInLocalStorage();
    }

    saveInLocalStorage(){
        localStorage.setItem("todoList", JSON.stringify(this.todoList));
    }

    loadInLocalStorage(){
        this.todoList = (localStorage.getItem("todoList")) ?
                        JSON.parse(localStorage.getItem("todoList")) : 
                        [];
        // this.todoList = this.todoList.map(todo => Todo.fromJson(todo));
        this.todoList = this.todoList.map(Todo.fromJson); // work only for "ONE" element
    }
}