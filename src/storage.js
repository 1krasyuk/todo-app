const STORAGE_KEY = "todoList";

export function saveTodos(todos) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(todos));
}

export function loadTodos() {
  const raw = localStorage.getItem(STORAGE_KEY);
  return raw ? JSON.parse(raw) : [];
}

export function saveProjects(projects) {
  localStorage.setItem("projects", JSON.stringify(projects));
}

export function loadProjects() {
  return JSON.parse(localStorage.getItem("projects")) || ["Inbox"];
}

export function saveCurrentProject(project) {
  localStorage.setItem("currentProject", project);
}

export function loadCurrentProject() {
  return localStorage.getItem("currentProject") || "Inbox";
}
