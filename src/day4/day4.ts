import { Card, createCards } from './Card'

export const day4_1 = (args: string[]): number => {
  // 1行目を抽選番号として定義
  const selectedNumbers = args[0].split(',')

  // それ以降の行数で空白行を区切りとして、Cardとして作成する
  const carsRows = args.slice(1).map((v) => v.split(/ +/).filter((v) => v !== ''))

  const cards = createCards(carsRows.slice(1))

  const currentSelectedNumbers = []

  for (let n of selectedNumbers) {
    // コールされた数をスタックする
    currentSelectedNumbers.push(+n)

    // 最初にビンゴになったタイミングのビンゴカードのコールされなかったマークの合算
    const unmarkedElements = getSumOfUnmarkedElementWhenFirstBingo(cards, currentSelectedNumbers)

    if (!!unmarkedElements) {
      return unmarkedElements * currentSelectedNumbers[currentSelectedNumbers.length - 1]
    }
  }

  return 0
}

export const day4_2 = (args: string[]): number => {
  // 1行目を抽選番号として定義
  const selectedNumbers = args[0].split(',')

  // それ以降の行数で空白行を区切りとして、Cardとして作成する
  const carsRows = args.slice(1).map((v) => v.split(/ +/).filter((v) => v !== ''))

  const cards = createCards(carsRows.slice(1))

  let restCards = cards
  const currentSelectedNumbers = []

  for (let n of selectedNumbers) {
    // コールされた数をスタックする
    currentSelectedNumbers.push(+n)

    if (restCards.length === 1) {
      // 最後にビンゴになったビンゴカードのコールされなかったマークの合算
      const unmarkedElements = getSumOfUnmarkedElementWhenFirstBingo(restCards, currentSelectedNumbers)
      if (!!unmarkedElements) {
        return unmarkedElements * currentSelectedNumbers[currentSelectedNumbers.length - 1]
      }
    }

    const indexArray = getIndexOfBingoCard(restCards, currentSelectedNumbers)

    restCards = restCards.filter((_, index) => !indexArray.includes(index))
  }

  return 0
}

/**
 * 最初にビンゴになったタイミングでコールされなかったマスの合算値を返す
 * @param cards
 * @param searchArgs
 */
export const getSumOfUnmarkedElementWhenFirstBingo = (cards: Card[], searchArgs: number[]): number | null => {
  const allCards = cards.concat(cards.map((card) => card.transpose()))

  for (let card of allCards) {
    const [unmarkedSum, isBingo] = card.getSumOfUnmarkedElement(searchArgs)

    // 合算値が返ってきた = はじめにビンゴのカードが出てきた
    if (isBingo) {
      return unmarkedSum
    }
  }
  return null
}

function getIndexOfBingoCard(cards: Card[], currentSelectedNumbers: number[]): number[] {
  const indexArray: number[] = []

  cards
    .map((card, index) => (card.isBingo(currentSelectedNumbers) ? index : -1))
    .filter((v) => v !== -1)
    .forEach((v) => indexArray.push(v))

  return indexArray
}
