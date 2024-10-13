let tasks = ["Buy milk", "Clean the room", "Go to the gym"];

const displayTasks = () => {
    let taskDisplay = document.querySelector("#taskDisplay");
    let container = document.querySelector(".container");
    taskDisplay.innerHTML = "";
    tasks.forEach((task, index) => {
        const taskItem = document.createElement('li');
        // container.classList.add('bg-red-600')
        taskItem.classList.add('bg-blue-200', 'p-2', 'm-2', 'rounded-lg');
        taskItem.textContent = task;
        taskDisplay.appendChild(taskItem);
    })
}

const saveTasksToLocalStorage = () => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

const addTask = () => {
    const newTaskInput = document.querySelector("#newTask");
    const newTask = newTaskInput.value;

    if(newTask.trim() !== ""){
        tasks.push(newTask);
        newTaskInput.value = "";
        saveTasksToLocalStorage();
        displayTasks();
    } else {
        alert("Please enter a task");
    }
} 

const addTaskButton = document.querySelector("#addTaskBtn");
addTaskButton.addEventListener('click', addTask);

const loadTasksFromLocalStorage = () => {
    const storedTasks = localStorage.getItem("tasks");

    if(storedTasks){
        tasks = JSON.parse(storedTasks);
        displayTasks();
    }
}

loadTasksFromLocalStorage();
// displayTasks(); 