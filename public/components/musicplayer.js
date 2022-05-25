/*javascript for music player*/

/*code modified and built off from https://codepen.io/ozzie/pen/YPOBEJ*/

//counts number of songs on the page
var numSongs = document.querySelectorAll("audio").length;

var songIndex = 1;

//grabs a variety of elements from the document to use later
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
var playlistButton = document.querySelector(".playlistButton");
var songList = document.querySelector(".songList");
var currentSongName = document.getElementById("currentSongName");
var currentArtist = document.getElementById("currentArtist");

//sets pause button to hidden by default
pauseButton.style.display = "none";

//runs the timeupdate function whenever the music is updated
music.addEventListener("timeupdate", timeUpdate, false);
//plays next song when next song button is pressed
nextSong.addEventListener("click", playNext); 
//plays previous song when previous song button is pressed
prevSong.addEventListener("click", playPrev);

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


//function that plays next song
function playNext(){
  playButton.style.display = "none"; //hides play button
  pause.style.display = "initial"; //shows pause button
  music.pause(); //stops the current song
  music.currentTime = 0; //resets the song back to beginning
  songIndex += 1; //increments the song index so it will play the next song
  //if songIndex goes beyond the current number of songs, it goes back to the first one
  if (songIndex > numSongs){
    songIndex = 1;
  }
  music = document.getElementById("song" + songIndex); //changes current playing song to the next song

  //changes the displayed song name and artist
  var songInfo = music.parentNode.children[1].children;
  currentSongName.innerHTML = songInfo[0].innerHTML
  currentArtist.innerHTMl = songInfo[1].innerHTMl
  music.play(); //plays the new song
  music.addEventListener("timeupdate", timeUpdate, false);
}

//function that plays previous song
function playPrev(){
  playButton.style.display = "none"; //hides play button
  pause.style.display = "initial"; //shows pause button
  music.pause(); //stops the current song
  music.currentTime = 0; //resets the song back to beginning
  songIndex -= 1; //increments the song index so it will play the next song
  //if songIndex goes beyond the current number of songs, it goes back to the first one
  if (songIndex < 1){
    songIndex = numSongs;
  }
  music = document.getElementById("song" + songIndex); //changes current playing song to the next song

  //changes the displayed song name and artist
  var songInfo = music.parentNode.children[1].children;
  currentSongName.innerHTML = songInfo[0].innerHTML
  currentArtist.innerHTMl = songInfo[1].innerHTMl
  music.play(); //plays the new song
  music.addEventListener("timeupdate", timeUpdate, false);
}


//makes it so every element with class "songs" will behave the same way when clicked. Code from https://www.codegrepper.com/code-examples/javascript/js+add+event+listener+to+all+elements+with+class
document.querySelectorAll(".songs").forEach(item =>{
  item.addEventListener("click", event =>{
    playButton.style.display = "none"; //hides play button
  	pause.style.display = "initial"; //shows pause button
    music.pause(); //stops the current song
    music.currentTime = 0; //resets the song back to beginning

    let songId = item.children[2].id;
    songIndex = parseInt(songId.substring(songId.length-1)); //changes songIndex to the index of song in playlist
    music = document.getElementById("song" + songIndex); //changes current playing song to the next song
  
    //changes the displayed song name and artist
    var songInfo = music.parentNode.children[1].children;
    currentSongName.innerHTML = songInfo[0].innerHTML
    currentArtist.innerHTMl = songInfo[1].innerHTMl
    music.play(); //plays the new song
    music.addEventListener("timeupdate", timeUpdate, false);
  })
})



music.addEventListener("canplaythrough", function () {
	duration = music.duration;
}, false);


//volume slider javascript. ccode from https://stackoverflow.com/questions/62160275/js-audio-volume-slider
volumeSlider.addEventListener("change", function(e){
  music.volume = e.currentTarget.value/100;
})


//Makes the songlist show up and disappear when playlist button is clicked
var songListOut = false;
playlistButton.addEventListener("click", function(){
  songList.classList.toggle("active");
});
