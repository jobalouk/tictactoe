import {getEmptyCells} from './utils'
import {COMP, HUMAN, minmax} from './minmax'


// Test suite

describe("Test minmax", () => {
  test("minmax test", () => {
    const testGrid = [[HUMAN, 0, 0], [0, 0, 0], [0, 0, 0]]

    const r = minmax(testGrid, getEmptyCells(testGrid).length, COMP)

    console.log("minimax score", r)
  })
})