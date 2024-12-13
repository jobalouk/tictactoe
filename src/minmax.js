import {switchPlayer} from "./state/reducer"
import {evaluate, getEmptyCells, getWinner} from "./utils"


// That is what is in the fucking grid
// export const DRAW = 0

export const PLAYER_X = 1

export const PLAYER_O = 2


export const HUMAN = -1
export const COMP = +1


export function minmax(grid, depth, player) {   
    if (depth === 9) {
        console.log("b")
    }

    let best = []

    if (player === COMP) {
        best = [-1,-1, -Infinity]
    } else {
        best = [-1,-1, +Infinity]
    }

    const winner = getWinner(grid)
 
    if (depth === 0 || winner) {
        let score = evaluate(winner)
        // The best move is "no move" hence the -1 
        return [-1,-1,score]
    }

    const emptyCells = getEmptyCells(grid)

    for (const emptycell of emptyCells) {
        const gridCopy = grid.map(row => [...row])
        
        const [x, y] = emptycell

        // Make the move
        gridCopy[x][y] = player

        let ret = minmax(gridCopy, depth - 1, -player)

        gridCopy[emptycell[0]][emptycell[1]] = null

        ret[0] = x
        ret[1] = y

        if (player === COMP) {
            if (ret[2] > best[2]) {
                best = [...ret]
            }
        } else {
            if (ret[2] < best[2]) {
                best = [...ret]
            }
        }
    }
    
    return best

    // What we need todo
    // grid[row][col]

    // Faut retaper ce bout de code aussi
    // for (const idx of emptyIdx) {
        // const gridCopy = [...grid]

        // // IA move
        // gridCopy[idx] = COMP

        // let ret = minmax(gridCopy, depth, -player)


    //     gridCopy[idx] = null
    //     ret[0] = idx

    //     if (player === COMP) {
    //         if (ret[1] > best[1]) {
    //             best = ret
    //         }
    //     } else {
    //         if (ret[1] < best[1]) {
    //             best = ret
    //         }
    //     }
    // }

    // return best
}


export function getAiMove(grid) {
    let bestScore = -Infinity
	let bestMove

    const emptyIdx = getEmptyIndexes(grid)
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