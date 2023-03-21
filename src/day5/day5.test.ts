import { readFile } from '../index'
import { day5_1 } from './day5'

const testData = readFile('../data/day5/test.txt')

test('day5-1', (): void => {
  expect(day5_1(testData)).toBe(5)
})
