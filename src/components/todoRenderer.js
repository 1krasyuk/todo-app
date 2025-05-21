import { createIcons, icons } from 'lucide';
import todoManager from './todoManager.js';
import { getActiveProject } from './projectSelection.js';
import TodoModal from './todoModal.js';

const listContainer = document.querySelector('.todo-list');

export function renderTodosForProject(projectId) {
  listContainer.innerHTML = '';

  const todos = todoManager.getTodosByProject(projectId);
  
  todos.forEach(todo => renderTodo(projectId, todo));
}

export function renderTodo(projectId, todo) {
  const item = document.createElement('div');
  item.classList.add('todo-item');
  if (todo.completed) item.classList.add('completed');

  // === HEADER ===
  const todoHeader = document.createElement('div');
  todoHeader.classList.add('todo-header');

  const checkbox = document.createElement('input');
  checkbox.type = 'checkbox';
  checkbox.checked = todo.completed;
  checkbox.addEventListener('change', () => {
    todoManager.toggleCompleted(projectId, todo.id);
    renderTodosForProject(projectId);
  });

  const title = document.createElement('h3');
  title.textContent = todo.title;

  todoHeader.appendChild(checkbox);
  todoHeader.appendChild(title);

  // === CONTENT ===
  const content = document.createElement('div');
  content.classList.add('todo-content');

  const desc = document.createElement('p');
  desc.textContent = todo.description;

  const time = document.createElement('small');
  time.classList.add('todo-date');
  if (todo.dueDate) {
    time.innerHTML = `<i data-lucide="calendar-clock"></i> ${todo.dueDate}`;
  }

 const priority = document.createElement('p');
  priority.classList.add('todo-priority', todo.priority);
  priority.textContent = todo.priority;

  content.appendChild(desc);
  content.appendChild(time);
  content.appendChild(priority);

 
// === ACTIONS ===
const actions = document.createElement('div');
actions.classList.add('todo-actions');


const buttonsContainer = document.createElement('div');
buttonsContainer.classList.add('todo-buttons');

const editBtn = document.createElement('button');
editBtn.classList.add('btn-edit');
editBtn.innerHTML = `<i data-lucide="edit"></i>`;
editBtn.addEventListener('click', () => {
  TodoModal.open(todo, projectId);
});

const delBtn = document.createElement('button');
delBtn.classList.add('btn-delete');
delBtn.innerHTML = `<i data-lucide="trash-2"></i>`;
delBtn.addEventListener('click', () => {
  todoManager.removeTodo(projectId, todo.id);
  renderTodosForProject(projectId);
});

buttonsContainer.appendChild(editBtn);
buttonsContainer.appendChild(delBtn);

actions.appendChild(priority);
actions.appendChild(buttonsContainer);
  // === ASSEMBLE ===
  item.appendChild(todoHeader);
  item.appendChild(content);
  item.appendChild(actions);

  listContainer.appendChild(item);
  createIcons({ icons });
}

export function renderTodosFromArray(projectId, todos) {
  listContainer.innerHTML = '';
  todos.forEach(todo => renderTodo(projectId, todo));
}
