import { EventEmitter } from "events";

// Callbacks

describe('Callbacks ->', function () {
    it('defining function', async function () {
        // Function is just a object as any others.
        let A = function () {
            console.log('Hello World!')
        }
        // It could execute his body
        A()

        // or the same
        Function.call(A)

        // Function object has some built-in methods
        console.log(A.toString())
    })
    it('Writing to file', async function () {
        let A = function () {
            console.log('Hello World!')
        }
        // You can pass function without actually execting it
        let B = function (cb) {
            console.log('Executing callback ...')
            // Function B will actually decide when exactly to execute function A
            cb()
        }
        B(A)
    })
    it('Callbacks and events', async function () {
        // This is widely used to work with async code - delayed execution, reaction to events...
        let myEventHandler = function () {
            console.log('I am handling some things that happened!')
        }

        let eventEmmiter = new EventEmitter()
        eventEmmiter.on('myEvent', myEventHandler)

        eventEmmiter.emit('myEvent')
    })
    it('Callbacks error handling', function () {
        // NodeJS style is to always pass error (if there any) as first param
        let myCallback = function (err?, data?) {
            if (err) {
                console.log('We got error', err)
                return err
            }
            console.log('callback executed successfully', data)
        }

        setTimeout(() => myCallback(null, 'Some data that we got from async execution'), 2000)
        setTimeout(() => myCallback('ERROR! EVERYTHING IS WRONG'), 3000)
    })


})

describe('Promises', function () {
    // Promise is abstraction for better handling async code
    it('Promise', function () {
        let promise = new Promise((resolve, reject) => {
            setTimeout(() => {
                console.log('Async action done, notifying by sending special event')
                resolve()
            }, 1000)
        })
        promise.then(() => {
            console.log('After promise!')
        })
        console.log('In main loop')
    })
})
