import { PLAYER } from "./enum"
import { COMP, HUMAN, PLAYER_O, PLAYER_X } from "./minmax"

export const DRAW = 0
export const SQUARE_DIMS = 100
export const DIMENSIONS = 3

export function generateGrid(len, mapper) {
  // generate 1 D array, use css to make a grid 3 x 3
  // add unit test?? TODO
  return Array(len).fill().map(mapper)
}


export const flatten = array => array.reduce((acc, cur) => [...acc, ...cur], [])


export function getWinner(grid) {
  const winningCombos = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ]
  let ret = null
  
  winningCombos.forEach((e, i) => {
    if (
      grid[e[0]] !== null &&
      grid[e[0]] === grid[e[1]] &&
      grid[e[0]] === grid[e[2]]
    ) {
      ret = grid[e[0]] // Represented by number. Check constante PLAYER_X and PLAUYER_O.
    } else if (ret === null && getEmptyCells(grid).length === 0) {
      ret = DRAW
    }
  })

  return ret
}


export function checkForWin(flatGrid) {
  // I will use the points on a compass as my variable names
  const [nw, n, ne, w, c, e, sw, s, se] = flatGrid

  return (
    checkThree(nw, n, ne) ||
    checkThree(w, c, e) ||
    checkThree(sw, s, se) ||
    checkThree(nw, w, sw) ||
    checkThree(n, c, s) ||
    checkThree(ne, e, se) ||
    checkThree(nw, c, se) ||
    checkThree(ne, c, sw)
  )
}


export function checkThree(a, b, c) {
  if (!a || !b || !c) return false
  return a === b && b === c
}


export function checkForDraw(flatGrid) {
  return (
    !checkForWin(flatGrid) &&
    flatGrid.filter(Boolean).length === flatGrid.length
  )
}


// export function getEmptyIndexes(grid) { TODO
//     let ret = []

//   for (const rows of grid) {
//     const filteredList = rows.filter((v, index) => {
//       return v === null
//     })

//     ret.push(filteredList)
//   }

//   return ret
// }


export function getEmptyCells(state) {
  // save position of empty cells
  const cells = []

  state.forEach((row, x) => {
    row.forEach((cell, y) => {
      if (cell === null) {
        cells.push([x, y])
      }
    })
  })
  
  return cells
}


export function evaluate(player) {
  let ret = 0

  if (player === PLAYER_X) {
    ret = HUMAN
  } else if (player === PLAYER_O) {
    ret = COMP
  }

  return ret  
}

