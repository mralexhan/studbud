import "./components/navmenu.js";
import "./components/musicplayer.js";
import "./components/stopwatch.js";

//switch changing screens js
const taskListPage = document.getElementById("taskList");
const pomodoroTimerPage = document.getElementById("pomodoroTimer");
const referenceListPage = document.getElementById("referenceList");

const logoLink = document.getElementById("logoLink");
const browserTask = document.getElementById("browserTask");
const browserTimer = document.getElementById("browserTimer");
const browserReading = document.getElementById("browserReading");

const mobileTask = document.getElementById("mobileTask");
const mobileTimer = document.getElementById("mobileTimer");
const mobileReading = document.getElementById("mobileReading");

pomodoroTimerPage.style.display= "none";
referenceListPage.style.display = "none";


//add event listeners for the navlinks so they can switch pages when clicked
browserTask.addEventListener("click", function(event){
  event.preventDefault();
  taskListPage.style.display = "initial";
  pomodoroTimerPage.style.display= "none";
  referenceListPage.style.display = "none";
})

browserTimer.addEventListener("click", function(event){
  event.preventDefault();
  taskListPage.style.display = "none";
  pomodoroTimerPage.style.display= "initial";
  referenceListPage.style.display = "none";
})

browserReading.addEventListener("click", function(event){
  event.preventDefault();
  taskListPage.style.display = "none";
  pomodoroTimerPage.style.display= "none";
  referenceListPage.style.display = "initial";
})

mobileTask.addEventListener("click", function(event){
  event.preventDefault();
  taskListPage.style.display = "flex";
  pomodoroTimerPage.style.display= "none";
  referenceListPage.style.display = "none";
  
  //makes the nav menu go back after to where it was after the user clicks on a link in the mobile display
  document.querySelector(".menu").classList.toggle("active");
  document.querySelector('.menu-toggle').classList.toggle("active");
})

mobileTimer.addEventListener("click", function(event){
  event.preventDefault();
  taskListPage.style.display = "none";
  pomodoroTimerPage.style.display= "flex";
  referenceListPage.style.display = "none";
  
  //makes the nav menu go back after to where it was after the user clicks on a link in the mobile display
  document.querySelector(".menu").classList.toggle("active");
  document.querySelector('.menu-toggle').classList.toggle("active");
})

mobileReading.addEventListener("click", function(event){
  event.preventDefault();
  taskListPage.style.display = "none";
  pomodoroTimerPage.style.display= "none";
  referenceListPage.style.display = "flex";
  
  //makes the nav menu go back after to where it was after the user clicks on a link in the mobile display
  document.querySelector(".menu").classList.toggle("active");
  document.querySelector('.menu-toggle').classList.toggle("active");
})





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


//renders task columns and tasks from local storage if there is something inside

//keeps track of column names so you can put tasks inside.
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

  //goes through each item in local storage and checks for tasks. Has a separate loop from task columns because all task columns need to be rendered before the tasks should be rendered
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


//task card js

document.getElementById("taskAdd").addEventListener("click", showAddTaskForm);
document.getElementById("newTaskOut").addEventListener("click", closeAddTaskForm);

