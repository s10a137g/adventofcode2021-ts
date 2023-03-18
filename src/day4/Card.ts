import { Row } from './Row'

export class Card {
  rows: Row[]

  CELLS_PER_ROW = 5

  constructor(strRows: string[][]) {
    this.rows = strRows.map((row) => new Row(row))
  }

  /**
   * 行列を転置したカードを返す
   */
  transpose(): Card {
    const transposeStrRows: string[][] = []

    for (let i = 0; i < this.rows.length; i++) {
      for (let j = 0; j < this.rows[i].elements.length; j++) {
        if (!transposeStrRows[j]) {
          transposeStrRows.push(['' + this.rows[i].elements[j]])
        } else {
          transposeStrRows[j].push('' + this.rows[i].elements[j])
        }
      }
    }
    return new Card(transposeStrRows)
  }

  isBingo(searchArg: number[]): boolean {
    for (const row of this.rows) {
      const [matchedElements, _] = row.splitMarkedElements(searchArg)
      if (matchedElements.length === this.CELLS_PER_ROW) {
        return true
      }
    }

    for (const row of this.transpose().rows) {
      const [matchedElements, _] = row.splitMarkedElements(searchArg)
      if (matchedElements.length === this.CELLS_PER_ROW) {
        return true
      }
    }

    return false
  }

  /**
   *  抽選番号に含まれないビンゴカードの数字の合計値を計算して返す
   * @param searchArg
   */
  getSumOfUnmarkedElement(searchArg: number[]): [number, boolean] {
    const unmarkedElements: number[] = []

    for (const row of this.rows) {
      const [matchedElements, unmatchedElements] = row.splitMarkedElements(searchArg)
      if (matchedElements.length === this.CELLS_PER_ROW) {
        const allElements: number[] = this.rows.map((v) => v.elements).flatMap((arr) => arr)
        const unmarkedElements = allElements.filter((x) => !searchArg.includes(x))
        const sumOfUnmarkedElements = unmarkedElements.reduce((sum, num) => sum + num, 0)
        return [sumOfUnmarkedElements, true] // Bingo
      }
      unmarkedElements.push(...unmatchedElements)
    }

    const sumOfUnmarkedElements = unmarkedElements.reduce((sum, num) => sum + num, 0)
    return [sumOfUnmarkedElements, false]
  }
}

export const createCards = (rows: string[][]): Card[] => {
  const initialValue: Card[] = []
  let stockRow: string[][] = []

  return rows.reduce((cards: Card[], row: string[]) => {
    if (row.length === 0) {
      cards.push(new Card(stockRow))
      stockRow = []
      return cards
    } else {
      stockRow.push(row)
      return cards
    }
  }, initialValue)
}
