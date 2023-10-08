import sampleSize from 'lodash/sampleSize'
import {
	createEmptyMatrix,
} from './utils'

const Game2048 = (boardSize, renderCb) => {
	let matrix = createEmptyMatrix(boardSize)
	let status = 'playing'

	// call external rendering
	const render = () => {
		if (renderCb) renderCb({
			matrix,
			status
		})
	}


	// machine can add 2s
	const moveMachine = () => {
		// check if any zero cells left

		// add 2s to zero cells

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