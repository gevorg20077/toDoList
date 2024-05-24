export default class TodoForm {
  constructor(onSubmit) {
    this.onSubmit = onSubmit;
    this.taskInput = document.getElementById('task-input');
    this.taskInput.addEventListener('input', this.handleInput.bind(this));
    const formElement = document.getElementById('todo-form');
    formElement.addEventListener('submit', this.handleSubmit.bind(this));
  }

  handleInput(value) {
    if (value.length > 90) {
      return value.slice(0, 90);
    }
    return value;
  }

  handleSubmit(event) {
    const trimmedTaskName = this.taskInput.value.trim();
    if (trimmedTaskName !== '') {
      this.onSubmit(trimmedTaskName);
      this.taskInput.value = '';
    }
  }
}