import { readFile } from '../index'
import { day4_1, day4_2 } from './day4'

const testData = readFile('../data/day4/test.txt')
const inputData = readFile('../data/day4/input.txt')

test('day4-1', (): void => {
  expect(day4_1(testData)).toBe(4512)
  expect(day4_1(inputData)).toBe(25410)
})

test('day4-2', (): void => {
  console.log('day4-2 test')
  expect(day4_2(testData)).toBe(1924)
  expect(day4_2(inputData)).toBe(2730)
})
