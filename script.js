let board = ['', '', '', '', '', '', '', '', ''];
let currentPlayer = 'X';
let isGameActive = true;
const playerXScore = document.getElementById('scoreX');
const playerOScore = document.getElementById('scoreO');
let scoreX = 0;
let scoreO = 0;
const statusDisplay = document.getElementById('status');
const playerXNameInput = document.getElementById('playerX');
const playerONameInput = document.getElementById('playerO');
let playerXName = 'Player X';
let playerOName = 'Player O';

const winningConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

document.querySelectorAll('.cell').forEach(cell => cell.addEventListener('click', cellClicked));
document.getElementById('restart').addEventListener('click', restartGame);
playerXNameInput.addEventListener('change', updatePlayerNames);
playerONameInput.addEventListener('change', updatePlayerNames);

function cellClicked(clickedCellEvent) {
    const clickedCell = clickedCellEvent.target;
    const clickedCellIndex = parseInt(clickedCell.getAttribute('data-cell-index'));

    if (board[clickedCellIndex] !== '' || !isGameActive) {
        return;
    }

    cellPlayed(clickedCell, clickedCellIndex);
    validateResult();
}

function cellPlayed(clickedCell, clickedCellIndex) {
    board[clickedCellIndex] = currentPlayer;
    clickedCell.innerHTML = currentPlayer;
    updateStatusDisplay();
}

function validateResult() {
    let roundWon = false;
    for (let i = 0; i <= 7; i++) {
        const winCondition = winningConditions[i];
        let a = board[winCondition[0]];
        let b = board[winCondition[1]];
        let c = board[winCondition[2]];
        if (a === '' || b === '' || c === '') {
            continue;
        }
        if (a === b && b === c) {
            roundWon = true;
            break;
        }
    }

    if (roundWon) {
        updateScore(currentPlayer);
        statusDisplay.innerHTML = `${currentPlayer === 'X' ? playerXName : playerOName} Wins!`;
        isGameActive = false;
        return;
    }

    let roundDraw = !board.includes('');
    if (roundDraw) {
        statusDisplay.innerHTML = `Game Draw!`;
        isGameActive = false;
        return;
    }

    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    updateStatusDisplay();
}

function updateScore(winner) {
    if (winner === 'X') {
        scoreX++;
        playerXScore.innerHTML = `${playerXName}: ${scoreX}`;
    } else {
        scoreO++;
        playerOScore.innerHTML = `${playerOName}: ${scoreO}`;
    }
}

function restartGame() {
    board = ['', '', '', '', '', '', '', '', ''];
    isGameActive = true;
    currentPlayer = 'X';
    document.querySelectorAll('.cell').forEach(cell => cell.innerHTML = '');
    updateStatusDisplay();
}

function updatePlayerNames() {
    playerXName = playerXNameInput.value || 'Player X';
    playerOName = playerONameInput.value || 'Player O';
    playerXScore.innerHTML = `${playerXName}: ${scoreX}`;
    playerOScore.innerHTML = `${playerOName}: ${scoreO}`;
    updateStatusDisplay();
}

function updateStatusDisplay() {
    if (isGameActive) {
        statusDisplay.innerHTML = `${currentPlayer === 'X' ? playerXName : playerOName}'s Turn`;
    }
}

// Call updateStatusDisplay at the start to set the initial status
updateStatusDisplay();
