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
    let dataCollection = [1, 2, 3, 4, 5]
    dataCollection.map(data => {
        it(`DATAPROVIDER: ${counter} TEST for ${data}`, () => {
            console.log(`TEST number ${data} executed!`)
        })
    })

})
console.log(`${counter} - file parsing finished`)
