$(document).ready(function() {
    const $form = $('.js--form');
    const $taskInput = $('.js--form__input');
    const $taskList = $('.js--todos-wrapper');

    let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks.forEach(task => createTaskElement(task));

    $form.on('submit', function(event) {
        event.preventDefault();

        const taskText = $taskInput.val().trim();
        if (taskText === '') return;

        const task = {
            id: Date.now(),
            text: taskText,
            completed: false
        };

        tasks.push(task);
        localStorage.setItem('tasks', JSON.stringify(tasks));

        createTaskElement(task);
        $taskInput.val('');
    });

    $taskList.on('click', '.todo-item__delete', function() {
        const $taskItem = $(this).closest('li');
        const taskId = $taskItem.data('id');
        deleteTask(taskId);
    });

    $taskList.on('click', '.todo-item input[type="checkbox"]', function() {
        const $taskItem = $(this).closest('li');
        const taskId = $taskItem.data('id');
        toggleComplete(taskId);
    });

    $taskList.on('click', '.todo-item__description', function() {
        const taskText = $(this).text();
        $('#modal-task-text').text(taskText);
        $('#taskModal').modal('show');
    });

    function createTaskElement(task) {
        const taskElement = `
            <li class="todo-item list-group-item ${task.completed ? 'todo-item--checked' : ''}" data-id="${task.id}">
                <input type="checkbox" ${task.completed ? 'checked' : ''}>
                <span class="todo-item__description">${task.text}</span>
                <button class="todo-item__delete btn btn-danger btn-sm">Видалити</button>
            </li>
        `;
        $taskList.append(taskElement);
    }

    function toggleComplete(taskId) {
        tasks = tasks.map(task => {
            if (task.id == taskId) {
                task.completed = !task.completed;
            }
            return task;
        });

        localStorage.setItem('tasks', JSON.stringify(tasks));
        renderTasks();
    }

    function deleteTask(taskId) {
        tasks = tasks.filter(task => task.id != taskId);
        localStorage.setItem('tasks', JSON.stringify(tasks));
        renderTasks();
    }

    function renderTasks() {
        $taskList.empty();
        tasks.forEach(task => createTaskElement(task));
    }
});
document.addEventListener('DOMContentLoaded', () => {
    const form = document.querySelector('.js--form');
    const taskInput = document.querySelector('.js--form__input');
    const taskList = document.querySelector('.js--todos-wrapper');

    // Load tasks from localStorage
    let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks.forEach(task => {
        createTaskElement(task);
    });

    form.addEventListener('submit', addTask);
    taskList.addEventListener('click', handleTaskAction);

    function addTask(event) {
        event.preventDefault();

        const taskText = taskInput.value.trim();
        if (taskText === '') return;

        const task = {
            id: Date.now(),
            text: taskText,
            completed: false
        };

        tasks.push(task);
        localStorage.setItem('tasks', JSON.stringify(tasks));

        createTaskElement(task);
        taskInput.value = '';
    }

    function handleTaskAction(event) {
        const target = event.target;
        const taskId = target.closest('li').dataset.id;

        if (target.classList.contains('todo-item__delete')) {
            deleteTask(taskId);
        } else if (target.type === 'checkbox') {
            toggleComplete(taskId);
        }
    }

    function toggleComplete(taskId) {
        tasks = tasks.map(task => {
            if (task.id == taskId) {
                task.completed = !task.completed;
            }
            return task;
        });

        localStorage.setItem('tasks', JSON.stringify(tasks));
        renderTasks();
    }

    function deleteTask(taskId) {
        tasks = tasks.filter(task => task.id != taskId);
        localStorage.setItem('tasks', JSON.stringify(tasks));
        renderTasks();
    }

    function createTaskElement(task) {
        const taskElement = document.createElement('li');
        taskElement.className = `todo-item ${task.completed ? 'todo-item--checked' : ''}`;
        taskElement.dataset.id = task.id;

        taskElement.innerHTML = `
            <input type="checkbox" ${task.completed ? 'checked' : ''}>
            <span class="todo-item__description">${task.text}</span>
            <button class="todo-item__delete">Видалити</button>
        `;
        taskList.appendChild(taskElement);
    }

    function renderTasks() {
        taskList.innerHTML = '';
        tasks.forEach(task => {
            createTaskElement(task);
        });
    }
});
