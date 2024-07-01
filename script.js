var data = [];
var todoButtonEl = document.getElementById("add-task-button");
var tasksEl = document.getElementById("task-list");

var homePageEl = document.getElementById("homePage");
var helpersPageEl = document.getElementById("helpers-page");
var resourcesPageEl = document.getElementById("resources-page");
var navBarEl = document.getElementById("nav-bar");
var chatBoxEl=document.getElementById("chat-box");
window.onload = function () {
  homePageEl.hidden = true;
  helpersPageEl.hidden = true;
  resourcesPageEl.hidden = true;
  navBarEl.hidden = true;
  chatBoxEl.hidden=true;

};

document.getElementById("circlePage").addEventListener("click", function () {
  document.getElementById("circlePage").hidden = true;
  homePageEl.hidden = false;
  navBarEl.hidden = false;
  chatBoxEl.hidden=false;

});

function helpersPageLoad() {
  resourcesPageEl.hidden = true;
  helpersPageEl.hidden = false;
  homePageEl.hidden = true;
  navBarEl.hidden = false;
  chatBoxEl.hidden=false;

}

function resourcesPageLoad() {
  helpersPageEl.hidden = true;
  homePageEl.hidden = true;
  navBarEl.hidden = false;
  resourcesPageEl.hidden = false;
  chatBoxEl.hidden=false;

}

function homePageLoad(){
  helpersPageEl.hidden=true;
  homePageEl.hidden=false;
  navBarEl.hidden=false;
  resourcesPageEl.hidden=true;
  
}


//TODO LIST FUNCTIONS - I tried my best to not reference what Jin did in his todo list. I wanted to see if I could come up with the code myself. I noted below which parts I referenced from Jin's todo list.

function taskList(task) {
  var tasksEl = document.getElementById("task-list");
  tasksEl.innerHTML +=
    "<li class='list-group-item'><input class='form-check-input me-1' type='checkbox' id='" +
    task.id +
    "' onclick='completedItems()'><span>" +
    task.taskName +
    "</span></li>";
}

//I referenced Jin's todo list code to learn how to push a new object into an array with a unique id.

function addTodos() {
  var inputTask = document.getElementById("input-todo").value;
  if (inputTask === "") {
    alert("You need to add a task.");
  } else {
    var newTask = { id: getTimeStamp() };
    newTask.taskName = inputTask;
    newTask.taskDone = false;
    data.push(newTask);
    taskList(newTask);
  }
  updateItemsLeft();
}

//Had some trouble figuring out how to add a class to the span in the innerHTML wihtout adding a new unique id. Referenced: https://www.w3schools.com/jsref/prop_node_nextsibling.asp to figure out that I could called the nextSibling property to add the class.

//what this code basically does: once the box is checked, the checkbox is disabled. It also adds a class called remove to the parent element so that each completed item has that it. It makes it easier to remove the item from html. It also changes the taskDone to true in the task's object. The reference to the sibling element is so that we can add a line-through the complete item's text.

function completedItems() {
  for (var i = 0; i < data.length; i++) {
    var checkBoxEl = document.getElementById(data[i].id);
    var checkBoxElSib = checkBoxEl.nextSibling;
    var checkBoxElPar = checkBoxEl.parentElement;
    if (checkBoxEl.checked) {
      checkBoxEl.setAttribute("checked", true);
      checkBoxEl.setAttribute("disabled", true);
      data[i].taskDone = true;
      checkBoxElSib.className = "completed-task";
      checkBoxElPar.className += " remove";
    }
  }
  updateItemsLeft();
}

//I referenced how to remove an object from an array from Jin's todo list

function deleteTaskFromArray(event) {
  var incompleteTodos = data.filter(function (todo) {
    return todo.taskDone === false;
    taskList("");
  });
  data = incompleteTodos;
}

function deleteTaskFromHTML() {
  var removeClass = document.querySelectorAll(".remove");
  var inputTask = document.getElementById("input-todo").value;
  for (var i = 0; i < removeClass.length; i++) {
    removeClass[i].remove();
  }
}

