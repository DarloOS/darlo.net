const canvas = document.getElementById("pong");
const ctx = canvas.getContext("2d");

const paddleWidth = 100;
const paddleHeight = 10;
let paddleX = canvas.width / 2 - paddleWidth / 2;
const paddleY = canvas.height - 20;

let ballX = canvas.width / 2;
let ballY = canvas.height / 2;
let ballSpeedX = 2;
let ballSpeedY = 2;

// Control: izquierda y derecha
document.addEventListener("keydown", e => {
    if (e.key === "ArrowLeft") paddleX -= 30;
    if (e.key === "ArrowRight") paddleX += 30;
});

function drawRect(x, y, w, h, color) {
    ctx.fillStyle = color;
    ctx.fillRect(x, y, w, h);
}

function drawBall(x, y, r, color) {
    ctx.fillStyle = color;
    ctx.beginPath();
    ctx.arc(x, y, r, 0, Math.PI * 2);
    ctx.fill();
    ctx.closePath();
}

function gameLoop() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Paleta abajo
    drawRect(paddleX, paddleY, paddleWidth, paddleHeight, "white");

    // Pelota
    drawBall(ballX, ballY, 8, "white");

    // Movimiento de la pelota
    ballX += ballSpeedX;
    ballY += ballSpeedY;

    // Rebote en bordes laterales
    if (ballX <= 0 || ballX >= canvas.width) ballSpeedX *= -1;

    // Rebote en parte superior
    if (ballY <= 0) ballSpeedY *= -1;

    // Colisión con la paleta
    if (
        ballY + 8 >= paddleY &&
        ballX >= paddleX &&
        ballX <= paddleX + paddleWidth
    ) {
        ballSpeedY *= -1;
        ballY = paddleY - 8; // empuja hacia arriba para evitar rebote múltiple
    }

    // Reinicio si se pierde
    if (ballY > canvas.height) {
        ballX = canvas.width / 2;
        ballY = canvas.height / 2;
        ballSpeedY *= -1;
    }

    requestAnimationFrame(gameLoop);
}

gameLoop();
