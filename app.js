//Elements
let playboard = document.querySelector(".playBoard");
let startGame = document.querySelector("#startGame");
let reset = document.querySelector(".reset");
let winningStatement = document.querySelector(".winningStatement");
let players = document.querySelector(".players");
let firstName = document.querySelector(".firstName");
let secondName = document.querySelector(".secondName");

let matrix = [
  ["", "", ""],
  ["", "", ""],
  ["", "", ""],
];

let count = 0;
let playing = false; //To stop the game from running before hitting the start button and after someone has won
let turnComplete = false; //To stop the computerTurn from running until player1 clicks an unoccupied space

//Player's turn
playboard.addEventListener("click", (event) => {
  if (playing) {
    if (event.target.nodeName === "DIV" && event.target.innerHTML === "") {
      event.target.innerHTML = count % 2 === 0 ? "X" : "O";
      let elementName = event.target.className;
      let index1 = +elementName.split("")[0];
      let index2 = +elementName.split("")[1];
      matrix[index1][index2] = event.target.innerHTML;
      count++;
      winningCondition(matrix);
      turnComplete = true;
    }
  }
  //Computer's turn
    if ((secondName.innerHTML === "O: Computer" || secondName.innerHTML === "O: computer") && playing === true && turnComplete === true) {
      computerTurn();
      count++;
      winningCondition(matrix);
      turnComplete = false;
    }
  return;
});



function computerTurn() {
  let avaliableSpace = [[], [], []];
  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      if (matrix[i][j] === "") {
        avaliableSpace[i].push(j); //Create a matrix of available spaces
      }
    }
  }
  let rowGuess = Math.floor(Math.random() * 2.999999);
  while (avaliableSpace[rowGuess].length === 0) { //while there is no available space in that row, choose another row
    rowGuess = Math.floor(Math.random() * 2.999999);
  }
  const rowChoice = rowGuess; // changing name to show that it is a final choice(for readability purposes)
  const availablecolumn = Math.floor(Math.random() * (avaliableSpace[rowChoice].length - 1)); //randomly selecting an index from avaliable space matrix
  const columnChoice = avaliableSpace[rowChoice][availablecolumn]; //use index to pull avaliable column coordinate from availableSpace matrix
  matrix[rowChoice][columnChoice] = "O";
  const idx1 = [rowChoice].toString(); //change coordinates to string to grab from HTML
  const idx2 = [columnChoice].toString();
  const idxOfBox = idx1.concat(idx2);
  const boxSpot = document.getElementsByClassName(idxOfBox);
  boxSpot[0].innerHTML = "O"; 
};



//get column array 
function getColumns(matrix, columnIdx) {
  let columns = [];
  for (let i = 0; i < 3; i++) {
    columns.push(matrix[i][columnIdx]);
  }
  return columns;
}

//get diagonal left to right
function getDiagonal1(matrix) {
  let diagonal1 = [];
  diagonal1.push(matrix[0][0], matrix[1][1], matrix[2][2]);
  return diagonal1;
}
//get diagonal right to left
function getDiagonal2(matrix) {
  let diagonal2 = [];
  diagonal2.push(matrix[0][2], matrix[1][1], matrix[2][0]);
  return diagonal2;
}



//check winning conditions
function winningCondition(matrix) {
  // check row win conditions
  for (let i = 0; i < 3; i++) {
    const row = matrix[i];
    if (row.join("") == "XXX") {
      winningStatement.innerHTML = "X wins";
      winningStatement.style.background = "rgb(250, 97, 41)";
      playing = false;
      return;
    } else if (row.join("") == "OOO") {
      winningStatement.innerHTML = "O wins";
      winningStatement.style.background = "rgb(134, 41, 255)";
      playing = false;
      return;
    }
  }
  //check column win conditions
  for (let j = 0; j < 3; j++) {
    column = getColumns(matrix, j);
    if (column.join("") == "XXX") {
      winningStatement.innerHTML = "X wins";
      winningStatement.style.background = "rgb(250, 97, 41)";
      playing = false;
      return;
    } else if (column.join("") == "OOO") {
      winningStatement.innerHTML = "O wins";
      winningStatement.style.background = "rgb(134, 41, 255)";
      playing = false;
      return;
    }
  }
  //check diagonal win conditions
  let diagonalOne = getDiagonal1(matrix);
  let diagonalTwo = getDiagonal2(matrix);
  //left to right diagonal
  if (diagonalOne.join("") == "XXX") {
    winningStatement.innerHTML = "X wins";
    winningStatement.style.background = "rgb(250, 97, 41)";
    playing = false;
    return;
  } else if (diagonalOne.join("") == "OOO") {
    winningStatement.innerHTML = "O wins";
    winningStatement.style.background = "rgb(134, 41, 255)";
    playing = false;
    return;
  }
  //right to left diagonal
  if (diagonalTwo.join("") == "XXX") {
    winningStatement.innerHTML = "X wins";
    winningStatement.style.background = "rgb(250, 97, 41)";
    playing = false;
    return;
  } else if (diagonalTwo.join("") == "OOO") {
    winningStatement.innerHTML = "O wins";
    winningStatement.style.background = "rgb(134, 41, 255)";
    playing = false;
    return;
  }
  //draw
  if (count === 9) {
    winningStatement.innerHTML = "Draw";
    winningStatement.style.background = "rgb(251, 241, 45)";
    playing = false;
    return;
  }
}

//input names and display
players.addEventListener("click", (event) => {
  if (event.target.id === "startGame") {
    const p1name = document.getElementById("p1");
    let input1 = p1name.value;
    if (input1 === "") {
      input1 = "Player 1";
    }
    const p2name = document.getElementById("p2");
    let input2 = p2name.value;
    if (input2 === "") {
      input2 = "Computer";
    }
    firstName.innerHTML = `X: ${input1}`;
    secondName.innerHTML = `O: ${input2}`;
    players.style.display = "none";
    playing = true;
  }
});

//reset button
reset.addEventListener("click", (event) => {
  if (event.target.id === "resetButton") {
    location.reload();
  }
});
