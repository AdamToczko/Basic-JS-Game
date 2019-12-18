let canvas;
let canvasContext;
let ballX = 50;
let ballSpeedX = 7;
let ballY = 50;
let ballSpeedY = 4;

let paddleLeft = 250;
const paddleHeight = 120;

let paddleRight = 250;

let keys = [];

function calculateMousePos(evt) {
	let rect = canvas.getBoundingClientRect();
	let root = document.documentElement;
	let mouseX = evt.clientX - rect.left - root.scrollLeft;
	let mouseY = evt.clientY - rect.top - root.scrollTop;
	return {
		x:mouseX,
		y:mouseY
	};
}


window.onload = function() {
    canvas = document.getElementById('gameCanvas');
    canvasContext = canvas.getContext('2d');

    let framesPerSecond = 30;
	setInterval(callBoth, 1000/framesPerSecond);
  
    canvas.addEventListener('mousemove',
		function(evt) {
			let mousePos = calculateMousePos(evt);
			paddleLeft = mousePos.y - (paddleHeight/2);
        });

}

window.addEventListener("keydown", moveRightPaddle, false);
window.addEventListener("keyup", keysReleased, false);

function keysReleased(e) {
	// mark keys that were released
	keys[e.keyCode] = false;
}

function moveRightPaddle(evt) {
    
        // store an entry for every key pressed
        keys[evt.keyCode] = true;
     
        // down

        if (keys[38]) {
            paddleRight -= 30;
          }
     
        // up
        if (keys[40]) {
          paddleRight += 30;
        }
     
        evt.preventDefault();
       
    }

    function ballReset() {
        ballSpeedX = -ballSpeedX;
        ballX = canvas.width/2
        ballY = canvas.height/2
    }
    
    
    function callBoth() {
        moveElements();
        drawElements();
    }
    
    function moveElements() {
        ballX = ballX + ballSpeedX;
        ballY = ballY + ballSpeedY;
    
        if(ballX > 990) {
            if(ballY > paddleRight && ballY < paddleRight+paddleHeight) {
                ballSpeedX = -ballSpeedX;
            } else 
            {ballReset();}
        }
        if (ballX < 10) {
            if(ballY > paddleLeft && ballY < paddleLeft+paddleHeight) {
                ballSpeedX = -ballSpeedX;
            } else 
            {ballReset();}
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
    canvasContext.fillRect(0,paddleLeft,20,paddleHeight);

    canvasContext.fillStyle = "white";
    canvasContext.fillRect(980,paddleRight,20,paddleHeight);

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

