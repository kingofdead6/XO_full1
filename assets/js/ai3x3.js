const boardElement = document.getElementById("board");
const statusElement = document.getElementById("status");
const resetButton = document.getElementById("resetButton");
const moveSound = new Audio("../images/mixkit-sci-fi-click-900.wav");
const endGameModal = document.getElementById("endGameModal");
const endGameMessage = document.getElementById("endGameMessage");
const replayButton = document.getElementById("replayButton");
const goBackButton = document.getElementById("goBackButton");

const winSound = new Audio("../images/mixkit-winning-chimes-2015.wav");
const drawSound = new Audio("../images/mixkit-retro-arcade-game-over-470.wav");

let squares = Array(9).fill(null);
let isXNext = true; 

function playMoveSound() {
  moveSound.play();
}

function playWinSound() {
  winSound.play();
}

function playDrawSound() {
  drawSound.play();
}

// Display the end game modal
function showEndGameModal(message) {
  endGameMessage.textContent = message;
  endGameModal.style.display = "flex";
}

// Hide the end game modal
function hideEndGameModal() {
  endGameModal.style.display = "none";
}

// Replay button resets the game
replayButton.addEventListener("click", () => {
  hideEndGameModal();
  resetGame();
});

// Go back button navigates to the main menu
goBackButton.addEventListener("click", () => {
  window.location.href = "../../index.html"; // Adjust the URL to your main menu page
});

// Render the game board
function renderBoard() {
  boardElement.innerHTML = "";
  squares.forEach((value, index) => {
    const square = document.createElement("button");
    square.classList.add("square");
    if (value === "X") square.classList.add("x");
    if (value === "O") square.classList.add("o");
    square.textContent = value;
    square.addEventListener("click", () => handlePlayerMove(index));
    boardElement.appendChild(square);
  });
}

// Handle player move
function handlePlayerMove(index) {
  if (squares[index] || calculateWinner(squares)) return;

  squares[index] = "X"; 
  squares[index] = isXNext ? "X" : "O";
  isXNext = !isXNext;
  playMoveSound();
  renderBoard();
  updateStatus();

  // Let the AI make its move if the game isn't over
  if (!calculateWinner(squares) && !isDraw()) {
    setTimeout(handleAIMove, 500);
  }
}

// Handle AI move
function handleAIMove() {
  const bestMove = findBestMove(squares);
  squares[bestMove] = "O"; 
  squares[bestMove] = isXNext ? "X" : "O";
  isXNext = !isXNext;
  playMoveSound();
  renderBoard();
  updateStatus();
}

// Calculate winner
function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let line of lines) {
    const [a, b, c] = line;
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}

// Check if the board is full (draw)
function isDraw() {
  return squares.every((square) => square !== null) && !calculateWinner(squares);
}

// Update game status
function updateStatus() {
  const winner = calculateWinner(squares);
  const isDraw = squares.every((square) => square !== null) && !winner;
  const status = winner
    ? `Winner: ${winner}`
    : isDraw
    ? "DRAW"
    : `Next player: ${isXNext ? "X" : "O"}`;

  const statusStyle = {
    color: winner
      ? "#FFD700"
      : isDraw
      ? "#FF6347"
      : isXNext
      ? "#ff4500"
      : "#00bfff",
    fontWeight: "bold",
    textShadow: "0 0 10px currentColor, 0 0 20px currentColor",
  };

  statusElement.textContent = status;
  statusElement.style.color = statusStyle.color;
  statusElement.style.fontWeight = statusStyle.fontWeight;
  statusElement.style.textShadow = statusStyle.textShadow;

  
if (winner) {
  setTimeout(() => {
    playWinSound(); 
    showEndGameModal(`Winner: ${winner}`);
  }, 500);
} else if (isDraw) {
  setTimeout(() => {
    playDrawSound(); 
    showEndGameModal("It's a Draw!");
  }, 500);
}
}
// Reset the game
function resetGame() {
  squares = Array(9).fill(null);
  isXNext = true;
  renderBoard();
  updateStatus();
}

// Minimax algorithm for AI
function findBestMove(board) {
  let bestValue = -Infinity;
  let bestMove = -1;

  for (let i = 0; i < board.length; i++) {
    if (!board[i]) {
      board[i] = "O"; // AI makes a move
      const moveValue = minimax(board, 0, false);
      board[i] = null; // Undo move

      if (moveValue > bestValue) {
        bestValue = moveValue;
        bestMove = i;
      }
    }
  }
  return bestMove;
}

function minimax(board, depth, isMaximizing) {
  const winner = calculateWinner(board);
  if (winner === "O") return 10 - depth;
  if (winner === "X") return depth - 10;
  if (isDraw()) return 0;

  if (isMaximizing) {
    let bestValue = -Infinity;
    for (let i = 0; i < board.length; i++) {
      if (!board[i]) {
        board[i] = "O";
        bestValue = Math.max(bestValue, minimax(board, depth + 1, false));
        board[i] = null;
      }
    }
    return bestValue;
  } else {
    let bestValue = Infinity;
    for (let i = 0; i < board.length; i++) {
      if (!board[i]) {
        board[i] = "X";
        bestValue = Math.min(bestValue, minimax(board, depth + 1, true));
        board[i] = null;
      }
    }
    return bestValue;
  }
}

resetButton.addEventListener("click", resetGame);

// Start the game
renderBoard();
updateStatus();

const audio = new Audio('../images/Around The World (la la la la) slowed  reverb(MP3_160K).mp3');
audio.loop = true; 
audio.volume = 0.2;

function playBackgroundMusic() {
  audio.play();
}

window.addEventListener("load", () => {
  playBackgroundMusic();
});
