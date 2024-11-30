const boardElement = document.getElementById("board");
const statusElement = document.getElementById("status");
const resetButton = document.getElementById("resetButton");
const moveSound = new Audio('../images/mixkit-sci-fi-click-900.wav');
const endGameModal = document.getElementById("endGameModal");
const endGameMessage = document.getElementById("endGameMessage");
const replayButton = document.getElementById("replayButton");
const goBackButton = document.getElementById("goBackButton");

function showEndGameModal(message) {
  endGameMessage.textContent = message;
  endGameModal.style.display = "flex";
}

function hideEndGameModal() {
  endGameModal.style.display = "none";
}

// Replay button resets the game
replayButton.addEventListener("click", () => {
  hideEndGameModal();
  resetGame();
});
const winSound = new Audio('../images/mixkit-winning-chimes-2015.wav'); 
const drawSound = new Audio('../images/mixkit-retro-arcade-game-over-470.wav'); 

function playWinSound() {
winSound.play();
}

function playDrawSound() {
drawSound.play();
}


// Go back button navigates to the main menu
goBackButton.addEventListener("click", () => {
  window.location.href = "../../index.html"; // Adjust the URL to your main menu page
});

function playMoveSound() {
  moveSound.play();
}

let squares = Array(25).fill(null);
let isXNext = true;

function renderBoard() {
  boardElement.innerHTML = '';
  squares.forEach((value, index) => {
    const square = document.createElement("button");
    square.classList.add("square");
    if (value === "X") square.classList.add("x");
    if (value === "O") square.classList.add("o");
    square.textContent = value;
    square.addEventListener("click", () => handleSquareClick(index));
    boardElement.appendChild(square);
  });
}

function handleSquareClick(index) {
  if (squares[index] || calculateWinner(squares)) return;

  squares[index] = isXNext ? "X" : "O";
  isXNext = !isXNext;
  playMoveSound();
  renderBoard();
  updateStatus();
}

function calculateWinner(squares) {
    const lines = [
      // Rows
      [0, 1, 2, 3, 4],
      [5, 6, 7, 8, 9],
      [10, 11, 12, 13, 14],
      [15, 16, 17, 18, 19],
      [20, 21, 22, 23, 24],
      
      // Columns
      [0, 5, 10, 15, 20],
      [1, 6, 11, 16, 21],
      [2, 7, 12, 17, 22],
      [3, 8, 13, 18, 23],
      [4, 9, 14, 19, 24],
      
      // Diagonals
      [0, 6, 12, 18, 24],
      [4, 8, 12, 16, 20],
    ];
  
    for (let line of lines) {
      const [a, b, c, d, e] = line; // Destructure line to get all indices
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


function resetGame() {
  squares = Array(25).fill(null);
  isXNext = true;
  renderBoard();
  updateStatus();
}

resetButton.addEventListener("click", resetGame);

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
