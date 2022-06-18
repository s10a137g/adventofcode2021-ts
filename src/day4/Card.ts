import { Row } from './Row'

export class Card {
  rows: Row[]

  ROWS_LENGTH = 5

  constructor(strRows: string[][]) {
    this.rows = strRows.map(row => new Row(row))
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

  /**
   *  抽選番号に含まれないビンゴカードの数字の合計値を計算して返す
   * @param searchArg
   */
  getSumOfUnmarkedElement(searchArg: number[]): number | null {
    let bingoFlg = false
    const unmatchedElements: number[] = []
    for (let row of this.rows) {
      const [matchedElement, unmatchedElement] = row.splitMarkedElements(searchArg)

      matchedElement.length === this.ROWS_LENGTH
        ? bingoFlg = true
        : unmatchedElement.forEach(element => unmatchedElements.push(element))
    }

    return bingoFlg
      ? unmatchedElements.reduce((sum, v) => sum + v)
      : null
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
