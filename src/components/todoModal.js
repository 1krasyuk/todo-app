import todoManager from "./todoManager.js";
import { getActiveProject } from "./projectSelection.js";
import { renderTodosForProject } from "./todoRenderer.js";

class TodoModal {
  constructor() {
    this.modal = document.getElementById("todo-modal");
    this.form = document.getElementById("todo-form");
    this.titleInput = document.getElementById("todo-title");
    this.descInput = document.getElementById("todo-description");
    this.dateInput = document.getElementById("todo-due-date");
    this.priorityInput = document.getElementById("todo-priority");
    this.modalTitle = document.getElementById("todo-modal-title");
    this.currentTodo = null;
    this.currentProjectId = null;

    this.initEvents();
  }

  initEvents() {
    document
      .getElementById("close-todo-modal")
      .addEventListener("click", () => this.close());
    document
      .getElementById("cancel-todo-btn")
      .addEventListener("click", () => this.close());

    this.form.addEventListener("submit", (e) => {
      e.preventDefault();
      this.submit();
    });

    document.querySelector(".btn-add-task").addEventListener("click", () => {
      const project = getActiveProject();
      if (!project) {
        alert("Select a project first");
        return;
      }
      this.open(null, project.id);
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

  open(todo = null, projectId) {
    this.currentTodo = todo;
    this.currentProjectId = projectId;

    this.form.reset();

    if (todo) {
      this.modalTitle.textContent = "Edit Task";
      this.titleInput.value = todo.title;
      this.descInput.value = todo.description;
      this.dateInput.value = todo.dueDate;
      this.priorityInput.value = todo.priority;
    } else {
      this.modalTitle.textContent = "New Task";
    }

    this.modal.classList.add("active");
  }

  close() {
    this.modal.classList.remove("active");
    this.currentTodo = null;
    this.currentProjectId = null;
  }

  submit() {
    const data = {
      title: this.titleInput.value.trim(),
      description: this.descInput.value.trim(),
      dueDate: this.dateInput.value,
      priority: this.priorityInput.value,
    };

    if (!data.title) {
      alert("Title is required");
      return;
    }

    if (this.currentTodo) {
      todoManager.updateTodo(this.currentProjectId, this.currentTodo.id, data);
    } else {
      todoManager.addTodo(this.currentProjectId, data);
    }

    renderTodosForProject(this.currentProjectId);
    this.close();
  }
}

export default new TodoModal();
