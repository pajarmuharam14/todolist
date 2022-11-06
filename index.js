window.addEventListener("DOMContentLoaded", () => {
  todosList = JSON.parse(localStorage.getItem("todosList")) || [];
  const newForm = document.querySelector("#new-form");

  newForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const todo = {
      content: e.target.elements.content.value,
      done: false,
    };

    todosList.push(todo);

    localStorage.setItem("todosList", JSON.stringify(todosList));

    e.target.reset();

    displayTodos();
  });
  displayTodos();
});

function displayTodos() {
  const todoList = document.querySelector("#list-todo");
  todoList.innerHTML = "";

  todosList.forEach((todo) => {
    const todoItem = document.createElement("div");
    todoItem.classList.add("todo-item");

    const label = document.createElement("label");

    const inputCheck = document.createElement("input");
    inputCheck.classList.add("check");
    inputCheck.type = "checkbox";
    inputCheck.checked = todo.done;

    const inputText = document.createElement("input");
    inputText.classList.add("text");
    inputText.type = "text";
    inputText.value = todo.content;
    inputText.setAttribute("readonly", "readonly");

    const action = document.createElement("div");
    action.classList.add("action");

    const editButoon = document.createElement("button");
    editButoon.setAttribute("id", "edit");
    editButoon.innerHTML = "edit";

    const deleteButoon = document.createElement("button");
    deleteButoon.setAttribute("id", "delete");
    deleteButoon.innerHTML = "delete";

    label.appendChild(inputCheck);
    label.appendChild(inputText);
    action.appendChild(editButoon);
    action.appendChild(deleteButoon);
    todoItem.appendChild(label);
    todoItem.appendChild(action);
    todoList.appendChild(todoItem);

    inputCheck.addEventListener("change", (e) => {
      todo.done = e.target.checked;
      localStorage.setItem("todosList", JSON.stringify(todosList));

      todo.done ? todoItem.classList.add("done") : todoItem.classList.remove("done");
    });

    editButoon.addEventListener("click", () => {
      editButoon.innerHTML = "save";
      inputText.removeAttribute("readonly");
      inputText.focus();
      inputText.addEventListener("blur", (e) => {
        inputText.setAttribute("readonly", "readonly");
        todo.content = e.target.value;
        localStorage.setItem("todosList", JSON.stringify(todosList));
        displayTodos();
      });
    });

    deleteButoon.addEventListener("click", () => {
      todosList = todosList.filter((t) => t != todo);
      localStorage.setItem("todosList", JSON.stringify(todosList));
      displayTodos();
    });
  });
}
