const promotionListPage = require('../pages/thePromotionListPage');
const launchpadPage = require('../pages/theLaunchpadPage');
const promotionDetailsPage = require('../pages/thePromotionDetailsPage');
const rulePage = require('../pages/theRulePage');
 

const PROMO_NAME_PREFIX = "WDI5 TEST - ";
var PROMO_NAME_TEXT="";
var oppssequencecount = 0;
const year = 2050;


/**** BEGIN CONSTANTS FOR USECASE:9 ******/
const usecase9_StartDate = "Sep 01, " + year;
const usecase9_EndDate = "Sep 25, " + year;
/**** END CONSTANTS FOR USECASE:9 ******/

describe("promouie2e-uc9", function () {
    it("should login and load the app", async () => {
        await launchpadPage.iShouldSeeTheConfigAndPromoUITiles();
    });

    /**** BEGIN USECASE:9 ******/
    /* Buy 1 product P1 for 1 EUR discount price and get 2 products of the MCH1 for 5 EUR */
    it("********* UC9 - should Buy 1 product P1 for 1 EUR discount price and get 2 products of the MCH1 for 5 EUR ************", async () => {
        PROMO_NAME_TEXT = PROMO_NAME_PREFIX + new Date().getTime();
        await launchpadPage.iPressTheLogo();
        await launchpadPage.iClickOnTheTile("Maintain Promotions");
    });

    it("should create new promotion", async () => {
        await promotionListPage.iClickCreateButton();
        await promotionDetailsPage.iShouldSeeTheInitialPromotionDetailsPage();
    });

    it("should fill initial promotion fields and save", async () => {
        await promotionDetailsPage.iFillThePromoNameField(PROMO_NAME_TEXT);
        await promotionDetailsPage.iFillThePromoDescriptionField(PROMO_NAME_TEXT);
        await promotionDetailsPage.iFillTheStartDateField(usecase9_StartDate);
        await promotionDetailsPage.iFillTheEndDateField(usecase9_EndDate);
        await promotionDetailsPage.iClickCreateButton();
        await promotionDetailsPage.iShouldSeeTheBasicPromotionPage(PROMO_NAME_TEXT);
    });

    it("should create new business units", async () => {
        await promotionDetailsPage.iClickBusinessUnitsCreateButton();
        await promotionDetailsPage.iEnterBusinessUnits("1001");
        await promotionDetailsPage.iAddBusinessUnitsType();
        await promotionDetailsPage.iShouldSeeTheInitialPromotionDetailsPage();
    });

    it("should create new rule on click of create button", async () => {
        await promotionDetailsPage.iClickPromoRulesCreateButton();
        await rulePage.iShouldSeeTheInitialRuleDetailsPage();
    });

    it("should fill initial rule fields and create", async () => {
        oppssequencecount++;
        await rulePage.iFillTheRuleNameField(PROMO_NAME_TEXT + "-Rule-" + oppssequencecount);
        await rulePage.iPressTheCreateButtonWithInitialData();
        await rulePage.iShouldSeeTheInitialSavedRuleDetailsPage(PROMO_NAME_TEXT + "-Rule-" + oppssequencecount);
    });

    it("should add triggers and reward", async () => {
        await rulePage.iPressTheEditButton();
        await rulePage.iAddEligibility("Product");
        await rulePage.iAddEligibility("Merchandise Hierarchy Node");
        await rulePage.iAddRewards("Mix and Match", "Merchandise Hierarchy Node");
        await rulePage.iEnterTextFieldArray("Product ID", ["P1"]);
        await rulePage.iEnterTextFieldArray("Merchandise Hierarchy Node ID", ["MCH1","MCH1"]);
        await rulePage.iEnterTextFieldArray("Qualifier ID", ["MCH1","MCH1"]);
        await rulePage.iEnterTextFieldArray("Required Quantity", ["2"]);
		await rulePage.iSelectFromDropDown("Price Modification","AmountRebate");
		await rulePage.iEnterTextFieldArray("Price Modification Amount", ["1"]);

        await rulePage.iPressTheSaveRuleButton();
        await rulePage.iPressTheWarningOkControl();

        await rulePage.iShouldSeeTheFinalSavedRuleDetailsPage(PROMO_NAME_TEXT + "-Rule-" + oppssequencecount);
        //await rulePage.iPressVerify();


    });

    it("should activate the promotion", async () => {
        await rulePage.iPressTheBackButton();
        await promotionDetailsPage.iPressTheActivateButton();
    });
    
    it("assert the promotion is active", async () => {
		await promotionDetailsPage.iAssertTheActiveState("Active");
	});

    /**** END USECASE:9 ******/
});