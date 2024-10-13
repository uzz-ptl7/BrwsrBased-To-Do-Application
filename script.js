// ....................................................Array of Tasks............................................
let tasks = ["Buy milk","Clean the room","Go to the gym"];
let completedTasks = [];

// ........................Display Tasks, Create Tags and Buttons for Updating and Deleting Tasks..............................
const displayTasks = () => {
    let taskDisplay = document.querySelector('#taskDisplay');
    taskDisplay.innerHTML = '';

    // ..........................................Create Task Container.............................................
    tasks.forEach((task, index) => {
    const taskItem = document.createElement('li');
    taskItem.classList.add('bg-black', 'text-gray-200', 'p-2', 'rounded-lg','flex','justify-between', 'w-[60%]', 'm-auto', 'my-2');
    
    // ..................................................Create Task Title Container......................................
    const taskText = document.createElement('span');
    taskText.textContent = task;
    taskItem.appendChild(taskText);

    // .............................................Create Task Links Container................................
    const taskLinks = document.createElement('div');
    taskLinks.classList.add('task-links');

    // ..................................................Mark as Done Button.....................................
    const doneButton = document.createElement('a');
    doneButton.href = '#';
    doneButton.textContent = '✔️';
    doneButton.classList.add('mr-4');
    doneButton.addEventListener('click', () => markAsDone(index)); 
    taskLinks.appendChild(doneButton); 

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
    taskDisplay.appendChild(taskItem);
    })
}

// ..................................................Save Task to Local Storage......................................
const saveTaskToLocalStorage = () => {
    localStorage.setItem('tasks', JSON.stringify(tasks))
    localStorage.setItem('completedTasks', JSON.stringify(completedTasks))
}

// ..................................................Add New Task to the Array......................................
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

// ...................................................Mark as Done Button Functionality.................................
const markAsDone = (index) => {
    const task = tasks.splice(index, 1)[0];
    completedTasks.push(task);
    saveTaskToLocalStorage();
    displayTasks();
    displayCompletedTasks();
}

// ..............................................Display Completed Tasks.....................................
const displayCompletedTasks = () => {
    const completedTasksSection = document.querySelector('#completedTasks');
    const completedTaskDisplay = document.querySelector('#completedTaskDisplay');

    completedTaskDisplay.innerHTML = '';

    if (completedTasks.length > 0) {
        completedTasksSection.classList.remove('hidden');
    } else {
        completedTasksSection.classList.add('hidden');
    }

    completedTasks.forEach((task, index) => {
        const taskItem = document.createElement('li');
        taskItem.classList.add('bg-black', 'text-gray-200', 'p-2', 'rounded-lg','flex','justify-between', 'w-[60%]', 'm-auto', 'my-2');
        
        const taskText = document.createElement('span');
        taskText.textContent = task;
        taskText.classList.add('line-through');
        taskItem.appendChild(taskText);

        const taskLinks = document.createElement('div');
        taskLinks.classList.add('task-links');

        const deleteButton = document.createElement('a');
        deleteButton.href = '#';
        deleteButton.textContent = '🗑️';
        deleteButton.addEventListener('click', () => deleteCompletedTasks(index));
        taskLinks.appendChild(deleteButton); 

        taskItem.appendChild(taskLinks);
        completedTaskDisplay.appendChild(taskItem);
    })
}

// .....................................................Delete Completed Tasks........................................
const deleteCompletedTasks = (index) => {
    if(confirm('Are you sure you want to delete this task?')){
        completedTasks.splice(index, 1);
        saveTaskToLocalStorage();
        displayCompletedTasks();  
    } 
}

// ..................................................Load Tasks from Local Storage......................................
const loadTasksFromStorage = () =>{
    const storedTasks = localStorage.getItem('tasks');
    const storedCompletedTasks = localStorage.getItem('completedTasks');

    if (storedTasks) {
        tasks = JSON.parse(storedTasks);
        displayTasks();
    }

    if (storedCompletedTasks) {
        completedTasks = JSON.parse(storedCompletedTasks);
        displayCompletedTasks();
    }
}

// ..................................................Add Task Button Functionality......................................
const addTaskButton = document.querySelector('#addTaskBtn');
addTaskButton.addEventListener("click", addTask);

// ..................................................Calling Functions......................................
loadTasksFromStorage();
// displayTasks();