//grabs the information from the new task form when user clicks submit button
taskForm.addEventListener("submit", function(event) {
  event.preventDefault();
  let task = taskNameInput.value;

  //checks if task name is too long
  if (task.length > 24){
    alert("The name of the task is too long! Please keep it under 24 characters.")
    return false;
  }
  
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

  if (task.completionStatus == false){
    //makes compYesButton invisible if completionStatus is false
    compYesButton.style.display = "none";
  }

  else{
    //makes compYesButton invisible if completionStatus is true
    compNoButton.style.display = "none";
  }

  
  
  
  //Puts the tasklist into the unlisted list in the taskColumn
  tasklist.appendChild(taskCard);


  //clears the input form
  taskForm.reset();
  //makes the form disappear from the screen
  taskForm.style.display = "none";

  //checks if a task card has been removed
  var removedTask = false;

  //writes the task card to storage after all the elements have been created
  writeTaskToStorage();



  //removes the task when delButton is pressed
  delButton.addEventListener("click", function(event) {
    event.preventDefault();
    taskCard.remove();
    removedTask = true;
    //removes the task from local storage
    writeTaskToStorage();
  })


  /*toggles between compNoButton and compYesButton when you click them*/
  compNoButton.addEventListener("click", function(event) {
    event.preventDefault();
    compYesButton.style.display = "initial";
    compNoButton.style.display = "none";
    task.completionStatus = true;
    //overwrite the current task in storage with new information
    writeTaskToStorage();
  })

  compYesButton.addEventListener("click", function(event) {
    event.preventDefault();
    compYesButton.style.display = "none";
    compNoButton.style.display = "initial";
    task.completionStatus = false;
    //overwrite the current task in storage with new information
    writeTaskToStorage();
  })

  //writes task object to local storage
  function writeTaskToStorage(){

    //creates the task object that will be written into storage
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

    //overwrites task in local storage if it already exists
    let numTasks = tasks.length;
    for (let o = 0; o < numTasks; o++) {

      //checks if the purpose of writing the task to storage is to remove the task. If it is, remove the task from localstorage and break out of the loop
      if (tasks[o].taskName == taskObject.taskName && removedTask == true){
        console.log(tasks[o]);
        existingTask = true;
        tasks.splice(o,1); //removes the task from localstorage
        let taskJSON = JSON.stringify(tasks);
        localStorage.setItem("tasks", taskJSON);
        removedTask = false; // resets removedTask
        break;
      }

      //checks if column has same name, and if it does, set existingTaskColumn to true
      if (tasks[o].taskName == taskObject.taskName && removedTask == false) {
        existingTask = true;
        tasks[o] = taskObject;
        let taskJSON = JSON.stringify(tasks);
        localStorage.setItem("tasks", taskJSON);
      }
    }

    //creates new task in local storage if it doesn't already exist
    if (existingTask == false) {
      tasks.push(taskObject);
      let taskJSON = JSON.stringify(tasks);
      localStorage.setItem("tasks", taskJSON);
    }

  }
}




//task column js

document.getElementById("taskColumnAdd").addEventListener("click", showAddTaskColumnForm);
document.getElementById("newTaskColumnOut").addEventListener("click", closeAddTaskColumnForm);

//saves information from add task column form into variables
taskColumnForm.addEventListener("submit", function(event) {
  event.preventDefault();
  let columnName = taskColumnName.value;

  //checks if column name is too long
  if (columnName.length > 15){
    alert("Task Column name is too long! Please keep it under 15 characters.");
    return false;
  }
  
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

  //checks if a task column has been removed
  var columnRemoved = false;

  writeColumnToStorage();

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
    columnRemoved = true;
    writeColumnToStorage();
  })

  taskColumnList.append(taskColumn);

  function writeColumnToStorage(){
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
  
    let numColumns = taskColumns.length;
    for (let o = 0; o < numColumns; o++) {
    //checks if column has same name, and if it does, set existingTaskColumn to true and overwrites the existing one with the new one
      if (taskColumns[o].columnName == taskColumnObject.columnName && columnRemoved == false) {
        existingTaskColumn = true;
        taskColumns[o] = taskColumnObject;
        let taskColumnJSON = JSON.stringify(taskColumns);
        localStorage.setItem("taskColumns", taskColumnJSON);
      }

      //if column was removed, remove the column from local storage
      if (taskColumns[o].columnName == taskColumnObject.columnName && columnRemoved == true) {
        existingTaskColumn = true;
        taskColumns.splice(o,1);
        let taskColumnJSON = JSON.stringify(taskColumns);
        localStorage.setItem("taskColumns", taskColumnJSON);
      }
    }
  
    if (existingTaskColumn == false) {
      taskColumns.push(taskColumnObject);
      let taskColumnJSON = JSON.stringify(taskColumns);
      localStorage.setItem("taskColumns", taskColumnJSON);
    }

    columnRemoved == false; //resets columnRemoved
  }
}




//start of pomodoro js

//gathers data from form and starts timer with that information when user clicks on start button
document.getElementById("startPomo").addEventListener("click", determineTimes);

