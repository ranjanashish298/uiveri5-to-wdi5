const {
    default: _ui5Service
} = require("wdio-ui5-service")
const ui5Service = new _ui5Service()
const launchpadPage = require('../pages/configuiLaunchpadPage');
const listPage = require('../pages/configuiListPage');
const detailsPage = require('../pages/configuiDetailsPage');

const NUMBER_RANGE = 'ppservice-config-ui::sap.suite.ui.generic.template.ListReport.view.ListReport::Configurations--template::IconTabFilter-_tab1'
const PADDING_CONFIG = 'ppservice-config-ui::sap.suite.ui.generic.template.ListReport.view.ListReport::Configurations--template::IconTabFilter-_tab2'
const UNIT_OF_MEASURE = 'ppservice-config-ui::sap.suite.ui.generic.template.ListReport.view.ListReport::Configurations--template::IconTabFilter-_tab3'
const DESCRIPTION = "Descr" + new Date().getTime()
const code = 'ppservice-config-ui::sap.suite.ui.generic.template.ListReport.view.ListReport::Configurations--code'
const isocode = 'ppservice-config-ui::sap.suite.ui.generic.template.ListReport.view.ListReport::Configurations--isoCode'
const comDes = 'ppservice-config-ui::sap.suite.ui.generic.template.ListReport.view.ListReport::Configurations--commercialDes'

describe("TestConfigUI", function () {

    it("should load the app", async () => {
        await ui5Service.injectUI5() //only now loading ui5
        await launchpadPage.iShouldSeeTheConfigTile();
    });

    it("should navigate to the List page", async () => {
        await launchpadPage.iClickOnTheConfigTile();
        await listPage.iShouldSeeTheTable();

    });

    it("should delete existing entries, if any", async () => {
        await listPage.iSelectAllAndPressDeleteIfAny();

        await listPage.iShouldSeeEmptyTable();
    });

    it("should navigate to the detail screen", async () => {
        await listPage.iClickCreateButton();
        await detailsPage.iShouldSeeEmptyEditableDetailsPage();

    });

    it("fill the two header fields and save", async () => {
        await detailsPage.iFillTheTwoHeaderFields(DESCRIPTION);
        await detailsPage.iEnableExternalActionElis();
        await detailsPage.iClickSave();

        await detailsPage.iShouldSeeSelectedCheckboxForExternalAction();
    });

});

describe("TestConfigUI: validate Missing / Overlapping prices config changes", function () {

    it("should check Enable Tolerant Price Handling is FALSE by default", async() =>{
        await detailsPage.iVerifyEnablePriceHandlingValue("No");
    });

   it("should update Enable Tolerant Price Handling to TRUE", async() =>{
        await detailsPage.iClickEdit();
        await detailsPage.iEnableTolerantPriceHandling();
        await detailsPage.iClickSave();
        await detailsPage.iVerifyEnablePriceHandlingValue("Yes");
   });

});

describe("TestConfigUI", function () {

    it("should navigate back to the List page", async () => {
        await detailsPage.iClickTheBackButton();
        await listPage.iShouldSeeOneRowInTheTable();

    });

   it("read and check new entry is present", async () => {
        await listPage.iFindTheNewlyCreatedEntry(DESCRIPTION);
    });
    it("should navigate to Number Range", async () => {
        await listPage.iPresstab(NUMBER_RANGE);

    });

    it("should delete existing entry and create", async () => {
        await listPage.iSelectEntryAndDelete2();
        await listPage.iAddEntityName("Promotions");
        await listPage.iAddEntityName("PromotionPriceDerivationRules")
        await listPage.iAddEntityName("PriceDerivationRuleEligibilities");
        await listPage.iAddEntityName("MerchandiseSetNodes");
        await listPage.iAddEntityName("PriceDerivationRules");
        await listPage.iAddEntityName("MixAndMatchPriceDerivationItems");
        await listPage.iAddEntityName("AddBonusPriceDerivationItems");
    });

    it("should navigate to Padding Configuration", async () => {
        await listPage.iPresstab(PADDING_CONFIG);

    });

    it("should delete existing entries, if any", async () => {
        await listPage.iSelectAllAndPressDeleteIfAnyPaddingConfig();
        await listPage.iShouldSeeEmptyTable();
    });

    it("fill the data and save", async () => {
        await detailsPage.iAddPaddingConfig("Product", "40", "30", "30","_____._____________.__________");
        await detailsPage.iAddPaddingConfig("Customer", "30", "","30","_____._____________.__________");
        await detailsPage.iAddPaddingConfig("Vendor", "20", "10","20","");
        await listPage.iFindTheNewlyCreatedEntry2();
    });

    it("should navigate to UOM and create", async () => {
        await listPage.iPresstab(UNIT_OF_MEASURE);
        await listPage.iFindAndDelete("ABC");
        await listPage.iPressCreateUOM();
        await listPage.iEnterText(code);
        await listPage.iEnterText(isocode);
        await listPage.iSelectLangauage();
        await listPage.iEnterText(comDes);
        await listPage.iPressAddUOM();
        await listPage.iFindTheNewlyCreatedEntryUOM("ABC");
    });

}); 