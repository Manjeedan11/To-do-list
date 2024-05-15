const inputtdl = document.querySelector('.textarea');
const buttontdl = document.querySelector('.buttoninput');
const listtdl = document.querySelector('.todolist');

//Function to fetch tasks and add them to the UI
async function fetchTasks() {
    listtdl.innerHTML = ''; 
    try {
        const response = await fetch('http://localhost:5000/tasks');
        if (!response.ok) {
            throw new Error('Failed to fetch tasks');
        }
        const tasks = await response.json();
        tasks.forEach(task => {
            createTaskDOM(task);
        });
    } catch (error) {
        console.error('Error fetching tasks:', error);
    }
}

//Helper function to create task DOM elements
function createTaskDOM(task) {
    const itemall = document.createElement('div');
    itemall.classList.add('itemall');
    itemall.setAttribute('data-task-id', task._id);

    const item = document.createElement('p');
    item.classList.add('item');
    item.innerText = task.title;
    itemall.appendChild(item);

    const checkbutton = document.createElement("button");
    checkbutton.innerHTML = '<i class="fa fa-check"></i>';
    checkbutton.classList.add("check-button");
    itemall.appendChild(checkbutton);

    const editbutton = document.createElement("button");
    editbutton.innerHTML = '<i class="fa fa-edit"></i>';
    editbutton.classList.add("edit-button");
    itemall.appendChild(editbutton);

    const trashbutton = document.createElement("button");
    trashbutton.innerHTML = '<i class="fa fa-trash"></i>';
    trashbutton.classList.add("trash-button");
    itemall.appendChild(trashbutton);

    listtdl.appendChild(itemall);
}


//Function to handle adding a new task
async function addTodo() {
    try {
        const taskData = { title: inputtdl.value };
        const response = await fetch('http://localhost:5000/tasks', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(taskData)
        });
        if (!response.ok) {
            throw new Error('Failed to add task');
        }
        fetchTasks(); 

        const existingItems = document.querySelectorAll('.item');
        existingItems.forEach(item => {
            item.style.filter = 'blur(3px)';
        });

    } catch (error) {
        console.error('Error adding task:', error);
    }
}

//Function to handle checking a task
async function checkTask(taskId) {
    try {
        const response = await fetch(`http://localhost:5000/tasks/${taskId}/complete`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            }
        });
        if (!response.ok) {
            throw new Error('Failed to complete task');
        }
        
        const taskElement = document.querySelector(`[data-task-id="${taskId}"] .item`);
        taskElement.classList.toggle('checklist');

    } catch (error) {
        console.error('Error completing task:', error);
    }
}



//Function to handle deleting a task
async function deleteTask(taskId) {
    try {
        const response = await fetch(`http://localhost:5000/tasks/${taskId}`, {
            method: 'DELETE'
        });
        if (!response.ok) {
            throw new Error('Failed to delete task');
        }
        fetchTasks(); 
    } catch (error) {
        console.error('Error deleting task:', error);
    }
}

//Function to handle editing a task
async function editTask(taskId) {
    let taskElement = document.querySelector(`[data-task-id="${taskId}"] .item`);
    if (taskElement.tagName.toLowerCase() === 'input') {
        taskElement.focus();
        return;
    }

    const input = document.createElement('input');
    input.type = 'text';
    input.value = taskElement.innerText;
    input.classList.add('item'); 
    taskElement.parentNode.replaceChild(input, taskElement);
    input.focus();


    function revertToParagraph() {
        const newP = document.createElement('p');
        newP.classList.add('item');
        newP.innerText = input.value;
        input.parentNode.replaceChild(newP, input);
    }

    input.addEventListener('blur', async function() {
        await updateTask(taskId, input.value);
        revertToParagraph();
    });

    input.addEventListener('keydown', async function(e) {
        if (e.key === 'Enter') {
            await updateTask(taskId, input.value);
            revertToParagraph();
        }
    });
}


//Helper function to update a task
async function updateTask(taskId, title) {
    try {
        const response = await fetch(`http://localhost:5000/tasks/${taskId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ title })
        });
        if (!response.ok) {
            throw new Error('Failed to update task');
        }
        fetchTasks(); 
    } catch (error) {
        console.error('Error updating task:', error);
    }
}

//Event listener for button click
function clickButton(e) {
    e.preventDefault();
    if (inputtdl.value.trim() !== '') {
        addTodo();
        inputtdl.value = ''; 
    }
}

//Event listener for list click
function clickEvent(e) {
    const item = e.target.closest('button');
    if (!item) return;

    const taskId = item.parentElement.dataset.taskId;
    if (item.classList.contains('check-button')) {
        checkTask(taskId);
    } else if (item.classList.contains('trash-button')) {
        deleteTask(taskId);
    } else if (item.classList.contains('edit-button')) {
        editTask(taskId);
    }
}

buttontdl.addEventListener('click', clickButton);
listtdl.addEventListener('click', clickEvent);

// Fetch tasks when the page loads
window.addEventListener('load', fetchTasks);
