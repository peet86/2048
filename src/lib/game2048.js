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
	STATUS_IDLE
}
from './constants'

const Game2048 = (size, renderCb) => {

	// mini-state-store 
	const state ={
		s: STATUS_IDLE,
		m: null,
		fm: null,

		// getters
		get status(){
			return this.s
		},
		get matrix(){
			return this.m
		},
		get flatMatrix(){
			return this.fm 
		},

		// state mutators 
		set matrix(matrix){
			const flatMatrix = matrix.flat()
			this.m = matrix
			this.fm = flatMatrix
			this.status = determineStatus(flatMatrix)
		},
		set flatMatrix(flatMatrix){
			this.fm = flatMatrix
			this.matrix = arrayToMatrix(flatMatrix, size)
			this.status = determineStatus(flatMatrix)
		},
		set status(status){
			this.s = status
		},
	}
	
	const determineStatus = (flatMatrix) =>{
		// any item = 2048?
		if(flatMatrix.includes(2048)) return STATUS_WON
			  
		// any zeros left for the machine to move or gridlock?
		if(zeroIndexes(flatMatrix) <= 2) return STATUS_LOST

		// keep playing
		return STATUS_PLAYING
	}

	// call external rendering
	const render = () => {
		if (renderCb){
			const {matrix, status} = state
			renderCb({
				matrix,
				status
			})
		}
	}

	// machine can add 2 or 4
	// get two random zero item's index and update the values in the matrix with random 2 or 4 
	const moveMachine = () => {
		const flatMatrix = state.flatMatrix
		const zIndexes = zeroIndexes(flatMatrix)
		const zPositions = randomArrayItems(zIndexes, 2)
		zPositions.map((position) => {
			flatMatrix[position] = Math.random() <= 0.5 ? 2 : 4
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