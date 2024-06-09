const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
const gridWidth = 600;
const gridHeight = 600;
canvas.width = gridWidth;
canvas.height = gridHeight;
const gridSize = 20;
const segmentHeight = 20;
let dx = gridSize;
let dy = 0;

let snake = [];
let lastMoveTime = 0;
const moveCooldown = 75;
let lastRenderTime = 0;
const SNAKE_SPEED = 10;

let apple = { x: 0, y: 0 };
let appleImages = [];
for (let i = 1; i <= 6; i++) {
    let img = new Image();
    img.src = '../assets/img/snake/' + i + '.png';
    appleImages.push(img);
}
let currentAppleImg;

let isGameOver = false;
const endScreen = document.getElementById('endScreen');
const retryButton = document.getElementById('retryButton');
const snakeSize = document.getElementById('snakeSize')
const gameMusic = document.getElementById('gameMusic');
const startScreen = document.getElementById('startScreen')

function gameLoop(currentTime) {
    if (!lastRenderTime) lastRenderTime = currentTime;
    const progress = currentTime - lastRenderTime;

    if (progress < 1000 / SNAKE_SPEED) {
        requestAnimationFrame(gameLoop);
        return;
    }

    lastRenderTime = currentTime;

    moveSnake();
    const head = snake[0];
    if (checkCollision(head)) {
        snakeSize.textContent = snake.length.toString();
        endScreen.style.display = "block";
        isGameOver = true;
    } else {
        drawGrid();
        drawSnake();
        drawApple();
        requestAnimationFrame(gameLoop);
    }
}

function initGame() {
    snake = [
        {x: 160, y: 200},
        {x: 140, y: 200},
        {x: 120, y: 200}
    ];
    dx = gridSize;
    dy = 0;
    gameMusic.play();
    placeApple();
    drawGrid();
    drawSnake();
    drawApple();
}

function drawGrid() {
    for (let x = 0; x <= gridWidth; x += gridSize) {
        for (let y = 0; y <= gridHeight; y += gridSize) {
            ctx.fillStyle = (x + y) % (2 * gridSize) === 0 ? "#a4d65e" : "#89b54c";
            ctx.fillRect(x, y, gridSize, gridSize);
        }
    }
}

function drawSnake() {
    snake.forEach(drawSnakePart);
}

function drawSnakePart(snakePart) {
    ctx.fillStyle = 'red';
    ctx.fillRect(snakePart.x, snakePart.y + (gridSize - segmentHeight) / 2, gridSize, segmentHeight);
}

function changeDirection(event) {
    const currentTime = Date.now();
    if (currentTime - lastMoveTime < moveCooldown) return;

    const LEFT_KEY = 37;
    const RIGHT_KEY = 39;
    const UP_KEY = 38;
    const DOWN_KEY = 40;

    const keyPressed = event.keyCode;
    const goingUp = dy === -gridSize;
    const goingDown = dy === gridSize;
    const goingRight = dx === gridSize;
    const goingLeft = dx === -gridSize;

    if (keyPressed === LEFT_KEY && !goingRight) {
        dx = -gridSize;
        dy = 0;
        lastMoveTime = currentTime;
    }

    if (keyPressed === RIGHT_KEY && !goingLeft) {
        dx = gridSize;
        dy = 0;
        lastMoveTime = currentTime;
    }

    if (keyPressed === UP_KEY && !goingDown) {
        dx = 0;
        dy = -gridSize;
        lastMoveTime = currentTime;
    }

    if (keyPressed === DOWN_KEY && !goingUp) {
        dx = 0;
        dy = gridSize;
        lastMoveTime = currentTime;
    }
}

function moveSnake() {
    if (isGameOver) return;
    const head = {x: snake[0].x + dx, y: snake[0].y + dy};
    snake.unshift(head);

    if (head.x === apple.x && head.y === apple.y) {
        placeApple();
        drawApple();
    } else {
        snake.pop();
    }
}

function checkCollision(head) {
    if (head.x < 0 || head.x >= canvas.width || head.y < 0 || head.y >= canvas.height) {
        return true;
    }
    for (let i = 4; i < snake.length; i++) {
        if (snake[i].x === head.x && snake[i].y === head.y) {
            return true;
        }
    }
    return false;
}

function placeApple() {
    let newPosition;
    do {
        newPosition = randomGridPosition();
    } while (isSnakeAtPosition(newPosition.x, newPosition.y));
    apple = newPosition;

    let pictureNumber = Math.floor(Math.random() * appleImages.length);
    currentAppleImg = appleImages[pictureNumber];

    if (!currentAppleImg.complete) {
        currentAppleImg.onload = () => {
            ctx.drawImage(currentAppleImg, apple.x, apple.y, gridSize * 3, gridSize * 3);
        };
    }
}

function randomGridPosition() {
    return {
        x: Math.floor(Math.random() * (canvas.width / gridSize)) * gridSize,
        y: Math.floor(Math.random() * (canvas.height / gridSize)) * gridSize
    };
}

function isSnakeAtPosition(x, y) {
    return snake.some(segment => segment.x === x && segment.y === y);
}

function drawApple() {
    if (currentAppleImg && currentAppleImg.complete) {
        ctx.drawImage(currentAppleImg, apple.x, apple.y, gridSize * 2, gridSize * 2);
    }
}

drawGrid();

document.getElementById('startButton').addEventListener('click', () => {
    startScreen.style.display = "none";
    initGame();
    requestAnimationFrame(gameLoop);
});

document.addEventListener("keydown", changeDirection);

retryButton.addEventListener('click', () => {
    endScreen.style.display = "none";
    isGameOver = false;
    initGame();
    requestAnimationFrame(gameLoop)
});

document.addEventListener('DOMContentLoaded', () => {
    gameMusic.volume = 1;
});
