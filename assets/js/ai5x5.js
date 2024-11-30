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

let squares = Array(25).fill(null); // 5x5 board
let isXNext = true; // Player starts first

// Render the game board
function renderBoard() {
  boardElement.innerHTML = "";
  squares.forEach((value, index) => {
    const square = document.createElement("button");
    square.classList.add("square");
    square.textContent = value || ""; // Show X or O, otherwise empty
    square.addEventListener("click", () => handlePlayerMove(index)); // Attach click event
    boardElement.appendChild(square);
  });
}

// Handle player move
function handlePlayerMove(index) {
  console.log("Player clicked square:", index); // Debugging: Check which square was clicked
  if (squares[index] || calculateWinner(squares)) return; // Ignore clicks on occupied or finished board

  squares[index] = "X"; // Player is always X
  renderBoard();
  updateStatus();
}

// Calculate winner for 5x5 board
function calculateWinner(squares) {
  const winningLines = generateWinningLines();
  for (let line of winningLines) {
    const [a, b, c, d, e] = line;
    if (
      squares[a] &&
      squares[a] === squares[b] &&
      squares[a] === squares[c] &&
      squares[a] === squares[d] &&
      squares[a] === squares[e]
    ) {
      return squares[a];
    }
  }
  return null;
}

// Generate all possible winning lines for a 5x5 board
function generateWinningLines() {
  const lines = [];
  const size = 5;

  // Horizontal lines
  for (let row = 0; row < size; row++) {
    for (let col = 0; col <= size - 5; col++) {
      const start = row * size + col;
      lines.push([start, start + 1, start + 2, start + 3, start + 4]);
    }
  }

  // Vertical lines
  for (let col = 0; col < size; col++) {
    for (let row = 0; row <= size - 5; row++) {
      const start = row * size + col;
      lines.push([start, start + size, start + 2 * size, start + 3 * size, start + 4 * size]);
    }
  }

  // Diagonal (top-left to bottom-right)
  for (let row = 0; row <= size - 5; row++) {
    for (let col = 0; col <= size - 5; col++) {
      const start = row * size + col;
      lines.push([start, start + size + 1, start + 2 * (size + 1), start + 3 * (size + 1), start + 4 * (size + 1)]);
    }
  }

  // Diagonal (top-right to bottom-left)
  for (let row = 0; row <= size - 5; row++) {
    for (let col = 4; col < size; col++) {
      const start = row * size + col;
      lines.push([start, start + size - 1, start + 2 * (size - 1), start + 3 * (size - 1), start + 4 * (size - 1)]);
    }
  }

  return lines;
}

// Check if the board is full (draw)
function isDraw() {
  return squares.every((square) => square !== null) && !calculateWinner(squares);
}

// Update game status
function updateStatus() {
  const winner = calculateWinner(squares);
  if (winner) {
    setTimeout(() => {
      playWinSound();
      showEndGameModal(`Winner: ${winner}`);
    }, 500);
  } else if (isDraw()) {
    setTimeout(() => {
      playDrawSound();
      showEndGameModal("It's a Draw!");
    }, 500);
  } else {
    const nextPlayer = isXNext ? "X" : "O";
    statusElement.textContent = `Next player: ${nextPlayer}`;
  }
}

// Reset the game
function resetGame() {
  squares = Array(25).fill(null); // Reset 5x5 board
  isXNext = true;
  renderBoard();
  updateStatus();
}

// Start the game
resetButton.addEventListener("click", resetGame);
renderBoard();
updateStatus();