function deleteItem() {
  deleteTaskFromHTML();
  deleteTaskFromArray();
  updateItemsLeft();
}

//This function is referenced from Jin's code because I wanted to create a unique id.

function getTimeStamp() {
  return Date.now();
}

//I coded the two functions below in a Tinker. I updated it so that it fits our new todo list.

function updateItemsLeft() {
  let remainingTaskEl = document.getElementById("remaining-tasks");
  var completedTodos = data.filter(function (todo) {
    return todo.taskDone === true;
  });
  remainingTaskEl.textContent = data.length - completedTodos.length;
}

function markAllComplete() {
  for (var i = 0; i < data.length; i++) {
    var checkBoxEl = document.getElementById(data[i].id);
    var checkBoxElSib = checkBoxEl.nextSibling;
    var checkBoxElPar = checkBoxEl.parentElement;
    if (data[i].taskDone == false) {
      data[i].taskDone = true;
      checkBoxEl.setAttribute("checked", true);
      checkBoxEl.setAttribute("disabled", true);
      checkBoxElSib.className = "completed-task";
      checkBoxElPar.className += " remove";
    }
  }
  updateItemsLeft();
}

// 'Sounds to Sleep To' Music Player
//To retrieve a new audio file to treat as a new track
function createTrackItem(index, name, duration) {
  var trackItem = document.createElement("div");
  trackItem.setAttribute("class", "playlist-track-ctn");
  trackItem.setAttribute("id", "ptc-" + index);
  trackItem.setAttribute("data-index", index);
  document.querySelector(".playlist-ctn").appendChild(trackItem);
  //To change the play button to pause and back again
  var playBtnItem = document.createElement("div");
  playBtnItem.setAttribute("class", "playlist-btn-play");
  playBtnItem.setAttribute("id", "pbp-" + index);
  document.querySelector("#ptc-" + index).appendChild(playBtnItem);
  //In order for the other buttons to change tracks
  var btnImg = document.createElement("i");
  btnImg.setAttribute("class", "fas fa-play");
  btnImg.setAttribute("height", "40");
  btnImg.setAttribute("width", "40");
  btnImg.setAttribute("id", "p-img-" + index);
  document.querySelector("#pbp-" + index).appendChild(btnImg);
  //Display track info
  var trackInfoItem = document.createElement("div");
  trackInfoItem.setAttribute("class", "playlist-info-track");
  trackInfoItem.innerHTML = name;
  document.querySelector("#ptc-" + index).appendChild(trackInfoItem);
  //To make the progress bar follow the song
  var trackDurationItem = document.createElement("div");
  trackDurationItem.setAttribute("class", "playlist-duration");
  trackDurationItem.innerHTML = duration;
  document.querySelector("#ptc-" + index).appendChild(trackDurationItem);
}
//I decided to list the audio files as an array. These audio links may go dead after a while but for now they seem to work.
var listAudio = [
  {
    name: "Ocean Waves",
    file: "https://www.mboxdrive.com/Ocean%20Waves.m4a",
    duration: "08:06:23"
  },
  {
    name: "Campfire in the Forest",
    file: "https://www.mboxdrive.com/Campfire.m4a",
    duration: "08:00:16"
  },
  {
    name: "Rainstorm with Thunder",
    file: "https://www.mboxdrive.com/Rainstorm.m4a",
    duration: "08:00:13"
  },
  {
    name: "Michael Sealy - Becoming Your Ideal Self",
    file: "https://www.mboxdrive.com/Ideal%20Self.m4a",
    duration: "0:59:55"
  },
  {
    name: "Lauren Fenton - Concentration",
    file: "https://www.mboxdrive.com/Concentration.m4a",
    duration: "1:00:37"
  },
  {
    name: "Throat Singing",
    file: "https://www.mboxdrive.com/Throat%20Singing.m4a",
    duration: "02:37:01"
  },
  {
    name: "J.R.R. Tolkien - The Silmarillion",
    file: "https://www.mboxdrive.com/Silmarillion.m4a",
    duration: "11:57:03"
  },
  {
    name: "Frank Herbert - Dune",
    file: "https://www.mboxdrive.com/Dune.m4a",
    duration: "21:02:27"
  },
  {
    name: "Leo Tolstoy - War And Peace",
    file: "https://www.mboxdrive.com/videoplayback.m4a",
    duration: "05:32:42"
  }
];
//So the player lists the duration of the audio file
for (var i = 0; i < listAudio.length; i++) {
  createTrackItem(i, listAudio[i].name, listAudio[i].duration);
}
var indexAudio = 0;

