// Returning objects and custom commands

// silencing typescript
var browser: any = global['browser']

describe('returning objects structure', function () {
    it('what find element returns', function () {
        if (process.env.DEBUG) browser.pause(8000) // waiting for debugger
        browser.url('/')
        const elem = $('div')
        console.dir(elem)
        const loc = elem.getLocation()
        console.dir(loc)

        /**
        Is inherits from:
        { 
            sessionId: '490ddd6b7ab2a1dc5adaa9aff71cc56a',
            value: 
            { 
                // element id:
                ELEMENT: '0.8348316699095244-1',
                'element-6066-11e4-a52e-4f735466cecf': '0.8348316699095244-1' 
            },
            selector: 'div',
            _status: 0 
        }
         */
    })

})

describe.only('custom commands', function () {
    before('define custom commands and cookie and session storage cleaning', function () {
        // You can define any command that you want, to make some meta-command.
        browser.addCommand('clearEverything', function () {
            browser.deleteCookie()
            browser.execute(function () {
                window.localStorage.clear();
                window.sessionStorage.clear();
            })
        })
        browser.addCommand('setLocalStorage', function (key, value) {
            return browser.execute(function (k, v) {
                return window.localStorage.setItem(k, v)
            }, key, value)
        })
        browser.addCommand('getLocalStorage', function () {
            return browser.execute(function () {
                return JSON.stringify(window.localStorage)
            })
        })
    })
    it('working with cookies', function () {
        browser.url('https://httpbin.org/cookies/set?hello=world')
        console.log(browser.getCookie('hello'))
        browser.setCookie({ name: 'newCookie', value: 'newValue' })
        browser.url('https://httpbin.org/cookies')
        console.log('Setted cookies', $('body').getText())
    })
    it('working with storage objects', function () {
        browser.url('/dropdown')
        browser.pause(500)
        browser.setLocalStorage('hello', 'world')
        let storageData = browser.getLocalStorage()
        console.log('Storage is', storageData)
    })
    it('cleaning by using custom command', function () {
        browser.clearEverything()
        console.log('Now cookies are:', browser.getCookie())
        console.log('Now localstorage is:', browser.getLocalStorage())
    })
})