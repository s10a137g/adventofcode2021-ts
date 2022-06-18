import { Card, createCards } from "./Card";

export const doBingo = (cards: Card[], searchArgs: number[]): number | null => {
    const allCards = cards.concat(cards.map(card => card.transpose()))

    for (let card of allCards) {
        const unmarkedSum = card.getSumOfUnmarkedElement(searchArgs)
        if (!!unmarkedSum) {
            return unmarkedSum
        }

    }
    return null
}

export const day4_1 = (args: string[]): number => {
    // 1行目を抽選番号として定義
    const selectedNumbers = args[0].split(',')

    // それ以降の行数で空白行を区切りとして、Cardとして作成する
    const carsRows = args.slice(1).map(v => v.split(/ +/).filter(v => v !== ''))

    const cards = createCards(carsRows.slice(1))

    const currentSelectedNumbers = []

    for (let n of selectedNumbers) {
        currentSelectedNumbers.push(+n)
        const unmarkedElements = doBingo(cards, currentSelectedNumbers)
        if (!!unmarkedElements) {
            return unmarkedElements * currentSelectedNumbers[currentSelectedNumbers.length - 1]
        }
    }

    return 0
}

export const
    day4_2 = (args: string[]): number => {
        return 0
    }
