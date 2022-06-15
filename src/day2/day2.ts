
export const day2_1 = (args: string[]): number => {
    // INPUTデータを行ごとに配列に変換
    const argArray = args
        .map(arg => arg.split(" "))
        .filter(v => v.length === 2)


    // [配列の先頭文字列ごとに、値を集計]
    const initialValue = [0, 0, 0]
    const [forwardV, downV, upV] =
        argArray.reduce(([forwardV, downV, upV], [pos, value]) => {
            // 水平方向の値
            if (pos === "forward") {
                return [forwardV + parseInt(value), downV, upV]
            }

            // 深さ(増加)の値
            if (pos === "down") {
                return [forwardV, downV + parseInt(value), upV]
            }

            // 深さ(増加)の値
            if (pos === "up") {
                return [forwardV, downV, upV + parseInt(value)]
            }

            return [forwardV, downV, upV]
        }, initialValue)

    // 水平方向の値 × 深さを返す
    return forwardV * (downV - upV)
}

export const day2_2 = (args: string[]): number => {
    // INPUTデータを行ごとに配列に変換
    const argArray = args
        .map(arg => arg.split(" "))
        .filter(v => v.length === 2)


    // aimの値を計算する必要があるため、走査中に方向を判定。
    // 操作中にaimの値を加算する
    let aim = 0
    const [horizon, depth] =
        argArray.reduce(([horizon, depth], [pos, value]) => {

            if (pos === "forward") {
                return [horizon + parseInt(value), depth + (parseInt(value) * aim)]
            }

            if (pos === "up") {
                aim -= parseInt(value)
            }

            if (pos === "down") {
                aim += parseInt(value)
            }

            return [horizon, depth]

        }, [0, 0])

    return horizon * depth
}
