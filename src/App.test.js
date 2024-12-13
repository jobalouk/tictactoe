import {getEmptyCells, getWinner} from './utils'
import {COMP, HUMAN, minmax} from './minmax'


// Test suite

describe('Test getWinner function', () => {
  test('Should return HUMAN constant value : 1', () => {
    const testGrid = [HUMAN, HUMAN, HUMAN, null, null, null, null, null, null]

    const result = getWinner(testGrid)
    expect(result).toBe(HUMAN);
  })

  test('Should return COMPUTER constant value : 1', () => {
    const testGrid = [COMP, COMP, COMP, null, null, null, null, null, null]
    const result = getWinner(testGrid)    
    expect(result).toBe(COMP);
  })
})

describe('Test minmax??', () => {
  test("should return something I don't know", () => {
    // const grid = [HUMAN, null, null, null, null, null, null, null, null]

    const grid = [[HUMAN, null, null], [null, null, null], [null, null, null]]

    const i = getEmptyCells(grid)
    const depth = i.length
    console.log(i)

    console.log("depth", depth)
    // const ret = minmax(grid, depth, COMP)

    // console.log("score", ret)
    // expect(score).toBe(HUMAN);
  })

})

