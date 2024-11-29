document.getElementById('add-task-btn').addEventListener('click', addTask);

function addTask() {
    const taskInput = document.getElementById('task-input');
    const taskList = document.getElementById('task-list');
    const taskText = taskInput.value.trim();

    if (taskText === '') {
        alert('Please enter a task.');
        return;
    }

    const li = document.createElement('li');
    const span = document.createElement('span');
    span.textContent = taskText;

    const deleteBtn = document.createElement('button');
    deleteBtn.textContent = 'Delete';
    deleteBtn.addEventListener('click', () => li.remove());

    li.appendChild(span);
    li.appendChild(deleteBtn);
    taskList.appendChild(li);

    taskInput.value = '';
}

// Update task counter
function updateTaskCounter() {
    const taskList = document.getElementById('task-list');
    const taskCounter = document.getElementById('task-counter');
    taskCounter.textContent = `Tasks: ${taskList.children.length}`;
}

// Clear all tasks
document.getElementById('clear-all-btn').addEventListener('click', () => {
    const taskList = document.getElementById('task-list');
    taskList.innerHTML = '';
    updateTaskCounter();
});

// Update task counter on adding/removing tasks
document.getElementById('add-task-btn').addEventListener('click', () => {
    addTask();
    updateTaskCounter();
});