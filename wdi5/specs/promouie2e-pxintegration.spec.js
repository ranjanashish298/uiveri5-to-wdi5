const {
    default: _ui5Service
} = require("wdio-ui5-service")
const ui5Service = new _ui5Service()
const launchpadPage = require('../pages/configuiLaunchpadPage');
const px = require('../pages/pxIntegration');

describe("PX Survey", function () {

    it("should load the app", async () => {
        await ui5Service.injectUI5() //only now loading ui5
    });

    it("should click PX survey button", async () => {
        await px.iPressPXSurveyButton();
    });

    it("should answer Question1", async () => {
        await px.iPressA1();
    });

    it("should press Next Button", async () => {
        await px.iPressNextButton();
    });

    it("should answer Question2", async () => {
        await px.iPressA2();
    });

    it("should answer Question3", async () => {
        await px.iPressA3();
    });

    it("should press Next Button in second page", async () => {
        await px.iPressNextButton();
    });

    it("should input data in the text box", async () => {
        await px.iFillTextArea();
    });

    it("should press the submit button", async () => {
        await px.iPressSubmitButton();
    });

}); 