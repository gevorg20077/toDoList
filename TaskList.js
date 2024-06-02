export default class TaskList {
  constructor() {
    this.taskList = document.getElementById('task-list');
    this.loadTasks();
  }

  addItem(taskName, completed = false) {
    const li = document.createElement('li');
    li.className = 'list-group-item d-flex justify-content-between align-items-center';
    if (completed) {
      li.classList.add('completed');
    }

    const span = document.createElement('span');
    span.textContent = taskName;

    const controlsDiv = document.createElement('div');
    controlsDiv.className = 'd-flex';

    const markCompletedBtn = this.createMarkCompletedButton(li);
    const deleteBtn = this.createDeleteButton(li);
    const editBtn = this.createEditButton(li, span);

    controlsDiv.appendChild(markCompletedBtn);
    controlsDiv.appendChild(deleteBtn);
    controlsDiv.appendChild(editBtn);

    li.appendChild(span);
    li.appendChild(controlsDiv);

    this.taskList.appendChild(li);
    this.saveTasks();
  }

  createDeleteButton(li) {
    const deleteBtn = document.createElement('button');
    deleteBtn.className = 'btn btn-danger btn-sm ml-2';
    deleteBtn.textContent = 'Delete';
    deleteBtn.addEventListener('click', () => {
      li.remove();
      this.saveTasks();
    });
    return deleteBtn;
  }

  createEditButton(li, span) {
    const editBtn = document.createElement('button');
    editBtn.className = 'btn btn-secondary btn-sm ml-2';
    editBtn.textContent = 'Edit';
    editBtn.addEventListener('click', () => this.handleEdit(li, span, editBtn));
    return editBtn;
  }

  handleEdit(li, span, editBtn) {
    if (!li.querySelector('.editInput')) {
      const editInput = document.createElement('input');
      editInput.className = 'editInput';
      editInput.style = "border: none; outline: none; width: 70%; background: transparent";
      editInput.value = span.textContent;

      const editConfirm = document.createElement('button');
      editConfirm.className = 'btn btn-primary btn-sm ml-2';
      editConfirm.textContent = 'Okay';

      editInput.addEventListener('input', () => {
        if (editInput.value.length > 90) {
          editInput.value = editInput.value.slice(0, 90);
        }
      });

      span.style.display = 'none';
      li.insertBefore(editInput, span);
      li.querySelector('.d-flex').appendChild(editConfirm);
      editBtn.style.display = 'none';

      editConfirm.addEventListener('click', () => {
        if (editInput.value.trim()) {
          span.textContent = editInput.value.trim();
          this.saveTasks();
        }
        editInput.remove();
        editConfirm.remove();
        span.style.display = '';
        editBtn.style.display = '';
      });
      if (li.classList.contains('completed')) {
        editInput.style.color = "white"
      }
    }
  }

  createMarkCompletedButton(li) {
    const markCompletedBtn = document.createElement('button');
    markCompletedBtn.className = 'btn btn-success btn-sm ml-2';
    markCompletedBtn.textContent = 'Completed';
    markCompletedBtn.addEventListener('click', () => {
      li.classList.toggle('completed');
      const input = li.querySelector('.editInput');
      if (li.classList.contains('completed')) {
        if (input) {
          input.classList.add('completed-input');
        }
      } else {
        if (input) {
          input.classList.remove('completed-input');
        }
      }
      this.saveTasks();
    });
    return markCompletedBtn;
  }

  saveTasks() {
    const tasks = [];
    this.taskList.querySelectorAll('li').forEach(li => {
      tasks.push({
        text: li.querySelector('span').textContent,
        completed: li.classList.contains('completed')
      });
    });
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }

  loadTasks() {
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks.forEach(task => {
      this.addItem(task.text, task.completed);
    });
  }
}
