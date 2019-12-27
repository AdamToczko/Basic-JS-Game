let canvas;
let canvasContext;
let ballX = 50;
let ballSpeedX = 12;
let ballY = 50;
let ballSpeedY = 9;

let paddleLeft = 250;
const paddleHeight = 120;
const paddleSpeed = 50

let paddleRight = 250;

let keys = [];

let winScreen = false;
const winningScore = 2;
let leftPlayerScore = 0;
let rightPlayerScore = 0;



function calculateMousePos(evt) {
	let rect = canvas.getBoundingClientRect();
	let root = document.documentElement;
	// let mouseX = evt.clientX - rect.left - root.scrollLeft; X movement not needed in this game 
	let mouseY = evt.clientY - rect.top - root.scrollTop;
	return {
		// x:mouseX, 
		y:mouseY
	};
}


window.onload = function() {
    canvas = document.getElementById('gameCanvas');
    canvasContext = canvas.getContext('2d');

    let framesPerSecond = 30;
    setInterval(callBoth, 1000/framesPerSecond);
    
    canvas.addEventListener('mousedown', handleMouseClick);
  
    canvas.addEventListener('mousemove',
		function(evt) {
			let mousePos = calculateMousePos(evt);
			paddleLeft = mousePos.y - (paddleHeight/2);
        });
    
}

function handleMouseClick(evt) {
    if(winScreen) { 
        rightPlayerScore = 0;
        leftPlayerScore = 0;
        winScreen = false;
    }
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
     
        // up
        
        if (keys[38]) {
            if(paddleRight - paddleSpeed > -40) {
                paddleRight -= paddleSpeed;
            }
          }
     
        // down
        if (keys[40]) {
            if(paddleRight + paddleSpeed < 620) {
          paddleRight += paddleSpeed;
            }
        }
     
        evt.preventDefault();
       
    }

    function ballReset() {
        if(leftPlayerScore == winningScore || rightPlayerScore == winningScore) {
            winScreen = true;
        }
        ballSpeedX = -ballSpeedX;
        ballX = canvas.width/2
        ballY = canvas.height/2
    }
    
    
    function callBoth() {
        moveElements();
        drawElements();
    }
    
    function moveElements() {
        if(winScreen) {
            return;
        }

        ballX = ballX + ballSpeedX;
        ballY = ballY + ballSpeedY;
    
        if(ballX > 990) {
            if(ballY > paddleRight && ballY < paddleRight+paddleHeight) {
                ballSpeedX = -ballSpeedX;
                //adding angle movement depending how the ball was hit 
                let hitDifR = ballY - (paddleRight+paddleHeight/2)
                ballSpeedY = hitDifR*0.2
            } else {
            leftPlayerScore ++;
            ballReset();
            }
        }
        if (ballX < 10) {
            if(ballY > paddleLeft && ballY < paddleLeft+paddleHeight) {
                ballSpeedX = -ballSpeedX;
                //adding angle movement depending how the ball was hit 
                let hitDifL = ballY - (paddleLeft+paddleHeight/2)
                ballSpeedY = hitDifL*0.2
            } else {
            rightPlayerScore ++;
            ballReset();
            }
        }
        if(ballY > 690) {
            ballSpeedY = -ballSpeedY;
        }
        if (ballY < 10) {
            ballSpeedY = -ballSpeedY;
        }

    }

function drawElements() {
    //draw canvas with green background
    canvasContext.fillStyle = "#4a9700";
    canvasContext.fillRect(0,0,canvas.width,canvas.height);

    if(winScreen) {
        canvasContext.font = "30px Arial";
        canvasContext.fillStyle = "white";

        if(leftPlayerScore >= winningScore) {
			canvasContext.fillText("Left Player Won", 390, 200);
		} else if(rightPlayerScore >= winningScore) {
			canvasContext.fillText("Right Player Won", 390, 200);
		}

        canvasContext.fillText("Click mouse to play again", 330, 300);
        return;
    }


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

    // draw score 
    canvasContext.font = "22px Arial";
    canvasContext.fillText("Score:", 472, 20);
    canvasContext.font = "20px Arial";
    canvasContext.fillText(leftPlayerScore, 470, 50);
    canvasContext.font = "20px Arial";
    canvasContext.fillText(rightPlayerScore, 520, 50);
}
