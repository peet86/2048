import sampleSize from 'lodash/sampleSize'
import {
	createEmptyMatrix,
	zeroIndexes,
	arrayToMatrix,
} from './utils'

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
	const moveMachine = () => {
		// get all the zero items
		const flatMatrix = matrix.flat()
		const zeros = zeroIndexes(flatMatrix) 

		// check lost? 

		// select two random zero indexes and update the values in the matrix with 
		sampleSize(zeros, 2).map((move) => {
			flatMatrix[move] = 2
		})

		matrix = arrayToMatrix(flatMatrix, size)

		render()
		// next: wait for user 
	}

	// user can move the board 
	const moveUser = (direction) => {

		// rotate matrix

		// merge columns 

		// rotate it back 

		// render
		render()

		// next: machine
		moveMachine()
	}


	// game lost
	const isLost = () => {
		// no more cells left to merge
		// no more zeros left in the matrix 
	}

	// game won
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

export default Game2048