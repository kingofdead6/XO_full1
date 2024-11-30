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
  
  let squares = Array(9).fill(null);
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
    squares = Array(9).fill(null);
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