function determineTimes(){
  //grabs values from form
  let PomoMin = parseInt(document.getElementById("pomoMin").value);
  let PomoSec = parseInt(document.getElementById("pomoSec").value);
  let ShortMin = parseInt(document.getElementById("shortMin").value);
  let ShortSec = parseInt(document.getElementById("shortSec").value);
  let LongMin = parseInt(document.getElementById("longMin").value);
  let LongSec = parseInt(document.getElementById("longSec").value);
  
  //checks how many milliseconds need to go down
  let pomoCurrent = ((PomoMin*60) + PomoSec) * 1000;
  let shortCurrent = ((ShortMin*60) + ShortSec) * 1000;
  let longCurrent = ((LongMin*60) + LongSec) * 1000;

  //sets initial text for each timer
  document.getElementById("pomoCount").innerHTML = String(PomoMin).padStart(2, "0") + ":" + String(PomoSec).padStart(2, "0");
  document.getElementById("shortCount").innerHTML = String(ShortMin).padStart(2, "0") + ":" + String(ShortSec).padStart(2, "0");
  document.getElementById("longCount").innerHTML = String(LongMin).padStart(2, "0") + ":" + String(LongSec).padStart(2, "0");
  

  //creates a waitTime variable that judges when certain things run. This is required because javascript seems to run everything in a function all at once, and we don't want that. To circumvent that, you manually add a wait time so things occur after a specfic time.
  let waitTime = 0;

  //adds event listener to each stop button in each pomodoro timer
  document.getElementById("pomoStop").addEventListener("click", resetPomo);
  document.getElementById("shortStop").addEventListener("click", resetPomo);
  document.getElementById("longStop").addEventListener("click", resetPomo);
  
  //runs functions for each individual countdown timer in accordance to pomodoro timer rules
  for (let i = 0; i < 4; i++){

    //makes it so pomoCountdown runs after a certian amount of time has passed
    setTimeout(function(){
      pomoCountdown(PomoMin, PomoSec)}, waitTime);
  
    //adds length of time in pomodoro to wait time.
    waitTime += pomoCurrent;

    //runs short break countdown timer after pomodoro countdown is finished
    setTimeout(function(){
      shortCountdown(ShortMin, ShortSec)}, waitTime);

    //adds length of time in short break to wait time
    waitTime += shortCurrent;
    
  }

  //runs long break countdown timer after pomodoro countdown and short break countdown have both run 4 times (in accordance to the pomodoro rules -> set by above for loop)
  setTimeout(function(){
    longCountdown(LongMin, LongSec)}, waitTime);

  //adds length of time in long break to wait time
  waitTime += longCurrent;

  //resets timer to original form after long break is over
  setTimeout(resetPomo, waitTime);

  
  //function that resets the pomodoro timer to the original form state
  function resetPomo(){
    document.getElementById("bigPomo").style.display = "block";
    document.getElementById("pomoSmall").style.display = "none";
    document.getElementById("shortSmall").style.display = "none";
    document.getElementById("longSmall").style.display = "none";

    //resets the form
    document.getElementById("bigPomo").reset();

    //clears all possible time intervals
    for (let i = 0; i < 10000; i++){
      clearInterval(i);
    }
  }
  
  
  //function how counting down the pomodoro work time
  function pomoCountdown(PomoMin, PomoSec){
  
    //makes it so only the current timer block is showing
    document.getElementById("bigPomo").style.display = "none";
    document.getElementById("pomoSmall").style.display = "block";
    document.getElementById("shortSmall").style.display = "none";
    document.getElementById("longSmall").style.display = "none";
    
    
    let current = ((PomoMin*60) + PomoSec) * 1000;
    
    //removes one second from current every second  
    let pomoInterval = setInterval(countdown, 1000);
    
    let PomoCount = document.getElementById("pomoCount");

    //countdown function that removes a second from the timer and shows the remaining time
    function countdown(){
      
      current = current-1000;
      let minLeft = Math.floor((current/1000)/60);
      let secLeft = (current/1000)%60;

      //sets the text in the box to be the remaining time. Also pads front with 0.
      PomoCount.innerHTML = String(minLeft).padStart(2, "0") + ":" + String(secLeft).padStart(2, "0");
  
      //resets the countdown timer and text when current reaches zero
      if (current == 0){
        clearInterval(pomoInterval);

        PomoCount.innerHTML = String(PomoMin).padStart(2, "0") + ":" + String(PomoSec).padStart(2, "0");
      }
    }
    
  }
  

}


