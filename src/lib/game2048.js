import {
	createEmptyMatrix,
	zeroIndexes,
	arrayToMatrix,
	rotateMatrixCW,
	rotateMatrixCCW,
	randomArrayItems,
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

		// getters
		get status() {
			return this.s
		},
		get matrix() {
			return this.m
		},
		get flatMatrix() {
			return this.fm
		},

		// state mutators 
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
		// any item = 2048?
		if (state.flatMatrix.includes(2048)) return STATUS_WON

		// less zeros left than the numbers the machine would add
		if ((zeroIndexes(state.flatMatrix).length) < (level === LEVEL_PRO ? 2 : 1 )) return STATUS_LOST

		// keep playing
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
		const flatMatrix = state.flatMatrix
		const zIndexes = zeroIndexes(flatMatrix)
		const zPositions = randomArrayItems(zIndexes, level === LEVEL_PRO ? 2 : 1)
		zPositions.map((position) => {
			flatMatrix[position] = generateValue(level)
		})

		state.flatMatrix = flatMatrix

		render()
		// next move: 
		// wait for user 
	}

	// user can move the board to 4 directions, equal numbers will be summarized
	// rotate matrix according to the direction and summarize columns
	const moveUser = (direction) => {
		const rotatedMatrix = rotateMatrix(state.matrix, direction)
		rotatedMatrix.map((col) => mergeItems(col))

		const newMatrix = rotateMatrix(rotatedMatrix, direction, true) // rotate back

		state.matrix = newMatrix
		state.status = determineStatus()
		render()

		// next move:
		moveMachine()
	}

	// init the matrix, machine moves
	state.matrix = createEmptyMatrix(size)
	state.status = STATUS_PLAYING
	moveMachine()

	// expose move 
	return {
		moveBoard: moveUser
	}
}


export const rotateMatrix = (matrix, direction, reverse = false) => {
	if (direction === DIRECTION_RIGHT) return flipMatrixCols(matrix)
	if (direction === DIRECTION_UP) return reverse ? rotateMatrixCW(matrix) : rotateMatrixCCW(matrix)
	if (direction === DIRECTION_LEFT) return matrix
	if (direction === DIRECTION_DOWN) return reverse ? rotateMatrixCCW(matrix) : rotateMatrixCW(matrix)
}

export const mergeItems = (array) => {
	let index = 0;
	for (let currentIndex = 1; currentIndex < array.length; currentIndex++) {

		if (array[currentIndex] == 0) {
			continue;
		} else if (array[index] == 0) {
			array[index] = array[currentIndex]; // merge
			array[currentIndex] = 0; // merged items become zeros 
		} else if (array[index] === array[currentIndex]) {
			array[index] += array[currentIndex]; // merge
			array[currentIndex] = 0; // merged become zeros 
		} else if (index + 1 < currentIndex) {
			currentIndex--; // move back
		}
		index += !!array[index];
	}
	return array;
}

export const generateValue = (level) => {
	if (level === LEVEL_PRO) {
		return Math.random() <= .7 ? 2 : 4 // pros will get 2 or 4 70/30%
	}
	return 2 // normies
}

export * from './constants'; // re-export constants
export default Game2048