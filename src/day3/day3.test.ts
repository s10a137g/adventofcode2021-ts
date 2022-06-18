import { readFile } from '../index'
import { day3_1, day3_2 } from './day3'

const testData = readFile('../data/day3/test.txt')
const inputData = readFile('../data/day3/input.txt')

test('day3-1', (): void => {
  expect(day3_1(testData)).toBe(198)
  expect(day3_1(inputData)).toBe(4139586)
})

test('day3-2', (): void => {
  console.log('day3-2 test')
  expect(day3_2(testData)).toBe(230)
  expect(day3_2(inputData)).toBe(1800151)
})
