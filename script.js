
var difficulty
var boardSize
var gBoard
var gNums
var miliSeconds = 0
var seconds = 0;
var gInterval


init()
function init() {
    chooseDifficulty()
    gBoard = createBoard(boardSize);
    renderBoard(gBoard);
    
}

function startGame() {
    gInterval = setInterval(getTime, 1)

}

function getTime() {
    var strHtml = 'Game Time: '
    var time = document.querySelector('.game-time')

    miliSeconds++
    if (miliSeconds === 999) {
        miliSeconds = 0
        seconds++
    }
    
    if (seconds === 59) {
        seconds = 0
    }
    miliSeconds = miliSeconds < 100 ? '0'+ miliSeconds : miliSeconds
    let stopWatch = `${seconds}.${miliSeconds}`
    strHtml += stopWatch
    time.innerText = strHtml
}

function chooseDifficulty() {
    var elDifficult = document.querySelector('input[name="difficulty"]:checked').value
    if (elDifficult === 'easy') difficulty = 16
    if (elDifficult === 'medium') difficulty = 25
    if (elDifficult === 'hard') difficulty = 36
    boardSize = Math.sqrt(difficulty)
    gNums = createNums(difficulty)
    gBoard = createBoard(boardSize);
    renderBoard(gBoard);
}

function cellClicked(clickedNum) {
    startGame()
    var nextNum = gNums[0]
    var currNumVal = parseInt(clickedNum.innerHTML)
    if (currNumVal === nextNum) {
        
        gNums.splice(0, 1)
        var elNextNum = document.querySelector('.next-number')
        elNextNum.innerHTML = `Next Number: ${nextNum} `
        clickedNum.style.backgroundColor = 'red'
    }
}

function createNums(difficulty) {
    var nums = []
    for (let i = 0; i < difficulty; i++) {
        nums.push(i + 1) 
    }
    return nums
}

function shuffleNums() {
    var numsCopy = createNums(difficulty)
    var shuffledNums = []
    while (numsCopy.length > 0) {
        randIdx = getRandomInt(0, numsCopy.length)
        randNum = numsCopy.splice(randIdx, 1)
        shuffledNums.push(randNum[0])
        
    }
    return shuffledNums
}


function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min); //The maximum is exclusive and the minimum is inclusive
  }

function createBoard(boardSize) {
    var board = [];
    for (var i = 0; i < boardSize; i++) {
        board.push([]);
        for (var j = 0; j < boardSize; j++) {
            board[i][j] = ''
        }
    }
    return board;
}

function renderBoard(board) {
    var strHTML = '';
    var shuffledNums = shuffleNums()
    for (var i = 0; i < board.length; i++) {
        strHTML += '<tr>';
        for (var j = 0; j < board[0].length; j++) {
            var currCellVal = shuffledNums.pop()
            strHTML += `<td data-i="${i}" data-j="${j}"
            onclick="cellClicked(this)" 
            class="num${currCellVal}">${currCellVal}</td>`;
        }
        strHTML += '</tr>';
    }
    var elGameController = document.querySelector('.game-controller')
    elGameController.style.width = 114 * board.length + 'px'
    var elBoard = document.querySelector('.board');
    elBoard.innerHTML = strHTML;
    var elNextNum = document.querySelector('.next-number')
    elNextNum.innerHTML = `Next Number: ${gNums[0]}`
}
