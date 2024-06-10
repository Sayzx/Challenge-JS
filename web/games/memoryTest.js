document.addEventListener('DOMContentLoaded', () => {
    let sequence = [];
    let playerSequence = [];
    let level = 0;
    let score = 0;
    let gridSize = 3;
    let gameRunning = false;

    const gameBoard = document.querySelector('.game-board');
    const startButton = document.getElementById('start-button');
    const scoreDisplay = document.getElementById('score');
    const modal = document.querySelector('.modal');
    const retryButton = document.getElementById('retryButton');
    const close = document.querySelector('.close');

    function resetGame() {
        sequence = [];
        playerSequence = [];
        level = 0;
        score = 0;
        scoreDisplay.textContent = "0";
        gridSize = 3;
        startButton.style.display = 'block';
    }

    // Create a game board start with a 3x3 grid
    function createGameBoard() {
        gameBoard.innerHTML = '';
        gameBoard.style.gridTemplateColumns = `repeat(${gridSize}, 80px)`;
        gameBoard.style.gridTemplateRows = `repeat(${gridSize}, 80px)`;

        for (let i = 0; i < gridSize * gridSize; i++) {
            let tile = document.createElement('div');
            tile.classList.add('tile');
            tile.addEventListener('click', () => {
                tileClick(i).then();
            });
            gameBoard.appendChild(tile);
        }
    }

    // Generate a sequence of random numbers
    function generateSequence() {
        for (let i = 0; i < level + 1; i++) {
            sequence.push(Math.floor(Math.random() * (gridSize * gridSize)));
        }
    }

    function showSequence() {
        let delay = 0;
        sequence.forEach(tileIndex => {
            setTimeout(() => {
                highlightTile(tileIndex, true).then();
            }, delay);
            delay += 1000;
        });
    }

    function highlightTile(tileIndex, isShowingSequence) {
        const delay = isShowingSequence ? 500 : 100;
        let tile = gameBoard.children[tileIndex];
        tile.style.backgroundColor = 'white';
        return new Promise(resolve => {
            setTimeout(() => {
                tile.style.backgroundColor = '';
                resolve();
            }, delay);
        });
    }

    // Check if the player clicked the right tile
    async function tileClick(tileIndex) {
        let isOver = false;
        await highlightTile(tileIndex, false);
        playerSequence.push(tileIndex);

        for (let i = 0; i < playerSequence.length; i++) {
            if (playerSequence[i] !== sequence[i] && gameRunning) {
                modal.style.display = 'block';
                document.getElementById('modalScore').textContent = score;
                isOver = true;
                resetGame();
            }
        }
        if (playerSequence.length === sequence.length && !isOver) {
            nextLevel();
        }
    }

    // Move to the next level and add Score and Level
    function nextLevel() {
        score++;
        level++;
        scoreDisplay.textContent = score;
        sequence = [];
        playerSequence = [];
        if (level % 3 === 0 && gridSize < 7) {
            gridSize++;
        }
        createGameBoard();
        generateSequence();
        setTimeout(showSequence, 1000);
    }

    function startGame() {
        gameRunning = true;
        resetGame();
        createGameBoard();
        generateSequence();
        showSequence();
        startButton.style.display = 'none';
        modal.style.display = 'none';
    }

    createGameBoard();
    startButton.addEventListener('click', startGame);
    retryButton.addEventListener('click', () => {
        modal.style.display = 'none';
        gameRunning = false;
    });
    close.addEventListener('click', () => {
        modal.style.display = 'none';
        gameRunning = false;
    });

});
