import {
  STATUS_PLAYING,
  STATUS_WON,
  STATUS_LOST,
  STATUS_IDLE,
}
from './constants'

import {
  createEmptyMatrix,
  arrayToMatrix,
} from './utils'

import {
  has2048,
  hasZerosLeft,
  getRandomZeroPositions,
  rotateMatrix,
  mergeItems,
  generateValue
}
from './helpers'

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

  // external rendering
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

  const moveMachine = () => {
    const matrix = state.flatMatrix

    const randomPositions = getRandomZeroPositions(matrix)
    randomPositions.map((position) => {
      matrix[position] = generateValue(level)
    })

    state.flatMatrix = matrix

    render()

    // next move: wait for user 
  }


  const moveUser = (direction) => {
    const rotatedMatrix = rotateMatrix(state.matrix, direction)
    rotatedMatrix.map((col) => mergeItems(col))

    state.matrix = rotateMatrix(rotatedMatrix, direction, true) // rotate back
    state.status = determineStatus()

    render()

    // next move:
    moveMachine()
  }

  // start: init the matrix, machine moves first
  state.matrix = createEmptyMatrix(size)
  state.status = STATUS_PLAYING
  moveMachine()

  // expose move 
  return {
    moveBoard: moveUser
  }
}

export default Game2048