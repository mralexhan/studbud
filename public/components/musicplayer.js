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