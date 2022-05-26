import "./components/navmenu.js";
import "./components/musicplayer.js";


//Task List js starts here
const taskForm = document.querySelector(".newTaskForm");
const taskColumnForm = document.querySelector(".newTaskColumnForm");

var taskColumnList = document.querySelector(".taskContent > ul")
var tasklist = document.querySelector(".taskColumn > ul");

var taskNameInput = document.getElementById("taskName");
var taskDueInput = document.getElementById("taskDue");
var taskCompInput = document.getElementById("taskComp");
var taskPriorityInput = document.getElementById("taskPriority");
var addTaskColumnButton = document.getElementById("taskColumnAdd");

var taskListArray = [];
var taskColumnArray = [];

//showLocalColumns(); //shows locally stored information on page

//creates a task column on page at the beginning if taskColumnList doesn't have child nodes
/*if (taskColumnList.childNodes.length == 3){
  addTaskColumn("To Do", "#ED9D28");
}*/


//task card js

document.getElementById("taskAdd").addEventListener("click", showAddTaskForm);
document.getElementById("newTaskOut").addEventListener("click", closeAddTaskForm);

//grabs the information from the new task form when user clicks submit button
taskForm.addEventListener("submit", function(event) {
  event.preventDefault();
  let task = taskNameInput.value;
  let dueDate = taskDueInput.value;
  let estimatedTime = taskCompInput.value;
  let priorityRating = taskPriorityInput.options[taskPriorityInput.selectedIndex].value;
  addTask(task, dueDate, estimatedTime, priorityRating, false);
})

//makes add task form appear
function showAddTaskForm() {
  document.querySelector(".newTaskForm").style.display = "initial";
}

//makes add task form disappear
function closeAddTaskForm() {
  document.querySelector(".newTaskForm").style.display = "none";
}

//creates a task object based on the information from form
function addTask(taskName, dueDate, estimatedTime, priorityRating, completionStatus) {
  let d = new Date();
  let dateCreated = d.getFullYear();
  let location = tasklist.parentNode.children[0].innerHTML;
  let task = {
    id: Date.now(),
    taskName,
    dueDate,
    dateCreated,
    estimatedTime,
    priorityRating,
    completionStatus,
    location
  };
  taskListArray.push(task);
  renderTask(task);
}

