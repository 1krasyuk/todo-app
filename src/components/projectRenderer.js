import { createIcons, icons } from "lucide";
import { selectProject } from "./projectSelection.js";

const listContainer = document.querySelector(".projects-list");

export function clearProjectsList() {
  listContainer.innerHTML = "";
}

export function renderProject(project) {
  const item = document.createElement("div");
  item.classList.add("project-item");
  item.dataset.id = project.id;

  const icon = document.createElement("i");
  icon.setAttribute("data-lucide", "list");

  const name = document.createElement("p");
  name.classList.add("project-list-name");
  name.textContent = project.name;
  name.title = project.name;

  item.appendChild(icon);
  item.appendChild(name);

  item.addEventListener("click", () => {
    selectProject(project, item);
  });

  listContainer.appendChild(item);
  createIcons({ icons });
}

export function renderAllProjects(projects) {
  clearProjectsList();
  projects.forEach(renderProject);
}
