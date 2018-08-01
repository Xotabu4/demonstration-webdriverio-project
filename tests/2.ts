// http://webdriver.io/guide/usage/selectors.html
describe('Selectors', function () {
    beforeEach(function () {
        browser.url('/checkboxes')
    })
    it('CSS Query Selector', function () {
        // https://www.w3schools.com/cssref/css_selectors.asp
        // https://www.w3schools.com/cssref/trysel.asp
        const checkbox = $('input[type="checkbox"]')
        console.log(checkbox.getLocation())
        // equal to
        const checkboxx = browser.element('input[type="checkbox"]')
        console.log(checkboxx.getLocation())
    })
    it('Element with certain text', function () {
        const checkbox = $('=Elemental Selenium')
        console.log(checkbox.getLocation())
    })
    it('Element with containing text', function () {
        const checkbox = $('*=Elemental')
        console.log('Element found by partial text has text: ', checkbox.getText())
    })
    it('Element by xPath selector', function () {
        // https://docs.google.com/document/d/1PdfKMDfoqFIlF4tN1jKrOf1iZ1rqESy2xVMIj3uuV3g/pub
        const checkbox1 = $('//input')
        const checkbox2 = $('//input[2]')
        console.log('1 checkbox is checked: ', checkbox1.isSelected())
        console.log('2 checkbox is checked: ', checkbox2.isSelected())
        // OR
        const checkboxes = $$('//input')
        console.log('1 checkbox is checked: ', checkboxes[0].isSelected())
        console.log('2 checkbox is checked: ', checkboxes[1].isSelected())
    })
})