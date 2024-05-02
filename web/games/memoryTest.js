let sequence = [];
let playerSequence = [];
let level = 1;
let gameBoard = document.querySelector('.game-board');
let score = 0;
let scoreDisplay = document.getElementById('score');

// Crée la séquence aléatoire pour chaque niveau
function generateSequence() {
    sequence = [];
    for (let i = 0; i < level; i++) {
        sequence.push(Math.floor(Math.random() * 9)); // Génère un nombre aléatoire de 0 à 8
    }
}

// Affiche la séquence sur le tableau de jeu
function showSequence() {
    let index = 0;
    let interval = setInterval(() => {
        if (index < sequence.length) {
            highlightTile(sequence[index]);
            index++;
        } else {
            clearInterval(interval);
        }
    }, 600);
}

// Met en surbrillance une tuile de la séquence
function highlightTile(tileIndex) {
    let tile = gameBoard.children[tileIndex];
    tile.style.opacity = '0.5';
    setTimeout(() => {
        tile.style.opacity = '1';
    }, 500);
}

// Gère le clic de l'utilisateur sur une tuile
function tileClick(index) {
    highlightTile(index);
    playerSequence.push(index);
    if (playerSequence.length === sequence.length) {
        if (checkSequence()) {
            setTimeout(() => {
                nextLevel();
            }, 1000);
        } else {
            alert("Mauvaise séquence ! Réessayez.");
            resetGame();
            startGame();
        }
    }
}

// Vérifie si la séquence du joueur correspond à la séquence générée
function checkSequence() {
    for (let i = 0; i < sequence.length; i++) {
        if (playerSequence[i] !== sequence[i]) {
            return false;
        }
    }
    return true;
}

// Réinitialise le jeu
function resetGame() {
    sequence = [];
    playerSequence = [];
    level = 1;
    score = 0;
    scoreDisplay.textContent = score;
    while (gameBoard.firstChild) {
        gameBoard.removeChild(gameBoard.firstChild);
    }
}

// Passe au niveau suivant ou affiche un message de fin de jeu
function nextLevel() {
    score++;
    scoreDisplay.textContent = score;
    level++;
    playerSequence = [];
    setTimeout(() => {
        generateSequence();
        showSequence();
    }, 1000); // Donne un peu de temps avant de commencer le prochain niveau
}

// Crée le plateau de jeu
function createGameBoard() {
    let gridSize = 3; // Fixe la grille à 3x3

    for (let i = 0; i < gridSize * gridSize; i++) {
        let tile = document.createElement('div');
        tile.classList.add('tile');
        tile.addEventListener('click', () => tileClick(i));
        gameBoard.appendChild(tile);
    }
    gameBoard.style.gridTemplateColumns = `repeat(${gridSize}, 80px)`;
    gameBoard.style.gridTemplateRows = `repeat(${gridSize}, 80px)`;
}

// Démarre le jeu
function startGame() {
    while (gameBoard.firstChild) {
        gameBoard.removeChild(gameBoard.firstChild);
    }
    createGameBoard();
    generateSequence();
    showSequence();
}
