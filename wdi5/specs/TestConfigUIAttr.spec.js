const {
	default: _ui5Service
} = require("wdio-ui5-service")
const ui5Service = new _ui5Service()
const launchpadPage = require('../pages/configuiGenericAttrLaunchpadPage');
const listPage = require('../pages/configuiGenericAttrListPage');
const detailsPage = require('../pages/configuiGenericAttrDetailsPage');


describe("TestAttrConfigUI", function () {

    it("should load the app", async () => {
		await ui5Service.injectUI5() //only now loading ui5
        await launchpadPage.iShouldSeeTheConfigTile();
    });

    it("should navigate to the List page", async () => {
        await launchpadPage.iClickOnTheConfigTile();
        await listPage.iShouldSeeTheTable();
    });

    it("should count the number of attributes, if any", async () => {
        await listPage.iDeleteAllTestAttributes();
        await listPage.iClickGoButton();
        await listPage.iCountRowsInTheTable(); 
    });

    it("should navigate to the detail screen", async () => {
        await listPage.iClickCreateButton();
        await detailsPage.iShouldSeeEmptyEditableDetailsPage();

    });

    it("should create new attributes", async () => {
        await detailsPage.iCreateNewAttribute("WDI5_LINE_ITEM", "Line Item", "String");
        await detailsPage.iClickTheBackButton();
        await listPage.iClickCreateButton();
        await detailsPage.iCreateNewAttribute("WDI5_LINE_ITEM", "Line Item", "Long Integer");
        await detailsPage.iClickTheBackButton();
        await listPage.iClickCreateButton();
        await detailsPage.iCreateNewAttribute("WDI5_LINE_ITEM", "Line Item", "Boolean");
        await detailsPage.iClickTheBackButton();
        await listPage.iClickCreateButton();
        await detailsPage.iCreateNewAttribute("WDI5_TRANSACTION", "Transaction", "Long Integer");
        await detailsPage.iClickTheBackButton();
        await listPage.iClickCreateButton();
        await detailsPage.iCreateNewAttribute("WDI5_TRANSACTION", "Transaction", "String");
        await detailsPage.iClickTheBackButton();
        await detailsPage.iShouldSeeAttributeName();
    });

    it("creates one more new attribute with Transaction with Logical Expression", async () => {
        await listPage.iClickCreateButton();
        await detailsPage.iCreateNewAttributeWithLogicalExpression("WDI5_TRANSACTION", "Transaction", "Logical");
        await detailsPage.iClickTheBackButton();
    });

    it("go back, read and check new entry is present", async () => {
        await listPage.iClickGoButton();
        await listPage.iFindOneOfTheNewlyCreatedEntries("Line Item",  "String" );
    });

});