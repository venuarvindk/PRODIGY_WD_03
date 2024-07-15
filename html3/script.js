document.addEventListener("DOMContentLoaded", () => {
    const cells = document.querySelectorAll(".cell");
    const restartButton = document.getElementById("restart");
    const scoreXElement = document.getElementById("scoreX");
    const scoreOElement = document.getElementById("scoreO");
    const aiToggle = document.getElementById("aiToggle");

    let currentPlayer = "X";
    let board = Array(9).fill(null);
    let gameOver = false;
    let scoreX = 0;
    let scoreO = 0;

    const winningCombinations = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];

    function handleClick(e) {
        const index = e.target.getAttribute("data-index");
        if (board[index] || gameOver) return;

        board[index] = currentPlayer;
        e.target.textContent = currentPlayer;
        e.target.classList.add(currentPlayer); // Add class to style X or O

        if (checkWin(currentPlayer)) {
            alert(`${currentPlayer} wins!`);
            updateScore(currentPlayer);
            gameOver = true;
        } else if (board.every(cell => cell)) {
            alert("It's a tie!");
            gameOver = true;
        } else {
            currentPlayer = currentPlayer === "X" ? "O" : "X";
            if (aiToggle.checked && currentPlayer === "O") {
                aiMove();
            }
        }
    }

    function checkWin(player) {
        return winningCombinations.some(combination => {
            return combination.every(index => {
                return board[index] === player;
            });
        });
    }

    function updateScore(winner) {
        if (winner === "X") {
            scoreX++;
            scoreXElement.textContent = scoreX;
        } else if (winner === "O") {
            scoreO++;
            scoreOElement.textContent = scoreO;
        }
    }

    function aiMove() {
        let availableCells = board.map((cell, index) => cell === null ? index : null).filter(index => index !== null);
        let randomIndex = availableCells[Math.floor(Math.random() * availableCells.length)];
        board[randomIndex] = "O";
        cells[randomIndex].textContent = "O";
        cells[randomIndex].classList.add("O"); // Add class to style O

        if (checkWin("O")) {
            alert("O wins!");
            updateScore("O");
            gameOver = true;
        } else if (board.every(cell => cell)) {
            alert("It's a tie!");
            gameOver = true;
        } else {
            currentPlayer = "X";
        }
    }

    function restartGame() {
        board = Array(9).fill(null);
        cells.forEach(cell => {
            cell.textContent = "";
            cell.classList.remove("X", "O"); // Clear any X or O classes
        });
        currentPlayer = "X";
        gameOver = false;
    }

    cells.forEach(cell => cell.addEventListener("click", handleClick));
    restartButton.addEventListener("click", restartGame);
});
