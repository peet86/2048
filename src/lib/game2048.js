import sampleSize from 'lodash'

import {
	createEmptyMatrix,
	zeroIndexes,
	arrayToMatrix,
	rotateMatrixCW,
	rotateMatrixCCW,
	randomArrayItems
} from './utils'

import {
	DIRECTION_LEFT,
	DIRECTION_UP,
	DIRECTION_RIGHT,
	DIRECTION_DOWN
}
from './constants'



const Game2048 = (size, renderCb) => {
	let matrix = createEmptyMatrix(size)
	let status = 'playing'

	// call external rendering
	const render = () => {
		if (renderCb) renderCb({
			matrix,
			status
		})
	}

	// machine can add 2 or 4
	// get two random zero item's index and update the values in the matrix with random 2 or 4 
	const moveMachine = () => {
		const flatMatrix = matrix.flat()
		const indexes = zeroIndexes(flatMatrix)
		const positions = randomArrayItems(indexes, 2) //todo replace with a simple / more performant algo?
		positions.map((position) => {
			flatMatrix[position] = Math.random() <= 0.5 ? 2 : 4
		})

		matrix = arrayToMatrix(flatMatrix, size)

		//todo check lost? 

		render()
		// next move: 
		// wait for user 
	}

	// user can move the board to 4 directions, equal numbers will be summarized
	// rotate matrix according to the direction and summarize columns
	const moveUser = (direction) => {
		const rotatedMatrix = rotateMatrix(matrix, direction)
		console.log(direction, rotatedMatrix)
		rotatedMatrix.map((row) => mergeItems(row))
		matrix = rotateMatrix(rotatedMatrix, direction, true)

		// todo check won

		// render
		render()

		// next move:
		//moveMachine()
	}

	const isLost = () => {
		// no more cells left to merge
		// no more zeros left in the matrix 
	}

	const isWon = () => {
		// at least one item === 2048 
	}


	// start the game and wait for the user
	moveMachine()

	// expose move to ui 
	return {
		moveUser
	}
}

export const rotateMatrix = (matrix, direction, reverse = false) => {
	if (direction === DIRECTION_RIGHT) return matrix
	if (direction === DIRECTION_UP) return reverse ? rotateMatrixCCW(matrix) : rotateMatrixCW(matrix)
	if (direction === DIRECTION_LEFT) return reverse ? rotateMatrixCW(matrix) : rotateMatrixCCW(matrix)
	if (direction === DIRECTION_DOWN) return reverse ? rotateMatrixCCW(rotateMatrixCCW(matrix)) : rotateMatrixCW(rotateMatrixCW(matrix))
}

export const mergeItems = (array) => array.map((item, index) => {
	const nextIndex = index + 1
	const nextItem = nextIndex < array.length ? array[nextIndex] : 0
	if (item === 0) {
		return nextItem
	} else if (item === nextItem) {
		// merged items become zeros
		array[nextIndex] = 0
		return item + nextItem
	} else {
		return item
	}
})

export * from './constants'; // re-export constants
export default Game2048