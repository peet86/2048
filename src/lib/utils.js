// Game 2048 Utils

export const createEmptyMatrix = (size) => Array(size).fill(Array(size).fill(0))

export const arrayToMatrix = (array, size) => array.reduce((rows, key, index) => (index % size == 0 ? rows.push([key]) : rows[rows.length - 1].push(key)) && rows, []);

export const zeroIndexes = (array) => array.reduce((result, value, index) => {
	if (value === 0) result.push(index)
	return result
}, [])

