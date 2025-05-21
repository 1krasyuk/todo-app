const STORAGE_KEY = 'projects';

class ProjectManager {
  constructor() {
    this.projects = this.loadProjects();
  }

  loadProjects() {
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : [];
  }

  saveProjects() {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(this.projects));
  }

  addProject(name) {
    const project = {
      id: Date.now().toString(),
      name,
    };
    this.projects.push(project);
    this.saveProjects();
    return project;
  }

  removeProject(id) {
    this.projects = this.projects.filter(project => project.id !== id);
    this.saveProjects();
  }

  updateProject(id, newName) {
    const project = this.projects.find(p => p.id === id);
    if (project) {
      project.name = newName;
      this.saveProjects();
      return project;
    }
    return null;
  }

  getAllProjects() {
    return this.projects;
  }
}

export default new ProjectManager();
