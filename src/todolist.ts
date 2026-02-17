const todoValue = document.querySelector(".todo-value") as HTMLInputElement;
const addTodo = document.querySelector(".add-todo") as HTMLButtonElement;
const clearTodo = document.querySelector(".clear-todos") as HTMLButtonElement;
const todoList = document.querySelector(".todoList") as HTMLUListElement;
const pendingTasks = document.querySelector(".pendingTasks") as HTMLSpanElement;

interface ToDO {
  id: string;
  title: string;
  isCompleted: boolean;
}

let todos: ToDO[] = JSON.parse(localStorage.getItem("todos") || "[]");

const handelSubmit = (event: Event) => {
  event.preventDefault();

  const newTodo: ToDO = {
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

const addTodoDom = (todo: ToDO) => {
  todoList.insertAdjacentHTML(
    "beforeend",
    `<li onclick="removeTodo('${todo.id}')">
          ${todo.title}
          <span class="icon">
            <i class="fas fa-trash"></i>
          </span>
        </li>`,
  );
};

const saveTodoInLocalStorge = () => {
  localStorage.setItem("todos", JSON.stringify(todos));
  return true;
};

(window as any).removeTodo = (todoId: string) => {
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
