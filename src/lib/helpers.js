import {
  DIRECTION_LEFT,
  DIRECTION_UP,
  DIRECTION_RIGHT,
  DIRECTION_DOWN,
  LEVEL_PRO
}
from './constants'

import {
  zeroIndexes,
  rotateMatrixCW,
  rotateMatrixCCW,
  randomSample,
  flipMatrixCols
} from './utils'

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
