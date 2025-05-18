import { saveTodos } from "./storage";

export function renderTodos(todos, container) {
  container.innerHTML = "";

  todos.forEach((todo) => {
    const el = document.createElement("div");
    el.className = "todo";

    const title = document.createElement("span");
    title.textContent = `${todo.title} — ${todo.dueDate} — ${todo.priority}`;

    const delBtn = document.createElement("Button");
    delBtn.textContent = "Удалить";
    delBtn.onclick = () => {
      const index = todos.findIndex((t) => t.id === todo.id);
      if (index !== -1) {
        todos.splice(index, 1);
        saveTodos(todos);
        renderTodos(todos, container);
      }
    };

    el.append(title, delBtn);
    container.appendChild(el);
  });
}
