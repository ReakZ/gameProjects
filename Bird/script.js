// variables

let canvas = document.getElementById("canvas");
let ctx = canvas.getContext("2d");

let bird = new Image();
let pipeUp = new Image();
let pipeBottom = new Image();
let background = new Image();
let fg = new Image();
let gap = 100;

let xBird = 0;
let yBird = canvas.height / 2;
let gravi = 1.2;
let score = 0;

let pipe = [];
pipe[0] = {
  x: canvas.width,
  y: 0,
};

// images
background.src = "images/background.png";
bird.src = "images/bird.png";
pipeUp.src = "images/wallUp.png";
pipeBottom.src = "images/wallDown.png";
fg.src = "images/fg.png";

// sounds

let fly = new Audio()
var score_audio = new Audio()

fly.src="audio/fly.mp3"
score_audio.src="audio/score.mp3"
// draw
function draw() {
  ctx.drawImage(background, 0, 0);
  pipe.forEach((element) => {
    ctx.drawImage(pipeUp, element.x, element.y);
    ctx.drawImage(pipeBottom, element.x, element.y + pipeUp.height + gap);
    element.x--;
    // spawn new pipe
    if (element.x == 100) {
      pipe.push({
        x: canvas.width,
        y: Math.floor(Math.random() * pipeUp.height + 50) - pipeUp.height,
      });
    }
    // delete old pipe and update score
    if (element.x < 0 - pipeUp.width) {
      score++;
      pipe.shift();
    //   score_audio.play()
    }
    // collision
    if (
      (xBird + bird.width >= element.x &&
        xBird <= element.x + pipeUp.width &&
        (yBird <= element.y + pipeUp.height ||
          yBird + bird.height >= element.y + pipeUp.height + gap)) ||
      yBird + bird.height >= canvas.height - fg.height
    ) {
      console.log("u lose");
      location.reload();
    }
  });

  ctx.drawImage(fg, 0, canvas.height - fg.height);
  ctx.drawImage(bird, xBird, yBird);
  ctx.fillStyle = "black";
  ctx.font = "24px Verdana";
  ctx.fillText("Score: " + score, 10, canvas.height - 20);
  yBird += gravi;
  requestAnimationFrame(draw);
}

// control
function moveUp(e) {
  yBird -= 35;
//   fly.play()
}

// start game
document.addEventListener("keydown", moveUp);
window.onload = function () {
  draw();
};
