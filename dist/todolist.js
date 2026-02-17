const todoValue = document.querySelector(".todo-value");
const addTodo = document.querySelector(".add-todo");
const clearTodo = document.querySelector(".clear-todos");
const todoList = document.querySelector(".todoList");
const pendingTasks = document.querySelector(".pendingTasks");
let todos = JSON.parse(localStorage.getItem("todos") || "[]");
const handelSubmit = (event) => {
    event.preventDefault();
    const newTodo = {
        id: crypto.randomUUID(),
        title: todoValue.value,
        isCompleted: false,
    };
    addTodoDom(newTodo);
    todos.push(newTodo);
    saveTodoInLocalStorge();
    updatePendingTasks();
    todoValue.value = "";
    todoValue.focus();
};
const addTodoDom = (todo) => {
    todoList.insertAdjacentHTML("beforeend", `<li onclick="removeTodo('${todo.id}')">
          ${todo.title}
          <span class="icon">
            <i class="fas fa-trash"></i>
          </span>
        </li>`);
};
const saveTodoInLocalStorge = () => {
    localStorage.setItem("todos", JSON.stringify(todos));
    return true;
};
window.removeTodo = (todoId) => {
    todos = todos.filter((todo) => todo.id !== todoId);
    saveTodoInLocalStorge();
    todoList.innerHTML = "";
    todos.forEach(addTodoDom);
    updatePendingTasks();
};
addTodo.addEventListener("click", (event) => handelSubmit(event));
clearTodo.addEventListener("click", () => {
    todoList.innerHTML = "";
    todos = [];
    saveTodoInLocalStorge();
    updatePendingTasks();
});
const updatePendingTasks = () => {
    const count = todos.filter((todo) => !todo.isCompleted).length;
    pendingTasks.innerText = count.toString();
};
window.addEventListener("DOMContentLoaded", () => {
    todos.forEach(addTodoDom);
    updatePendingTasks();
});
export {};
//# sourceMappingURL=todolist.js.map