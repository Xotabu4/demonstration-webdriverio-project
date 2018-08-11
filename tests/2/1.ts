import * as fs from 'fs-extra'
import * as request from 'request-promise-native'
import { expect } from 'chai'

// This tests should be runinng sequentialy
describe('Working with file system (no-wdio)', function () {
    it('Creating file', async function () {
        await fs.createFile('./.temp/test.txt')
    })
    it('Writing to file', async function () {
        // Consider also fs.writeJson
        await fs.writeFile('./.temp/test.txt', "hello world!")
    })
    it('Copy', async function () {
        await fs.copy('./.temp/test.txt', './.temp/test2.txt');
    })
    it('Rename', async function () {
        await fs.rename('./.temp/test2.txt', './.temp/newtest.txt');
    })
    it('Reading file', async function () {
        // Notice - readFile returns Buffer object
        let content = await fs.readFile('./.temp/newtest.txt');
        console.log('Got content from file:', content.toString())

        // Same as 
        // fs.readFile('./.temp/newtest.txt').then(content => {
        //     console.log('Got content from file:', content.toString())
        // })
    })

    it('Delete folder/file', async function () {
        await fs.remove('./.temp/')
    })
})


// This tests should be runinng sequentialy
describe('Working with file system (with wdio)', function () {
    // Using call - this will make async actions synchronus using fibers
    it('Reading content from website and writing it into file', function () {
        browser.url('http://the-internet.herokuapp.com/dynamic_content')
        let columns = $$('#content>div.row .large-10')
            .map(col => col.getText())
        console.log('Got content', columns)
        browser.call(() => fs.createFile('./.temp/test2.json'))
        browser.call(() => fs.writeJSON('./.temp/test2.json', { paragraphs: columns }))
    })

    // i DO NOT recommend to use sync write/read fs methods. 
    // They might not work well on parallel runs (but this is just assumptions)
    it('Reading content from website and synchronus writing it into file', function () {
        browser.url('/dynamic_content')
        let columns = $$('#content>div.row .large-10')
            .map(col => col.getText())
        console.log('Got content', columns)
        fs.createFileSync('./.temp/test2.json')
        fs.writeJSONSync('./.temp/test2.json', { paragraphs: columns })
    })
})

describe('Working with HTTP requests', function () {
    it('Making simple request and receiving response (no-wdio)', async function () {
        let resp = await request('https://httpbin.org/get')
        console.log('GET response: ', resp)
    })

    it('Using response to type into fields on website (wdio)', function () {
        let creds = browser.call(() => request.get('https://my-json-server.typicode.com/xotabu4/dummy_api/user', { json: true }))
        console.log('Received response: ', creds)
        browser.url('/login')
        $('#username').setValue(creds[0].username)
        $('#password').setValue(creds[0].password)
        $('button').click()
        expect($('h4.subheader').getText()).to.equal('Welcome to the Secure Area. When you are done click logout below.')
    })
})

