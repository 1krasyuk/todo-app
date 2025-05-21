import { renderTodosForProject } from "./todoRenderer.js";

let activeProject = null;

export function selectProject(project, element) {
  activeProject = project;

  const header = document.querySelector(".project-header-title");
  header.textContent = project ? project.name : "No project selected";

  document
    .querySelectorAll(".project-item")
    .forEach((el) => el.classList.remove("active"));
  if (element) element.classList.add("active");

  if (project) renderTodosForProject(project.id);
}

export function getActiveProject() {
  return activeProject;
}
