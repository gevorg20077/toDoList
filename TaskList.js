export default class TaskList {
  constructor() {
    this.taskList = document.getElementById('task-list');
  }

  addItem(taskName) {
    const li = document.createElement('li');
    li.className = 'list-group-item';

    const span = document.createElement('span');
    span.textContent = taskName;
    li.append(span);

    const deleteBtn = this.createDeleteButton(li);
    li.appendChild(deleteBtn);

    const editBtn = this.createEditButton(li, span);
    li.append(editBtn);

    this.taskList.appendChild(li);
  }

  createDeleteButton(li) {
    const deleteBtn = document.createElement('button');
    deleteBtn.className = 'btn btn-danger btn-sm float-right';
    deleteBtn.textContent = 'Delete';
    deleteBtn.addEventListener('click', () => li.remove());
    return deleteBtn;
  }

  createEditButton(li, span) {
    const editBtn = document.createElement('button');
    editBtn.className = 'btn btn-secondary mx-2 btn-sm float-right';
    editBtn.textContent = 'Edit';
    editBtn.addEventListener('click', () => this.handleEdit(li, span, editBtn));
    return editBtn;
  }

  handleEdit(li, span, editBtn) {
    if (!li.querySelector('.editInput')) {
      const editInput = document.createElement('input');
      editInput.className = 'editInput';
      editInput.style = "border: none; outline: none; width: 82%";
      editInput.value = span.textContent;

      const editConfirm = document.createElement('button');
      editConfirm.className = 'btn btn-secondary btn-sm bg-success float-right';
      editConfirm.textContent = 'Okay';

      editInput.addEventListener('input', () => {
        if (editInput.value.length > 90) {
          editInput.value = editInput.value.slice(0, 90);
        }
      });

      span.textContent = '';
      li.insertBefore(editInput, li.querySelector('.btn-danger'));
      editBtn.insertAdjacentElement('afterend', editConfirm);

      editConfirm.addEventListener('click', () => {
        span.textContent = editInput.value;
        editInput.remove();
        editConfirm.remove();
      });
    }
  }
}
