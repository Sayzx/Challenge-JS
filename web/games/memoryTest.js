let sequence = [];
let playerSequence = [];
let level = 1;
let gameBoard = document.querySelector('.game-board');
let score = 0;
let scoreDisplay = document.getElementById('score');
let gridSize = 3; // Taille initiale de la grille
let startButton = document.getElementById('start-button');

startButton.addEventListener('click', startGame);

function generateSequence() {
    sequence = [];
    for (let i = 0; i < level; i++) {
        sequence.push(Math.floor(Math.random() * (gridSize * gridSize)));
    }
}

function showSequence() {
    let index = 0;
    let interval = setInterval(() => {
        if (index < sequence.length) {
            highlightTile(sequence[index]);
            index++;
        } else {
            clearInterval(interval);
        }
    }, 500);
}

function highlightTile(tileIndex) {
    let tile = gameBoard.children[tileIndex];
    tile.style.backgroundColor = 'white';
    setTimeout(() => {
        tile.style.backgroundColor = '';
    }, 200);
}

function tileClick(index) {
    highlightTile(index);
    if (!playerSequence.includes(index)) {
        playerSequence.push(index);
    }
    if (playerSequence.length === sequence.length) {
        if (checkSequence()) {
            setTimeout(nextLevel, 1000);
        } else {
            alert("Mauvaise séquence ! Réessayez.");
            resetGame();
            startGame();
        }
    }
}

function checkSequence() {
    return playerSequence.every(val => sequence.includes(val)) && sequence.every(val => playerSequence.includes(val));
}

function resetGame() {
    sequence = [];
    playerSequence = [];
    level = 1;
    score = 0;
    scoreDisplay.textContent = score;
    gridSize = 3;
}

function nextLevel() {
    score++;
    scoreDisplay.textContent = score;
    level++;
    playerSequence = [];
    if (level % 3 === 0) {
        gridSize++;
    }
    createGameBoard();
    generateSequence();
    setTimeout(showSequence, 1000);
}

function createGameBoard() {
    gameBoard.innerHTML = '';
    gameBoard.style.gridTemplateColumns = `repeat(${gridSize}, 80px)`;
    gameBoard.style.gridTemplateRows = `repeat(${gridSize}, 80px)`;
    for (let i = 0; i < gridSize * gridSize; i++) {
        let tile = document.createElement('div');
        tile.classList.add('tile');
        tile.addEventListener('click', () => tileClick(i));
        gameBoard.appendChild(tile);
    }
}

function startGame() {
    resetGame();
    createGameBoard();
    generateSequence();
    showSequence();
}
