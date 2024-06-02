export default class TodoForm {
  constructor(onSubmit) {
    this.onSubmit = onSubmit;
    this.taskInput = document.getElementById('task-input');
    this.formElement = document.getElementById('todo-form');
    
    this.taskInput.addEventListener('input', this.handleInput.bind(this));
    this.formElement.addEventListener('submit', this.handleSubmit.bind(this));
  }

  handleInput() {
    const value = this.taskInput.value;
    if (value.length > 90) {
      this.taskInput.value = value.slice(0, 90);
    }
  }

  handleSubmit(event) {
    event.preventDefault();
    const trimmedTaskName = this.taskInput.value.trim();
    if (trimmedTaskName) {
      this.onSubmit(trimmedTaskName);
      this.taskInput.value = '';
    }
  }
}

