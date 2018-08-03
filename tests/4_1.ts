import { resolve } from "url";

afterEach(function () {
    console.log(`
     To declare global after condition, just define it outside ALL describe blocks.
     Condition will be appended to EVERY "it" in project!
     `)
})
describe('Additional mocha possibilities', function () {
    beforeEach(function () {
        this.someData = 'Hello World'
    })
    it('scope from pre/post conditions also available in test', function () {
        console.log('Got data from scope', this.someData)
    })
    it('be aware that mocha cannot set "this" context  for arrow functions', () => {
        console.log('someData from scope', this['someData'])
    })
    it('defining skipped tests', function () {
        if (process.env.SHOULD_RUN_TEST == '1') {
            console.log('Env variable exists, test executed!')
        } else {
            console.log('NO env variable, test skipped!')
            this.skip()
        }
    })
    let shouldTryFail = true
    it('defining retries for test', function () {
        this.retries(2)
        if (shouldTryFail) {
            shouldTryFail = false
            console.log('this.retries() returns number or retries set',
                this.retries())
            throw new Error('First try must fail!')
        }
        console.log(
            'Undocumented feature: number of retries left',
            this.test['_currentRetry']
        )
    })
})

describe('Async tests support', function () {
    it('If test returns promise - it considered async', function () {
        // Mocha will wait until this promise is resolved
        return new Promise((resolve, reject) => {
            // set immediate puts function to callback queue as soon as possible
            setImmediate(resolve)
        })
    })
})

describe('Test durations', function () {
    this.timeout(500);
    it.only('should highlight in red slow tests', async function () {
        // will warn in test run summary, if reporter supports this
        this.slow(10)
        await new Promise((resolve, reject) => {
            setTimeout(() => { resolve() }, 100)
        })
    })
    it.only('should highlight in yellow slow tests', async function () {
        // will warn in test run summary, if reporter supports this
        this.slow(120)
        await new Promise((resolve, reject) => {
            setTimeout(() => { resolve() }, 100)
        })
    })
    // Global timeout (default) specified in mocha opts
    describe('suite level timeout', function () {
        this.timeout(100)

        it('this will timeout', async function () {
            await new Promise(resolve => setTimeout(resolve, 100))
        })
        it('this will NOT timeout', async function () {
            await new Promise(resolve => setTimeout(resolve, 10))
        })
    })
    describe('hook level timeout', function () {
        before(async function () {
            this.timeout(10)
            await new Promise(resolve => setTimeout(resolve, 100))
        })

        it('just dummy test', function () {

        })
    })
    it.skip('test level timeout', async function () {
        this.timeout(10)
        await new Promise((resolve, reject) => {
            setTimeout(() => { resolve() }, 100)
        })
    })
})