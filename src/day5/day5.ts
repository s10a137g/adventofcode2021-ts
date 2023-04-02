export const day5_1 = (args: string[]): number => {
  // ステップ1: 入力データの解析
  const lineSegmentArray = parseInput(args)
  // ステップ2: 座標系の作成
  const gridSize = 1000
  const grid = createGrid(gridSize)

  // ステップ3: 線分を座標系にマッピング
  mapLineSegmentsToGrid(lineSegmentArray, grid)

  // ステップ4: 重なる線分の数の計算結果を出力
  return countOverlappingPoints(grid)
}

export const day5_2 = (args: string[]): number => {
  // ステップ1: 入力データの解析
  const lineSegmentArray = parseInput(args)
  // ステップ2: 座標系の作成
  const gridSize = 1000
  const grid = createGrid(gridSize)

  // ステップ3: 線分を座標系にマッピング(斜め線も考慮)
  mapLineSegmentsWithDiagonalsToGrid(lineSegmentArray, grid)

  // ステップ4: 重なる線分の数の計算結果を出力
  return countOverlappingPoints(grid)
}
export type LineSegment = {
  x1: number
  y1: number
  x2: number
  y2: number
}

/**
 * 入力データを解析する
 *
 * @param input 入力データ: 「x1,y1 -> x2,y2」のフォーマット
 * @return 線分情報リスト
 */
export function parseInput(input: string[]): LineSegment[] {
  const lineSegments: LineSegment[] = []

  input
    .filter((line) => line) // 空文字列またはundefinedの行を削除
    .forEach((line) => {
      const [coords1, coords2] = line.split(' -> ')
      const [x1, y1] = coords1.split(',').map(Number)
      const [x2, y2] = coords2.split(',').map(Number)

      lineSegments.push({ x1, y1, x2, y2 })
    })

  return lineSegments
}

/**
 * Grid形式の座標系を作成する
 *
 * @param size 座標系の大きさ
 * @return size✕sizeの座標系
 */
export function createGrid(size: number): number[][] {
  const grid: number[][] = []

  for (let i = 0; i < size; i++) {
    grid[i] = []

    for (let j = 0; j < size; j++) {
      grid[i][j] = 0
    }
  }

  return grid
}

/**
 * gridに座標情報をマッピングする(縦・横のみ考慮)
 * @param lineSegments 線分リスト
 * @param grid
 */
export function mapLineSegmentsToGrid(lineSegments: LineSegment[], grid: number[][]): void {
  for (const segment of lineSegments) {
    const { x1, y1, x2, y2 } = segment

    if (x1 === x2) {
      // 垂直線
      const minY = Math.min(y1, y2)
      const maxY = Math.max(y1, y2)

      for (let y = minY; y <= maxY; y++) {
        grid[x1][y]++
      }
    } else if (y1 === y2) {
      // 水平線
      const minX = Math.min(x1, x2)
      const maxX = Math.max(x1, x2)

      for (let x = minX; x <= maxX; x++) {
        grid[x][y1]++
      }
    }
  }
}

/**
 * 重複している箇所の要素数を返す
 * @param grid 座標系
 */
export function countOverlappingPoints(grid: number[][]): number {
  let count = 0

  for (const row of grid) {
    for (const cell of row) {
      if (cell >= 2) {
        count++
      }
    }
  }

  return count
}

/**
 * gridに座標情報をマッピングする(縦・横・斜めを考慮)
 * @param lineSegments
 * @param coordinateSystem
 */
function mapLineSegmentsWithDiagonalsToGrid(lineSegments: LineSegment[], coordinateSystem: number[][]): void {
  lineSegments.forEach(({ x1, y1, x2, y2 }) => {
    // 水平な線分の場合
    if (x1 === x2) {
      // y座標の開始位置と終了位置を決定
      const [yStart, yEnd] = y1 < y2 ? [y1, y2] : [y2, y1]
      // y座標の範囲内でループし、座標系の対応するセルをインクリメント
      for (let y = yStart; y <= yEnd; y++) {
        coordinateSystem[y][x1]++
      }
    }
    // 垂直な線分の場合
    else if (y1 === y2) {
      // x座標の開始位置と終了位置を決定
      const [xStart, xEnd] = x1 < x2 ? [x1, x2] : [x2, x1]
      // x座標の範囲内でループし、座標系の対応するセルをインクリメント
      for (let x = xStart; x <= xEnd; x++) {
        coordinateSystem[y1][x]++
      }
    }
    // 45度の斜めの線分の場合
    else if (Math.abs(x1 - x2) === Math.abs(y1 - y2)) {
      // x座標とy座標のステップ（増分）を決定
      const xStep = x1 < x2 ? 1 : -1
      const yStep = y1 < y2 ? 1 : -1
      let x = x1
      let y = y1

      // x座標とy座標が終点に達するまでループし、座標系の対応するセルをインクリメント
      while (x !== x2 || y !== y2) {
        coordinateSystem[y][x]++
        x += xStep
        y += yStep
      }
      // 最後の点をインクリメント
      coordinateSystem[y][x]++
    }
  })
}
