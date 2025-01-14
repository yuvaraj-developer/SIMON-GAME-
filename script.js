let gameSeq = [];
let userSeq = [];
let started = false;
let level = 0;

document.addEventListener("keypress", function () {
  if (!started) {
    started = true;
    document.getElementById("winMessage").style.display = "none";
    nextSequence();
  }
});

function nextSequence() {
  userSeq = [];
  level++;
  document.querySelector("h2").innerText = `Level ${level}`;
  const randomNum = Math.floor(Math.random() * 4);
  const randomBox = document.querySelector(`#box${randomNum + 1}`);
  gameSeq.push(randomNum);
  btnFlash(randomBox);
}

function btnFlash(button) {
  button.classList.add("flash");
  setTimeout(() => button.classList.remove("flash"), 500);
}

const buttons = document.querySelectorAll(".btn");
buttons.forEach((button, index) => {
  button.addEventListener("click", () => {
    userSeq.push(index);
    btnFlash(button);
    checkAnswer(userSeq.length - 1);
  });
});

function checkAnswer(currentLevel) {
  if (userSeq[currentLevel] === gameSeq[currentLevel]) {
    if (userSeq.length === gameSeq.length) {
      if (level === 5) {
        // Example condition for winning
        showWinMessage();
      } else {
        setTimeout(nextSequence, 1000);
      }
    }
  } else {
    gameOver();
  }
}

function gameOver() {
  document.querySelector(
    "h2"
  ).innerHTML = `Game Over!  <b>You scored ${level}</b> <br> Please Press Any Key to Restart`;
  const body = document.querySelector("body");
  body.classList.add("game-over");
  setTimeout(() => body.classList.remove("game-over"), 500);
  resetGame();
}

function showWinMessage() {
  document.getElementById("winMessage").style.display = "block";
  resetGame();
}

function resetGame() {
  gameSeq = [];
  userSeq = [];
  level = 0;
  started = false;
}
