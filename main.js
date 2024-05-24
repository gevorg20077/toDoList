import TodoForm from './TodoForm.js';
import TaskList from './TaskList.js';

const taskList = new TaskList();
const todoForm = new TodoForm(taskList.addItem.bind(taskList))

const formElement = document.getElementById('todo-form');
const taskInput = document.getElementById('task-input');

taskInput.addEventListener('input', (event) => {
  taskInput.value = todoForm.handleInput(taskInput.value);
});

formElement.addEventListener('submit', (event) => {
  event.preventDefault();
  todoForm.handleSubmit(taskInput.value);
  taskInput.value = '';
});