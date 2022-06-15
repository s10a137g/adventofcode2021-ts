
export const day2_1 = (args: string[]): number => {
    // INPUTデータを行ごとに配列に変換
    const argArray = args
        .map(arg => arg.split(" "))
        .filter(v => v.length === 2)


    // [配列の先頭文字列ごとに、値を集計]
    // 水平方向の値
    const horizonVal = argArray
        .filter(v => v[0] == 'forward')
        .reduce((acc, v) => acc + parseInt(v[1]), 0)

    // 深さ(減少)の値
    const depthUpVal = argArray
        .filter(v => v[0] == 'up')
        .reduce((acc, v) => acc + parseInt(v[1]), 0)


    // 深さ(増加)の値
    const depthDownVal = argArray
        .filter(v => v[0] == 'down')
        .reduce((acc, v) => acc + parseInt(v[1]), 0)


    // 水平方向の値 × 深さを返す
    return horizonVal * (depthDownVal - depthUpVal)
}
