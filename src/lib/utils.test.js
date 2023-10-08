import {
	expect,
	test,
	describe
} from 'vitest'

import {
	createEmptyMatrix,
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

})