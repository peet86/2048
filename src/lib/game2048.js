const Game2048 = (boardSize, renderCb) => {
	let matrix = null

	const init = () => {
		console.log("init", boardSize)
		matrix = Array(boardSize).fill(Array(boardSize).fill(0))
		render()
	}

	const moveTiles = (direction) => {
		console.log('move', direction)
	}

	const render = () => {
		if (renderCb) renderCb(matrix)
	}

	init()

	return {
		moveTiles,
	}
}

export default Game2048