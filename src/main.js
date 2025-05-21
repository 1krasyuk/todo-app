import "./style.css";
import { createIcons, icons } from "lucide";

import ProjectModal from "./components/projectModal.js";
import projectManager from "./components/projectManager.js";
import { renderAllProjects } from "./components/projectRenderer.js";
import {
  getActiveProject,
  selectProject,
} from "./components/projectSelection.js";

import todoManager from "./components/todoManager.js";
import { renderTodosForProject } from "./components/todoRenderer.js";
import { renderTodosFromArray } from "./components/todoRenderer.js";

let sortMode = "title";

// ========== ИНИЦИАЛИЗАЦИЯ ==========
createIcons({ icons });

const allProjects = projectManager.getAllProjects();

renderAllProjects(projectManager.getAllProjects());

if (allProjects.length > 0) {
  const firstProject = allProjects[0];
  const firstProjectElement = document.querySelector(
    `[data-id="${firstProject.id}"]`
  );
  if (firstProjectElement) {
    selectProject(firstProject, firstProjectElement);

    const sortedTodos = todoManager.sortTodosByTitle(firstProject.id);
    renderTodosFromArray(firstProject.id, sortedTodos);

    const sortLabel = document.querySelector(".sort-label");
    if (sortLabel) sortLabel.textContent = "Sort by: Title";
  }
}

// ========== DELETE PROJECT ==========
document.querySelector(".btn-delete").addEventListener("click", () => {
  const project = getActiveProject();
  if (!project) return alert("No project selected");

  if (confirm(`Delete project "${project.name}"?`)) {
    projectManager.removeProject(project.id);
    renderAllProjects(projectManager.getAllProjects());
    selectProject(null, null);
    renderTodosForProject(null);
  }
});

// ========== EDIT PROJECT ==========
document.querySelector(".btn-rename").addEventListener("click", () => {
  const project = getActiveProject();
  if (!project) return alert("No project selected");

  ProjectModal.open(project);
});

// ========== Sorting button ==========
document.getElementById("sort-button").addEventListener("click", () => {
  const project = getActiveProject();
  if (!project) return;

  let sortedTodos;

  if (sortMode === "title") {
    sortedTodos = todoManager.sortTodosByPriority(project.id);
    sortMode = "priority";
  } else {
    sortedTodos = todoManager.sortTodosByTitle(project.id);
    sortMode = "title";
  }

  document.querySelector(".sort-label").textContent =
    sortMode === "title" ? "Sort by: Title" : "Sort by: Priority";

  renderTodosFromArray(project.id, sortedTodos);
});
