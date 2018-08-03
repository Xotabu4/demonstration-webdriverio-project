import { AbstractNote } from './abstractNote'

export class NoteFragment extends AbstractNote {
    constructor(elem) {
        super(elem)
    }
    edit(title: string, body: string) {
        this.rootElement.click()
        let modal = new NoteEditModalFragment()
        modal.waitForVisiblity()
        modal.edit({ bodyText: body, titleText: title })
        modal.done()
    }
    archive() {
        const archiveButton = $('a[title="Archive"]')        
        browser.moveToObject(archiveButton.selector)
        archiveButton.click()
        this.waitForInvisibility()
    }
    delete() {
        const deleteButton = $('a[title="Delete"]')
        browser.moveToObject(deleteButton.selector)
        deleteButton.click()
        this.waitForInvisibility()
    }

}

class NoteEditModalFragment {
    private get rootElement() {
        return $('#node_edit_modal')
    }
    private get bodyTextArea() {
        return this.rootElement.$('.modal-title input')
    }
    private get titleInput() {
        return this.rootElement.$('.modal-body textarea')
    }
    edit(infoToUpdate: { bodyText: string, titleText: string }) {
        this.waitForVisiblity()
        this.typeBody(infoToUpdate.bodyText)
        this.typeTitle(infoToUpdate.titleText)
    }

    typeBody(bodyText: string) {
        this.bodyTextArea.clearElement()
        this.bodyTextArea.setValue(bodyText)
    }

    typeTitle(titleText: string) {
        this.titleInput.clearElement()
        this.titleInput.setValue(titleText)
    }

    done() {
        this.rootElement.$('=Done').click()
        this.waitForInvisibility()
    }
    waitForVisiblity() {
        return this.rootElement.waitForVisible(3000)
    }
    waitForInvisibility() {
        return this.rootElement.waitForVisible(3000, true)
    }
}