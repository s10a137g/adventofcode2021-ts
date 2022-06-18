export const day2_1 = (args: string[]): number => {
  // INPUTデータを行ごとに配列に変換
  const argArray = args.map(arg => arg.split(' '))


  // [配列の先頭文字列ごとに、値を集計]
  const initialValue = [0, 0, 0]
  const [forwardV, downV, upV] =
    argArray.reduce(([forwardV, downV, upV], [direction, value]) => {
      // 水平方向の値
      if (direction === 'forward') {
        return [forwardV + parseInt(value), downV, upV]
      }

      // 深さ(増加)の値
      if (direction === 'down') {
        return [forwardV, downV + parseInt(value), upV]
      }

      // 深さ(増加)の値
      if (direction === 'up') {
        return [forwardV, downV, upV + parseInt(value)]
      }

      return [forwardV, downV, upV]
    }, initialValue)

  // 水平方向の値 × 深さを返す
  return forwardV * (downV - upV)
}

export const day2_2 = (args: string[]): number => {
  // INPUTデータを行ごとに配列に変換
  const argArray = args.map(arg => arg.split(' '))


  // aimの値を計算する必要があるため、走査中に方向を判定。
  // 操作中にaimの値を加算する
  let aim = 0
  const [horizon, depth] =
    argArray.reduce(([horizonV, depthV], [direction, value]) => {

      // 水平方向と深さ方向の進行量を計算
      if (direction === 'forward') {
        return [horizonV + parseInt(value), depthV + (parseInt(value) * aim)]
      }

      // 標的(aim)を増加
      if (direction === 'down') {
        aim += parseInt(value)
      }

      // 標的(aim)を減少
      if (direction === 'up') {
        aim -= parseInt(value)
      }

      return [horizonV, depthV]

    }, [0, 0])

  return horizon * depth
}
