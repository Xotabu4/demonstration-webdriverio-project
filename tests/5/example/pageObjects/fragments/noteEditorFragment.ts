export class NoteEditorFragment {
    private get rootElement() {
        return $('.note-editor')
    }
    private get titleField() {
        return this.rootElement.$('input[placeholder="Title"]')
    }
    private get bodyField() {
        return this.rootElement.$('textarea')
    }

    createNote(noteData: { bodyText: string, titleText: string }) {
        this.activate()
        this.bodyField.clearElement()
        this.bodyField.setValue(noteData.bodyText)
        this.titleField.clearElement()
        this.titleField.setValue(noteData.titleText)
        this.rootElement.$('button').click()
        this.titleField.waitForVisible(2000, true)
    }

    activate() {
        this.rootElement.waitForVisible(5000)
        this.rootElement.click()
        browser.waitUntil(() => {
            return this.titleField.isEnabled() && this.bodyField.isEnabled()
        }, 10000)
    }
}