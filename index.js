
// Define Variables
var buttonColors = ["red", "blue", "green", "yellow"];
var randomChosenColor;
var userChosenColor;
var gamePattern;
var buttons = $(".btn");
var userClickedPattern;
var level;
var play = true;
var delay;
var highscore = 0;
var returning = false;

//Run Game
init();
begin();

// Define Functions
function init() {
  // Reset Variables
  gamePattern = [];
  userClickedPattern = [];
  level = 0;
  buttons.off("click", activate);
  document.addEventListener("keydown", nextSequence);
}
function reset() {
  userClickedPattern = [];
}

// Add Event Listeners
function begin() {
  buttons.off("click", function() {
    respond(this.id);
  });
}

// Game Play
function activate() {
  var click = this;
  $(click).addClass("pressed");
  setTimeout(end, 100);

  function end() {
    $(click).removeClass("pressed");
  }
}
function respond(color) {
  if (gamePattern[0] !== undefined) {
    userChosenColor = color;
    userClickedPattern.push(userChosenColor);
    playSound(userChosenColor);
    checkAnswer(level);
  }
}
function checkAnswer(currentLevel) {
  if (userClickedPattern[userClickedPattern.length - 1] === gamePattern[userClickedPattern.length - 1]) {
    if (userClickedPattern.length === gamePattern.length) {
      delay = (Math.floor(Math.random() * 5000) + 1000);
      if (delay > 5600) {
        delay = 4000;
      } else {
        delay = 1000
      }
      setTimeout(nextSequence, delay);
    }
  } else if (userClickedPattern[userClickedPattern.length - 1] !== gamePattern[userClickedPattern.length - 1]) {
    var wrong = new Audio("sounds/wrong.mp3");
    wrong.play();
    $("body").addClass("game-over");
    setTimeout(function() {
      $("body").removeClass("game-over");
    }, 200)
    $("h1").text("Game Over, Press Any Key to Restart");
    play = false;
    buttons.removeClass("clickable");
    $("h3").text("Your Score: ");
    $("#score").text(level - 1);
    if (level - 1 > highscore) {
      highscore = (level - 1);
      setTimeout(reward, 1300);
      returning = true;
    }
    init();
  }
}

function nextSequence() {
  document.removeEventListener("keydown", nextSequence);
  if (returning === false) {
    $("h3").text("");
    $("#score").text("");
  } else {
    $("h3").removeClass("yay");
    $("h3").text("High Score");
    $("#score").text(highscore);
  }
  level++
  $("h1").text("Level " + level);
  randomChosenColor = buttonColors[(Math.floor(Math.random() * 4))];
  gamePattern.push(randomChosenColor);
  $("#" + randomChosenColor).animate({
    opacity: 0
  }, 200);
  $("#" + randomChosenColor).animate({
    opacity: 100
  }, 400);
  playSound(randomChosenColor);
  buttons.click(activate);
  buttons.addClass("clickable");
  if (play === true) {
    buttons.click(function() {
      respond(this.id);
      play = false;
    });
  }
  reset();
}

//Sounds
function playSound(name) {
  switch (name) {
    case "green":
      var green = new Audio("sounds/green.mp3");
      green.play();
      break;
    case "red":
      var red = new Audio("sounds/red.mp3");
      red.play();
      break;
    case "yellow":
      var yellow = new Audio("sounds/yellow.mp3");
      yellow.play();
      break;
    case "blue":
      var blue = new Audio("sounds/blue.mp3");
      blue.play();
      break;
    default:
      console.log(randomChosenColor);
  };
};
var noise = new Audio("sounds/Beep_Short.mp3");
var five = new Audio("sounds/On_the_Tip_Sting.mp3");
var eight = new Audio("sounds/Big_Explosion_Cut_Off.mp3");
var eight2 = new Audio("sounds/Big_Explosion_Sweeping_In.mp3");
var ten = new Audio("sounds/Garden_Walk_Sting.mp3");
var ten2 = new Audio("sounds/Small_Glass_Pane_Shatter.mp3");
var eleven = new Audio("sounds/Gunfire.mp3");
var eleven2 = new Audio("sounds/Auto_Bullets_Flyby_Short.mp3");
var twelve = new Audio("sounds/Crash.mp3");
var thirteen = new Audio("sounds/Emergency_Siren_Short_Burst.mp3");
var fourteen = new Audio("sounds/Double_Helix_Sting.mp3");
var fifteen = new Audio("sounds/Fiend_Sting.mp3");
function reward() {
  $("h3").text("NEW HIGH SCORE!")
  $("h3").addClass("yay");

  noise.play();

  if(highscore >= 5) {
    five.play();
  }
  if(highscore >= 8) {
    eight.play();
    eight2.play();
  }
  if(highscore >= 10) {
    ten.play();
    ten2.play();
  }
  if(highscore >= 11) {
    eleven.play();
    eleven2.play();
  }
  if(highscore >= 12) {
    twelve.play();
  }
  if(highscore >= 13) {
    thirteen.play();
  }
  if(highscore >= 14) {
    fourteen.play();
  }
  if(highscore >= 15) {
    fifteen.play();
  }
}
