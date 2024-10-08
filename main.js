// JS Code for my Todo-List

const taskStorageArray = [];
const finishedTasksArray = [];
const typeTask = document.querySelector("#typeTask");
const addTaskButton = document.querySelector("#addTaskButton");
const taskList = document.querySelector(".taskContainer ul");
const remainingTasks = document.querySelector("#remainingTasks");
const finishedTasks = document.querySelector("#finishedTasks");

let taskId = 0;
let completedTaskCount = 0;

addTaskButton.addEventListener("click", addTask);

function addTask() {
    if (typeTask.value === "") {
        alert("You have to type in a task");
        return;
    }

    const taskValue = typeTask.value;

    const newTask = { id: taskId++, text: taskValue, completed: false };

    taskStorageArray.push(newTask);

    // Create task element
    const li = document.createElement("li");
    li.textContent = newTask.text;
    li.classList.add("newTask");
    taskList.appendChild(li);

    console.log(taskStorageArray);

    // Handle task completion
    li.addEventListener("click", function (event) {
        //Toggles the CSS completed
        li.classList.toggle("completed");

        //Pushes newTask into an array if it contains "completed"
        if (li.classList.contains("completed")) {
            newTask.completed = true;
            finishedTasksArray.push(newTask);
        } else {
            newTask.completed = false;
            const index = finishedTasksArray.findIndex(task => task.id === newTask.id);
            if (index > -1) finishedTasksArray.splice(index, 1);
            console.log(finishedTasksArray);
        }
        updateTaskCounts();
        console.log(finishedTasksArray);
    });

    // Create and add delete button
    const deleteButton = document.createElement("button");
    deleteButton.classList.add("deleteButton");
    deleteButton.textContent = "X";
    li.appendChild(deleteButton);

    // Handle task deletion
    deleteButton.addEventListener("click", function () {
        event.stopPropagation()
        //Remove from the taskStorageArray
        const index = taskStorageArray.findIndex(task => task.id === newTask.id);
        if (index > -1) taskStorageArray.splice(index, 1);
        //Remove from the finishedTasksArray
        const indexTwo = finishedTasksArray.findIndex(task => task.id === newTask.id);
        if (indexTwo > -1) finishedTasksArray.splice(indexTwo, 1);
        //Remove task
        li.remove();
        updateTaskCounts();
        console.log(taskStorageArray);
    });


    typeTask.value = "";

}

//Posts/displays the tasks complete or not completed
function updateTaskCounts() {

    let remainingTaskCount = taskStorageArray.length - completedTaskCount;

    // Fixed issue where remainingTasks became negative
    if (remainingTaskCount < 0) {
        remainingTaskCount = 0;
    }

    finishedTask.textContent = `Finished: ${finishedTasksArray.length}`;

}
