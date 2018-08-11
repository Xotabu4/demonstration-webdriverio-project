import { AbstractNote } from './abstractNote'

export class DeletedNoteFragment extends AbstractNote {
    constructor(elem) {
        super(elem)
    }

    deleteForever() {
        console.log('deleting forever...')
    }

    restore() {
        console.log('restoring...')
    }
}