//renders the task card on the screen
function renderTask(task) {
  //create HTML elements

  //creates task card div
  let taskCard = document.createElement("div");
  taskCard.setAttribute("data-id", task.id);
  taskCard.classList.add("taskCard");

  //creates task card title div
  let taskCardTitle = document.createElement("div");
  taskCardTitle.classList.add("taskCardTitle")
  //creates task card header (h3)
  let taskCardHeader = document.createElement("h3");
  taskCardHeader.innerHTML = task.taskName;
  taskCardTitle.appendChild(taskCardHeader); //adds h3 to taskCardTitle div
  taskCard.appendChild(taskCardTitle); //adds taskCardTitle to taskCard div

  //creates taskCardInfo div
  let taskCardInfo = document.createElement("div");
  taskCardInfo.classList.add("taskCardInfo");
  //creates text for the different task information
  let dueDate = document.createElement("p");
  dueDate.innerHTML = "Due Date: " + task.dueDate;
  let priorityRating = document.createElement("p");

  //javascript for priority
  let priorityColor = document.createElement("span");
  let priorityText = task.priorityRating.substring(0, 1).toUpperCase() + task.priorityRating.substring(1); //capitalizes the priority text
  priorityColor.insertAdjacentText("afterbegin", priorityText); //adds text to the span element
  //changes priority text color based on what value it is
  if (task.priorityRating == "low") {
    priorityColor.classList.add("pLow");
  }
  if (task.priorityRating == "medium") {
    priorityColor.classList.add("pMedium");
  }
  if (task.priorityRating == "high") {
    priorityColor.classList.add("pHigh");
  }
  priorityRating.innerHTML = "Priority Rating: ";
  priorityRating.appendChild(priorityColor);

  //estimated time javascript
  let estimatedTime = document.createElement("p");
  let totalMinutes = task.estimatedTime;
  let hours = Math.floor(totalMinutes / 60);
  let minutes = totalMinutes % 60;
  estimatedTime.innerHTML = "Est. Time to Complete: " + hours + "H" + minutes + "M";

  taskCardInfo.appendChild(dueDate);
  taskCardInfo.appendChild(priorityRating);
  taskCardInfo.appendChild(estimatedTime);
  taskCard.appendChild(taskCardInfo);

  //creates the icon section of the task card
  let taskCardIcons = document.createElement("div");
  taskCardIcons.classList.add("taskCardIcons");
  //creates a delete button for the task
  let delButton = document.createElement("button");
  let delButtonImg = document.createElement("img"); //creates image in document
  delButtonImg.classList.add("icon"); //adds class "icon" to image
  delButtonImg.src = require("./images/Trashcan.png"); //sets image src
  delButtonImg.alt = "Delete Task Card Icon";
  delButton.appendChild(delButtonImg); //puts image under the html button container
  taskCardIcons.appendChild(delButton);
  //creates completion buttons for the task
  let compNoButton = document.createElement("button");
  let compNoButtonImg = document.createElement("img");
  compNoButtonImg.classList.add("icon");
  compNoButtonImg.src = require("./images/CompNo.png");
  compNoButtonImg.alt = "Task Not Completed Icon";
  compNoButton.appendChild(compNoButtonImg);
  let compYesButton = document.createElement("button");
  let compYesButtonImg = document.createElement("img");
  compYesButtonImg.classList.add("icon");
  compYesButtonImg.src = require("./images/CompYes.png");
  compYesButtonImg.alt = "Task Completed Icon";
  compYesButton.appendChild(compYesButtonImg);
  //adds buttons to icon secton div
  taskCardIcons.appendChild(compNoButton);
  taskCardIcons.appendChild(compYesButton);
  taskCard.appendChild(taskCardIcons);

  //makes compYesButton invisible by default
  compYesButton.style.display = "none";
  //Puts the tasklist into the unlisted list in the taskColumn
  tasklist.appendChild(taskCard);


  //clears the input form
  taskForm.reset();
  //makes the form disappear from the screen
  taskForm.style.display = "none";



  //writes task object to local storage
  let taskObject = {
    "id": task.id,
    "taskName": task.taskName,
    "dueDate": task.dueDate,
    "dateCreated": task.dateCreated,
    "estimatedTime": task.estimatedTime,
    "priorityRating": task.priorityRating,
    "completionStatus": task.completionStatus,
    "taskLocation": task.location
  }

  let tasks;

  //if nothing is in the localstorage tasks list, then creates an empty array to indicate that
  if (localStorage.getItem("tasks") == null) {
    tasks = [];
  }
  //else, save the task into local storage under tasks
  else {
    tasks = localStorage.getItem("tasks");
    tasks = JSON.parse(tasks);
  }

  //checks if task already exists in localstorage

  let existingTask = false;

  //checks if localStorage has something inside
  if (localStorage.length != 0) {
    //goes through each item in localStorage
    for (let i = 0; i < localStorage.length; i++) {
      let keyName = localStorage.key(i);
      let keyValue = localStorage.getItem(keyName);
      //checks if keyName is taskColumns
      if (keyName == "tasks") {
        let tasksList = JSON.parse(keyValue);
        let numTasks = tasksList.length;
        for (let o = 0; o < numTasks; o++) {
          //checks if column has same name, and if it does, set existingTaskColumn to true
          if (tasksList[o].taskName == taskObject.taskName) {
            existingTask = true;
          }
        }
      }
    }
  }

  if (existingTask == false) {
    tasks.push(taskObject);
    let taskJSON = JSON.stringify(tasks);
    localStorage.setItem("tasks", taskJSON);
  }



  //removes the task when delButton is pressed
  delButton.addEventListener("click", function(event) {
    event.preventDefault();
    taskCard.remove();
    localStorage.removeItem(tasks)
  })


  /*toggles between compNoButton and compYesButton when you click them*/
  compNoButton.addEventListener("click", function(event) {
    event.preventDefault();
    compYesButton.style.display = "initial";
    compNoButton.style.display = "none";
    task.completionStatus = true;
  })

  compYesButton.addEventListener("click", function(event) {
    event.preventDefault();
    compYesButton.style.display = "none";
    compNoButton.style.display = "initial";
    task.completionStatus = false;
  })
}




//task column js

document.getElementById("taskColumnAdd").addEventListener("click", showAddTaskColumnForm);
document.getElementById("newTaskColumnOut").addEventListener("click", closeAddTaskColumnForm);

//saves information from add task column form into variables
taskColumnForm.addEventListener("submit", function(event) {
  event.preventDefault();
  let columnName = taskColumnName.value;
  let columnColor = colorpicker.value;
  addTaskColumn(columnName, columnColor);
})

//makes add task column form appear
function showAddTaskColumnForm() {
  document.querySelector(".newTaskColumnForm").style.display = "initial";
}

//makes add task column form disappear
function closeAddTaskColumnForm() {
  document.querySelector(".newTaskColumnForm").style.display = "none";
}

//creates a task column object based on the information from form
function addTaskColumn(columnName, columnColor) {
  let taskcolumn = {
    id: Date.now(),
    columnName,
    columnColor
  }
  taskColumnArray.push(taskcolumn);
  renderTaskColumn(taskcolumn);
}