//function how counting down the short breaks
function shortCountdown(ShortMin, ShortSec){
  //makes it so only the current timer block is showing
  document.getElementById("bigPomo").style.display = "none";
  document.getElementById("pomoSmall").style.display = "none";
  document.getElementById("shortSmall").style.display = "block";
  document.getElementById("longSmall").style.display = "none";
  
  let current = ((ShortMin*60) + ShortSec) * 1000;
  
  //removes one second from current every second  
  let shortInterval = setInterval(countdown, 1000);
  console.log(shortInterval);
  
  let ShortCount = document.getElementById("shortCount");

  //countdown function that removes a second from the timer and shows the remaining time
  function countdown(){
    current = current-1000;
    let minLeft = Math.floor((current/1000)/60);
    let secLeft = (current/1000)%60;
    ShortCount.innerHTML = String(minLeft).padStart(2, "0") + ":" + String(secLeft).padStart(2, "0");

     //resets the countdown timer and text when current reaches zero
    if (current == 0){
      clearInterval(shortInterval);

      ShortCount.innerHTML = String(ShortMin).padStart(2, "0") + ":" + String(ShortSec).padStart(2, "0");
    }
  }
}


//function how counting down the long breaks
function longCountdown(LongMin, LongSec){
  //makes it so only the current timer block is showing
  document.getElementById("bigPomo").style.display = "none";
  document.getElementById("pomoSmall").style.display = "none";
  document.getElementById("shortSmall").style.display = "none";
  document.getElementById("longSmall").style.display = "block";

  let current = ((LongMin*60) + LongSec) * 1000;
  
  //removes one second from current every second  
  let longInterval = setInterval(countdown, 1000);
  console.log(longInterval);
  
  let LongCount = document.getElementById("longCount");

  //countdown function that removes a second from the timer and shows the remaining time
  function countdown(){
    current = current-1000;
    let minLeft = Math.floor((current/1000)/60);
    let secLeft = (current/1000)%60;
    LongCount.innerHTML = String(minLeft).padStart(2, "0") + ":" + String(secLeft).padStart(2, "0");

     //resets the countdown timer and text when current reaches zero
    if (current == 0){
      clearInterval(longInterval);

      LongCount.innerHTML = String(LongMin).padStart(2, "0") + ":" + String(LongSec).padStart(2, "0");
    }
  }
  
}


/*start of reference list javascript*/

const groupRefForm = document.querySelector(".newGroupRefForm");
const singleRefForm = document.querySelector(".newSingleRefForm");
const singleInGroupForm = document.querySelector(".newSingleRefFormInGroup");

var referenceList = document.querySelector(".referenceList");


//renders reference lists on screen
if (localStorage.length != 0) {
  //goes through each item in local storage and checks for groupReferences.
  for (let i = 0; i < localStorage.length; i++) {
    let keyName = localStorage.key(i);
    let keyValue = localStorage.getItem(keyName);

    //checks if keyName is groupRefs
    if (keyName == "groupRefs") {
      //renders the columns within local storage
      let groupList = JSON.parse(keyValue)
      let numGroups = groupList.length;
      for (let o = 0; o < numGroups; o++) {
        addGroupRef(groupList[o].groupRefName);
      }
    }
  }

  //goes through each item in local storage and checks for individual references. It is in a separate for loop because group references need to be rendered first.
  for (let j = 0; j < localStorage.length; j++){
    let keyName = localStorage.key(j);
    let keyValue = localStorage.getItem(keyName);

    //checks if keyName is singleRefs
    if (keyName == "singleRefs"){
      let singleList = JSON.parse(keyValue);
      let numSingles = singleList.length;
      //goes through each of the single references
      for (let u = 0; u < numSingles; u++){
        addSingleRef(singleList[u].singleRefName, singleList[u].urlName, singleList[u].singleLoc, singleList[u].groupRefName);

        //makes sure the single reference is hidden by default if it is in a group
        if (singleList[u].singleLoc == "group"){
          let singles = document.querySelectorAll(".singleReference");
          for (let n = 0; n < singles.length; n++){
            if (singles[n].firstChild.firstChild.innerHTML == singleList[u].singleRefName){
              singles[n].parentNode.style.display = "none";
            }
          }
        }
      }
    }
  }
}




