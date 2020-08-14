var canv = document.getElementById("mc"),
  ctx = canv.getContext("2d"),
  posX=20,
  posY=20,
  speedX=5,
  speedY=5,
  ballRadius=20


var keyCodes = { Up: 38, Down: 40, Left: 37, Right: 39 };
window.onload = function () {


  document.addEventListener("keydown", keyDownHandler,false);
  document.addEventListener("keyup", keyUpHandler,false);
  setInterval(draw, 1000 / 30);
};

function keyDownHandler(e){
if(e.keyCode==37){

  LeftPress=true
}

if(e.keyCode==39){

  RightPress=true
}
}


function keyUpHandler(e){
  if(e.keyCode==37){
  
    LeftPress=false
  }
  
  if(e.keyCode==39){
  
    RightPress=false
  }
  }





var paddleHeight=10,
paddleWidth=50,
paddleX=(canv.width-paddleWidth)/2

var RightPress= false;
var LeftPress=false;
function drawPaddle(){
  if(RightPress && paddleX<canv.width - paddleWidth){
    paddleX+=7
  }
  else if(LeftPress && paddleX>0) {
    paddleX-=7
  }
  ctx.beginPath();
  ctx.rect(paddleX,canv.height-paddleHeight,paddleWidth,paddleHeight)
ctx.fillStyle="#0095dd";
ctx.fill()
  ctx.closePath();
}

function drawBall(){

  if(posX+speedX>canv.width || posX<0){
    
    speedX=-speedX
  }

  if(posY+speedY>canv.height || posY<0){
    
    speedY=-speedY
  }

  if(paddleX<posX &&posX<paddleX+50 && posY > 383){
    console.log(posY)
    speedX=-speedX
    speedY=-speedY
  }

  posX+=speedX
  posY+=speedY+1
  ctx.beginPath();
  
  ctx.arc(posX,posY,ballRadius,0,Math.PI*2,false);
  ctx.fillStyle="red";
  ctx.fill();
  ctx.closePath();

}




function draw(){


  ctx.clearRect(0,0,canv.width,canv.height)
  drawBall();
  drawPaddle();

}


