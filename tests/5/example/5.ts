import { NotesPage } from './pageObjects/notesPage'
import { expect } from 'chai';

describe('Page Objects / Page Fragments', function () {
    const notesPage = new NotesPage()

    beforeEach(function () {
        browser.timeouts('implicit', 500)
        browser.url('http://www.hiteshbalar.com/preserver/notes')
        browser.pause(200)
    })

    afterEach(function () {
        browser.reload()
    })

    it('can create note', function () {
        const noteData = { titleText: 'HELLO', bodyText: 'WORLD' }
        notesPage.noteEditor.createNote(noteData)
        notesPage.getNote(0).waitForVisiblity()
        expect(notesPage.notes.length).to.equal(1, 'Should be created only one note')
        const createdNoteTitle = notesPage.getNote(0).getTitle()
        const createdNoteBody = notesPage.getNote(0).getBody()
        expect(createdNoteTitle).to.equal(noteData.titleText, `Title should be ${noteData.titleText}, but was ${createdNoteTitle}`)
        expect(createdNoteBody).to.equal(noteData.bodyText, `Body should be ${noteData.bodyText}, but was ${createdNoteBody}`)
    })

    it('can archive note', function () {
        const noteData = { titleText: 'HELLO', bodyText: 'WORLD' }
        notesPage.noteEditor.createNote(noteData)
        const firstNote = notesPage.getNote(0)
        firstNote.waitForVisiblity()
        firstNote.archive()
        expect(notesPage.notes.length).to.equal(0, 'Everything should be archived')
    })

    it('can delete note', function () {
        const noteData = { titleText: 'HELLO', bodyText: 'WORLD' }
        notesPage.noteEditor.createNote(noteData)
        const firstNote = notesPage.getNote(0)
        firstNote.waitForVisiblity()
        firstNote.delete()
        expect(notesPage.notes.length).to.equal(0, 'Everything should be deleted')
        const menu = notesPage.navigationBar.openMenu()
        const recycleBinPage = menu.openRecycleBinPage()
        const firstDeletedNote = recycleBinPage.getNote(0)
        firstDeletedNote.waitForVisiblity()
        expect(recycleBinPage.notes.length).to.equal(1, 'Only one note should exist in deleted notes')
        const deletedNoteTitle = firstDeletedNote.getTitle()
        const deletedNoteBody = firstDeletedNote.getBody()
        expect(deletedNoteTitle).to.equal(noteData.titleText, `Title should be ${noteData.titleText}, but was ${deletedNoteTitle}`)
        expect(deletedNoteBody).to.equal(noteData.bodyText, `Body should be ${noteData.bodyText}, but was ${deletedNoteBody}`)
    })
})
