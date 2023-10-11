import {
  expect,
  it,
  describe,
  vi
} from 'vitest'

import {
  mergeItems,
  generateValue,
  LEVEL_ROOKIE,
  LEVEL_PRO
} from './game2048'

describe('game2048', () => {

  describe('mergeItems', () => {

    it('should merge equal numbers', () => {
      expect(mergeItems([2, 2])).toStrictEqual([4, 0])
    })

    it('should not merge two different numbers', () => {
      expect(mergeItems([1, 2])).toStrictEqual([1, 2])
    })

    it('should overwrite zeros and shift left', () => {
      expect(mergeItems([0, 2])).toStrictEqual([2, 0])
    })

    it('should merge first pair and fill up with 0', () => {
      expect(mergeItems([2, 2, 2])).toStrictEqual([4, 2, 0])
    })

    it('should ignore 0s and merge to left', () => {
      expect(mergeItems([2, 0, 2])).toStrictEqual([4, 0, 0])
    })

  })

  describe('generateValue', () => {

    it('should generate 2 on rookie level', () => {
      expect(generateValue(LEVEL_ROOKIE)).toBe(2)
    })

    it('should generate 2 on pro level when random is < 0.7', () => {
      vi.spyOn(global.Math, 'random').mockImplementation(() => 0.5)
      expect(generateValue(LEVEL_PRO)).toBe(2)
    })

    it('should generate 4 on pro level when random is > 0.7', () => {
      vi.spyOn(global.Math, 'random').mockImplementation(() => 0.9)
      expect(generateValue(LEVEL_PRO)).toBe(4)
    })

  })

})