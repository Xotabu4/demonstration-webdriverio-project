require('ts-node').register()
module.exports.config = {
    // Always running with debugger enabled
    debug: true,
    execArgv: ['--inspect=127.0.0.1:5859'],
    host: 'ip-5236.sunline.net.ua',
    port: 4444,
    path: '/wd/hub',
    specs: [
        //'tests/**/4_1.ts',
        'tests/5/example/5.ts'
    ],
    capabilities: [
        {
            browserName: 'chrome',
            enableVNC: true
        }
    ],
    baseUrl: 'http://the-internet.herokuapp.com',
    sync: true,
    // Level of logging verbosity: silent | verbose | command | data | result | error
    // logLevel: 'silent',
    coloredLogs: true,
    // baseUrl: 'https://google.com',
    // Default timeout for all waitFor* commands.
    waitforTimeout: 10000,
    // Default timeout in milliseconds for request
    // if Selenium Grid doesn't send response
    connectionRetryTimeout: 30000,
    connectionRetryCount: 3,
    reporters: [
        'spec',
        //     'mochawesome'
    ],
    reporterOptions: {
        outputDir: './', //json file will be written to this directory
        // mochawesome_filename: 'myfile.json' //will default to wdiomochawesome.json if no name is provided
    },
    framework: 'mocha',
    mochaOpts: {
        // https://mochajs.org/#usage
        // compilers: [
        //     'ts-node/register'
        // ],
        timeout: 60000
    },
    onPrepare: () => {
        const chai = require('chai');
        global.expect = chai.expect;
        global.assert = chai.assert;
        global.should = chai.should();
    }
}