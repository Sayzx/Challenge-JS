let sequence = [];
let playerSequence = [];
let level = 1;
let gameBoard = document.querySelector('.game-board');
let score = 0;
let scoreDisplay = document.getElementById('score');
let gridSize = 3; // Taille initiale de la grille
let startButton = document.getElementById('start-button');
let showingSequence = false;

startButton.addEventListener('click', startGame);

function generateSequence() {
    sequence = [];
    for (let i = 0; i < level; i++) {
        sequence.push(Math.floor(Math.random() * (gridSize * gridSize)));
    }
}

function showSequence() {
    showingSequence = true;
    sequence.forEach((tileIndex, i) => {
        setTimeout(() => {
            highlightTile(tileIndex);
            if (i === sequence.length - 1) {
                setTimeout(() => {
                    showingSequence = false;
                }, 200);
            }
        }, i * 1000);
    });
}

function highlightTile(tileIndex) {
    let tile = gameBoard.children[tileIndex];
    tile.style.backgroundColor = 'white';
    setTimeout(() => {
        tile.style.backgroundColor = '';
    }, 200);
}

const errorMessage = document.getElementById('error-message');

function tileClick(index) {
    if (showingSequence) return; // Ignore clicks during sequence display
    highlightTile(index);
    if (!playerSequence.includes(index)) {
        playerSequence.push(index);
    }
    if (playerSequence.length === sequence.length) {
        if (checkSequence()) {
            setTimeout(nextLevel, 1000);
        } else {
            errorMessage.textContent = "Erreur : mauvaise séquence ! Réessayez.";
            errorMessage.style.display = 'block';
            setTimeout(() => {
                errorMessage.style.display = 'none';
            }, 2000);
            resetGame();
            startGame();
        }
    }
}

function checkSequence() {
    // Vérifie si la séquence est correcte
    for (let i = 0; i < sequence.length; i++) {
        if (sequence[i] !== playerSequence[i]) {
            return false;
        }
    }
    return true;
}

function resetGame() {
    sequence = [];
    playerSequence = [];
    level = 1;
    score = 0;
    scoreDisplay.textContent = score;
    gridSize = 3;
    gameBoard.innerHTML = '';
    startButton.classList.remove('disabled');
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
    if (gameStarted) {
        startButton.classList.add('disabled');
    }
}