/*event listeners for "Add New Group", "Add New Single", and close form buttons*/
document.getElementById("newGroup").addEventListener("click", showGroupRefForm);
document.getElementById("closeGroupRefForm").addEventListener("click", closeGroupRefForm);
document.getElementById("newSingle").addEventListener("click", openSingleRefForm);
document.getElementById("closeSingleRefForm").addEventListener("click", closeSingleRefForm);


/*Functions that make forms appear and disappear*/
function showGroupRefForm() {
  groupRefForm.style.display = "initial";
}

function closeGroupRefForm() {
  groupRefForm.style.display = "none";
}

function openSingleRefForm() {
  singleRefForm.style.display = "initial";
}

function closeSingleRefForm() {
  singleRefForm.style.display = "none";
}

function openSingleRefInGroupForm() {
  singleInGroupForm.style.display = "initial";
}

function closeSingleRefInGroupForm() {
  singleInGroupForm.style.display = "none";
}

/*saves info from form when user clicks submit button*/
groupRefForm.addEventListener("submit", function(event) {
  event.preventDefault();
  let groupRefName = document.getElementById("groupRefName").value;

  //checks if name of reference name is too long
  if (groupRefName.length > 27){
    alert("Name of reference is too long! (keep under 27 characters)");
    return false;
  }

  addGroupRef(groupRefName);
})

/*creates groupRef object with info from form*/
function addGroupRef(groupRefName) {
  let groupRef = {
    id: Date.now(),
    groupRefName
  }
  renderGroupRef(groupRef);
}

