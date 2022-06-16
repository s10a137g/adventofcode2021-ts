export const day3_1 = (args: string[]): number => {
    // INPUTデータを行ごとに配列に変換
    const argArray = args.map(arg => arg.split(""))

    // インデックスごとの配列になるように、INPUTデータ配列を変換
    const convertArray: string[][] = []
    for (let i = 0; i < argArray.length; i++) {
        for (let j = 0; j < argArray[i].length; j++) {
            if (!convertArray[j]) {
                convertArray.push([argArray[i][j]])
            } else {
                convertArray[j].push(argArray[i][j])
            }
        }
    }

    // 各INDEX行ごとに'0', '1' の要素数を集計し、gamma, epsilonの値を求める
    const [gamma, epsilon] = convertArray.reduce(([gammaArr, epsilonArr], row) => {
        const zeroCount = row.filter(v => v === '0').length
        const oneCount = row.filter(v => v === '1').length

        return oneCount > zeroCount
            ? [gammaArr.concat('1'), epsilonArr.concat('0')]
            : [gammaArr.concat('0'), epsilonArr.concat('1')]
    }, ['', ''])


    return parseInt(gamma, 2) * parseInt(epsilon, 2)
}

export const day3_2 = (args: string[]): number => {
    // INPUTデータを行ごとに配列に変換
    const argArray = args.map(arg => arg.split(""))


    const o2 = recursiveFindRating(argArray, 0, 'oxygen')
    const co2 = recursiveFindRating(argArray, 0, 'co2')

    return parseInt(o2.flat().join(''), 2) * parseInt(co2.flat().join(''), 2)
}

/**
 * 再帰的にrateを満たす配列を取得する
 *
 * @param targetArr
 * @param index
 * @param gasType
 */
export const recursiveFindRating = (targetArr: string[][], index: number, gasType: string): string[][] => {

    if (targetArr.length === 1 || !targetArr[0][index]) {
        return targetArr
    }

    return recursiveFindRating(findRating(targetArr, index, gasType), index + 1, gasType)
}

export const findRating = (targetArr: string[][], index: number, gasType: string): string[][] => {
    const indexArr = targetArr.map(v => v[index])

    const initialValue = [0, 0]
    const [zeroCount, oneCount] = indexArr.reduce(([zeroCount, oneCount], v) => {
        return v === '0' ? [zeroCount + 1, oneCount] : [zeroCount, oneCount + 1]
    }, initialValue)


    const targetNum = gasType === 'oxygen'
        ? oneCount >= zeroCount ? '1' : '0'
        : oneCount >= zeroCount ? '0' : '1'

    return targetArr.filter(v => v[index] === targetNum)
}
