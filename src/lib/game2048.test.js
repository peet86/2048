import {
	expect,
	test,
	describe
} from 'vitest'

import {
	mergeItems,
} from './game2048'

describe('game2048', () => {

	describe('mergeItems', () => {

		test('should merge equal numbers', () => {
			expect(mergeItems([2, 2])).toStrictEqual([0, 4])
		})

		test('should not merge 0 numbers', () => {
			expect(mergeItems([2, 0, 2])).toStrictEqual([0, 2, 2])
		})

		test('should not merge two different numbers', () => {
			expect(mergeItems([0, 2])).toStrictEqual([0, 2])
		})

		test('should overwrite zeros - move numbers right', () => {
			expect(mergeItems([2, 0])).toStrictEqual([0, 2])
		})

		test('should not merge two different numbers', () => {
			expect(mergeItems([0, 2])).toStrictEqual([0, 2])
		})

	})

})