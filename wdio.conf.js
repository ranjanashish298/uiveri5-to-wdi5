const path = require('path');
const {
    TimelineService
} = require("wdio-timeline-reporter/timeline-service");

const browserDriver = process.env.BROWSER_DRIVER ? process.env.BROWSER_DRIVER : "chromedriver"

exports.config = {

    wdi5: {
        screenshotPath: "target",
        screenshotsDisabled: false, // [optional] {boolean}, default: false; if set to true, screenshots won't be taken and not written to file system
        logLevel: "verbose", // [optional] error | verbose | silent, default: "error"
        url: "", // [mandatory] {string} name of your bootstrap html file. If your server autoredirects to a 'domain:port/'-like root url, use empty string ''
        skipInjectUI5OnStart: true, // [optional] {boolean}, default: false; true when UI5 is not on the start page, you need to later call <wdioUI5service>.injectUI5() manually
        waitForUI5Timeout: 1200000
        // [optional] {number}, default: 15000; maximum waiting time in milliseconds while checking for UI5 availability
    },

    // Saucelabs
    user: process.env.SAUCE_USERNAME,
    key: process.env.SAUCE_ACCESS_KEY,
    region: 'eu',

    //Spec files path
    //specs: ["./webapp/test/wdi5/specs/promouie2e-uc1.spec.js"],

    // Patterns to exclude.
    exclude: [
        // 'path/to/excluded/files'
    ],

    capabilities: [{
        // maxInstances can get overwritten per capability. So if you have an in-house Selenium
        // grid with only 5 firefox instances available you can make sure that not more than
        // 5 instances get started at a time.
        maxInstances: 1,
        //
        browserName: process.env.BROWSER_NAME ? process.env.BROWSER_NAME : "chrome",
        platformName: process.env.PLATFORM_NAME ? process.env.PLATFORM_NAME : "Windows 11",
        //browserName: "firefox",
        "goog:chromeOptions": {
            args: process.argv.indexOf("--headless") > -1 ? ["--headless", "--no-sandbox"] : process.argv.indexOf("--debug") > -1 ? ["window-size=1920,1080", "--auto-open-devtools-for-tabs"] : ["window-size=1920,1080"]
        },
        acceptInsecureCerts: true,
        "wdi5:authentication": {
            provider: "BTP", //> mandatory
            usernameSelector: "#j_username", //> optional; default: "#j_username"
            passwordSelector: "#j_password", //> optional; default: "#j_password"
            submitSelector: "#logOnFormSubmit" //> optional; default: "#logOnFormSubmit"
        },
        "sauce:options": {
            parentTunnel: "S-A-P",
            tunnelIdentifier: "sap-intranet",
            build: "WDI5 Test",
            screenResolution: process.env.SCREEN_RESOLUTION ? process.env.SCREEN_RESOLUTION : "1600x1200"
        }
    }],
    // Level of logging verbosity: trace | debug | info | warn | error | silent
    logLevel: "error",
    // If you only want to run your tests until a specific amount of tests have failed use
    // bail (default is 0 - don't bail, run all tests).
    bail: 0,
    //Url against which the tests are running
    //baseUrl: "https://oppdev-ppservice-app-dev-i576842.internal.cfapps.sap.hana.ondemand.com/cp.portal/site",
    //baseUrl: "https://oppsaasmanual1-ppservice-app-oppdemo-manualtest.cfapps.sap.hana.ondemand.com/cp.portal/site#Shell-home",
    baseUrl: process.env.TARGET_SERVER_URL,
    // Default timeout for all waitFor* commands.
    waitforTimeout: 120000,
    //
    // Default timeout in milliseconds for request
    // if browser driver or grid doesn't send response
    connectionRetryTimeout: process.argv.indexOf("--debug") > -1 ? 1200000 : 120000,

    //
    // Default request retries count
    connectionRetryCount: 3,
    //
    // Test runner services
    // Services take over a specific job you don't want to take care of. They enhance
    // your test setup with almost no effort. Unlike plugins, they don't add new
    // commands. Instead, they hook themselves up into the test process.
    //services: [["sauce", {sauceConnect: true}], "ui5", [TimelineService]],
    // To run it in local chrome
    services: process.argv.indexOf("--use-sauce") > -1 ? [["sauce", { sauceConnect: true }], "ui5", [TimelineService]] : [browserDriver, "ui5", [TimelineService]],

    // Make sure you have the wdio adapter package for the specific framework installed
    // before running any tests.
    framework: "mocha",
    // see also: https://webdriver.io/docs/dot-reporter
    reporters: ["spec",
        ["timeline", {
            outputDir: process.env.REPORT_OUTPUT_DIR ? process.env.REPORT_OUTPUT_DIR : "target/wdi5Report", // Please use this outputDir and fileName. The report will be exposed in Jenkins.
            fileName: process.env.REPORT_FILE_NAME ? process.env.REPORT_FILE_NAME : "report.html",
            screenshotStrategy: "on:error"
        }],
        ["junit", {
            outputDir: process.env.REPORT_OUTPUT_DIR ? process.env.REPORT_OUTPUT_DIR : "target/junitReport",
            outputFileFormat: function (options) {
                return 'wdi5junitReport_' + new Date().getTime() + '.xml';
            }
        }]],

    // Options to be passed to Mocha.
    // See the full list at http://mochajs.org/
    mochaOpts: {
        ui: "bdd",
        timeout: 360000 //process.argv.indexOf("--debug") > -1 ? 600000 : 60000
    },
    /**
     * Gets executed before test execution begins. At this point you can access to all global
     * variables like `browser`. It is the perfect place to define custom commands.
     * @param {Array.<Object>} capabilities list of capabilities details
     * @param {Array.<String>} specs        List of spec file paths that are to be run
     * @param {Object}         browser      instance of created browser/device session
     */
    before: function (capabilities, specs) {
        browser.setTimeout({
            script: 120000
        });
    }
}
