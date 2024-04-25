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
        sequence.push(Math.floor(Math.random() * (level + 2))); // Génère un nombre aléatoire de 0 à level + 1
    }
}

// Affiche la séquence sur le tableau de jeu
function showSequence() {
    sequence.forEach((tileIndex) => {
        highlightTile(tileIndex);
    });
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
    let sortedSequence = sequence.slice().sort(); // Copy and sort the sequence
    let sortedPlayerSequence = playerSequence.slice().sort(); // Copy and sort the player sequence
    for (let i = 0; i < playerSequence.length; i++) {
        if (sortedPlayerSequence[i] !== sortedSequence[i]) {
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
    generateSequence();
    playerSequence = [];
    showSequence();
}

// Crée le plateau de jeu
function createGameBoard() {
let gridSize;
if (level >= 2 && (level - 2) % 2 === 0) { // Vérifie si le niveau est un multiple de 2 à partir de 2
    gridSize = level + 3; // Si oui, ajoute 3 à la taille du plateau
} else {
    gridSize = level + 2; // Sinon, ajoute seulement 2 à la taille du plateau
}

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
    // Supprimer le plateau de jeu existant s'il y en a un
    while (gameBoard.firstChild) {
        gameBoard.removeChild(gameBoard.firstChild);
    }
    // Créer un nouveau plateau de jeu
    createGameBoard();
    generateSequence();
    showSequence();
}
