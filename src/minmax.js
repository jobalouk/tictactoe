import {switchPlayer} from "./state/reducer"
import {getEmptyIndexes, getWinner} from "./utils"

export const DRAW = 0
export const PLAYER_X = 1
export const PLAYER_O = 2


export const SCORES = {
    // player_x
    1: 1,
    // draw
    0: 0,
    // player_o
    2: -1,
}


export function minmax(grid, turn) {
    const winner = getWinner(grid); // Check if the game is over

    if (winner) {
        return SCORES[winner]
    }

    return getBestScore(grid, turn)
}


export function getBestMove(grid) {
    let bestScore = -Infinity
	let bestMove

    const emptyIdx = getEmptyIndexes(grid)

    for (const idx of emptyIdx) {
        const gridCopy = [...grid]

        // IA move
        gridCopy[idx] = PLAYER_O

        const score = minmax(gridCopy, PLAYER_X);

        if (score > bestScore) {
            bestScore = score
            bestMove = idx
        }
    }
    
    return bestMove
}


function getBestScore(grid, turn) {
    // Implem in minmax for a little bit of abstraction i guess?

    const isMax = turn === PLAYER_O || turn === PLAYER_X

    // Check player to know if we want to minimize or maximize.
    let bestScore = isMax ? -Infinity : Infinity;
    
    const emptyIdx = getEmptyIndexes(grid)

    for (const idx of emptyIdx) {
        const gridCopy = [...grid]
        gridCopy[idx] = turn

        const playerTurn = switchPlayer()[turn]
        let score = minmax(gridCopy, playerTurn)
            
        bestScore = isMax ? Math.max(score, bestScore) : Math.min(score, bestScore)

    }

    return bestScore
}