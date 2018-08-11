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

    // it.only('madnezz', function () {
    //     class MyElement extends String {
    //         waitForVisible(time?: number) {
    //             return browser.waitUntil(() => {
    //                 try {
    //                     return browser.isVisible(this + '')
    //                 } catch (err) {
    //                     return false
    //                 }
    //             }, 10000)
    //         }
    //         getText() {
    //             return browser.getText(this + '')
    //         }
    //         setValue(val) {
    //             return browser.setValue(this + '', val)
    //         }
    //         click() {
    //             return browser.click(this + '')
    //         }
    //     }
    //     function $(loc) {
    //         return new MyElement(loc)
    //     }

    //     browser.url('/dynamic_controls')
    //     $('button#btn').click()
    //     let message = $('p#message')
    //     message.waitForVisible()
    //     console.log('Now text is:', message.getText())
    // })
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
        // This is the same as getValue()
        console.log(input.getAttribute('value'))
        // addValue() just appends value, no clearing
        input.addValue(' HELLO')
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
        browser.url('/download')
        const link = $('.example a')
        const filename = $('.example a').getText()
        link.click()
        console.log(browser.session())
    })
})