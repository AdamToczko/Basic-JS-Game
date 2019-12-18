let canvas;
let canvasContext;
let ballX = 50;
let ballSpeedX = 7;

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
    if(ballX > 970) {
        ballSpeedX = -ballSpeedX;
    }
    if (ballX < 30) {
        ballSpeedX = -ballSpeedX;
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
    canvasContext.arc(ballX,300,10,0,Math.PI*2,true)
    canvasContext.fill()
    
    // draw net
    canvasContext.strokeStyle = 'white';
    canvasContext.beginPath();
    canvasContext.setLineDash([2, 2]);
    canvasContext.moveTo(500,0)
    canvasContext.lineTo(500, 700);
    canvasContext.stroke();
}
