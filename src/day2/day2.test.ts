import { readFile } from "../index";
import { day2_1, day2_2 } from "./day2";

const testData = readFile("../data/day2/test.txt")
const inputData = readFile("../data/day2/input.txt")

test("day2-1", (): void => {
    expect(day2_1(testData)).toBe(150)
    expect(day2_1(inputData)).toBe(1989014)
})

test("day2-2", (): void => {
    console.log('day2-2 test')
    expect(day2_2(testData)).toBe(900)
    expect(day2_2(inputData)).toBe(2006917119)
})
