// Select elements
const taskInput = document.getElementById('task-input');
const addTaskButton = document.getElementById('add-task');
const taskList = document.getElementById('task-list');
const clearTasksButton = document.getElementById('clear-tasks');

// Load tasks from localStorage when the page loads
document.addEventListener('DOMContentLoaded', loadTasks);

// Add task function
addTaskButton.addEventListener('click', () => {
    const taskText = taskInput.value.trim();
    if (taskText) {
        const taskItem = createTaskElement(taskText);
        taskList.appendChild(taskItem);
        saveTaskToLocalStorage(taskText);
        taskInput.value = '';
    }
});

// Clear all tasks function
clearTasksButton.addEventListener('click', () => {
    taskList.innerHTML = '';
    localStorage.removeItem('tasks');
});

// Create a task element
function createTaskElement(taskText) {
    const taskItem = document.createElement('li');
    taskItem.textContent = taskText;

    // Add complete functionality
    taskItem.addEventListener('click', () => {
        taskItem.classList.toggle('completed');
        updateTaskStatusInLocalStorage(taskText);
    });

    // Add delete functionality
    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'X';
    deleteButton.style.marginLeft = '10px';
    deleteButton.style.color = '#dc3545';
    deleteButton.style.cursor = 'pointer';
    deleteButton.addEventListener('click', () => {
        taskList.removeChild(taskItem);
        removeTaskFromLocalStorage(taskText);
    });

    taskItem.appendChild(deleteButton);
    return taskItem;
}

// Save a new task to localStorage
function saveTaskToLocalStorage(taskText) {
    let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks.push({ text: taskText, completed: false });
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Load tasks from localStorage
function loadTasks() {
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks.forEach(task => {
        const taskItem = createTaskElement(task.text);
        if (task.completed) {
            taskItem.classList.add('completed');
        }
        taskList.appendChild(taskItem);
    });
}

// Remove a task from localStorage
function removeTaskFromLocalStorage(taskText) {
    let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks = tasks.filter(task => task.text !== taskText);
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Update task status in localStorage
function updateTaskStatusInLocalStorage(taskText) {
    let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks = tasks.map(task => {
        if (task.text === taskText) {
            task.completed = !task.completed;
        }
        return task;
    });
    localStorage.setItem('tasks', JSON.stringify(tasks));
}