//renders the task column on the screen
function renderTaskColumn(taskcolumn) {
  //creates task column and h2 
  let taskColumn = document.createElement("div");
  taskColumn.classList.add("taskColumn");
  taskColumn.style.minHeight = "20vh"; //styles minHeight here so it won't affect other columns
  taskColumn.style.backgroundColor = taskcolumn.columnColor;
  let taskColumnHead = document.createElement("h2");
  taskColumnHead.innerHTML = taskcolumn.columnName;
  taskColumn.appendChild(taskColumnHead);

  //creates delete task column button
  let taskOutButton = document.createElement("button");
  taskOutButton.classList.add("taskOut");
  let taskOutImg = document.createElement("img");
  taskOutImg.classList.add("icon");
  taskOutImg.src = require("./images/Remove.png");
  taskOutImg.alt = "Remove Task Column Icon";
  taskOutButton.appendChild(taskOutImg);
  taskColumn.appendChild(taskOutButton);

  //creates empty list where task cards go
  let tasks = document.createElement("ul");
  taskColumn.appendChild(tasks);

  //creates add task button
  let addTaskButton = document.createElement("button");
  addTaskButton.classList.add("taskAdd");
  let addTaskButtonIcon = document.createElement("img");
  addTaskButtonIcon.classList.add("icon");
  addTaskButtonIcon.src = require("./images/Add.png");
  addTaskButtonIcon.alt = "Add Task Button Icon"
  addTaskButton.appendChild(addTaskButtonIcon);
  taskColumn.appendChild(addTaskButton);

  //makes taskColumnForm reset and disappear
  taskColumnForm.reset();
  taskColumnForm.style.display = "none";


  //writes task column object to local storage
  let taskColumnObject = {
    "id": taskcolumn.id,
    "columnName": taskcolumn.columnName,
    "columnColor": taskcolumn.columnColor
  }

  let taskColumns;

  if (localStorage.getItem("taskColumns") == null) {
    taskColumns = [];
  }
  else {
    taskColumns = localStorage.getItem("taskColumns");
    taskColumns = JSON.parse(taskColumns);
  }

  //checks if task column already exists in local storage

  let existingTaskColumn = false;

  //checks if localStorage has something inside
  if (localStorage.length != 0) {
    //goes through each item in localStorage
    for (let i = 0; i < localStorage.length; i++) {
      let keyName = localStorage.key(i);
      let keyValue = localStorage.getItem(keyName);
      //checks if keyName is taskColumns
      if (keyName == "taskColumns") {
        let columnList = JSON.parse(keyValue);
        let numColumns = columnList.length;
        for (let o = 0; o < numColumns; o++) {
          //checks if column has same name, and if it does, set existingTaskColumn to true
          if (columnList[o].columnName == taskColumnObject.columnName) {
            existingTaskColumn = true;
          }
        }
      }
    }
  }

  if (existingTaskColumn == false) {
    taskColumns.push(taskColumnObject);
    let taskColumnJSON = JSON.stringify(taskColumns);
    localStorage.setItem("taskColumns", taskColumnJSON);
  }

  //shows the task form when the add task button is pressed
  addTaskButton.addEventListener("click", function(event) {
    event.preventDefault();
    tasklist = tasks; //changes the current tasklist to the <ul> element inside the column so that the task cards show up in the right place
    showAddTaskForm();
  })

  //removes the task column when the remove task column button is pressed
  taskOutButton.addEventListener("click", function(event) {
    event.preventDefault();
    taskColumn.remove();
    localStorage.removeItem(taskColumns);
  })

  //puts task column on page in front of the add task column button
  //taskContent.insertBefore(taskColumn, addTaskColumnButton);

  taskColumnList.append(taskColumn);
}


//keeps track of column names so you can put tasks inside. Has the first non-displayed column name inside by default
var nameArray = ["To Do"];

//checks if localStorage has something inside 
if (localStorage.length != 0) {
  //goes through each item in local storage and checks for task columns. It needs to find all the task columns before it finds tasks, that's why it's separate.
  for (let i = 0; i < localStorage.length; i++) {
    let keyName = localStorage.key(i);
    let keyValue = localStorage.getItem(keyName);

    //checks if keyName is taskColumns
    if (keyName == "taskColumns") {
      //renders the columns within local storage
      let columnList = JSON.parse(keyValue)
      let numColumns = columnList.length;
      for (let o = 0; o < numColumns; o++) {
        addTaskColumn(columnList[o].columnName, columnList[o].columnColor);
        nameArray.push(columnList[o].columnName);
      }
    }
  }

  //goes through each item in local storage and checks for tasks
  for (let i = 0; i < localStorage.length; i++) {
    let keyName = localStorage.key(i);
    let keyValue = localStorage.getItem(keyName);

    //checks if keyName is tasks
    if (keyName == "tasks") {
      let taskList = JSON.parse(keyValue);
      let numTasks = taskList.length;
      //goes through the tasks in local storage
      for (let u = 0; u < numTasks; u++) {
        //goes through the task columns on page
        for (let j = 0; j < nameArray.length; j++){
          //checks if task location has same name as task column name
          if (taskList[u].taskLocation == nameArray[j]){
            tasklist = document.querySelectorAll(".taskColumn")[j].children[2];
            addTask(taskList[u].taskName, taskList[u].dueDate, taskList[u].estimatedTime, taskList[u].priorityRating, taskList[u].completionStatus);
          }
        }
        
      }
    }
  }
}