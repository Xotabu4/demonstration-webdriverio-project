import { join } from 'path'

describe('Actions -> ', function () {
    beforeEach(function () {
        browser.url('/dynamic_controls')
    })
    // WebdriverIO has 2 approaches to call methods:
    it('declarative-style action', function () {
        browser.url('/dynamic_controls')
        browser.click('button#btn')
        browser.pause(6000)
        console.log('Now text is:', browser.getText('p#message'))
    })
    it('oop-style action', function () {
        browser.url('/dynamic_controls')
        $('button#btn').click()
        browser.pause(6000)
        console.log('Now text is:', $('p#message').getText())
    })
    it('browser.url()', function () {
        // Opens baseUrl from config file
        browser.url();
        // baseUrl + path from parameter
        browser.url('/dynamic_controls');
        // Forget about baseUrl from config - use full path from parameter
        browser.url('http://the-internet.herokuapp.com/dynamic_controls');
    })
    it('working with inputs', function () {
        // Just usual typing into field, clearing field before typing
        browser.url('/forgot_password')
        const input = $('input#email')
        input.setValue('TEST')
        console.log(input.getValue())
        // OR the same as getValue()
        console.log(input.getAttribute('value'))
        input.addValue(' HELLO')
        // addValue() just appends value, no clearing
        console.log(input.getValue())
        // clearValue clears everything in input
        input.clearElement()
        console.log('Input has text after clear: ' + input.getValue() + '|')
    })
    it('working with dropdowns', function () {
        browser.url('/dropdown')
        const dropdown = $('#dropdown')
        dropdown.selectByIndex(0)
        console.log(dropdown.getValue())
    })
    it('browser.chooseFile()', function () {
        browser.url('/upload')
        const absoluteFilepath = join(__dirname, 'file.txt')
        console.log(absoluteFilepath)
        browser.chooseFile('#file-upload', absoluteFilepath);
        $('#file-submit').click()
        browser.pause(5000)
        console.log($('h3').getText())
    })
    it('download file', function () {
        this.timeout(30000000);
        browser.url('/download')

        const link = $('.example a')
        const filename = $('.example a').getText()
        link.click()
        console.log(browser.session())
        browser.pause(1000000)
    }) 
    it.only('working with cookies', function () {
        browser.url('https://httpbin.org/cookies/set?hello=world')
        console.log(browser.getCookie('hello'))
        browser.setCookie({ name: 'newCookie', value: 'newValue' })
        browser.url('https://httpbin.org/cookies')
        console.log('Setted cookies', $('body').getText())
    })
    it('working with storage objects', function () {
        // window.localStorage
        browser.url('/dropdown')
        browser.pause(500)
        browser.execute(function () {
            return window.localStorage.setItem('hello', 'world')
        })
        // browser.url('/dropdown')
        // browser.pause(500)
        let storageData = browser.execute(function () {
            return JSON.stringify(window.localStorage)
        })
        console.log('Storage is', storageData)
    })
})