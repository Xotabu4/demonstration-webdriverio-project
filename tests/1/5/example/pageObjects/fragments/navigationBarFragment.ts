import { RecycleBinPage } from '../recycleBinPage'

export class NavigationBarFragment {
    private get rootElement() {
        return $('.navbar')
    }
    private get openMenuButton() {
        return this.rootElement.$('.navbar-right a.dropdown-toggle')
    }

    openMenu() {
        this.openMenuButton.click()
        let menu = new MenuFragment()
        browser.waitUntil(() => menu.isVisible(), 2000, 'Menu should became visible after open')
        return menu
    }
}

class MenuFragment {
    private get rootElement() {
        return $('li.dropdown.open ul.dropdown-menu')
    }
    private get archiveNoteLink() {
        return this.rootElement.$(`a[href*='archive-notes']`)
    }
    private get recycleBinLink() {
        return this.rootElement.$(`a[href*='recycle-bin']`)
    }
    openArchivedNotesPage() {
        this.archiveNoteLink.click()
        // TODO: Returning pageobject is not implemented
    }
    openRecycleBinPage() {
        this.recycleBinLink.click()
        return new RecycleBinPage();
    }
    isVisible() {
        return this.rootElement.isVisible()
    }
}