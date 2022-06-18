export class Row {
    elements: number[]

    constructor(elements: string[]) {
        this.elements = elements.map(v => +v)
    }
}

export class Card {
    rows: Row[]

    constructor(strRows: string[][]) {
        this.rows = strRows.map(row => new Row(row))
    }

    transpose(): Card {
        const arg: string[][] = []
        for (let i = 0; i < this.rows.length; i++) {
            for (let j = 0; j < this.rows[i].elements.length; j++) {
                if (!arg[j]) {
                    arg.push(['' + this.rows[i].elements[j]])
                } else {
                    arg[j].push('' + this.rows[i].elements[j])
                }
            }
        }
        return new Card(arg)
    }

    isBingo(searchArg: number[]): [boolean, number | null] {
        const unmatchElement: number[] = []
        for (let row of this.rows) {
            if ( row.elements.every(element => searchArg.includes(element)){
                return [true, unmatchElement.reduce((sum, v) => sum += v)]
            }
        }

        return [false, null]
    }
}

export const doBingo = (cards: Card[], searchArgs: number[]): [number | null, number] => {
    const allCards = cards.concat(cards.map(card => card.transpose()))

    for (let card of allCards) {
        const [isBingo, unmatchSum] = card.isBingo(searchArgs)
        if (isBingo && !!unmatchSum) {
            return [unmatchSum, searchArgs[searchArgs.length - 1]]
        }

    }
    return [null, searchArgs[searchArgs.length - 1]]
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


export const
    day4_1 = (args: string[]): number => {
        // 1行目を抽選番号として定義
        const selectedNumbers = args[0].split(',')

        // それ以降の行数で空白行を区切りとして、Cardとして作成する
        const carsRows = args.slice(1).map(v => v.split(/ +/).filter(v => v !== ''))

        const cards = createCards(carsRows.slice(1))
        console.log(cards.map(v => v.rows.map(v => v.elements)))
        console.log(cards.map(v => v.transpose().rows.map(v => v.elements)))


        const processSelectedNumbers = []
        for (let n of selectedNumbers) {
            processSelectedNumbers.push(+n)
            const [unmatchSum, bingoNumber] = doBingo(cards, processSelectedNumbers)
            if (!!unmatchSum) {
                console.log(unmatchSum, bingoNumber)
                return unmatchSum * bingoNumber
            }
        }
        console.log(doBingo([cards[0]], [22, 8, 21, 6, 2, 1]))

        return 0
    }

export const
    day4_2 = (args: string[]): number => {
        return 0
    }
