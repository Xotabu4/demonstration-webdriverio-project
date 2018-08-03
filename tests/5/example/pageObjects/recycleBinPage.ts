import { DeletedNoteFragment } from './fragments/note/deletedNote'
import { NavigationBarFragment } from './fragments/navigationBarFragment'

export class RecycleBinPage {
    navigationBar: NavigationBarFragment
    constructor() {
        this.navigationBar = new NavigationBarFragment()
    }
    getNote(i: number) {
        return new DeletedNoteFragment(this.notes[i])
    }
    get notes() {
        return $$('.grid-container .grid-item')
    }
}

