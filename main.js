import TodoForm from './TodoForm.js';
import TaskList from './TaskList.js';

const taskList = new TaskList();
const todoForm = new TodoForm(taskList.addItem.bind(taskList));