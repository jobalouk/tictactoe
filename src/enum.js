import { PLAYER_O, PLAYER_X } from "./minmax"

export const PLAYER = "X"
export const IA_PLAYER = "O"

// An enum for the next turn in our game
export const NEXT_TURN = {
    [PLAYER_X]: PLAYER,
    [PLAYER_O]: IA_PLAYER,
  }
  


export const GAME_STATUS_TEXT = {
    inProgress: () => null,
    success: turn => `${turn} won!`,
  }
  