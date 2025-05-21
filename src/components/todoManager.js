const STORAGE_KEY = 'todos';

class TodoManager {
  constructor() {
    this.todos = this.loadTodos();
  }

  loadTodos() {
    const data = localStorage.getItem(STORAGE_KEY);

    return data ? JSON.parse(data) : {};
  }

  saveTodos() {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(this.todos));
  }

  getTodosByProject(projectId) {
    return this.todos[projectId] || [];
  }

  addTodo(projectId, todo) {
    if (!this.todos[projectId]) {
      this.todos[projectId] = [];
    }

    const newTodo = {
      id: Date.now().toString(),
      ...todo,
      completed: false,
    };

    this.todos[projectId].push(newTodo);
    this.saveTodos();
    return newTodo;
  }

  removeTodo(projectId, todoId) {
    if (this.todos[projectId]) {
      this.todos[projectId] = this.todos[projectId].filter(t => t.id !== todoId);
      this.saveTodos();
    }
  }

  updateTodo(projectId, todoId, updates) {
    const projectTodos = this.todos[projectId];
    if (!projectTodos) return;

    const todo = projectTodos.find(t => t.id === todoId);
    if (todo) {
      Object.assign(todo, updates);
      this.saveTodos();
    }
  }

  toggleCompleted(projectId, todoId) {
    const todo = this.todos[projectId]?.find(t => t.id === todoId);
    if (todo) {
      todo.completed = !todo.completed;
      this.saveTodos();
    }
  }

  sortTodosByTitle(projectId) {
    const todos = this.getTodosByProject(projectId);
    return [...todos].sort((a, b) => a.title.localeCompare(b.title));
  }

  sortTodosByPriority(projectId) {
    const todos = this.getTodosByProject(projectId);
    const priorityOrder = { high: 1, medium: 2, low: 3 };
    return [...todos].sort((a, b) => priorityOrder[a.priority] - priorityOrder[b.priority]);
  }

}

export default new TodoManager();
