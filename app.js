// grab elements
boxes = document.querySelectorAll(".box")
score = document.querySelector("h2")
clearButton = document.querySelector("button")
turnText = document.querySelector("h3")

// Determine which letter goes first
let playerTurn, xWin = 0, oWin = 0, draw = 0, canPlace = true

if (Math.random() < 0.5) playerTurn = "X" 
else playerTurn = "O"
turnText.innerText = `${playerTurn}'s turn`


// add event listener 
for (let i = 0; i < boxes.length; i++) {
  boxes[i].addEventListener("click", clickFunction)
}
for (let i = 0; i < boxes.length; i++) {
  boxes[i].addEventListener("mouseover", boxOn)
}
for (let i = 0; i < boxes.length; i++) {
  boxes[i].addEventListener("mouseout", boxOut)
}
clearButton.addEventListener("click", clearBoard)

// logic
function clickFunction() {
  if (this.innerText == "" && canPlace) {
    this.innerText = playerTurn;
    if (playerTurn == "O") playerTurn = "X"
    else if (playerTurn == "X")playerTurn = "O"
  }
  if (canPlace) checkWin()
  turnText.innerText = `${playerTurn}'s turn`
}

let winningCombo = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
]

function checkWin() {
  let x = 0, o = 0, toDraw = 0
  for (let i = 0; i < winningCombo.length; i++) {
    for (let j = 0; j < winningCombo[i].length; j++) {
      if (boxes[winningCombo[i][j]].innerText == 'X') {
        x++
      }
      else if (boxes[winningCombo[i][j]].innerText == 'O') {
        o++
      }
    };
    if (x == 3) {
      xWin++
      winComboHighLight()
      canPlace = false
    }
    else if (o == 3) {
      oWin++
      winComboHighLight()
      canPlace = false

    }
    x = 0
    o = 0
  }

  for (let i = 0; i < boxes.length; i++) {
    if (boxes[i].innerText != '') {
      toDraw++
    }
    if (toDraw == 9) {
      draw++
      toDraw = 0
    }
  }
  
}

function clearBoard() {
  for (let i = 0; i < boxes.length; i++) {
    boxes[i].innerText = ''
    score.innerText = `X win: ${xWin} O win: ${oWin} Draw: ${draw}`
    canPlace = true
    boxes[i].style.background = "white"
    console.log("clear")
  }
}

function winComboHighLight() {
  for (let i = 0; i < winningCombo.length; i++) {
    if (boxes[winningCombo[i][0]].innerText == "X" && 
    boxes[winningCombo[i][1]].innerText == "X" && 
    boxes[winningCombo[i][2]].innerText == "X") {
      for (let j = 0; j < 3; j++) {
        boxes[winningCombo[i][j]].style.background = '#5AFF76'
      }
    }
  }
  for (let i = 0; i < winningCombo.length; i++) {
    if (boxes[winningCombo[i][0]].innerText == "O" && 
    boxes[winningCombo[i][1]].innerText == "O" && 
    boxes[winningCombo[i][2]].innerText == "O") {
      for (let j = 0; j < 3; j++) {
        boxes[winningCombo[i][j]].style.background = '#5AFF76'
      }
    }
  }
  
}
function boxOn() {
  if (canPlace)
    this.style.background = "#E7F9F0"
}
function boxOut() {
  if (canPlace)
    this.style.background = "white"
}