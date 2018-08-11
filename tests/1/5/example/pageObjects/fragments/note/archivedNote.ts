import { AbstractNote } from './abstractNote'

export class ArchivedNoteFragment extends AbstractNote {
    constructor(elem) {
        super(elem)
    }

    edit(title: string, body: string) {
        console.log('editing...')
    }

    unarchive() {
        console.log('unarhiving...')
    }

    delete() {
        console.log('deleting...')
    }

    changeColor(color: string) {
        console.log('changing color...')
    }
}
