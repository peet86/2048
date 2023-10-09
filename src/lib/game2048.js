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
		rotatedMatrix.map((col) => mergeItems(col))
		matrix = rotateMatrix(rotatedMatrix, direction, true)
		console.log(direction, rotatedMatrix)

		// todo check won

		// render
		render()

		// next move:
		moveMachine()
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


// rotation and revers rotation makes easier and cheaper to merge items.. all 
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

export * from './constants'; // re-export constants
export default Game2048