/*renders the group reference on screen with information from groupRef object*/
function renderGroupRef(groupRef) {
  //array that keeps track of all the links inside the group reference
  let linkArray = [];
  
  /*javascript that creates the group reference*/
  let groupReference = document.createElement("div");
  groupReference.id = groupRef.id;
  groupReference.classList.add("groupReference");

  let groupTitle = document.createElement("div");
  groupTitle.classList.add("groupTitle");

  let referenceFront = document.createElement("div");
  referenceFront.classList.add("referenceFront");

  let groupRefName = document.createElement("h2");
  groupRefName.innerHTML = groupRef.groupRefName;

  let groupLinks = document.createElement("a");
  groupLinks.innerHTML = "open all links";

  //allows the open group links button to open all the links within the group link
  groupLinks.addEventListener("click", function(event){
    event.preventDefault();
    updateLinks();
    //opens all the links within the linkArray. There is a problem of antiviruses sometimes blocking them because they think it's a pop up though. 
    for (let i = 0; i < linkArray.length; i++){
      window.open(linkArray[i]);
    }
  });

  let removeGroupButton = document.createElement("button");
  removeGroupButton.classList.add("removeLink");
  removeGroupButton.innerHTML = "remove group reference";

  referenceFront.appendChild(groupRefName);
  referenceFront.appendChild(groupLinks);
  referenceFront.appendChild(removeGroupButton);

  /*creates the open and opened group reference buttons (allows users to open and close the group reference)*/
  let openGroup = document.createElement("button");
  openGroup.classList.add("openGroup");
  let openGroupIcon = document.createElement("img");
  openGroupIcon.classList.add("icon");
  openGroupIcon.src = require("./images/OpenedArrow.png");
  openGroupIcon.alt = "Opened Group Reference Icon";
  openGroup.appendChild(openGroupIcon);

  let closeGroup = document.createElement("button");
  closeGroup.classList.add("closeGroup");
  let closeGroupIcon = document.createElement("img");
  closeGroupIcon.classList.add("icon");
  closeGroupIcon.src = require("./images/OpenArrow.png");
  closeGroupIcon.alt = "Open Group Reference Icon";
  closeGroup.appendChild(closeGroupIcon);

  /*closeGroup button display is set to none by default*/
  closeGroup.style.display = "none";

  groupTitle.appendChild(referenceFront);
  groupTitle.appendChild(openGroup);
  groupTitle.appendChild(closeGroup);
  groupReference.appendChild(groupTitle);

  /*creates add new single reference in group button*/
  let addInGroup = document.createElement("button");
  addInGroup.classList.add("addInGroup");
  let addInGroupIcon = document.createElement("img");
  addInGroupIcon.classList.add("icon");
  addInGroupIcon.src = require("./images/Add.png");
  addInGroupIcon.alt = "Add New Reference In Group Icon";
  addInGroup.appendChild(addInGroupIcon);
  groupReference.appendChild(addInGroup);

  /*makes it so add In Group button isn't visible at first. Should be flex when it can be seen*/
  addInGroup.style.display = "none";

  referenceList.appendChild(groupReference);

  var groupRemoved = false;
  
  //function that updates the links inside the link array
  function updateLinks(){
    //looks for the single references in local storage
    linkArray = [];
    //goes through each item in local storage and checks for single references.
    for (let i = 0; i < localStorage.length; i++) {
      let keyName = localStorage.key(i);
      let keyValue = localStorage.getItem(keyName);
  
      //checks if keyName is singleRefs
      if (keyName == "singleRefs") {
        //renders the columns within local storage
        let singlesList = JSON.parse(keyValue)
        let numSingles = singlesList.length;
        for (let o = 0; o < numSingles; o++) {
          if (singlesList[o].groupRefName == groupRef.groupRefName){
            linkArray.push(singlesList[o].urlName);
          }
        }
      }
    }
    
    
  }

  addGroupToStorage();

  /*checks for when the user presses the add new single reference in group button*/
  addInGroup.addEventListener("click", openSingleRefInGroupForm);
  document.getElementById("closeSingleRefInGroupForm").addEventListener("click", closeSingleRefInGroupForm)

  /*checks for if user has submitted the openSingleRefInGroupForm*/
  singleInGroupForm.addEventListener("submit", function(event) {
    event.preventDefault();
    let singleRefName = document.getElementById("singleRefInGroupName").value;

    //checks if name of single reference is too long
    if (singleRefName.length > 40){
      alert("Name of reference is too long! (keep under 40 characters)");
      return false;
    }
    
    let urlName = document.getElementById("urlNameInGroup").value;

    //checks if user given URL is valid
    let validURL = isValidURL(urlName);
    if (validURL == false){
      alert("Please provide a valid URL");
      return false;
    }

    /*sets location of single reference to be inside a group*/
    let singleLoc = "group";

    /*sets groupRefId to the id of groupRef. This is the reason this function is in here*/
    let groupRefName = groupRef.groupRefName;
    addSingleRef(singleRefName, urlName, singleLoc, groupRefName);
    updateLinks(); //updates linkArray to include the new reference
  })

  /*resets the group reference form*/
  groupRefForm.reset();
  groupRefForm.style.display = "none";


  

  /*code that allows user to expand the group reference.*/
  openGroup.addEventListener("click", function(event) {
    event.preventDefault();
    openGroup.style.display = "none";
    closeGroup.style.display = "initial";

    /*displays all of the elements within the group*/
    for (let i = 1; i < groupReference.childElementCount; i++) {
      groupReference.children.item(i).style.display = "initial";

      /*makes sure add single reference in group button doesn't look weird*/
      if (i == groupReference.childElementCount - 1) {
        groupReference.children.item(i).style.display = "flex";
      }
    }
  })

  /*code that allows user to close the group reference.*/
  closeGroup.addEventListener("click", function(event) {
    event.preventDefault();
    openGroup.style.display = "initial";
    closeGroup.style.display = "none";

    /*hides all of the elements within the group*/
    for (let i = 1; i < groupReference.childElementCount; i++) {
      groupReference.children.item(i).style.display = "none";
    }
  })

  //removes the group reference from the page and local storage
  removeGroupButton.addEventListener("click", function(event){
    event.preventDefault();
    groupReference.remove();
    groupRemoved = true;
    addGroupToStorage();
    updateLinks();
  })

  //updates the group reference status in local storage
  function addGroupToStorage() {
    //writes task column object to local storage
    let groupRefObject = {
      "id": groupRef.id,
      "groupRefName": groupRef.groupRefName,
    }

    let groupRefs;

    if (localStorage.getItem("groupRefs") == null) {
      groupRefs = [];
    }
    else {
      groupRefs = localStorage.getItem("groupRefs");
      groupRefs = JSON.parse(groupRefs);
    }

    //checks if group reference already exists in local storage

    let existingGroupRef = false;

    let numGroups = groupRefs.length;
    for (let o = 0; o < numGroups; o++) {
      //removes the group reference from local storage if remove group reference button was pressed
      if (groupRefs[o].groupRefName == groupRefObject.groupRefName && groupRemoved == true) {
        existingGroupRef = true;
        groupRefs.splice(o,1);
        let groupRefJSON = JSON.stringify(groupRefs);
        localStorage.setItem("groupRefs", groupRefJSON);
        groupRemoved = false;

        //also removes all the single references under the group reference from local storage
        for (let i = 0; i < localStorage.length; i++) {
          let keyName = localStorage.key(i);
          let keyValue = localStorage.getItem(keyName);
      
          //checks if keyName is singleRefs
          if (keyName == "singleRefs") {
            //renders the columns within local storage
            let singlesList = JSON.parse(keyValue)
            let numSingles = singlesList.length;
            let badIndex = []; //keep track of indexes that should be removed. this needs to be here to avoid the for loop going over the number of available indexes
            for (let j = 0; j < numSingles; j++) {
              if (singlesList[j].urlName == linkArray[j]){
                badIndex.push(j);
              }
            }

            //removes the indexes from local storage
            for (let j = badIndex.length; j > 0; j--){
              singlesList.splice(j-1,1);
              console.log(singlesList);
            }

            //overwrites the current single ref list in localstorage
            let singleRefJSON = JSON.stringify(singlesList);
            localStorage.setItem("singleRefs", singleRefJSON);
          }
        }
        
        break;
      }
      
      //checks if column has same name, and if it does, set existingTaskColumn to true and overwrites the existing one with the new one
      if (groupRefs[o].groupRefName == groupRefObject.groupRefName && groupRemoved == false) {
        existingGroupRef = true;
        groupRefs[o] = groupRefObject;
        let groupRefJSON = JSON.stringify(groupRefs);
        localStorage.setItem("groupRefs", groupRefJSON);
      }

      
    }

    //if group reference doesn't exist in local storage already, add it in
    if (existingGroupRef == false) {
      groupRefs.push(groupRefObject);
      let groupRefJSON = JSON.stringify(groupRefs);
      localStorage.setItem("groupRefs", groupRefJSON);
    }

  }

}

