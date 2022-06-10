// 同期的にバッファを取得
import fs from "fs";
import path from "path";

export const readFile = (dirPath: string): string[] => {
    return fs.readFileSync(path.resolve(__dirname, dirPath), 'utf-8').toString().split(/\r\n|\n/)
}
