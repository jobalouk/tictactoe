import {switchPlayer, humanMove} from "./state/reducer"
import {emptyIndexes, getWinner} from "./utils"

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
    const multiplier = SCORES[String(turn)]; // Adjust score based on the current player
    let maxScore = -1
    let bestMove = null

    const winner = getWinner(grid); // Check if the game is over
    if (winner) {
        return [SCORES[winner], 0]; // Return score if there's a winner
    }

    for (const idx of emptyIndexes(grid)) {
        // Create a fresh copy of the grid for each move simulation
        const gridCopy = [...grid]
        
        humanMove(gridCopy, idx, turn); // Simulate the move
        const [score] = minmax(gridCopy, switchPlayer()[turn]); // Recursive call with switched player

        const adjustedScore = multiplier * score;
        if (adjustedScore >= maxScore) {
            maxScore = adjustedScore
            bestMove = idx
        }
        
        // Undo the move for the next iteration
        gridCopy[idx] = null
    }

    return [maxScore, bestMove]
}
    