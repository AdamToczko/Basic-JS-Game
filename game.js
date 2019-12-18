let canvas;
let canvasContext;

window.onload = function() {
    canvas = document.getElementById('gameCanvas');
    canvasContext = canvas.getContext('2d');
    this.drawElements();
  
}

function drawElements() {
    canvasContext.fillStyle = "black";
    canvasContext.fillRect(0,0,canvas.width,canvas.height);
    canvasContext.fillStyle = "white";
    canvasContext.fillRect(0,250,20,120);
    canvasContext.fillStyle = "white";
    canvasContext.fillRect(780,250,20,120);
}

