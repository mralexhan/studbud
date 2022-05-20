//import "./components/navmenu";

/*javascript for the nav bar to be able to activate. Code from https://codepen.io/robdongas/pen/MWvKMRp*/
const toggler = document.querySelector('.menu-toggle');
const menu = document.querySelector('.menu');

/*
 * Toggles on and off the 'active' class on the menu
 * and the toggler button.
 */
toggler.addEventListener('click', () => {
  toggler.classList.toggle('active');
  menu.classList.toggle('active');
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

var taskListArray = [];
var taskColumnArray = [];

//showLocalColumns(); //shows locally stored information on page

//creates a task column on page at the beginning if taskColumnList doesn't have child nodes
/*if (taskColumnList.childNodes.length == 3){
  addTaskColumn("To Do", "#ED9D28");
}*/


document.getElementById("taskColumnAdd").addEventListener("click", showAddTaskColumnForm);
document.getElementById("newTaskColumnOut").addEventListener("click", closeAddTaskColumnForm);
document.getElementById("taskAdd").addEventListener("click", showAddTaskForm);
document.getElementById("newTaskOut").addEventListener("click", closeAddTaskForm);



//grabs the information from the new task form when user clicks submit button
taskForm.addEventListener("submit", function(event) {
  event.preventDefault();
  let task = taskNameInput.value;
  let dueDate = taskDueInput.value;
  let estimatedTime = taskCompInput.value;
  let priorityRating = taskPriorityInput.options[taskPriorityInput.selectedIndex].value;
  /* if (task) {
    addTask(task, dueDate, estimatedTime, priorityRating, false);
  } */
  addTask(task, dueDate, estimatedTime, priorityRating, false);
})

taskColumnForm.addEventListener("submit", function(event){
  event.preventDefault();
  let columnName = taskColumnName.value;
  let columnColor = colorpicker.value;
  addTaskColumn(columnName, columnColor);
})

function showAddTaskForm() {
  document.querySelector(".newTaskForm").style.display = "initial";
}

function closeAddTaskForm() {
  document.querySelector(".newTaskForm").style.display = "none";
}

function showAddTaskColumnForm() {
  document.querySelector(".newTaskColumnForm").style.display = "initial";
}

function closeAddTaskColumnForm() {
  document.querySelector(".newTaskColumnForm").style.display = "none";
}

function addTask(taskName, dueDate, estimatedTime, priorityRating, completionStatus) {
  let d = new Date();
  let dateCreated = d.getFullYear();
  let task = {
    id: Date.now(),
    taskName,
    dueDate,
    dateCreated,
    estimatedTime,
    priorityRating,
    completionStatus
  };
  taskListArray.push(task);
  renderTask(task);
}

function addTaskColumn(columnName, columnColor){
  let taskcolumn = {
    id: Date.now(),
    columnName,
    columnColor
  }
  taskColumnArray.push(taskcolumn);
  renderTaskColumn(taskcolumn);
}

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
  let priorityText = task.priorityRating.substring(0,1).toUpperCase() + task.priorityRating.substring(1); //capitalizes the priority text
  priorityColor.insertAdjacentText("afterbegin", priorityText); //adds text to the span element
  //changes priority text color based on what value it is
  if (task.priorityRating == "low"){
    priorityColor.classList.add("pLow");
  }
  if (task.priorityRating == "medium"){
    priorityColor.classList.add("pMedium");
  }
  if (task.priorityRating == "high"){
    priorityColor.classList.add("pHigh");
  }
  priorityRating.innerHTML = "Priority Rating: ";
  priorityRating.appendChild(priorityColor);

  //estimated time javascript
  let estimatedTime = document.createElement("p");
  let totalMinutes = task.estimatedTime;
  let hours = Math.floor(totalMinutes / 60);
  let minutes = totalMinutes % 60;
  estimatedTime.innerHTML = "Est. Time to Complete: " + hours + "H" + minutes +"M";
  
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
  delButtonImg.src = "images/Trashcan.png"; //sets image src
  delButtonImg.alt = "Delete Task Card Icon";
  delButton.appendChild(delButtonImg); //puts image under the html button container
  taskCardIcons.appendChild(delButton);
  //creates completion buttons for the task
  let compNoButton = document.createElement("button");
  let compNoButtonImg = document.createElement("img");
  compNoButtonImg.classList.add("icon");
  compNoButtonImg.src = "images/CompNo.png";
  compNoButtonImg.alt = "Task Not Completed Icon";
  compNoButton.appendChild(compNoButtonImg);
  let compYesButton = document.createElement("button");
  let compYesButtonImg = document.createElement("img");
  compYesButtonImg.classList.add("icon");
  compYesButtonImg.src = "images/CompYes.png";
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
    "completionStatus": task.completionStatus
  }

  let tasks;

  if(localStorage.getItem("tasks") == null){
    tasks = [];
  }
  else{
    tasks = localStorage.getItem("tasks");
    tasks = JSON.parse(tasks);
  }

  let existingTask = tasks.find(function(task){
    return task.id === tasks.id;
  })

  if(!existingTask){
    tasks.push(taskObject);
    let taskJSON = JSON.stringify(tasks);
    localStorage.setItem("tasks", taskJSON);
  }

  
  
  //removes the task when delButton is pressed
  delButton.addEventListener("click", function(event){
    event.preventDefault();
    taskCard.remove();
    localStorage.removeItem(tasks)
  })


  /*toggles between compNoButton and compYesButton when you click them*/
  compNoButton.addEventListener("click", function(event){
    event.preventDefault();
    compYesButton.style.display = "initial";
    compNoButton.style.display = "none";
    task.completionStatus = true;
  })

  compYesButton.addEventListener("click", function(event){
    event.preventDefault();
    compYesButton.style.display = "none";
    compNoButton.style.display = "initial";
    task.completionStatus = false;
  })
  
}

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
  taskOutImg.src = "images/Remove.png";
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
  addTaskButtonIcon.src = "images/Add.png";
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

  if(localStorage.getItem("taskColumns") == null){
    taskColumns = [];
  }
  else{
    taskColumns = localStorage.getItem("taskColumns");
    taskColumns = JSON.parse(taskColumns);
  }

  let existingTaskColumn = taskColumns.find(function(taskcolumns){
    return taskcolumns.id === taskcolumn.id;
  })

  if(!existingTaskColumn){
    taskColumns.push(taskColumnObject);
    let taskColumnJSON = JSON.stringify(taskColumns);
    localStorage.setItem("taskColumns", taskColumnJSON);
  }


  addTaskButton.addEventListener("click", function(event){
    event.preventDefault();
    tasklist = tasks;
    showAddTaskForm();
  })


  taskOutButton.addEventListener("click", function(event){
    event.preventDefault();
    taskColumn.remove();
    localStorage.removeItem(taskColumns);
  })
  
  //puts task column on page in front of the add task column button
  //taskContent.insertBefore(taskColumn, addTaskColumnButton);

  taskColumnList.append(taskColumn);
}