function loadNewTrack(index) {
  var player = document.querySelector("#source-audio");
  player.src = listAudio[index].file;
  document.querySelector(".title").innerHTML = listAudio[index].name;
  this.currentAudio = document.getElementById("myAudio");
  this.currentAudio.load();
  this.toggleAudio();
  this.updateStylePlaylist(this.indexAudio, index);
  this.indexAudio = index;
}
//Couldn't get playlist items to appear in the player after a song was already playing. Also wouldn't change color when clicking. Looked at this to help me fix it: https://codepen.io/rutcoba/pen/jOOGxZz

var playListItems = document.querySelectorAll(".playlist-track-ctn");

for (let i = 0; i < playListItems.length; i++) {
  playListItems[i].addEventListener("click", getClickedElement.bind(this));
}

function getClickedElement(event) {
  for (let i = 0; i < playListItems.length; i++) {
    if (playListItems[i] == event.target) {
      var clickedIndex = event.target.getAttribute("data-index");
      if (clickedIndex == this.indexAudio) {
        // alert('Same audio');
        this.toggleAudio();
      } else {
        loadNewTrack(clickedIndex);
      }
    }
  }
}

document.querySelector("#source-audio").src = listAudio[indexAudio].file;
document.querySelector(".title").innerHTML = listAudio[indexAudio].name;

var currentAudio = document.getElementById("myAudio");

currentAudio.load();

currentAudio.onloadedmetadata = function () {
  document.getElementsByClassName("duration")[0].innerHTML = this.getMinutes(
    this.currentAudio.duration
  );
}.bind(this);

var interval1;
//To allow the audio controls to change when clicked on and control audio file
function toggleAudio() {
  if (this.currentAudio.paused) {
    document.querySelector("#icon-play").style.display = "none";
    document.querySelector("#icon-pause").style.display = "block";
    document
      .querySelector("#ptc-" + this.indexAudio)
      .classList.add("active-track");
    this.playToPause(this.indexAudio);
    this.currentAudio.play();
  } else {
    document.querySelector("#icon-play").style.display = "block";
    document.querySelector("#icon-pause").style.display = "none";
    this.pauseToPlay(this.indexAudio);
    this.currentAudio.pause();
  }
}

function pauseAudio() {
  this.currentAudio.pause();
  clearInterval(interval1);
}

var timer = document.getElementsByClassName("timer")[0];
//To let the progress bar be clicked on to skip to that part o the song
var barProgress = document.getElementById("myBar");

var width = 0;

function onTimeUpdate() {
  var t = this.currentAudio.currentTime;
  timer.innerHTML = this.getMinutes(t);
  this.setBarProgress();
  if (this.currentAudio.ended) {
    document.querySelector("#icon-play").style.display = "block";
    document.querySelector("#icon-pause").style.display = "none";
    this.pauseToPlay(this.indexAudio);
    if (this.indexAudio < listAudio.length - 1) {
      var index = parseInt(this.indexAudio) + 1;
      this.loadNewTrack(index);
    }
  }
}

function setBarProgress() {
  var progress =
    (this.currentAudio.currentTime / this.currentAudio.duration) * 100;
  document.getElementById("myBar").style.width = progress + "%";
}

function getMinutes(t) {
  var min = parseInt(parseInt(t) / 60);
  var sec = parseInt(t % 60);
  if (sec < 10) {
    sec = "0" + sec;
  }
  if (min < 10) {
    min = "0" + min;
  }
  return min + ":" + sec;
}

