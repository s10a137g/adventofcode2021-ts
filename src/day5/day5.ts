export const day5_1 = (args: string[]): number => {
  const lineSegmentArray = parseInput(args)
  console.log(lineSegmentArray)
  return 0
}

type LineSegment = {
  x1: number
  y1: number
  x2: number
  y2: number
}

function parseInput(input: string[]): LineSegment[] {
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
