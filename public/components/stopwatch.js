/*stopwatch js*/

//grabs elements from the stopwatch part of the HTML to use
let stopwatch = document.querySelector(".stopwatch");
let stopwatchButton = document.querySelector(".stopwatchButton");
let stopwatchCount = document.querySelector(".stopwatchCount");
let countText = document.getElementById("countText");
let stopwatchPause = document.querySelector(".stopwatchPause");
let stopwatchStart = document.querySelector(".stopwatchStart");
let stopwatchStop = document.querySelector(".stopwatchStop");


//shows and starts the stopwatch timer
stopwatchButton.addEventListener("click", function(){
  stopwatchButton.style.display = "none"; //makes the button part of the button disappear
  stopwatchCount.style.display = "flex"; // makes the stopwatch count portion appear
  
  //changes the stopwatch background to be more capsule shaped
  stopwatch.style.top = "77vh";
  stopwatch.style.width = "18vw";
  stopwatch.style.height = "7.5vh";
  stopwatch.style.borderRadius = "50px";

  //checks if the stopwatch timer is paused;
  let isPaused = false;

  //keeps track of time
  let current = 0;
  let Mins = 0;

  let count = setInterval(watchCount, 10);

  function watchCount(){
    //if the stopwatch isn't paused, keep increasing current time. If it is paused, it won't increase
    if (isPaused == false){
      current += 1;
    }
    let smallSecs = Math.floor(current%100);
    let Secs = Math.floor(current/100);
    if (Secs > 59){
      Mins += 1;
      current = 0;
    }
    countText.innerHTML = String(Mins).padStart(2, "0") + ":" + String(Secs).padStart(2, "0") + "." + String(smallSecs).padStart(2,"0"); 
  }

  //pauses the stopwatch time and changes the pause button to the start button
  stopwatchPause.addEventListener("click", function(){
    isPaused = true;
    stopwatchPause.style.display = "none";
    stopwatchStart.style.display = "initial";
  })

  //starts the stopwatch time again and changes the start button to the pause button
  stopwatchStart.addEventListener("click", function(){
    isPaused = false;
    stopwatchPause.style.display = "initial";
    stopwatchStart.style.display = "none";
  })

  //resets the stopwatch and reverts it the original stopwatch button look
  stopwatchStop.addEventListener("click", function(){
    clearInterval(count);
    stopwatchCount.style.display = "none";
    stopwatchButton.style.display = "flex";

    //changes the stopwatch back to what it initially looked like
    stopwatch.style.top = "75vh";
    stopwatch.style.width = "5vw";
    stopwatch.style.height = "5vw";
    stopwatch.style.borderRadius = "50%";
  })
  
})