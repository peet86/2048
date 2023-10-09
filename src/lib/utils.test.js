import {
	expect,
	test,
	describe
} from 'vitest'

import {
	createEmptyMatrix,
	zeroIndexes,
	arrayToMatrix,
	rotateMatrixCW,
	rotateMatrixCCW,
	mergeItems,
	randomArrayItems,
	flipMatrixCols
} from './utils'

describe('utils', () => {

	describe('createEmptyMatrix', () => {
		test('should create 2x2 empty matrix filled with zeros', () => {

			expect(createEmptyMatrix(2)).toStrictEqual([
				[0, 0],
				[0, 0]
			])
		})

		test('should create 4x4 empty matrix filled with zeros', () => {

			expect(createEmptyMatrix(4)).toStrictEqual([
				[0, 0, 0, 0],
				[0, 0, 0, 0],
				[0, 0, 0, 0],
				[0, 0, 0, 0]
			])
		})
	})

	describe('zeroIndexes', () => {

		test('should return with zero items from an array', () => {
			expect(zeroIndexes([1, 0, 2])).toStrictEqual([1])
		})

		test('should return with empty array when no zeros found', () => {
			expect(zeroIndexes([1, 2, 3])).toStrictEqual([])
		})
		test('should return with empty array when no zeros found', () => {
			expect(zeroIndexes([1, 2, 3])).toStrictEqual([])
		})
	})

	describe('arrayToMatrix', () => {

		test('should return with a multidimensional 2x2 array', () => {
			expect(arrayToMatrix([0, 1, 2, 3], 2)).toStrictEqual([
				[0, 1],
				[2, 3]
			])
		})

		test('should return with a multidimensional 3x3 array ', () => {
			expect(arrayToMatrix([0, 1, 2, 3, 4, 5, 6, 7, 8], 3)).toStrictEqual([
				[0, 1, 2],
				[3, 4, 5],
				[6, 7, 8]
			])
		})
	})

	describe('rotateMatrixCW', () => {

		test('should rotate the matrix right', () => {
			expect(rotateMatrixCW([
				[0, 1],
				[2, 3]
			])).toStrictEqual([
				[2, 0],
				[3, 1]
			])
		})

	})

	describe('rotateMatrixCCW', () => {

		test('should rotate the matrix left', () => {
			expect(rotateMatrixCCW([
				[0, 1],
				[2, 3]
			])).toStrictEqual([
				[1, 3],
				[0, 2]
			])
		})

	})

	describe('flipMatrixRows', () => {

		test('should reverse all the cols', () => {
			expect(flipMatrixCols([
				[0, 1],
				[2, 3]
			])).toStrictEqual([
				[1, 0],
				[3, 2]
			])
		})

	})

	describe('randomArrayItems', () => {

		test('should return 1 random number', () => {
			expect(randomArrayItems([1, 2])).toHaveLength(1)
		})

		test('should return 2 random numbers when sample is 2', () => {
			expect(randomArrayItems([1, 2], 2)).toHaveLength(2)
		})

	})



})