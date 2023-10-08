import {
	expect,
	test,
	describe
} from 'vitest'

import {
	createEmptyMatrix,
	zeroIndexes
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

})