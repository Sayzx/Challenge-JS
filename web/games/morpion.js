    let isMoveInProgress = false;
    let currentPlayer = '⭕️';
    let board = ['', '', '', '', '', '', '', '', ''];
    let currentMode = '';
    let notificationTimeout;

    async function startGame(mode) {
        board = ['', '', '', '', '', '', '', '', ''];
        currentMode = mode;

        document.getElementById('level-selection').style.display = 'none';
        isMoveInProgress = true;
        await renderBoard();
        isMoveInProgress = false;
        currentPlayer = '⭕️';

        if (currentMode === "pve") {
            setTimeout(aiMove, 600);
        } else {
            currentPlayer = '❌';
        }
    }

    async function renderBoard() {
        return new Promise(resolve => {
            const gameBoard = document.getElementById('game-board');
            gameBoard.innerHTML = '';
            gameBoard.style.display = 'grid';
            board.forEach((cell, index) => {
                gameBoard.innerHTML += `<div class="cell" onclick="makeMove(${index})">${cell}</div>`;
            });
            setTimeout(resolve, 700);
        });
    }

    async function makeMove(index) {
        if (isMoveInProgress) return;
        if (currentMode === 'pve' && currentPlayer === '⭕️') return;
        if (board[index] !== '' || checkWin(board) || checkDraw()) return;

        isMoveInProgress = true;

        board[index] = currentPlayer;

        await renderBoard();

        if (checkWin(board) || checkDraw()) {
            endGame();
        } else {
            currentPlayer = (currentPlayer === '❌') ? '⭕️' : '❌';
            if (currentMode === 'pve' && currentPlayer === '⭕️') {
                setTimeout(aiMove, 600);
            }
        }

        isMoveInProgress = false;
    }

    async function aiMove() {
        if (isMoveInProgress) return;
        isMoveInProgress = true;
        let availablePositions = board.map((val, idx) => val === '' ? idx : null).filter(val => val !== null);
        let bestMove = null;
        let winImminent = false;
        let blockOpponent = null;

        for (let pos of availablePositions) {
            board[pos] = '⭕️';
            if (checkWin(board)) {
                bestMove = pos;
                winImminent = true;
                board[pos] = '';
                break;
            }
            board[pos] = '';
        }

        if (!winImminent) {
            for (let pos of availablePositions) {
                board[pos] = '❌';
                if (checkWin(board)) {
                    blockOpponent = pos;
                    board[pos] = '';
                    break;
                }
                board[pos] = '';
            }
        }

        if (blockOpponent !== null) {
            bestMove = blockOpponent;
        } else if (!winImminent) {
            bestMove = availablePositions[Math.floor(Math.random() * availablePositions.length)];
        }

        board[bestMove] = '⭕️';
        await renderBoard();
        if (checkWin(board) || checkDraw()) {
            endGame();
            return;
        }

        currentPlayer = '❌';
        isMoveInProgress = false;
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

    function showNotification(message) {
        const notification = document.querySelector('.notification');
        const notificationText = document.querySelector('.notification-text');
        notificationText.innerHTML = message;
        notification.style.display = 'block';

        clearTimeout(notificationTimeout);

        notificationTimeout = setTimeout(() => {
            notification.style.display = 'none';
        }, 3500);
    }

    function endGame() {
        if (checkWin(board)) {
            showNotification(`Le joueur ${currentPlayer} a gagné !`);
        } else if (checkDraw()) {
            showNotification("Match nul !");
        }
        document.getElementById('level-selection').style.display = 'flex';
        document.getElementById('game-board').style.display = 'none';
    }