/*saves info from Create Single Reference Form*/
singleRefForm.addEventListener("submit", function(event) {
  event.preventDefault();
  let singleRefName = document.getElementById("singleRefName").value;

  //checks if name of single reference is too long
  if (singleRefName.length > 40){
    alert("Name of reference is too long! (keep under 40 characters)");
    return false;
  }
  
  let urlName = document.getElementById("urlName").value;

  //checks if user given URL is valid
  let validURL = isValidURL(urlName);
  if (validURL == false){
    alert("Please provide a valid URL");
    return false;
  }

  /*sets location of single reference to be on page*/
  let singleLoc = "page";

  /*since single references on page aren't part of a group reference, this is undefined*/
  let groupRefName = null;
  addSingleRef(singleRefName, urlName, singleLoc, groupRefName);
})

/*creates new singleRef object with info from Create Single Reference form*/
function addSingleRef(singleRefName, urlName, singleLoc, groupRefName) {
  let singleRef = {
    id: Date.now(),
    singleRefName,
    urlName,
    singleLoc,
    groupRefName
  }
  renderSingleRef(singleRef);
}

/*creates a new single reference on the page with info from renderSingleRef object*/
function renderSingleRef(singleRef) {
  let groupReference = document.createElement("div");
  groupReference.classList.add("groupReference");

  let singleReference = document.createElement("div");
  singleReference.classList.add("singleReference");

  let referenceFront = document.createElement("div");
  referenceFront.classList.add("referenceFront");

  let singleRefName = document.createElement("h2");
  singleRefName.innerHTML = singleRef.singleRefName;

  let singleLink = document.createElement("p");
  let URL = singleRef.urlName;
  //if URL length is too long, cut it and add an ellipsis at the end
  if (URL.length > 37){
    URL = URL.substring(0, 38) + "...";
  }
  singleLink.innerHTML = URL;

  referenceFront.appendChild(singleRefName);
  referenceFront.appendChild(singleLink);

  let removeLinkButton = document.createElement("button");
  removeLinkButton.classList.add("removeLink");
  removeLinkButton.innerHTML = "remove link";

  let openLink = document.createElement("a");
  openLink.href = singleRef.urlName;
  openLink.innerHTML = "open";

  singleReference.appendChild(referenceFront);
  singleReference.append(removeLinkButton);
  singleReference.appendChild(openLink);

  groupReference.appendChild(singleReference);

  /*puts location of single reference on page if singleLoc is set to "page"*/
  if (singleRef.singleLoc == "page") {
    referenceList.appendChild(groupReference);
  }

  //inserts the single reference into its group if singleLoc is set to "group"
  if (singleRef.singleLoc == "group") {
    let groupRef;
    let listGroups = document.querySelectorAll(".groupReference");
    for (let i = 0; i < listGroups.length; i++){
      //grabs name of each group reference
      let name = listGroups[i].firstChild.firstChild.firstChild.innerHTML;
      if (singleRef.groupRefName == name){
        groupRef = listGroups[i];
      }
    }
    singleReference.style.borderTop = "none";
    groupReference.style.margin = 0;
    groupRef.insertBefore(groupReference, groupRef.lastChild);
  }

  var singleRemoved = false; //keeps track of whether or not a single reference has been removed
  addSingleToStorage(); //update the local storage


  /*resets the create single reference and single reference in group forms*/
  singleRefForm.reset();
  singleInGroupForm.reset();
  singleRefForm.style.display = "none";
  singleInGroupForm.style.display = "none";


  removeLinkButton.addEventListener("click", function(event){
    event.preventDefault();
    groupReference.remove();
    singleRemoved = true;
    addSingleToStorage();
  })
    


  function addSingleToStorage() {
    //writes task column object to local storage
    let singleRefObject = {
      "id": singleRef.id,
      "singleRefName": singleRef.singleRefName,
      "urlName": singleRef.urlName,
      "singleLoc": singleRef.singleLoc,
      "groupRefName": singleRef.groupRefName
    }

    let singleRefs;

    if (localStorage.getItem("singleRefs") == null) {
      singleRefs = [];
    }
    else {
      singleRefs = localStorage.getItem("singleRefs");
      singleRefs = JSON.parse(singleRefs);
    }

    //checks if group reference already exists in local storage

    let existingSingleRef = false;

    let numSingles = singleRefs.length;
    for (let o = 0; o < numSingles; o++) {
      //checks if single reference has same name, and if it does, set existingSingleRef to true and overwrites the existing one with the new one
      if (singleRefs[o].singleRefName == singleRefObject.singleRefName && singleRemoved == false) {
        existingSingleRef = true;
        singleRefs[o] = singleRefObject;
        let singleRefJSON = JSON.stringify(singleRefs);
        localStorage.setItem("singleRefs", singleRefJSON);
      }

      //if reference was removed, remove the reference from local storage
      if (singleRefs[o].singleRefName == singleRefObject.singleRefName && singleRemoved == true) {
        existingSingleRef = true;
        singleRefs.splice(o,1);
        let singleRefJSON = JSON.stringify(singleRefs);
        localStorage.setItem("singleRefs", singleRefJSON);
        singleRemoved = false;
        break;
      }
    }

    //creates a new single reference in local storage if one doesn't exist yet
    if (existingSingleRef == false) {
      singleRefs.push(singleRefObject);
      let singleRefJSON = JSON.stringify(singleRefs);
      localStorage.setItem("singleRefs", singleRefJSON);
    }

  }
}


//checks if a given url is a valid url. Code from https://stackoverflow.com/questions/5717093/check-if-a-javascript-string-is-a-url
function isValidURL(urlName){
  let url;
  try{
    url = new URL(urlName);
  } catch(_) {
    return false;
  }
  
  return url.protocol === "http:" || url.protocol === "https:";
}