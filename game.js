let canvas;
let canvasContext;
let ballX = 50;
let ballSpeedX = 7;
let ballY = 50;
let ballSpeedY = 4;

window.onload = function() {
    canvas = document.getElementById('gameCanvas');
    canvasContext = canvas.getContext('2d');

    let framesPerSecond = 30;
	setInterval(callBoth, 1000/framesPerSecond);
  
}

function callBoth() {
	moveElements();
	drawElements();
}

function moveElements() {
    ballX = ballX + ballSpeedX;
    ballY = ballY + ballSpeedY;

    if(ballX > 1000) {
        ballSpeedX = -ballSpeedX;
    }
    if (ballX < 0) {
        ballSpeedX = -ballSpeedX;
    }
    if(ballY > 690) {
        ballSpeedY = -ballSpeedY;
    }
    if (ballY < 10) {
        ballSpeedY = -ballSpeedY;
    }
    
}

function drawElements() {
    //draw canvas with black background
    canvasContext.fillStyle = "#4a9700";
    canvasContext.fillRect(0,0,canvas.width,canvas.height);
    //draw two paddles and position them 
    canvasContext.fillStyle = "white";
    canvasContext.fillRect(0,250,20,120);
    canvasContext.fillStyle = "white";
    canvasContext.fillRect(980,250,20,120);

    //draw a ball 
    canvasContext.fillStyle = 'white';
    canvasContext.beginPath();
    canvasContext.arc(ballX,ballY,10,0,Math.PI*2,true)
    canvasContext.fill()
    
    // draw net
    canvasContext.strokeStyle = 'white';
    canvasContext.beginPath();
    canvasContext.setLineDash([2, 2]);
    canvasContext.moveTo(500,0)
    canvasContext.lineTo(500, 700);
    canvasContext.stroke();
}
