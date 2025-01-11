import { queryHelpers } from "@testing-library/react"
import {switchPlayer} from "./state/reducer"
import {evaluateScore, getEmptyCells, getGameOver, getWinner} from "./utils"


export const PLAYER_X = 1
export const PLAYER_O = 2


export const HUMAN = -1
export const COMP = +1


export function minmax(grid, depth, player) {
    // only output the score?
    let best = []

    if (player === COMP) {
        best = [-1,-1, -1000]
    } else {
        best = [-1,-1, +1000]
    }

    const winner = getWinner(grid, player)

    if (depth === 0 || getGameOver(grid, player)) {
        let score = evaluateScore(winner)
        return [-1,-1, score]
    }

    getEmptyCells(grid).forEach(function (cell) {
        // const gridCopy = grid.map(row => [...row])
        const [x, y] = cell

        // Make the move
        grid[x][y] = player

        let ret = minmax(grid, depth - 1, -player)

        grid[x][y] = 0

        ret[0] = x
        ret[1] = y

        if (player === COMP) {
            if (ret[2] > best[2]) {
                best = ret
            }
        } else {
            if (ret[2] < best[2]) {
                best = ret
            }
        }
    })    

    return best
}


export function getAiMove(grid) {
    let bestScore = -Infinity
	let bestMove

    const emptyIdx = getEmptyCells(grid)
    const depth = emptyIdx.length

    if (depth === 0 || gameOver(grid)) {
        return
    }

    for (const idx of emptyIdx) {
        const gridCopy = [...grid]

        // IA move
        gridCopy[idx] = PLAYER_O

        const score = minmax(gridCopy, depth, PLAYER_X)

        if (score > bestScore) {
            bestScore = score
            bestMove = idx
        }
    }
    
    return bestMove
}


function gameOver(grid) {
    return (getWinner(grid) === PLAYER_O) || (getWinner(grid) === PLAYER_O)
}

// Score all possible outcome then ripple back the tree those scores to help
// x decide which way to go

// x = +1
// o = -1
// tie = 0