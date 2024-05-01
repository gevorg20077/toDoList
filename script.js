const todoForm = document.getElementById('todo-form');
const taskInput = document.getElementById('task-input');
const taskList = document.createElement('ul');
taskList.classList.add("list-group", "d-flex");
taskList.id = "task-list";

taskInput.addEventListener('input', function () {
  if (taskInput.value.length > 90) {
    taskInput.value = taskInput.value.slice(0, 90)
  }
});

todoForm.addEventListener('submit', function (event) {
  event.preventDefault()

  function addTask(taskName) {
    const li = document.createElement('li');
    li.className = 'list-group-item';

    const span = document.createElement('span')
    span.textContent = taskName;
    li.append(span);

    const deleteBtn = document.createElement('button')
    deleteBtn.className = 'btn btn-danger btn-sm float-right'
    deleteBtn.textContent = 'Delete'
    li.appendChild(deleteBtn)

    const editBtn = document.createElement('button')
    editBtn.className = 'btn btn-secondary mx-2 btn-sm float-right'
    editBtn.textContent = 'Edit'
    li.append(editBtn)

    editBtn.addEventListener('click', function (event) {
      if (!li.querySelector('.editInput')) {
        const editInput = document.createElement('input')
        const editConfirm = document.createElement('button')

        editInput.addEventListener('input', function (event) {
          if (editInput.value.length > 110) {
            editInput.value = editInput.value.slice(0, 110)
          }
        });

        editConfirm.textContent = 'Okay'
        editConfirm.className = 'btn btn-secondary btn-sm bg-success float-right'
        editInput.classList.add('editInput')
        editInput.style = "border: none; outline: none; width: 82%"
        editInput.value = span.textContent
        span.textContent = ''
        li.insertBefore(editInput, deleteBtn);
        editBtn.insertAdjacentElement('afterend', editConfirm);

        editConfirm.addEventListener('click', function () {
          span.textContent = editInput.value;
          editInput.remove();
          editConfirm.remove();
        })
      } else {
        const editInput = li.querySelector('.editInput');
        const editConfirm = li.querySelector('.editConfirm');
        if (editInput && editConfirm) {
          editInput.remove();
          editConfirm.remove();
          span.textContent = editInput.value;
        }
      }
    });

    deleteBtn.addEventListener('click', function () {
      if (li) {
        li.remove();
      }
    });

    taskList.appendChild(li);
  }

  const taskName = taskInput.value.trim();
  if (taskName !== '') {
    todoForm.insertAdjacentElement('afterend', taskList);
    addTask(taskName);
    taskInput.value = '';
  }
});
