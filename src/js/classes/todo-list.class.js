
export class TodoList{
    constructor(){
        this.todoList = [];
    }

    newTodo(todo){
        this.todoList.push(todo);
    }

    deleteTodo(id){
        this.todoList =  this.todoList.filter(todo => todo.id != id);
    }

    markCompleted(id){
        for(const todo of this.todoList){
            if(todo.id === parseInt(id)){
                todo.completed = !todo.completed;
                break;
            }
        }

    }

    deleteCompleted(){}
}