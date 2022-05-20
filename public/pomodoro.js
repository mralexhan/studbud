import "./components/navmenu.js";
import "./components/musicplayer.js";

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
    console.log(pomoInterval);
    
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