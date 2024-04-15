let board = document.querySelector(".board");
let ScoreBox = document.querySelector("#ScoreBox");
let arrowKeys = document.querySelectorAll(".arrow");
let lastPaintTime = 0;
let inputDir = {
  x: 0,
  y: 0,
};
let snakeArr = [{ x: 1, y: 1 }];
let score = 0;
let speed = 15;
food = { x: 6, y: 7 };
function main(ctime) {
  window.requestAnimationFrame(main);
  if ((ctime - lastPaintTime) / 1000 < 1 / speed) {
    // convert ms -> sec
    return;
  }
  lastPaintTime = ctime;
  gamePlay();
}
function isCollide(snake) {
  for (let i = 1; i < snakeArr.length; i++) {
    if (snake[i].x === snake[0].x && snake[i].y === snake[0].y) {
      return true;
    }
  }
  if (
    snake[0].x >= 18 ||
    snake[0].x <= 0 ||
    snake[0].y >= 18 ||
    snake[0].y <= 0
  ) {
    return true;
  }
}
function gamePlay() {
  // updating the snake array & food
  if (isCollide(snakeArr)) {
    inputDir = { x: 0, y: 0 };
    ScoreBox.innerHTML = "Score : 0";
    alert("Game Over!! Press any key to play again!");
    snakeArr = [{ x: 1, y: 1 }];
    score = 0;
  }

  if (snakeArr[0].y === food.y && snakeArr[0].x === food.x) {
    // this method allow to add the element to starting (push() -> add at last)
    score += 1;
    if (score > highScore) {
      highScore = score;
      localStorage.setItem("HighScore", highScore);
      document.querySelector("#HighScoreBox").innerHTML =
        "HighScore : " + highScore;
    }
    ScoreBox.innerHTML = "Score : " + score;
    snakeArr.unshift({
      x: snakeArr[0].x + inputDir.x,
      y: snakeArr[0].y + inputDir.y,
    });
    let a = 2;
    let b = 17;
    // To generate the coordinate between grid
    food = {
      x: Math.round(a + (b - a) * Math.random()),
      y: Math.round(a + (b - a) * Math.random()),
    };
  }
  // move the snake (each box is move forward)
  for (let i = snakeArr.length - 2; i >= 0; i--) {
    snakeArr[i + 1] = { ...snakeArr[i] };
  }
  snakeArr[0].x += inputDir.x; // move in the direction of motion
  snakeArr[0].y += inputDir.y;

  // display the snake & food
  board.innerHTML = "";
  snakeArr.forEach((ele, index) => {
    snakeElement = document.createElement("div");
    snakeElement.style.gridRowStart = ele.x;
    snakeElement.style.gridColumnStart = ele.y;
    if (index == 0) {
      snakeElement.classList.add("head"); // add the css using whole class of css
    } else {
      snakeElement.classList.add("snake"); // add the css using whole class of css
    }
    board.append(snakeElement);
  });
  foodElement = document.createElement("div");
  foodElement.style.gridRowStart = food.x;
  foodElement.style.gridColumnStart = food.y;
  foodElement.classList.add("food"); // add the css using whole class of css
  board.append(foodElement);
}
// Game starts from here
let highScore = localStorage.getItem("HighScore");
if (highScore == null) {
  highScore = 0;
  localStorage.setItem("HighScore", 0);
} else {
  document.querySelector("#HighScoreBox").innerHTML =
    "HighScore : " + highScore;
}

window.requestAnimationFrame(main);
window.addEventListener("keydown", (e) => {
  // inputDir = {x: 0, y:1}
  switch (e.key) {
    case "ArrowUp":
      // console.log("ArrowUp")
      inputDir.x = -1;
      inputDir.y = 0;
      break;

    case "ArrowDown":
      // console.log("ArrowDown")
      inputDir.x = 1;
      inputDir.y = 0;
      break;

    case "ArrowLeft":
      // console.log("ArrowLeft")
      inputDir.x = 0;
      inputDir.y = -1;
      break;

    case "ArrowRight":
      // console.log("ArrowRight")
      inputDir.x = 0;
      inputDir.y = 1;
      break;

    default:
      break;
  }
});

arrowKeys.forEach((arrow) => {
  arrow.addEventListener("click", () => {
    // console.log(arrow.id);
    const btn = arrow.id
    switch (btn) {
      case "uparrow":
        // console.log("ArrowUp")
        inputDir.x = -1;
        inputDir.y = 0;
        break;

      case "downarrow":
        // console.log("ArrowDown")
        inputDir.x = 1;
        inputDir.y = 0;
        break;

      case "leftarrow":
        // console.log("ArrowLeft")
        inputDir.x = 0;
        inputDir.y = -1;
        break;

      case "rightarrow":
        // console.log("ArrowRight")
        inputDir.x = 0;
        inputDir.y = 1;
        break;

      default:
        break;
    }
  });
});
