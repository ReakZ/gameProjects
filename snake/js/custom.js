var canv = document.getElementById("mc"),
  ctx = canv.getContext("2d"),
  table = document.getElementById("score"),
  gs = (fkp = false),
  speed = (baseSpeed = 3),
  xv = (yv = 0),
  px = ~~(canv.width)/2,
  py= ~~(canv.height)/2,
  pw = (ph = 20),
  aw = (ah = 20),
  apples = [],
  trail = [],
  tail = 100,
  tailSafeZone = 20,
  cooldown = false,
  score = trail.length;

var keyCodes = { Up: 38, Down: 40, Left: 37, Right: 39 };
window.onload = function () {
  document.addEventListener("keydown", changeDirection);
  setInterval(loop, 1000 / 60);
};

function loop() {
  table.innerHTML="Score: "+score
  ctx.fillStyle = "black";
  ctx.fillRect(0, 0, canv.width, canv.height);

  px += xv;
  py += yv;
  if (px > canv.width) {
    px = 0;
  }
  if (px + pw < 0) {
    px = canv.width;
  }

  if (py + ph < 0) {
    py = canv.height;
  }

  if (py > canv.height) {
    py = 0;
  }

  ctx.fillStyle = "lime";
  for (let i = 0; i < trail.length; i++) {
    ctx.fillStyle = trail[i].color || "lime";
    ctx.fillRect(trail[i].x, trail[i].y, pw, ph);
  }

  trail.push({ x: px, y: py, color: ctx.fillStyle });

  if (trail.length > tail) {
    trail.shift();
  }

  if (trail.length > tail) {
    trail.shift();
  }

  if (trail.length >= tail && gs) {
    for (let i = trail.length - tailSafeZone; i >= 0; i--) {
      if (
        px < trail[i].x + pw &&
        px + pw > trail[i].x &&
        py < trail[i].y + ph &&
        py + ph > trail[i].y
      ) {
        tail = 10;
        speed = baseSpeed;
        score=0
        for (let t = 0; t < trail.length; t++) {
          trail[t].color = "red";
          if (t >= trail.length - tail) {
            break;
          }
        }
      }
    }
  }


  // paint apples

  for( var a = 0; a <apples.length;a++){
    ctx.fillStyle=apples[a].color;
    ctx.fillRect(apples[a].x,apples[a].y,aw,ah)
  }

// snake and apples collisions
  for( var a = 0; a <apples.length;a++){
    if(
      px < apples[a].x + pw &&
      px + pw > apples[a].x &&
      py < apples[a].y + ph &&
      py + ph > apples[a].y
    ){
      apples.splice(a,1);
      tail+=10;
      speed+=.1
      score+=1
      spawnApple();
      break;
    }
  }

}

function spawnApple() {

  var newApple = {
    x: ~~(Math.random()*canv.width),
    y:~~(Math.random()*canv.height),
    color:'red'
    
  }

  if(
    (newApple.x< aw || newApple.x >canv.width -aw) ||
    (newApple.y< ah || newApple.y >canv.height -ah)

  )
  {
    spawnApple()
    return
  }

  apples.push(newApple);

  if(apples.length <3 && ~~(Math.random()*1000>500)){
    spawnApple()
  }
  
  for (let i = 0; t < tail.length; i++) {
    if (
      newApple.x < trail[i].x + pw &&
      newApple.x + aw > trail[i].x &&
      newApple.y < trail[i].y + ph &&
      newApple.y + ah > trail[i].y
    ) {
      spawnApple()
      return
      }
    }


}

function rc() {
  return (
    "#" +
    (~~(Math.random() * 255)).toString(16) +
    (~~(Math.random() * 255)).toString(16) +
    (~~(Math.random() * 255)).toString(16)
  );
}
function changeDirection(evt) {
  if (
    !fkp &&
    [keyCodes.Up, keyCodes.Down, keyCodes.Right, keyCodes.Left].indexOf(
      evt.keyCode > -1
    )
  ) {
    setTimeout(function () {
      gs = true;
    }, 1000);
    fkp = true;
    spawnApple();
  }
  if (cooldown) {
    return false;
  }
  console.log(evt.keyCode);
  if (evt.keyCode == keyCodes.Left && !(xv > 0)) {
    xv = -speed;
    yv = 0;
  } else if (evt.keyCode == keyCodes.Up) {
    xv = 0;
    yv = -speed;
  } else if (evt.keyCode == keyCodes.Right && !(xv < 0)) {
    xv = speed;
    yv = 0;
  } else if (evt.keyCode == keyCodes.Down && !(yv < 0)) {
    xv = 0;
    yv = speed;
  }

  cooldown = true;
  setTimeout(function () {
    cooldown = false;
  }, 100);
}