//checks if localStorage has something inside

  /*
if (localStorage.length != 0){

  //goes through each item in localStorage
  for (let i = 0; i < localStorage.length; i++){
    let keyName = localStorage.key(0);
    let keyValue = localStorage.getItem(keyName);

    console.log(keyValue);

    //checks if keyName is taskColumns
    if (keyName == "taskColumns"){
      
    }
  }
}
*/

/*function showLocalColumns(){
  //grabs the key of localStorage item
  let keyName = localStorage.key(0);
  let keyValue = localStorage.getItem(keyName);
  let currentLength = keyValue.length;
  for (let i = 0; i < currentLength; i++){
  

    if (keyName == "taskColumns"){
      let ColumnKey = keyValue[0].columnName;
      let ColumnValue = keyValue[0].columnColor;
    
      addTaskColumn(ColumnKey, ColumnValue);
    }
    //checks if item in local storage has start "taskColumn" and creates the column if it does
    

    //checks if item in local storage has start "taskList" and creates the tasklist if it does
    //if keyName == "tasks"{
    //  let TaskKey = taskColumnArray[i].id;
    //  let TaskValue = taskColumnArray[i].columnName;
  
    //  addTaskColumn(ColumnKey, ColumnValue);
    //}
  }
}*/






/*javascript for music player*/

/*code modified from https://codepen.io/ozzie/pen/YPOBEJ*/

//counts number of songs on the page
var numSongs = document.querySelectorAll("audio").length;

var songIndex = 1;

var music = document.getElementById("song" + songIndex);
var playButton = document.getElementById("play");
var pauseButton = document.getElementById("pause");
var playhead = document.getElementById("elapsed");
var timeline = document.getElementById("slider");
var timer = document.getElementById("timer");
var duration = music.duration;
var volumeSlider = document.getElementById("volume");
var prevSong = document.getElementById("prevSong");
var nextSong = document.getElementById("nextSong");
pauseButton.style.display = "none";

//runs the timeupdate function whenever the music is updated
music.addEventListener("timeupdate", timeUpdate, false);

//updates the timer and timeline when music is playinh
function timeUpdate() {

  //grabs percentage of song that has been played
	var playPercent = (music.currentTime / duration) * 100;

  //sets the width of the line that shows how much has been played based on percentage
	playhead.style.width = ((playPercent * 0.01) * timeline.offsetWidth) + "px";

  //checks how many minutes and seconds have been played
	var secondsIn = Math.floor(music.currentTime%60);
  var minutesIn = Math.floor(music.currentTime/60);

  //updates the little timer underneath the bar based on how much of the song has been played
	timer.innerHTML = String(minutesIn).padStart(2, "0") + ":" + String(secondsIn).padStart(2, "0");

  
}

//hides play button and shows pause button when play button is clicked
playButton.onclick = function() {
	music.play();
	playButton.style.display = "none";
	pause.style.display = "initial";
}

//hides pause button and shows play button when pause button is clicked
pauseButton.onclick = function() {
	music.pause();
	playButton.style.display = "initial";
	pause.style.display = "none";
}


music.addEventListener("canplaythrough", function () {
	duration = music.duration;
}, false);


//volume slider javascript. ccode from https://stackoverflow.com/questions/62160275/js-audio-volume-slider
volumeSlider.addEventListener("change", function(e){
  music.volume = e.currentTarget.value/100;
})