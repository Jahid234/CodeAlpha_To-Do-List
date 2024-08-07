const selectItem = document.querySelector('#task-list');
const selectForm = document.querySelector('.todo');

document.addEventListener('DOMContentLoaded', loadTasks);

// Create click event handler
selectItem.addEventListener('click', (e) => {
    if (e.target.tagName === 'LI') {
        e.target.classList.toggle('done');
        saveTasks();
    }

    if (e.target.classList.contains('remove')) {
        e.target.parentNode.remove();
        saveTasks();
    }
});

// Create event handler for form submission
selectForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const input = e.target.task.value;
    if (validateInput(input, e.target.task)) {
        const newItemElement = newItem(input);
        selectItem.insertAdjacentElement('afterbegin', newItemElement);
        saveTasks();
        e.target.task.value = '';
    }
});

// Create Validate Input Function
const validateInput = (input, element) => {
    if (input) {
        element.parentNode.classList.remove('error');
        return true;
    } else {
        element.parentNode.classList.add('error');
        return false;
    }
};

// Create new item function for insert new item
const newItem = (content) => {
    const createAItem = document.createElement('li');
    createAItem.textContent = content;
    createAItem.insertAdjacentElement('afterbegin', removeButton());
    return createAItem;
};

// Create remove button function
const removeButton = () => {
    const createRemoveBtn = document.createElement('span');
    createRemoveBtn.classList.add('remove');
    createRemoveBtn.textContent = 'X';
    return createRemoveBtn;
};

// Load tasks from local storage
function loadTasks() {
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks.forEach(task => {
        const newItemElement = newItem(task.content);
        if (task.done) {
            newItemElement.classList.add('done');
        }
        selectItem.appendChild(newItemElement);
    });
}

// Save tasks to local storage
function saveTasks() {
    const tasks = [];
    document.querySelectorAll('#task-list li').forEach(taskItem => {
        tasks.push({
            content: taskItem.textContent.slice(1), // Remove the 'X' from the text content
            done: taskItem.classList.contains('done')
        });
    });
    localStorage.setItem('tasks', JSON.stringify(tasks));
}