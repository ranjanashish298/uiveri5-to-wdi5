const promotionListPage = require('../pages/thePromotionListPage');
const launchpadPage = require('../pages/theLaunchpadPage');
const promotionDetailsPage = require('../pages/thePromotionDetailsPage');
const rulePage = require('../pages/theRulePage');
 
const PROMO_NAME_PREFIX = "WDI5 TEST - ";
var PROMO_NAME_TEXT = "";
var oppssequencecount = 0;
const year = 2050; // new Date().getFullYear()

/**** BEGIN CONSTANTS FOR USECASE:8 ******/
const usecase8_StartDate = "Aug 01, " + year;
const usecase8_EndDate = "Aug 25, " + year;
/**** END CONSTANTS FOR USECASE:8 ******/

describe("promouie2e-uc8", function () {

    it("should login and load the app", async () => {
        await launchpadPage.iShouldSeeTheConfigAndPromoUITiles();
    });


    /**** BEGIN USECASE:6 ******/
    /* Buy 1.5 non-countable products for 10% off */
    it("********* UC6 - should Buy 1.5 non-countable products for 10% off ************", async () => {
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
        await promotionDetailsPage.iFillTheStartDateField(usecase8_StartDate);
        await promotionDetailsPage.iFillTheEndDateField(usecase8_EndDate);
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
        await rulePage.iAddEligibility("Generic Attribute");
        await rulePage.iAddEligibility("Product");
        await rulePage.iAddRewards("Additional Bonus", "Product");


        await rulePage.iSelectTxnGA("UIVERI5_JE_LONG_NEW");
        await rulePage.iEnterTextFieldArray("Value", ["X>=10"]);
        await rulePage.iEnterTextFieldArray("Product ID", ["P1","P2"]);
        await rulePage.iEnterTextFieldArray("Quantity", ["1"]);

        await rulePage.iPressTheSaveRuleButton();
        await rulePage.iPressTheWarningOkControl();

        await rulePage.iShouldSeeTheFinalSavedRuleDetailsPage(PROMO_NAME_TEXT + "-Rule-" + oppssequencecount);
    });

    it("should activate the promotion", async () => {
        await rulePage.iPressTheBackButton();
        await promotionDetailsPage.iPressTheActivateButton();
    });
    
    it("assert the promotion is active", async () => {
		await promotionDetailsPage.iAssertTheActiveState("Active");
	});

    /**** END USECASE:6 ******/
});