import { COMP, HUMAN } from "./minmax"

export const DRAW = 0
export const SQUARE_DIMS = 100
export const DIMENSIONS = 3


export function getWinner(state, player) {
  const gameIsOver = getGameOver(state, player)
  
  if (gameIsOver) {
    return player
  } else {
    // If all non empty cells and no winner == DRAW TODO
    return "No winner for now"
  }
}


export function getGameOver(state, player) {
  const winState = [
    [state[0][0], state[0][1], state[0][2]],
    [state[1][0], state[1][1], state[1][2]],
    [state[2][0], state[2][1], state[2][2]],
    [state[0][0], state[1][0], state[2][0]],
    [state[0][1], state[1][1], state[2][1]],
    [state[0][2], state[1][2], state[2][2]],
    [state[0][0], state[1][1], state[2][2]],
    [state[2][0], state[1][1], state[0][2]],
  ];

  return winState.some(line => line.every(cell => cell === player));
}


export function getEmptyCells(state) {
  // save position of empty cells
  const cells = []

  state.forEach((row, x) => {
    row.forEach((cell, y) => {
      if (cell === 0) {
        cells.push([x, y])
      }
    })
  })
  
  return cells
}


export function emptyCells(state) {
	var cells = [];

	for (var x = 0; x < 3; x++) {

		for (var y = 0; y < 3; y++) {

			if (state[x][y] === 0) {
        cells.push([x, y]);
      }

		}
	}
	return cells;
}


export function evaluateScore(winner) {
  let score = 0

  // personne ne gagne je crois?? TODO
  if (winner === COMP) {
    score = +1
  }
  else if (winner === HUMAN) {
    score = -1
  } else {
    score = 0
  }  
  return score
}
