import projectManager from "./projectManager.js";
import { renderProject, renderAllProjects } from "./projectRenderer.js";
import { selectProject } from "./projectSelection.js";

class ProjectModal {
  constructor() {
    this.modal = document.getElementById("project-modal");
    this.form = document.getElementById("project-form");
    this.projectNameInput = document.getElementById("project-name");
    this.modalTitle = document.getElementById("modal-title");
    this.currentProject = null;

    this.initEventListeners();
  }

  initEventListeners() {
    document
      .getElementById("btn-add-project")
      .addEventListener("click", () => this.open());

    document
      .getElementById("close-modal")
      .addEventListener("click", () => this.close());
    document
      .getElementById("cancel-project")
      .addEventListener("click", () => this.close());

    this.form.addEventListener("submit", (e) => {
      e.preventDefault();
      this.handleSubmit();
    });

    this.modal.addEventListener("click", (e) => {
      if (e.target === this.modal) {
        this.close();
      }
    });

    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && this.modal.classList.contains("active")) {
        this.close();
      }
    });
  }

  open(project = null) {
    this.form.reset();

    if (project) {
      this.currentProject = project;
      this.modalTitle.textContent = "Edit Project";
      this.projectNameInput.value = project.name;
    } else {
      this.currentProject = null;
      this.modalTitle.textContent = "New Project";
    }

    this.modal.classList.add("active");
    this.projectNameInput.focus();
  }

  close() {
    this.modal.classList.remove("active");
    this.currentProject = null;
  }

  handleSubmit() {
    const name = this.projectNameInput.value.trim();

    if (!name) {
      alert("Project name cannot be empty");
      return;
    }

    if (this.currentProject) {
      // Update existing project
      const updatedProject = projectManager.updateProject(
        this.currentProject.id,
        name
      );
      if (updatedProject) {
        renderAllProjects(projectManager.getAllProjects());
        selectProject(
          updatedProject,
          document.querySelector(
            `.project-item[data-id="${updatedProject.id}"]`
          )
        );
      }
    } else {
      // Add new project
      const newProject = projectManager.addProject(name);
      renderProject(newProject);
      selectProject(
        newProject,
        document.querySelector(`.project-item[data-id="${newProject.id}"]`)
      );
    }

    this.close();
  }
}

export default new ProjectModal();
