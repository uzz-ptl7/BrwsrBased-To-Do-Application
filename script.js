// ....................................................Array of Tasks............................................
let tasks = ["Buy milk","Clean the room","Go to the gym"];

// ........................Display Tasks, Create Tags and Buttons for Updating and Deleting Tasks..............................
const displayTasks = () => {
    let taskDisplay = document.querySelector('#taskDisplay');
    taskDisplay.innerHTML = '';

    tasks.forEach((task, index) => {
    const taskItem = document.createElement('li');
    taskItem.classList.add('bg-black', 'text-gray-200', 'p-2', 'rounded-lg','flex','justify-between', 'w-[60%]', 'm-auto', 'my-2');
    
    const taskText = document.createElement('span');

    taskText.textContent = task;
    taskItem.appendChild(taskText);

    const taskLinks = document.createElement('div');
    taskLinks.classList.add('task-links');

    // ..................................................Task Update Button......................................
    const updateButton = document.createElement('a');
    updateButton.href = '#';
    updateButton.textContent = '✏️';
    updateButton.classList.add('mr-4');
    updateButton.addEventListener('click', () => editTask(index));
    taskLinks.appendChild(updateButton);

    // ..................................................Task Delete Button......................................
    const deleteButton = document.createElement('a');
    deleteButton.href = '#';
    deleteButton.textContent = '🗑️';
    // deleteButton.classList.add('text-black');
    deleteButton.addEventListener('click', () => deleteTask(index));
    taskLinks.appendChild(deleteButton);
    
 
    taskItem.appendChild(taskLinks);

    // taskItem.textContent = task;
    taskDisplay.appendChild(taskItem);
    })
}

//...............................Functions..........................................  

// ..................................................Save Task to Local Storage......................................
const saveTaskToLocalStorage = () => {
    localStorage.setItem('tasks', JSON.stringify(tasks))
}

// ..................................................Add Task to the Array......................................
const addTask = () => {
    const newTaskInput = document.querySelector('#newTask');
    const newTask = newTaskInput.value;

    if (newTask.trim() !== ""){
       tasks.push(newTask);
       newTaskInput.value = "";
       saveTaskToLocalStorage();
       displayTasks();
    } else{
        alert('Please enter a task');
    }
}

// ..................................................Edit Task......................................
const editTask = (index) => {
    const updatedTask = prompt("Update your task", tasks[index]);
    if(updatedTask && updatedTask.trim() !== ""){
        tasks[index] = updatedTask;
        displayTasks();
    }
}

// ..................................................Delete Task......................................
const deleteTask = (index) => {
    if(confirm('Are you sure you want to delete this task?')){
        tasks.splice(index, 1);
        saveTaskToLocalStorage();
        displayTasks();  
    } 
}

// ..................................................Load Tasks from Local Storage......................................
const loadTasksFromStorage = () =>{
    const taskStored = localStorage.getItem('tasks');
    if (taskStored) {
        tasks = JSON.parse(taskStored);
        displayTasks();
    }
}

const addTaskButton = document.querySelector('#addTaskBtn');
addTaskButton.addEventListener("click", addTask);

loadTasksFromStorage();
// displayTasks();