// Generic Utility Functions 
 
export const createEmptyMatrix = (size) => Array(size).fill(Array(size).fill(0))

export const arrayToMatrix = (array, size) => array.reduce((rows, key, index) => (index % size == 0 ? rows.push([key]) : rows[rows.length - 1].push(key)) && rows, []);

export const zeroIndexes = (array) => array.reduce((result, value, index) => {
	if (value === 0) result.push(index)
	return result
}, [])

export const randomArrayItems = (array, n) => array.sort(() => .5 - Math.random()).slice(0, n)

export const rotateMatrixCW = (matrix) => matrix[0].map((val, index) => matrix.map(row => row[index]).reverse())

export const rotateMatrixCCW = (matrix) => matrix[0].map((val, index) => matrix.map(row => row[row.length - 1 - index]))

export const flipMatrixCols = (matrix) => matrix.map((col) => col.reverse())
