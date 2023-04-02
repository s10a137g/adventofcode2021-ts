import { readFile } from '../index'
import { day5_1, day5_2 } from './day5'

const testData = readFile('../data/day5/test.txt')
const inputData = readFile('../data/day5/input.txt')

test('day5-1', (): void => {
  expect(day5_1(testData)).toBe(5)
  expect(day5_1(inputData)).toBe(5147)
})

test('day5-2', (): void => {
  expect(day5_2(testData)).toBe(12)
  expect(day5_2(inputData)).toBe(16925)
})
