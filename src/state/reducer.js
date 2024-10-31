import { flatten, checkForDraw, checkForWin, generateGrid, emptyIndexes, getWinner } from "../utils"
import { NEXT_TURN } from "../enum"
import { minmax, PLAYER_O, PLAYER_X } from "../minmax"


export function reducer(state, action) {
    if (state.status === 'success' && action.type !== 'RESET') {
      return state
    }

    const nextState = clone(state)

    const { grid, turn } = nextState

    switch (action.type) {
      case 'RESET': 
        return  getInitialState()
      case 'CLICK': 
        const {x} = action.payload

        if (grid[x]) {
          return state
        }

        humanMove(grid, x, turn)

        if (getWinner(grid)) {
          nextState.status = 'success'
          return nextState
        }

        // switch player
        nextState.turn = switchPlayer()[turn]
        
        // We'll add checks for winning or drawing soon
        return nextState
      case "AI_MOVE":
        aiMove(grid, turn)

        if (getWinner(grid)) {
          nextState.status = 'success'
          return nextState
        }
        nextState.turn = switchPlayer()[turn]
        return nextState
      default:
        return state
    }
  }
  

  export const getInitialState = () => ({
    grid: newTicTacToeGrid(),
    status: 'inProgress',
    turn: PLAYER_X,
  })


// Maybe move those functions into utils??

// Simple way to deeply clone an array or object
export const clone = x => JSON.parse(JSON.stringify(x))


const newTicTacToeGrid = () => generateGrid(9, () => null)


export function switchPlayer() {
  return {
    [PLAYER_X]: PLAYER_O,
    [PLAYER_O]: PLAYER_X,
  }
}

export function move(grid, x, turn) {
  if (grid[x] === null) {
    grid[x] = turn
  }
}

// shit code TODO
export function humanMove(grid, x, turn) {
  move(grid, x, turn)
}

export function aiMove(grid, turn) {
  let index = minmax(grid, turn)[1]
  move(grid, index, turn)
}


export function getRandomInt(min, max) {
  min = Math.ceil(min)
  max = Math.floor(max)
  return Math.floor(Math.random() * (max - min + 1)) + min
}