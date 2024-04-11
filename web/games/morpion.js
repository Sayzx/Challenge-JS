let currentPlayer = '⭕️';
let board = ['', '', '', '', '', '', '', '', ''];
let currentLevel = 'easy';

function startGame(level) {
    currentLevel = level;
    board = ['', '', '', '', '', '', '', '', ''];
    document.getElementById('level-selection').style.display = 'none';
    currentPlayer = '⭕️';
    renderBoard();
    if (currentLevel !== 'easy') {
        setTimeout(aiMove, 600);
    } else {
        currentPlayer = '❌';
    }
}

function renderBoard() {
    const gameBoard = document.getElementById('game-board');
    gameBoard.innerHTML = '';
    gameBoard.style.display = 'grid';
    board.forEach((cell, index) => {
        gameBoard.innerHTML += `<div class="cell" onclick="makeMove(${index})">${cell}</div>`;
    });
}

function makeMove(index) {
    if (currentPlayer !== '❌' || board[index] !== '' || checkWin(board) || checkDraw()) return;
    board[index] = '❌';
    renderBoard();
    if (checkWin(board) || checkDraw()) {
        endGame();
    } else {
        currentPlayer = '⭕️';
        setTimeout(aiMove, 600);
    }
}

function aiMove() {
    let availablePositions = board.map((val, idx) => val === '' ? idx : null).filter(val => val !== null);
    if (availablePositions.length > 0) {
        let aiMove = availablePositions[Math.floor(Math.random() * availablePositions.length)];
        board[aiMove] = '⭕️';
        renderBoard();
        if (checkWin(board) || checkDraw()) {
            endGame();
            return;
        }
    }
    currentPlayer = '❌';
}

function checkWin(board) {
    const winConditions = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];
    for (let condition of winConditions) {
        if (board[condition[0]] && board[condition[0]] === board[condition[1]] && board[condition[1]] === board[condition[2]]) {
            return true;
        }
    }
    return false;
}

function checkDraw() {
    return board.every(cell => cell !== '');
}

function endGame() {
    setTimeout(() => {
        if (checkWin(board)) {
            alert(`Le joueur ${currentPlayer} a gagné !`);
        } else if (checkDraw()) {
            alert("Match nul !");
        }
        document.getElementById('level-selection').style.display = 'block';
        document.getElementById('game-board').style.display = 'none';
        if (currentLevel !== 'easy') {
            currentPlayer = '⭕️';
        } else {
            currentPlayer = '❌';
        }
    }, 100);
}

document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('game-board').style.display = 'none';
});
