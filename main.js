var listOfMoves = [];
var firstTimeRun = true;

function playSound(path) {
  var audio = new Audio(path);
  audio.play();
}

function randomColor() {
  var colors = ["green", "red", "yellow", "blue"];
  var randomIndex = Math.floor(Math.random() * 4);
  return colors[randomIndex];
}

var time = 0;
var lvlNumber = 0;

function changeColorOfThisColor(theColor) {
  time += 100;
  setTimeout(function () {
    $("#level").html("Level:" + lvlNumber);
  }, time);
  time += 500;
  setTimeout(function () {
    $("button." + theColor).addClass(theColor + "Shadow");
    playSound("sounds/" + theColor + ".mp3");
  }, time);
  time += 500;
  setTimeout(function () {
    $("button." + theColor).removeClass(theColor + "Shadow");
  }, time);
  clearTimeout();
}

function playTheGameForHint() {
  counter = 0;
  time = 0;
  lvlNumber += 1;
  setTimeout(function () {
    $("#turn").html("Your");
    $("button").prop("disabled", false);
  }, (lvlNumber + 1) * 1100);

  for (var i = 0; i < listOfMoves.length; i++) {
    changeColorOfThisColor(listOfMoves[i]);
  }

  $("#turn").html("Simon's");
  $("button").prop("disabled", true);
}

document.getElementById("thisYear").innerText = new Date().getFullYear();

var counter = 0;

$("button").bind("click", function clicked() {
  var buttonId = this.id;
  if (firstTimeRun) {
    listOfMoves.push(buttonId);
    firstTimeRun = false;
  }

  playSound("sounds/" + buttonId + ".mp3");
  // console.log(listOfMoves[counter] + "?==" + buttonId);
  if (listOfMoves[counter] != buttonId) {
    counter = -1;
  }

  if (counter == -1) {
    $("#turn").html(lvlNumber);
    $("#level").html("You Lost! Refresh me");
    $("#level").css("font-size", "5rem");
    $("button").prop("disabled", true);
  }
  counter++;
  if (counter == listOfMoves.length) {
    listOfMoves.push(randomColor());
    playTheGameForHint();
  }
  time = 0;
});
