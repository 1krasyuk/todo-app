function renderProjects() {
  const list = document.querySelector("#project-list");
  list.innerHTML = "";
  projects.forEach((project) => {
    const li = document.createElement("li");
    li.textContent = project;
    if (project === currentProject) li.style.fontWeight = "bold";
    li.onclick = () => {
      currentProject = project;
      saveCurrentProject(currentProject); // ← вот это добавь
      document.querySelector("#project-title").textContent = project;
      renderTodos(
        todos.filter((t) => t.project === currentProject),
        document.querySelector("#todo-list")
      );
      renderProjects();
    };

    list.appendChild(li);
  });
}
