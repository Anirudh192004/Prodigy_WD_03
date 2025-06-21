let board = ["", "", "", "", "", "", "", "", ""];
let currentPlayer = "X";
let gameOver = false;
let isAiMode = false;

const winningConditions = [
  [0, 1, 2], [3, 4, 5], [6, 7, 8], // rows
  [0, 3, 6], [1, 4, 7], [2, 5, 8], // columns
  [0, 4, 8], [2, 4, 6]             // diagonals
];

const squares = document.querySelectorAll(".square");
const resetButton = document.querySelector("#res");
const playerModeButton = document.querySelector("#pm");
const aiModeButton = document.querySelector("#wi");
const message = document.querySelector("#mess");

squares.forEach(square => {
  square.addEventListener("click", handleClick);
});

resetButton.addEventListener("click", resetGame);
playerModeButton.addEventListener("click", () => setMode(false));
aiModeButton.addEventListener("click", () => setMode(true));

function setMode(ai) {
  isAiMode = ai;
  resetGame();
  message.textContent = isAiMode ? "Playing vs Computer" : "Playing vs Player";
}

function handleClick(event) {
  const square = event.target;
  const index = square.getAttribute("id");

  if (board[index] !== "" || gameOver) return;

  makeMove(square, index, currentPlayer);

  if (checkForWinner(currentPlayer)) {
    message.textContent = `${currentPlayer} wins!`;
    gameOver = true;
    return;
  }

  if (checkForTie()) {
    message.textContent = "It's a tie!";
    gameOver = true;
    return;
  }

  currentPlayer = currentPlayer === "X" ? "O" : "X";

  if (isAiMode && currentPlayer === "O" && !gameOver) {
    setTimeout(makeAiMove, 500);
  }
}

function makeMove(square, index, player) {
  board[index] = player;
  square.classList.add(player);
  square.textContent = player;
}

function checkForWinner(player) {
  return winningConditions.some(condition => {
    const [a, b, c] = condition;
    return board[a] === player && board[b] === player && board[c] === player;
  });
}

function checkForTie() {
  return !board.includes("") && !gameOver;
}

function makeAiMove() {
  const availableMoves = board.map((cell, idx) => cell === "" ? idx : null).filter(val => val !== null);
  if (availableMoves.length > 0) {
    const randomIndex = availableMoves[Math.floor(Math.random() * availableMoves.length)];
    const square = document.getElementById(randomIndex);
    makeMove(square, randomIndex, currentPlayer);

    if (checkForWinner(currentPlayer)) {
      message.textContent = `${currentPlayer} wins!`;
      gameOver = true;
      return;
    }

    if (checkForTie()) {
      message.textContent = "It's a tie!";
      gameOver = true;
      return;
    }

    currentPlayer = currentPlayer === "X" ? "O" : "X";
  }
}

function resetGame() {
  board = ["", "", "", "", "", "", "", "", ""];
  currentPlayer = "X";
  gameOver = false;
  squares.forEach(square => {
    square.classList.remove("X", "O", "winner");
    square.textContent = "";
  });
  message.textContent = "";
}