import {
  createEmptyMatrix,
  zeroIndexes,
  arrayToMatrix,
  rotateMatrixCW,
  rotateMatrixCCW,
  randomSample,
  flipMatrixCols
} from './utils'

import {
  DIRECTION_LEFT,
  DIRECTION_UP,
  DIRECTION_RIGHT,
  DIRECTION_DOWN,
  STATUS_PLAYING,
  STATUS_WON,
  STATUS_LOST,
  STATUS_IDLE,
  LEVEL_PRO
}
from './constants'

const Game2048 = (size, level, renderCb) => {

  // mini-state-store 
  const state = {
    s: STATUS_IDLE,
    m: null,
    fm: null,
    get status() {
      return this.s
    },
    get matrix() {
      return this.m
    },
    get flatMatrix() {
      return this.fm
    },
    set matrix(matrix) {
      this.m = matrix
      this.fm = matrix.flat()
    },
    set flatMatrix(flatMatrix) {
      this.fm = flatMatrix
      this.m = arrayToMatrix(flatMatrix, size)
    },
    set status(status) {
      this.s = status
    },
  }

  const determineStatus = () => {

    if (has2048(state.flatMatrix)) return STATUS_WON

    if (hasZerosLeft(state.flatMatrix, level)) return STATUS_LOST

    return STATUS_PLAYING
  }

  // call external rendering
  const render = () => {
    if (renderCb) {
      const {
        matrix,
        status
      } = state
      renderCb({
        matrix,
        status
      })
    }
  }

  // get two random zero item's index and update the values in the matrix with 2
  const moveMachine = () => {
    const matrix = state.flatMatrix

    const randomPositions = getRandomZeroPositions(matrix)
    randomPositions.map((position) => {
      matrix[position] = generateValue(level)
    })

    state.flatMatrix = matrix

    render()
    // next move: 
    // wait for user 
  }


  // user can move the board to 4 directions, equal numbers will be summarized
  const moveUser = (direction) => {
    const rotatedMatrix = rotateMatrix(state.matrix, direction)
    rotatedMatrix.map((col) => mergeItems(col))

    state.matrix = rotateMatrix(rotatedMatrix, direction, true) // rotate back
    state.status = determineStatus()

    render()

    // next move:
    moveMachine()
  }

  // init the matrix, machine moves first
  state.matrix = createEmptyMatrix(size)
  state.status = STATUS_PLAYING
  moveMachine()

  // expose move 
  return {
    moveBoard: moveUser
  }
}

export default Game2048

export const has2048 = (matrix) => matrix.includes(2048)

export const hasZerosLeft = (matrix, level) => ((zeroIndexes(matrix).length) < (level === LEVEL_PRO ? 2 : 1))

export const getRandomZeroPositions = (flatMatrix, level) => {
  const zIndexes = zeroIndexes(flatMatrix)
  return randomSample(zIndexes, level === LEVEL_PRO ? 2 : 1)
}

export const rotateMatrix = (matrix, direction, reverse = false) => {
  if (direction === DIRECTION_RIGHT) return flipMatrixCols(matrix)
  if (direction === DIRECTION_UP) return reverse ? rotateMatrixCW(matrix) : rotateMatrixCCW(matrix)
  if (direction === DIRECTION_LEFT) return matrix
  if (direction === DIRECTION_DOWN) return reverse ? rotateMatrixCCW(matrix) : rotateMatrixCW(matrix)
}

export const mergeItems = (a) => {
  let index = 0;
  for (let currentIndex = 1; currentIndex < a.length; currentIndex++) {

    if (a[currentIndex] == 0) {
      continue;
    } else if (a[index] == 0) {
      a[index] = a[currentIndex];
      a[currentIndex] = 0;
    } else if (a[index] === a[currentIndex]) {
      a[index] += a[currentIndex];
      a[currentIndex] = 0;
    } else if (index + 1 < currentIndex) {
      currentIndex--;
    }
    index += !!a[index];
  }
  return a;
}

export const generateValue = (level) => {
  if (level === LEVEL_PRO) {
    return Math.random() <= .7 ? 2 : 4 // pros will get 2 or 4 70/30%
  }
  return 2 // normies
}

export * from './constants'; // re-export constants