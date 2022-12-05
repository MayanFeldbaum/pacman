'use strict'

const WALL = '#'
const FOOD = '.'
const EMPTY = ' '
const POWERFOOD ='@'
const CHERRY = '🍒'

const gGame = {
    score: 0,
    isOn: false
}

var gBoard
var gFoodCount
var cherryInterval

function onInit() {
    onCloseModal()
    gBoard = buildBoard()
    createGhosts(gBoard)
    createPacman(gBoard)
    renderBoard(gBoard, '.board-container')
    gGame.isOn = true
    cherryInterval = setInterval(gSetRandomCherry, 5000)
}

function buildBoard() {
    const size = 10
    const board = []

    for (var i = 0; i < size; i++) {
        board.push([])
        for (var j = 0; j < size; j++) {
            board[i][j] = FOOD
            if (i === 0 || i === size - 1 ||
                j === 0 || j === size - 1 ||
                (j === 3 && i > 4 && i < size - 2)) {
                board[i][j] = WALL
            }
        }
    }

    board[1][1]= POWERFOOD
    board[8][1]= POWERFOOD
    board[8][8]= POWERFOOD
    board[1][8]= POWERFOOD
    return board
}

function updateScore(diff) {
    // TODO: update model and dom
    // Model
    gGame.score += diff
    // DOM
    document.querySelector('h2 span').innerText = gGame.score
}

function gameOver(str,symbole) {
    clearInterval(gIntervalGhosts)
    clearInterval(cherryInterval)
    gGame.isOn = false
    renderCell(gPacman.location, symbole)
    gGhosts = []
    gGame.score = 0
    openModal(str)
}

function openModal(str) {
    const elModal = document.querySelector('.modal')
    elModal.style.display = 'block'
    const elModalH2 = document.querySelector('.modal h2')
    if(str === 'win'){
    elModalH2.innerHTML = 'Great!!'
    }
    else elModalH2.innerHTML = 'Try Again..'
}

function onCloseModal() {
    const elModal = document.querySelector('.modal')
    elModal.style.display = 'none'
}


function CountFoodCells() {
    var foodCount =0
    for (var i = 0; i < gBoard.length; i++) {
        for (var j = 0; j < gBoard[0].length; j++) {
            const cell = gBoard[i][j]
            if (cell === FOOD||cell===CHERRY)foodCount++
            }
        }
        if(foodCount===0) gameOver('win','😍')
    }

function gSetRandomCherry() {
    const emptyCells = findEmptyCells()
    renderCell(emptyCells[0], CHERRY)
    gBoard[emptyCells[0].i][emptyCells[0].j] = CHERRY
}

function findEmptyCells() {
    const emptyCells = []
    for (var i = 0; i < gBoard.length; i++) {
        for (var j = 0; j < gBoard[0].length; j++) {
            const cell = gBoard[i][j]
            if (cell === ' ') {
                var emptyCell = { i:i, j:j }
                emptyCells.push(emptyCell)
            }
        }
    }
    const shuffledEmptyCells = emptyCells.sort(() => Math.random() - 0.5)
    return shuffledEmptyCells
}
