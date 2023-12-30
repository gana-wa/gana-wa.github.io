let player1 = "X";
let player2 = "O";
let dimension = parseInt(document.getElementById("boardSize").value);
let board = new Array(dimension)
    .fill("")
    .map(() => new Array(dimension).fill(""));
let startButton = document.getElementById("gameStart");
let turn = 0;
let gameOver = false;
let players = [];

const changeBoardSize = (event) => {
    dimension = parseInt(event.target.value);
    board = new Array(dimension)
        .fill("")
        .map(() => new Array(dimension).fill(""));
};

document
    .getElementById("boardSize")
    .addEventListener("change", changeBoardSize);

const startGame = () => {
    document.getElementById("boardSize").setAttribute("disabled", true);
    startButton.setAttribute("disabled", true);

    players.push(player1);
    players.push(player2);

    document.getElementById("turn").innerHTML = `${players[turn % 2]}'s turn`;
    createBoard();
};

const handleClick = (cell, i, j) => {
    const el = cell;

    if (el.innerHTML !== "" || gameOver) {
        return;
    }

    board[i][j] = turn % 2 === 0 ? "X" : "O";
    el.innerHTML = board[i][j];

    if (calculateWinner()) {
        document.getElementById("turn").innerHTML = `${players[turn % 2]} wins!`;
        gameOver = true;
        return;
    }
    turn++;

    document.getElementById("turn").innerHTML = `${players[turn % 2]}'s turn`;

    if (turn === dimension * dimension) {
        document.getElementById("turn").innerHTML = "Draw!";
        gameOver = true;
        return;
    }
};

const createBoard = () => {
    let gameContainer = document.getElementById("board-container");
    for (let i = 0; i < dimension; i++) {
        let row = document.createElement("div");
        row.className = "row";
        for (let j = 0; j < dimension; j++) {
            let cell = document.createElement("div");
            cell.addEventListener("click", (event) => handleClick(cell, i, j));
            cell.className = "cell";
            row.appendChild(cell);
        }
        gameContainer.appendChild(row);
    }
    const restartButton = document.createElement("button");
    restartButton.className = "button restart";
    restartButton.id = "restart";
    restartButton.innerText = "Restart";
    restartButton.addEventListener("click", restartGame);
    gameContainer.appendChild(restartButton);
};

const calculateWinner = () => {
    // first check for all rows in board and then for col and then for diagonals
    let boardLength = board.length;
    if (turn < boardLength) {
        return false;
    }

    for (let i = 0; i < boardLength; i++) {
        if (board[i].every((el) => el === board[i][0] && el !== "")) {
            return true;
        }

        let start_col_val = board[0][i];
        let count = 1;
        for (let j = 1; j < boardLength; j++) {
            if (start_col_val === board[j][i] && start_col_val !== "") {
                count++;
            }
        }

        if (count === boardLength) {
            return true;
        }
    }

    // check for diagonal

    let i = board[0][0];
    let j = 0;
    while (j < boardLength) {
        if (board[0][0] === "") {
            break;
        }
        if (board[j][j] !== i) {
            break;
        } else {
            j++;
        }
    }

    if (j === boardLength) {
        return true;
    }

    let reverse_i = 0;
    let revervse_j = boardLength - 1;
    let reverse_val = board[reverse_i][revervse_j];

    while (reverse_i < boardLength) {
        if (board[reverse_i][revervse_j] === "") {
            break;
        }
        if (reverse_val !== board[reverse_i][revervse_j]) {
            break;
        } else {
            reverse_i++;
            revervse_j--;
        }
    }

    if (reverse_i === boardLength) {
        return true;
    }

    return false;
};

const restartGame = () => {
    location.reload();
};
