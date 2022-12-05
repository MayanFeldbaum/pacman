'use strict'

const PACMAN = '😷'
var gPacman
var gIsSuper

function createPacman(board) {
    // DONE: initialize gPacman...
    gPacman = {
        location: {
            i: 2,
            j: 2
        },
        isSuper: false
    }
    gBoard[gPacman.location.i][gPacman.location.j] = PACMAN

}

function movePacman(ev) {
    CountFoodCells()
    if (!gGame.isOn) return
    // DONE: use getNextLocation(), nextCell
    const nextLocation = getNextLocation(ev.key)
    const nextCell = gBoard[nextLocation.i][nextLocation.j]

    // DONE: return if cannot move
    if (nextCell === WALL) return

    // DONE: hitting a ghost? call gameOver
    if (nextCell === GHOST) {
        if (gIsSuper) {
            console.log('horray')
            for (var i = 0; i < gGhosts.length; i++) {
                if ((gGhosts[i].location.i === nextLocation.i) && (gGhosts[i].location.j === nextLocation.j))
                    gGhosts.splice(i, 1)

            }
        }
        else{
            gameOver('','🪦')
            return
        }

    }

    if (nextCell === FOOD) {
        updateScore(1)
    }
    if (nextCell === CHERRY) {
        updateScore(10)
    }


    if (nextCell === POWERFOOD) {
        if (gIsSuper) return
        gIsSuper = true
        setTimeout(() => {
            gIsSuper = false
        }, 5000)
            for (var i = 0; i < gGhosts.length; i++) {
                gGhosts[i].color= `${getRandomColor()};`
            }


        const elSpan = document.querySelectorAll('.cell span')
        for (var i = 0; i < elSpan.length; i++) {
            elSpan.innerHTML = `<span style = "color: ${getRandomColor()};" >${GHOST}</span>`
        }

    }


    // DONE: moving from current location:
    // DONE: update the model
    gBoard[gPacman.location.i][gPacman.location.j] = EMPTY
    // DONE: update the DOM
    renderCell(gPacman.location, EMPTY)


    // DONE: Move the pacman to new location:
    // DONE: update the model
    gBoard[nextLocation.i][nextLocation.j] = PACMAN
    gPacman.location = nextLocation
    // DONE: update the DOM
    renderCell(nextLocation, PACMAN)

}

function getNextLocation(eventKeyboard) {
    // console.log(eventKeyboard)
    const nextLocation = {
        i: gPacman.location.i,
        j: gPacman.location.j
    }
    // DONE: figure out nextLocation
    switch (eventKeyboard) {
        case 'ArrowUp':
            nextLocation.i--
            break;
        case 'ArrowRight':
            nextLocation.j++
            break;
        case 'ArrowDown':
            nextLocation.i++
            break;
        case 'ArrowLeft':
            nextLocation.j--
            break;
    }
    return nextLocation
}
