import { expect } from 'chai';

// MochaJS
// https://mochajs.org/

// Just for showing order
class Counter {
    innerC
    constructor() {
        this.innerC = 0
    }
    toString() {
        this.innerC = this.innerC + 1
        return this.innerC
    }
}
let counter = new Counter()


console.log(`${counter} - file parsing`)

beforeEach(() => {
    console.log(`${counter} - beforeEach execution`)
})

describe(`parent DESCRIBE block`, () => {
    console.log(`${counter} - file parsing - reading content of describe block`)

    before(() => {
        console.log(`${counter} - before execution`)
    })

    before(() => {
        console.log(`${counter} - before execution - executed in declaration order`)
    })

    beforeEach(() => {
        console.log(`${counter} - beforeEach execution`)
    })

    beforeEach(() => {
        console.log(`${counter} - beforeEach execution - executed in declaration order`)
    })

    after(() => {
        console.log(`${counter} - after execution`)
    })

    afterEach(() => {
        console.log(`${counter} - afterEach execution`)
    })

    describe(`Nested describe block`, () => {
        console.log(`${counter} - file parsing - reading nested describe blocks as well`)

        beforeEach(() => {
            console.log(`${counter} - Nested beforeEach executed!`)
        })

        it(`NESTED TEST!`, () => {
            console.log(`${counter} - NESTED TEST - executed`)
        })
    })

    // DATAPROVIDER
    // let dataCollection = [1, 2, 3, 4, 5]
    // dataCollection.map(data => {
    //     it(`DATAPROVIDER: ${counter} TEST for ${data}`, () => {
    //         console.log(`TEST number ${data} executed!`)
    //     })
    // })

    let testData = [
        { a: 2, b: 2, expected: 4 },
        { a: 3, b: 3, expected: 6 },
        { a: 10, b: 10, expected: 20 },
        { a: 100, b: 100, expected: 201 },
    ]
    testData.forEach(data => {
        it(`Testing ${data.a} + ${data.b}`, () => {
            expect(data.a + data.b).to.equal(data.expected)
        })
    })
})
console.log(`${counter} - file parsing finished`)
