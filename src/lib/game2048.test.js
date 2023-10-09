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
			expect(mergeItems([2, 2])).toStrictEqual([4, 0])
		})

		test('should not merge two different numbers', () => {
			expect(mergeItems([1, 2])).toStrictEqual([1, 2])
		})

		test('should overwrite zeros and shift left', () => {
			expect(mergeItems([0, 2])).toStrictEqual([2, 0])
		})

		test('should merge first pair and fill up with 0', () => {
			expect(mergeItems([2, 2, 2])).toStrictEqual([4, 2, 0])
		})

		test('should ignore 0s and merge to left', () => {
			expect(mergeItems([2, 0, 2])).toStrictEqual([4, 0, 0])
		})

	})

})