var progressbar = document.querySelector("#myProgress");
progressbar.addEventListener("click", seek.bind(this));

//button functions
function seek(event) {
  var percent = event.offsetX / progressbar.offsetWidth;
  this.currentAudio.currentTime = percent * this.currentAudio.duration;
  barProgress.style.width = percent * 100 + "%";
}

function forward() {
  this.currentAudio.currentTime = this.currentAudio.currentTime + 5;
  this.setBarProgress();
}

function rewind() {
  this.currentAudio.currentTime = this.currentAudio.currentTime - 5;
  this.setBarProgress();
}

function next() {
  if (this.indexAudio < listAudio.length - 1) {
    var oldIndex = this.indexAudio;
    this.indexAudio++;
    updateStylePlaylist(oldIndex, this.indexAudio);
    this.loadNewTrack(this.indexAudio);
  }
}

function previous() {
  if (this.indexAudio > 0) {
    var oldIndex = this.indexAudio;
    this.indexAudio--;
    updateStylePlaylist(oldIndex, this.indexAudio);
    this.loadNewTrack(this.indexAudio);
  }
}

function updateStylePlaylist(oldIndex, newIndex) {
  document.querySelector("#ptc-" + oldIndex).classList.remove("active-track");
  this.pauseToPlay(oldIndex);
  document.querySelector("#ptc-" + newIndex).classList.add("active-track");
  this.playToPause(newIndex);
}

function playToPause(index) {
  var ele = document.querySelector("#p-img-" + index);
  ele.classList.remove("fa-play");
  ele.classList.add("fa-pause");
}

function pauseToPlay(index) {
  var ele = document.querySelector("#p-img-" + index);
  ele.classList.remove("fa-pause");
  ele.classList.add("fa-play");
}

function toggleMute() {
  var btnMute = document.querySelector("#toggleMute");
  var volUp = document.querySelector("#icon-vol-up");
  var volMute = document.querySelector("#icon-vol-mute");
  if (this.currentAudio.muted == false) {
    this.currentAudio.muted = true;
    volUp.style.display = "none";
    volMute.style.display = "block";
  } else {
    this.currentAudio.muted = false;
    volMute.style.display = "none";
    volUp.style.display = "block";
  }
}
//search button js
var inputEl = document.querySelector("#search");

function onEnterKey(event) {
  if (event.code === "Enter") {
    searchFunction();
  }
}

function searchFunction() {
  string =
    "https://www.google.com/search?q=site%3Ahttps%3A%2F%2Fwww.nimh.nih.gov+" +
    inputEl.value;
  console.log(string);
  window.open(string, "_blank");
}
//chatbox js- 
var clinicianPrompt = [
  'Please enter your UNI to start the chat',
  'What name do you prefer to be called by?',
  'In one word describe how are you feeling today?',
  '',
  'Thank you for providing this information, please call 212-678-3619 for further assistance',
  'The chat has ended. A licensed professional is awaiting your call. Please call 212-678-3619 for further assistance'
];
var num= 0;
var name = ''
var clinicianResponseEl= document.getElementById("clinician_response");
var userResponseEl= document.getElementById("user_response");
clinicianResponseEl.innerHTML = clinicianPrompt[num];


function chatSubmitFunction() {
  if (num < 5) {
    if (userResponseEl.value !== '') {
      var clinician_response = ''
      if (num == 0){
        clinician_response = "Thank you for giving me your UNI number."

      }

      else if (num == 1){
        name = userResponseEl.value
        clinician_response = "Nice to meet you" + " " + name + "."

      }

      else if (num ==2){
        var emotion = userResponseEl.value
        clinician_response = "Can you tell me more about why you are feeling" + " " + emotion + "," + " " + name + "."

      }
      else if (num ==3){
        clinician_response = ''
      }

      num = num+1;
      var new_question = clinicianPrompt[num];

      var full_reply = clinician_response + ' ' + new_question;

      clinicianResponseEl.innerHTML = full_reply;

      console.log(userResponseEl)
      userResponseEl.value = ''; //erase user response

    }
  }
}