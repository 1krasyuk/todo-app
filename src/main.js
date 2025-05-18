import "./style.css";
import { createIcons, icons } from 'lucide'; 
createIcons({icons})
// import { createTodo } from "./todo.js";
// import { renderTodos } from "./dom.js";

// const todos = loadTodos();

// import {
//   saveTodos,
//   loadTodos,
//   saveProjects,
//   loadProjects,
//   saveCurrentProject,
//   loadCurrentProject,
// } from "./storage.js";

// let projects = loadProjects();
// let currentProject = loadCurrentProject();

document.querySelector("#").innerHTML = `
 
`;

// const input = document.querySelector("#todo-input");
// const addBtn = document.querySelector("#add-btn");

// const list = document.querySelector("#todo-list");
// addBtn.addEventListener("click", () => {
//   const titleEl = document.querySelector("#todo-title");
//   const descEl = document.querySelector("#todo-desc");
//   const dateEl = document.querySelector("#todo-date");
//   const priorityEl = document.querySelector("#todo-priority");

//   addBtn.addEventListener("click", () => {
//     const title = titleEl.value.trim();
//     const description = descEl.value.trim();
//     const dueDate = dateEl.value;
//     const priority = priorityEl.value;

//     if (!title) return;

//     const newTodo = createTodo({ title, description, dueDate, priority });
//     todos.push(newTodo);
//     saveTodos(todos);
//     renderTodos(todos, list);

//     titleEl.value = "";
//     descEl.value = "";
//     dateEl.value = "";
//     priorityEl.value = "low";
//   });
// });

// document.querySelector("#add-project-btn").addEventListener("click", () => {
//   const name = document.querySelector("#new-project-name").value.trim();
//   if (name && !projects.includes(name)) {
//     projects.push(name);
//     saveProjects(projects); // ← добавь
//     renderProjects();
//     document.querySelector("#new-project-name").value = "";
//   }
// });

// renderProjects();
// renderTodos(
//   todos.filter((t) => t.project === currentProject),
//   list
// );
