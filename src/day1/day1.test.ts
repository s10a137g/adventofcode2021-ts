import { readFile } from "../index";
import { day1_1, day1_2 } from "./day1";

const testData1 = readFile("../data/day1/day1-test.txt")
const testData2 = readFile("../data/day1/day1-2-test.txt")
const inputData1 = readFile("../data/day1/input.txt")

test("day1-1", (): void => {
    expect(day1_1(testData1)).toBe(7)
    expect(day1_1(inputData1)).toBe(1448)
})

test("day1-2", (): void => {
    console.log('day1-2 test')
    expect(day1_2(testData2)).toBe(5)
    expect(day1_2(inputData1)).toBe(1471)
})
