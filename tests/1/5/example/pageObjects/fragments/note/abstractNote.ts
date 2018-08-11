export class AbstractNote {
    protected rootElement
    get titleElement() {
        return this.rootElement.$$('.my-note p')[0]
    }
    get bodyElement() {
        return this.rootElement.$$('.my-note p')[1]
    }
    constructor(elem) {
        this.rootElement = elem
    }
    getTitle() {
        let text = this.titleElement.getText()
        return text.trim()
    }
    getBody() {
        let text = this.bodyElement.getText()
        return text.trim()
    }
    getColor() {
        return this.rootElement.getCssProperty('background-color')
    }
    isVisible() {
        return this.rootElement.isVisible()
    }
    waitForVisiblity() {
        return this.rootElement.waitForVisible(3000)
    }
    waitForInvisibility() {
        return this.rootElement.waitForVisible(3000, true)
    }
}

