import { hello } from "./hello";

test('hello', (): void => {
    const response: string = hello('Taro');
    expect(response).toBe('Hello, Taro');
})
