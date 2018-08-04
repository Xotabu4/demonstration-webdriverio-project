
describe('Waits', function () {
    beforeEach(function () {
        browser.url('/dynamic_controls')
    })
    // WebdriverIO has 2 approaches to call methods:
    it('browser object has waits', function () {
        browser.click('button#btn')
        browser.waitForExist('p#message', 7500) // just ordinary wait for presence
        console.log('Now text is:', browser.getText('p#message'))
    })
    it('custom wait', function () {
        browser.waitUntil(() => {
            // Define your predicate function, it must return boolean, or Promise<boolean>
            // Predicate can do whatever you want to do, calls to DB, executing scripts...
            return $('div').isVisible() && $('body').isVisible()
        }, 10000, 'Message to throw in case waiting was timeout', )
    })
    it('elements also has wait functions', function () {
        $('div').waitForVisible(10000)
        // Some wait functions might be reversed - pass boolean as last parameter
        $('nonexist').waitForVisible(1000, true) // Waiting for invisible
    })
})