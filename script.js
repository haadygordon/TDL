// Select elements
const taskInput = document.getElementById('task-input');
const addTaskButton = document.getElementById('add-task');
const taskList = document.getElementById('task-list');
const clearTasksButton = document.getElementById('clear-tasks');
// Select the search input
const searchInput = document.getElementById('search-input');
const categorySelect = document.getElementById('category-select');

// Load tasks from localStorage when the page loads
document.addEventListener('DOMContentLoaded', loadTasks);

// Add task function
addTaskButton.addEventListener('click', () => {
    const taskText = taskInput.value.trim();
    const dueDate = document.getElementById('due-date').value;
    if (taskText) {
        const taskItem = createTaskElement(taskText, 'all', dueDate);
        taskList.appendChild(taskItem);
        saveTaskToLocalStorage(taskText, 'all', dueDate);
        taskInput.value = '';
        document.getElementById('due-date').value = '';
    }
});

// Clear all tasks function
clearTasksButton.addEventListener('click', () => {
    taskList.innerHTML = '';
    localStorage.removeItem('tasks');
});

// Create a task element
// Add animation when a task is created
function createTaskElement(taskText, category = 'all', dueDate = '') {
    const taskItem = document.createElement('li');
    taskItem.textContent = taskText;
    taskItem.textContent = `${taskText} (${dueDate || 'No due date'})`;
    taskItem.dataset.category = category; // Store category as a data attribute
    taskItem.classList.add('task-appear'); // Add animation class

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
        taskItem.classList.add('task-disappear'); // Add removal animation
        setTimeout(() => {
            taskList.removeChild(taskItem); // Remove after animation
            removeTaskFromLocalStorage(taskText);
        }, 300); // Match animation duration
    });

    taskItem.appendChild(deleteButton);
    return taskItem;
}

// Save a new task to localStorage
function saveTaskToLocalStorage(taskText) {
    let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks.push({ text: taskText, category, dueDate, completed: false });
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

// Filter tasks function
searchInput.addEventListener('input', () => {
    const filterText = searchInput.value.toLowerCase();
    const tasks = document.querySelectorAll('#task-list li');

    tasks.forEach(task => {
        const taskText = task.firstChild.textContent.toLowerCase();
        if (taskText.includes(filterText)) {
            task.style.display = ''; // Show task
        } else {
            task.style.display = 'none'; // Hide task
        }
    });
});

categorySelect.addEventListener('change', () => {
    const selectedCategory = categorySelect.value;
    const tasks = document.querySelectorAll('#task-list li');

    tasks.forEach(task => {
        if (selectedCategory === 'all' || task.dataset.category === selectedCategory) {
            task.style.display = ''; // Show task
        } else {
            task.style.display = 'none'; // Hide task
        }
    });
});