let canvas;
let canvasContext;
let ball = 50;

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
	ball = ball + 5;
}

function drawElements() {
    canvasContext.fillStyle = "black";
    canvasContext.fillRect(0,0,canvas.width,canvas.height);
    canvasContext.fillStyle = "white";
    canvasContext.fillRect(0,250,20,120);
    canvasContext.fillStyle = "white";
    canvasContext.fillRect(780,250,20,120);
    canvasContext.fillStyle = 'white';
	canvasContext.fillRect(ball,100,10,10);
}
