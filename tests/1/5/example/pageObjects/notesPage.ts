import { NoteEditorFragment } from './fragments/noteEditorFragment'
import { NoteFragment } from './fragments/note/noteFragment'
import { NavigationBarFragment } from './fragments/navigationBarFragment'

export class NotesPage {
    noteEditor: NoteEditorFragment
    navigationBar: NavigationBarFragment

    constructor() {
        this.noteEditor = new NoteEditorFragment()
        this.navigationBar = new NavigationBarFragment()
    }
    getNote(i: number) {
        return new NoteFragment(this.notes[i])
    }
    get notes() {
        return $$('.grid-container .grid-item')
    }
}
