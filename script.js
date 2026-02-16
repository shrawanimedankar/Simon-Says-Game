const buttonColors = ["red", "blue", "green", "yellow"];

let gamePattern = [];
let userPattern = [];
let started = false;

let highScore = localStorage.getItem("highScore") || 0;
const highScoreEl = document.querySelector(".highscore");
highScoreEl.innerText = "High Score: " + highScore;

const msgEl = document.querySelector(".msg");
const buttons = document.querySelectorAll(".button");
const circle = document.querySelector(".circle");

function nextSequence() { // Generate next sequence
  userPattern = []; //Clears user input for new level.

  const randomColor =
    buttonColors[Math.floor(Math.random() * buttonColors.length)]; //Picks a random color
  gamePattern.push(randomColor); //Adds it to game sequence

  flashButton(randomColor);
  playSound(randomColor);

  msgEl.innerText = "Watch";
  setTimeout(() => {
    msgEl.innerText = "Tap";
  }, 800);
}

function flashButton(color) { // Flash animation
  const btn = document.getElementById(color);
  btn.classList.add("pressed");

  setTimeout(() => {
    btn.classList.remove("pressed");
  }, 150);
}

function playSound(name) { // Play sound
  const audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}

circle.addEventListener("click", () => { //Start game when center circle is clicked
  if (!started) { //Runs only once
    started = true; //Starts game and generates first color.
    gamePattern = [];
    msgEl.innerText = "Watch";
    nextSequence();
  }
});

buttons.forEach((btn) => { // Button click
  btn.addEventListener("click", () => { //If game not started → ignore.
    if (!started) return;

    const chosenColor = btn.id; //Stores user's chosen color.
    userPattern.push(chosenColor);

    playSound(chosenColor);
    flashButton(chosenColor);

    checkAnswer(userPattern.length - 1); //checks answer
  });
});

function checkAnswer(index) { // Check answer
  if (userPattern[index] === gamePattern[index]) { //Compares user color with game color at same position.
    if (userPattern.length === gamePattern.length) { //If correct: User finished whole sequence.

      if (gamePattern.length > highScore) { //Update high score if needed.
        highScore = gamePattern.length;
        localStorage.setItem("highScore", highScore);
        highScoreEl.innerText = "High Score: " + highScore;
      }

      setTimeout(nextSequence, 1000); //Start next level.
    }
  } else {
    playSound("wrong"); //Shows error feedback.
    document.body.classList.add("bgRed");
    msgEl.innerText = "Game Over";

    setTimeout(() => {
      document.body.classList.remove("bgRed");
      msgEl.innerText = "Play";
    }, 1000);

    startOver(); //Resets
  }
}

function startOver() { // Reset game
  gamePattern = [];
  started = false;
}
