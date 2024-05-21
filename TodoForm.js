export default class TodoForm {
  constructor(taskList) {
    this.taskList = taskList;
  }

  handleInput(value) {
    if (value.length > 90) {
      return value.slice(0, 90);
    }
    return value;
  }

  handleSubmit(taskName) {
    const trimmedTaskName = taskName.trim();
    if (trimmedTaskName !== '') {
      this.taskList.addTask(trimmedTaskName);
    }
  }
}