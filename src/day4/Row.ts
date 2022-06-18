export class Row {
    elements: number[]

    constructor(elements: string[]) {
        this.elements = elements.map(v => +v)
    }

    splitMarkedElements(searchArg: number[]): [number[], number[]] {
        const matchedElements: number[] = []
        const unmatchedElements: number[] = []

        this.elements.forEach(element => {
            searchArg.includes(element) ? matchedElements.push(element) : unmatchedElements.push(element)
        })

        return [matchedElements, unmatchedElements]
    }
}
