document.addEventListener("DOMContentLoaded", function (){
    const canvas = document.getElementById('gameCanvas');

    const closeModal = document.getElementById('closeModal');
    const retryButton = document.getElementById('retryButton');
    const resultModal = document.getElementById('resultModal');

    const snakeSize = document.getElementById('snakeSize')

    const ctx = canvas.getContext('2d');

    const gridSize = 20;  // Grid cell size (width of each segment)
    const segmentHeight = 20;  // New height for each segment, making it thinner
    let snake = [];
    let dx = gridSize;  // Movement along X-axis
    let dy = 0;  // No movement along Y-axis initially

    const gridWidth = 600;
    const gridHeight = 600;

    canvas.width = gridWidth;
    canvas.height = gridHeight;

    function initGame() {
        snake = [
            {x: 160, y: 200},
            {x: 140, y: 200},
            {x: 120, y: 200}  // Initial position of the snake
        ];
        dx = gridSize;  // Movement along X-axis
        dy = 0;  // No movement along Y-axis initially
    }

    function drawGrid() {
        for (let x = 0; x <= gridWidth; x += gridSize) {
            for (let y = 0; y <= gridHeight; y += gridSize) {
                ctx.fillStyle = (x + y) % (2 * gridSize) === 0 ? "#281e5d" : "#1520a6";
                ctx.fillRect(x, y, gridSize, gridSize);
            }
        }
    }

    drawGrid();
    initGame();

    function drawSnakePart(snakePart) {
        ctx.fillStyle = 'red';  // Color of the snake
        ctx.fillRect(snakePart.x, snakePart.y + (gridSize - segmentHeight) / 2, gridSize, segmentHeight);
    }

    function drawSnake() {
        snake.forEach(drawSnakePart);
    }

    function moveSnake() {
        const head = {x: snake[0].x + dx, y: snake[0].y + dy};  // Create new head
        snake.unshift(head);  // Add new head to the snake
        snake.pop();  // Remove the last part of the snake
    }

    function changeDirection(event) {
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
        }

        if (keyPressed === RIGHT_KEY && !goingLeft) {
            dx = gridSize;
            dy = 0;
        }

        if (keyPressed === UP_KEY && !goingDown) {
            dx = 0;
            dy = -gridSize;
        }

        if (keyPressed === DOWN_KEY && !goingUp) {
            dx = 0;
            dy = gridSize;
        }
    }

    document.addEventListener("keydown", changeDirection);

    function checkCollision(head) {
        return head.x < 0 || head.x >= canvas.width || head.y < 0 || head.y >= canvas.height;
    }

    function gameLoop() {
        moveSnake();
        const head = snake[0];
        if (checkCollision(head)) {
            snakeSize.textContent = snake.length.toString();
            resultModal.style.display = "block";
            return
        }
        drawGrid();  // Redraw the grid to clear the canvas before each frame
        drawSnake();  // Draw the snake
        setTimeout(gameLoop, 100);  // Control the speed of the snake
    }

    gameLoop();  // Start the game loop

    retryButton.onclick = function() {
        resultModal.style.display = "none";
        initGame();
        gameLoop();
    };

    closeModal.onclick = function() {
        resultModal.style.display = "none";
    };
});