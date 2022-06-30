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

  // 最後にビンゴになったタイミングのビンゴカードのコールされなかったマークの合算
  return getSumOfUnmarkedElementWhenLastBingo(
    cards,
    selectedNumbers.map((v) => +v)
  )
}

/**
 * 最後にビンゴになったタイミングでコールされなかったマスの合算値を返す
 * @param cards
 * @param searchArgs
 */
export const getSumOfUnmarkedElementWhenLastBingo = (cards: Card[], searchArgs: number[]): number => {
  const result = getSumOfUnmarkedElementWhenFirstBingoWithIndex(cards, searchArgs)

  // TODO: コール番号が1つずつ呼ばれて最後に返すようにする
  const currentSelectedNumbers = []
  for (let n of searchArgs) {
    // コールされた数をスタックする
    // currentSelectedNumbers.push(+n)
    //
    // if (!!unmarkedElements) {
    //   return unmarkedElements * currentSelectedNumbers[currentSelectedNumbers.length - 1]
    // }
  }

  if (cards.length === 1) {
    return result[0]
  }

  return getSumOfUnmarkedElementWhenLastBingo(cards.splice(result[1]), searchArgs)
}

/**
 * 最初にビンゴになったタイミングでコールされなかったマスの合算値を返す
 * @param cards
 * @param searchArgs
 */
export const getSumOfUnmarkedElementWhenFirstBingo = (cards: Card[], searchArgs: number[]): number | null => {
  const allCards = cards.concat(cards.map((card) => card.transpose()))

  for (let card of allCards) {
    const unmarkedSum = card.getSumOfUnmarkedElement(searchArgs)

    // 合算値が返ってきた = はじめにビンゴのカードが出てきた
    if (!!unmarkedSum) {
      return unmarkedSum
    }
  }
  return null
}

/**
 * 最初にビンゴになったタイミングでコールされなかったマスの合算値を返す
 * @param cards
 * @param searchArgs
 */
export const getSumOfUnmarkedElementWhenFirstBingoWithIndex = (
  cards: Card[],
  searchArgs: number[]
): [number, number] => {
  const cardPairs = cards.map((card) => [card, card.transpose()])

  let index = 0

  for (let pair of cardPairs) {
    for (let card of pair) {
      const unmarkedSum = card.getSumOfUnmarkedElement(searchArgs)

      // 合算値が返ってきた = はじめにビンゴのカードが出てきた
      if (!!unmarkedSum) {
        console.log(unmarkedSum, index)
        return [unmarkedSum, index]
      }
    }
    index += 1
  }
  return [0, 0]
}
