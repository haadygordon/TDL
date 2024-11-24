// Select elements
const taskInput = document.getElementById('task-input');
const addTaskButton = document.getElementById('add-task');
const taskList = document.getElementById('task-list');
const clearTasksButton = document.getElementById('clear-tasks');

// Add task function
addTaskButton.addEventListener('click', () => {
    const taskText = taskInput.value.trim();
    if (taskText) {
        const taskItem = document.createElement('li');
        taskItem.textContent = taskText;

        // Add complete functionality
        taskItem.addEventListener('click', () => {
            taskItem.classList.toggle('completed');
        });

        // Add delete functionality
        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'X';
        deleteButton.style.marginLeft = '10px';
        deleteButton.style.color = '#dc3545';
        deleteButton.style.cursor = 'pointer';
        deleteButton.addEventListener('click', () => {
            taskList.removeChild(taskItem);
        });

        taskItem.appendChild(deleteButton);
        taskList.appendChild(taskItem);
        taskInput.value = '';
    }
});

// Clear all tasks function
clearTasksButton.addEventListener('click', () => {
    taskList.innerHTML = '';
});